import express from "express";
import userRoute from "./users.js";
import companyRoute from "./companies.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.send({
    message: "wellcome",
    status: 200,
  });
});

router.use("/user", userRoute);

router.use("/company", companyRoute);

// router.use("/position");

// router.use("/post");

// router.use("/follow");

export default router;
