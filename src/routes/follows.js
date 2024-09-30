import express from "express";
import * as FollowController from "../controllers/follows.js";
import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

// Get user follower list
router.route("/followers").get(verifyToken, FollowController.getUserFollower);

// Get user following list
router.route("/following").get(verifyToken, FollowController.getUserFollowing);

// Add new following
router.route("/follow").post(verifyToken, FollowController.followUser);

// Remove user from following
router.route("/unfollow").post(verifyToken, FollowController.unfollowUser);

export default router;
