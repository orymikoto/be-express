import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const followUser = async (req, res) => {
  try {
    const base_user = await prisma.users.findFirst({
      where: {
        email: req.user.email,
      },
    });

    const follow = await prisma.follow.create({
      data: {
        base_user_id: base_user.id,
        followed_user_id: req.body.follow_user_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot follow user.",
      error: error,
    });
  }
};

export const getUserFollower = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.user.email,
      },
    });

    const [followers, followers_count] = await prisma.$transaction([
      // get user follower data
      prisma.follow.findMany({
        where: {
          followed_user_id: user.id,
        },
        include: {
          base_user: {
            omit: {
              role: true,
              password: true,
              about: true,
            },
          },
        },
      }),

      // count how many user follower
      prisma.follow.count({
        where: {
          followed_user_id: user.id,
        },
      }),
    ]);

    return res.status(200).json({
      message: "Data user followers successfully retrevied.",
      data: followers,
      follower_count: followers_count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot get data user follower.",
      error: error,
    });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.user.email,
      },
      // include: {
      //   _count: { select: { following: true } },
      //   following: {
      //     omit: {
      //       base_user_id: true,
      //       followed_user_id: true,
      //     },
      //     include: {
      //       follower_user: {
      //         omit: { password: true, role: true, about: true },
      //       },
      //     },
      //   },
      // },
    });

    const [followers, followers_count] = await prisma.$transaction([
      // get user follower data
      prisma.follow.findMany({
        where: {
          base_user_id: user.id,
        },
        include: {
          follower_user: {
            omit: {
              role: true,
              password: true,
              about: true,
            },
          },
        },
        omit: {
          base_user_id: true,
          followed_user_id: true,
        },
      }),

      // count how many user follower
      prisma.follow.count({
        where: {
          base_user_id: user.id,
        },
      }),
    ]);

    return res.status(200).json({
      message: "Data user following successfully retrevied.",
      data: followers,
      following_count: followers_count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong! Cannot get data user following.",
      error: error,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const base_user = await prisma.users.findFirst({
      where: { email: req.user.email },
    });

    const unfollow_user = await prisma.follow.delete({
      where: {
        base_user_id: base_user.id,
        followed_user_id: req.body.followed_user_id,
      },
    });

    return res.status(200).json({
      message: "User has been unfollowed",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! cannot unfollow user.",
      error: error,
    });
  }
};
