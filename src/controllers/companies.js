import { PrismaClient } from "@prisma/client";
import { checkNewPosition } from "./positions.js";
const prisma = new PrismaClient();

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({});
    return res
      .status(200)
      .json({ message: "All companies data retreived", data: companies });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot retreive all companies data.",
      error: error,
    });
  }
};

// Get company by id
export const getCompanyById = async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: req.params.id,
      },
    });

    return res
      .status(200)
      .json({ message: "company data retreived", data: company });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot retreive company data.",
      error: error,
    });
  }
};

// Create new user
export const createNewCompany = async (req, res) => {
  try {
    const companies = await prisma.company.create({
      data: {
        companyName: req.body.company_name,
        companyDetails: req.body.company_details,
      },
    });
    return res.status(200).json({
      message: "A new company successfully created!",
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot create a new company.",
      error: error,
    });
  }
};

// Add Company Position
export const addCompanyPosition = async (req, res) => {
  try {
    await req.body.position.forEach(async (position) => {
      const position_already_exist = await checkNewPosition(position.name);

      if (position_already_exist) {
        await prisma.companyPosition.create({
          data: {
            companyId: req.params.id,
            positionId: position_already_exist.id,
          },
        });
      } else {
        const new_position = await prisma.position.create({
          data: {
            positionName: position.name,
          },
        });

        await prisma.companyPosition.create({
          data: {
            companyId: req.params.id,
            positionId: new_position.id,
          },
        });
      }
    });
    return res.status(200).json({
      message: "A new company positions has been added.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Cannot add a new company position.",
      error: error,
    });
  }
};
