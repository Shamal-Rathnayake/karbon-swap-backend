import config from "../../config/config";

const { userRoles } = config;

export default {
  withdraw: {
    path: "/",
    grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
  },
};
