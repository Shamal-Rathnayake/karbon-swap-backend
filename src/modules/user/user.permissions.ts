import config from "../../config/config";

const { userRoles } = config;

export default {
  createAdmin: {
    path: "/admin",
  },
  createUser: {
    path: "/create",
  },
  createUserByReferralCode: {
    path: "/user-by-reference",
  },
  updateUser: {
    path: "/",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
  updatePassword: {
    path: "/password",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
  changePassword: {
    path: "/password/change",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin],
  },
  deleteUser: {
    path: "/:id",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin],
  },
  login: {
    path: "/login",
  },
  getUserById: {
    path: "/:id",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
  getReferees: {
    path: "/referees/:id",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
  getBalance: {
    path: "/balance/:id",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
};
