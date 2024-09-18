import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkNewPosition = async (position_name) => {
  try {
    const position = await prisma.position.findFirst({
      where: { positionName: { contains: position_name } },
    });
    if (position) {
      return position.id;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createNewPosition = async (req, res) => {
  try {
    const position = await prisma.position.create({
      data: {
        positionName: req.body.position_name,
      },
    });

    return res.status(200).json({
      message: "A new position successfully created!",
      body: position,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot add a new company position.",
      error: error,
    });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const position = await prisma.position.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Position data has been deleted",
      body: position,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot add a new company position.",
      error: error,
    });
  }
};
