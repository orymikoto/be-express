<h1 align="center">Express JS Prisma Starter</h1>

<p align="center">
  <b>A really simple boilerplate to build a REST API with Express JS written in Javascript and using Express, Prisma and Simple-Validation</b></br>
  <sub>Made with 🔥 by <a href="https://github.com/orymikoto">Mikli Oktarianto</a>
</p>

<br />

---

## Overview

The main goal of this boilerplate is to setup an Express REST API and add common features like, route, database connection, etc.

Some basic routes for authentication and user creation are already implemented. They can be used to quickly start your project.

⭐ If you like it, please leave a star, it helps me a lot! ⭐

---

## Table of Contents

- [Getting Started](#getting-started)
- [Create Schema](#create-schema)
- [Migrations](#migrations)
- [License](#license)

---

## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

#### Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

#### Install yarn globally

```bash
npm install --global yarn
```

#### Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

- Install Docker Desktop
- Run Docker Desktop

### Step 2: Clone the project

```bash
git clone https://github.com/orymikoto/express-prisma-starter.git
cd express-prisma-starter
rm -rf .git # Windows: rd /s /q .git
yarn install
```

`rm -rf .git` (or `rd /s /q .git` on Windows) deletes the git info of the branch like history.

### Step 3: Copy .env.example file

- on OSX run `cp .env.example .env`
- on Windows run `copy .env.example .env`

### Step 4: Run the server

```bash
yarn dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server will be running on `http://0.0.0.0:8080` (or `http://localhost:8080`).

---

## Create Schema

- Open prisma folder
- Change the prisma model schema to match your DB structure need

## Migrations

- Change the value of variable DATABASE_URL to match your db url string.
- Run `yarn prisma generate` to generate the prsima schema
- Run `yarn prisma migrate dev` to migrate your prisma schema to your database.

---

## License

[MIT](/LICENSE)
