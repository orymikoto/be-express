import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addNewPost = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.user.email,
      },
    });

    const new_post = await prisma.post.create({
      data: {
        user_id: user.id,
        body: req.body.body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot add new post.",
      error: error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.user.email,
      },
    });

    await prisma.post.delete({ where: { id: req.body.id } });

    return res.status(200).json({
      message: "Post sucessfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot delete new post.",
      error: error,
    });
  }
};

export const getFollowedPost = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { email: req.user.email },
    });

    const followed_user = await prisma.follow.findMany({
      where: { base_user_id: user.id },
      select: { followed_user_id: true },
    });

    const all_followed_post = await prisma.post.findMany({
      where: { id: { in: followed_user } },
    });

    return res.status(200).json({
      message: "All followed user posts retreived.",
      data: all_followed_post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot get followed user posts.",
      error: error,
    });
  }
};

export const getRandomPost = async (req, res) => {
  try {
    const randomPost = await prisma.$queryRawUnsafe(
      `SELECT * FROM Post ORDER BY RAND() LIMIT 10;`
    );

    return res
      .status(200)
      .json({ message: "All posts retreived.", body: randomPost });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! Cannot get followed user posts.",
      error: error,
    });
  }
};
