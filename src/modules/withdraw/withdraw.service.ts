import { getBalance, getUserFromId } from "../user/user.service";
import withdrawModel from "./withdraw.model";
import * as repository from "../../services/repository.service";
import Web3 from "web3";
import mongoose from "mongoose";

export const withdraw = async (body) => {
  const { userId, amount, address } = body;

  const withdrawAmount = parseInt(amount);
  if (withdrawAmount <= 0) throw new Error("Invalid withdrawal amount");

  const existingUser = await getUserFromId(userId);
  if (!existingUser) throw new Error("Invalid user id");

  const balance = await getBalance(userId);

  if (
    !balance ||
    !balance?.totalBalance ||
    balance?.totalBalance <= 0 ||
    balance?.totalBalance < withdrawAmount
  )
    throw new Error("User balance insufficient");

  const remainingBalance = balance.totalBalance - withdrawAmount;

  const isValidAddress = Web3.utils.isAddress(address);
  if (!isValidAddress) throw new Error("Invalid address");

  const withdrawRecord = new withdrawModel({
    userId,
    amount: withdrawAmount,
    remainingBalance,
    receiver: address,
  });

  return await repository.save(withdrawRecord);
};

export const updateWithdrawal = async (body) => {
  const { transactionHash, blockHash, blockNumber, address, returnValues } = body;
  const { receiver, receivedAmount, timestamp, recordId, startValue, endValue } =
    returnValues.withdrawObj;

  const existingRecord = await getWithdrawalFromId(recordId);
  if (!existingRecord) throw new Error("Invalid record id");

  const updatedRecord = await repository.updateOne(
    withdrawModel,
    {
      _id: new mongoose.Types.ObjectId(existingRecord._id),
    },
    {
      transactionHash,
      blockHash,
      blockNumber,
      contract: address,
      receiver,
      amount: receivedAmount,
      timestamp,
      previousForeignReserve: startValue.foreignReserve,
      previousNativeReserve: startValue.nativeReserve,
      previousKValue: startValue.kValue,
      latestForeignReserve: endValue.foreignReserve,
      latestNativeReserve: endValue.nativeReserve,
      latestKValue: endValue.kValue,
      confirmed: true,
    },
    {
      returnNewDocument: true,
    }
  );

  console.log(updatedRecord);
};

export const getWithdrawalFromId = async (id: string) => {
  return repository.findOne(withdrawModel, {
    _id: new mongoose.Types.ObjectId(id),
  });
};
