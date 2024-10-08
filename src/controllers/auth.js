import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

// Get all users
export const login = async (req, res) => {
  try {
    const users = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    // console.log(users);
    if (!users) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }

    if (await bcryptjs.compare(req.body.password, users.password)) {
      const token = jwt.sign(
        {
          email: users.email,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ message: "Login success!", token: token });
    }

    return res.status(401).json({
      message: "Invalid Credentials!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong! authentication system error.",
      error: error,
    });
  }
};

// Create new user
export const register = async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        email: req.body.email,
        password: await bcryptjs.hash(req.body.password, 8),
        name: req.body.name,
        companyPositionId: req.body.company_position_id,
      },
      omit: {
        password: true,
      },
    });

    return res
      .status(200)
      .json({ message: "A new user successfully created!", data: user });
  } catch (error) {
    // console.log(error);
    if (error.code == "P2002") {
      return res.status(403).json({
        message: "Email has been registered.",
      });
    } else
      res.status(500).json({
        message: "Something went wrong! Cannot create a new user.",
        error: error,
      });
  }
};
