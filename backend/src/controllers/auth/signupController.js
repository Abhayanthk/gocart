const prisma = require("../../../prisma/prisma");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  const { name, email, password, fullName } = req.body;
  if (!name || !email || !password || !fullName) {
    return res.status(400).json(
      { message: "Please provide all required fields" }
    );
  }
  const existingUser = await prisma.account.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json(
      { message: "User already exists" }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Creating user:", {name, email, fullName, password: hashedPassword});
  const user = await prisma.account.create({
    data: {
      username: name,
      email,
      password: hashedPassword,
      fullName,
    },
  });
  await prisma.user.create({
    data: {
      id: user.id.toString(),
      username: name,
      fullName,
      email,
      password: hashedPassword,
    },
  });
  return res.status(201).json({ user });
}
module.exports = { signup };
