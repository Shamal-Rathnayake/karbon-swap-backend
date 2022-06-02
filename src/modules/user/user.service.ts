import config from "../../config/config";
import * as repository from "../../services/repository.service";
import userModel from "./user.model";
import mongoose from "mongoose";

export const createUser = async (body) => {
  const existingUser = await getUserByEmail(body.email, config.userRoles.user);
  if (existingUser) throw new Error("Email already exists");

  let newUser = new userModel(body);
  newUser.setPassword(body.password);
  newUser = await repository.save(newUser);

  newUser = newUser.toObject();
  const { password, salt, __v, ...rest } = newUser;
  return rest;
};

export const createUserByReferralCode = async (body) => {
  const existingUser = await getUserByEmail(body.email, config.userRoles.user);
  if (existingUser) throw new Error("Email already exists");

  const referer = await getUserByReferralCode(body.referralCode);
  if (!referer) throw new Error("Invalid referral code");

  let newUser = new userModel(body);
  newUser.setPassword(body.password);
  newUser.referer = referer._id;
  newUser = await repository.save(newUser);
  await incrementRefereeCount(referer._id);

  newUser = newUser.toObject();
  const { password, salt, __v, ...rest } = newUser;
  return rest;
};

export const updateUser = async (body) => {
  const existingUser = await getUserFromId(body.id);
  if (!existingUser) throw new Error("Invalid user id");

  const existingUserEmail = await getUserByEmail(body.email, body.role);
  if (existingUserEmail) throw new Error("Email already exists");

  delete body.role;

  let updatedUser = await repository.updateOne(
    userModel,
    {
      _id: new mongoose.Types.ObjectId(existingUser._id),
    },
    body,
    {
      returnNewDocument: true,
      returnDocument: "after",
    }
  );

  updatedUser = updatedUser.toObject();
  const { password, salt, __v, ...rest } = updatedUser;
  return rest;
};

export const getUserById = async (id: string) => {
  let existingUser = await getUserFromId(id);
  if (!existingUser) throw new Error("Invalid user id");
  existingUser = existingUser.toObject();
  const { password, salt, __v, ...rest } = existingUser;
  return rest;
};

export const login = async (body) => {
  const existingUser = await getUserByEmail(body.email, body.role);
  if (!existingUser) throw new Error("Invalid email");

  const passwordValid = existingUser.validatePassword(body.password);
  if (!passwordValid) throw new Error("Invalid password");

  const { password, salt, __v, ...rest } = existingUser.toObject();
  return rest;
};

export const getAllReferees = async (id: string) => {
  let existingUser = await getUserFromId(id);
  if (!existingUser) throw new Error("Invalid user id");

  const referees = await repository.findMany(
    userModel,
    {
      referer: new mongoose.Types.ObjectId(id),
      delete_date: null,
    },
    {
      password: 0,
      salt: 0,
      __v: 0,
    }
  );

  return referees;
};

const getUserByEmail = (email: string, role: string) => {
  let roles = [role];
  if (role === config.userRoles.admin)
    roles = [config.userRoles.admin, config.userRoles.superAdmin];
  return repository.findOne(userModel, {
    email: { $regex: `^${email}$`, $options: "i" },
    role: { $in: roles },
    delete_date: null,
  });
};

const getUserByReferralCode = (code: string) => {
  return repository.findOne(userModel, {
    referralId: code,
    delete_date: null,
  });
};

export const getUserFromId = async (id: string) => {
  return repository.findOne(userModel, {
    _id: new mongoose.Types.ObjectId(id),
    delete_date: null,
  });
};

const incrementRefereeCount = (id: string) => {
  return repository.updateOne(
    userModel,
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      $inc: {
        refereeCount: 1,
      },
    }
  );
};

export const getBalance = async (id: string) => {
  let existingUser = await getUserFromId(id);
  if (!existingUser) throw new Error("Invalid user id");

  const balance = await repository.findByAggregateQuery(userModel, [
    {
      $facet: {
        liquidityReward: [
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
              deleteDate: null,
            },
          },
          {
            $lookup: {
              from: "liquidity_rewards",
              localField: "_id",
              foreignField: "userId",
              as: "liquidityReward",
            },
          },
          {
            $unwind: {
              path: "$liquidityReward",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: "$liquidityReward.userId",
              liquidityBalance: {
                $sum: "$liquidityReward.reward",
              },
            },
          },
        ],
        swapReward: [
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
              deleteDate: null,
            },
          },
          {
            $lookup: {
              from: "swap_rewards",
              localField: "_id",
              foreignField: "userId",
              as: "swapReward",
            },
          },
          {
            $unwind: {
              path: "$swapReward",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: "$swapReward.userId",
              swapBalance: {
                $sum: "$swapReward.reward",
              },
            },
          },
        ],
        withdrawal: [
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
              deleteDate: null,
            },
          },
          {
            $lookup: {
              from: "withdrawals",
              localField: "_id",
              foreignField: "userId",
              as: "withdrawal",
            },
          },
          {
            $unwind: {
              path: "$withdrawal",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              "withdrawal.confirmed": true,
            },
          },
          {
            $group: {
              _id: "$withdrawal.userId",
              withdrawal: {
                $sum: "$withdrawal.amount",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        liquidityReward: {
          $arrayElemAt: ["$liquidityReward", 0],
        },
        swapReward: {
          $arrayElemAt: ["$swapReward", 0],
        },
        withdrawal: {
          $arrayElemAt: ["$withdrawal", 0],
        },
      },
    },
    {
      $project: {
        userId: {
          $cond: {
            if: "$liquidityReward._id",
            then: "$liquidityReward._id",
            else: "$swapReward._id",
          },
        },
        liquidity: "$liquidityReward.liquidityBalance",
        swap: "$swapReward.swapBalance",
        withdrawals: "$withdrawal.withdrawal",
        totalBalance: {
          $subtract: [
            {
              $add: ["$liquidityReward.liquidityBalance", "$swapReward.swapBalance"],
            },
            "$withdrawal.withdrawal",
          ],
        },
      },
    },
  ]);

  if (balance.length <= 0) return null;

  return balance[0];
};
