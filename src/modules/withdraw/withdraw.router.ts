import express from "express";
import permissions from "./withdraw.permission";
import * as controller from "./withdraw.controller";
import * as schema from "./withdraw.schema";
import * as validator from "../../services/validator.service";

const router = express.Router();

router
  .route(permissions.withdraw.path)
  .post(
    validator.validateHeaderWithBody(permissions.withdraw.grantedUserRoles, schema.withdraw),
    controller.withdraw
  );

export default router;
