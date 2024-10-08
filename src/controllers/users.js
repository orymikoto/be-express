import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    return res
      .status(200)
      .json({ message: "All users data retreived", data: users });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot retreive all users data.",
      error: error,
    });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    // console.log(req);
    const user = await prisma.users.findFirst({
      where: { email: req.user.email },
      omit: {
        password: true,
      },
    });
    return res.status(200).json({ message: "User data retreived", data: user });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot retreive find user data.",
      error: error,
    });
  }
};

// Create new user
export const createNewUser = async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        headlines: req.body.headlines,
        about: req.body.about,
        password: await bcryptjs.hash(req.body.password, 8),
        profilePicture: req.body.profile_picture,
        role: req.body.role,
        companyPositionId: req.body.id,
      },
    });
    return res
      .status(200)
      .json({ message: "A new user successfully created!", data: user });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot create a new user.",
      error: error,
    });
  }
};

// Update user by id
export const updateUserById = async (req, res) => {
  try {
    const user = await prisma.users.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        headlines: req.body.headlines,
        about: req.body.about,
        password: await bcryptjs.hash(req.body.password, 8),
        profilePicture: req.body.profile_picture,
        companyPositionId: req.body.company_position_id,
      },
    });

    return res.status(200).json({
      message: "Data user succesfully updated!",
      data: {
        user: user,
        companyPosition: companies,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot update user data.",
      error: error,
    });
  }
};

// Delete user by id
export const deleteUserById = async (req, res) => {
  try {
    const user = await prisma.users.delete({ where: { id: req.params.id } });
    await prisma.companyPosition.delete({
      where: { id: user.companyPositionId },
    });
    return res.status(200).json({
      message: "User has been deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot retreive all users data.",
      error: error,
    });
  }
};
