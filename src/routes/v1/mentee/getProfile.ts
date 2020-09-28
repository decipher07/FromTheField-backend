import asyncHandler from "../../../helpers/asyncHandler";
import express from "express";
import MenteeRepo from "../../../database/repository/MenteeRepo";
import { BadRequestError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import schema from "./schema";

const router = express.Router();

router.get(
  "/",
  validator(schema.getProfile),
  asyncHandler(async (req, res) => {
    const mentee = await MenteeRepo.findByEmail(req.body.email);
    if (!mentee) throw new BadRequestError("No Mentee Profile Exists");

    new SuccessResponse("Mentee", {
      mentee,
    }).send(res);
  })
);

export default router;
