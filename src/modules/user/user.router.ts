import express from "express";
import permissions from "./user.permissions";
import * as controller from "./user.controller";
import * as schema from "./user.schema";
import * as validator from "../../services/validator.service";

const router = express.Router();

router
  .route(permissions.createUser.path)
  .post(validator.validateBody(schema.createUser), controller.createUser);

router
  .route(permissions.createUserByReferralCode.path)
  .post(
    validator.validateBody(schema.createUserByReferralCode),
    controller.createUserByReferralCode
  );

router
  .route(permissions.updateUser.path)
  .put(
    validator.validateHeaderWithBody(permissions.updateUser.grantedUserRoles, schema.updateUser),
    controller.updateUser
  );

router.route(permissions.login.path).post(validator.validateBody(schema.login), controller.login);

router
  .route(permissions.getUserById.path)
  .get(
    validator.validateHeader(permissions.getUserById.grantedUserRoles),
    validator.validateRouteParameters(schema.id),
    controller.getUserById
  );

router
  .route(permissions.getReferees.path)
  .get(
    validator.validateHeader(permissions.getUserById.grantedUserRoles),
    validator.validateRouteParameters(schema.id),
    controller.getAllReferees
  );

export default router;
