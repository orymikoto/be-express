import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed Company
  await prisma.company.createMany({
    data: [
      {
        companyName: "UNEJ",
        companyDetails: "Universitas Negeri Jember",
      },
      {
        companyName: "Software House Jember",
        companyDetails:
          "Software house yang mengatasi pembuatan aplikasi dan berlokasi di Jember",
      },
    ],
  });

  // Seed Positions
  await prisma.position.createMany({
    data: [
      {
        positionName: "Dosen",
      },
      {
        positionName: "Tata Usaha",
      },
      {
        positionName: "Kemahasiswaan",
      },
      {
        positionName: "CEO",
      },
      {
        positionName: "Programmer",
      },
      {
        positionName: "Desainer",
      },
    ],
  });

  // Seed companyPosition
  await prisma.companyPosition.createMany({
    data: [
      {
        companyId: 1,
        positionId: 1,
      },
      {
        companyId: 1,
        positionId: 2,
      },
      {
        companyId: 1,
        positionId: 3,
      },
      {
        companyId: 2,
        positionId: 4,
      },
      {
        companyId: 2,
        positionId: 5,
      },
      {
        companyId: 2,
        positionId: 6,
      },
    ],
  });

  // seeder user
  const data_users = [
    {
      name: "miklirianto",
      headlines: "Full Stack Developer | Freelancer",
      about:
        "Hello I am Mikli Oktarianto, I am currently active Student at Jember University. I am currently interested and active to learning Back End Development. I also have slight interest at competitive programming and game development.",
      email: "mikli@mail.com",
      password: bcrypt.hashSync("123456", 10),
      role: "ADMIN",
      companyPositionId: 5,
      profilePicture: faker.image.avatar(),
    },
    {
      name: "riezquibnanta",
      headlines: "Technical Team at Kubo Studios LTD",
      email: "riezqu@mail.com",
      password: bcrypt.hashSync("123456", 10),
      role: "ADMIN",
      companyPositionId: 5,
      profilePicture: faker.image.avatar(),
    },
    {
      name: "admindosen",
      headlines: "Professor at Jember University",
      email: "admin@mail.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "ADMIN",
      companyPositionId: 4,
      profilePicture: faker.image.avatar(),
    },
    {
      name: "usertest",
      headlines: "User of this app",
      email: "user@mail.com",
      password: bcrypt.hashSync("123", 10),
      role: "USER",
      companyPositionId: 4,
      profilePicture: faker.image.avatar(),
    },
  ];
  for (let i = 1; i <= 10; i++) {
    data_users.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      headlines: faker.person.jobDescriptor(),
      password: bcrypt.hashSync("123456", 10),
      role: "USER",
      companyPositionId: faker.number.int({ min: 1, max: 6 }),
    });
  }

  // console.log(data_users);
  await prisma.users.createMany({
    data: data_users,
  });

  // Seed Post
  const data_posts = [
    {
      body: "Aku sedang bekerja sebagai perogerammer!",
      user_id: 1,
    },
    {
      body: "Aku juga sedang bekerja sebagai perogerammer!",
      user_id: 2,
    },
  ];
  for (let i = 0; i < 10; i++) {
    data_posts.push({
      body: faker.lorem.paragraph(2),
      user_id: faker.number.int({ min: 4, max: 14 }),
    });
  }

  await prisma.post.createMany({
    data: data_posts,
  });

  await prisma.follow.createMany({
    data: [
      {
        base_user_id: 1,
        followed_user_id: 2,
      },
      {
        base_user_id: 1,
        followed_user_id: 3,
      },
      {
        base_user_id: 2,
        followed_user_id: 1,
      },
      {
        base_user_id: 2,
        followed_user_id: 3,
      },
      {
        base_user_id: 4,
        followed_user_id: 1,
      },
      {
        base_user_id: 4,
        followed_user_id: 2,
      },
      {
        base_user_id: 4,
        followed_user_id: 3,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
