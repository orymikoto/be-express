import express from "express";
import UserRouter from "./users.js";
import CompanyRouter from "./companies.js";
import AuthRouter from "./auth.js";
import FollowRouter from "./follows.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.send({
    message: "wellcome",
    status: 200,
  });
});

router.use("/user", UserRouter);

router.use("/company", CompanyRouter);

router.use("/auth", AuthRouter);

// router.use("/position");

// router.use("/post");

router.use("/relation", FollowRouter);

export default router;
