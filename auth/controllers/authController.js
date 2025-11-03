import bcypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const { generateToken } = '../utilities/generateToken';

const prisma = new PrismaClient();

export const signup = async (req ,res) =>{
      const {name, email, password, fullName = "TEMP"} = req.body;
      if(!name || !email || !password || !fullName){
            return res.status(400).json({message: 'Please provide all required fields'});
      }
      const existingUser = await prisma.account.findUnique({where: {email}});
      if(existingUser){
            return res.status(400).json({message: 'User already exists'});
      }
      const hashedPassword = await bcypt.hash(password, 10);
      console.log("Creating user:", {name, email, fullName, password: hashedPassword});
      const user = await prisma.account.create({
            data:{
                  username: name,
                  email,
                  password: hashedPassword,
                  fullName
            }
      });
      const token = generateToken(user);
      return res.status(201).json({user, token});
}

export const login = async (req, res) =>{
      const {identifier, password} = req.body;
      if(!identifier || !password){
            return res.status(400).json({message: 'Please provide all required fields'});
      }
      const user = await prisma.account.findUnique({where: {OR : [{email: identifier}, {username: identifier}]}});
      if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
      }
      const isPasswordValid = await bcypt.compare(password, user.password);
      if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid credentials'});
      }
      const token = generateToken(user);
      return res.status(200).json({user, token});
}

// Generate profile endpoint
export const getProfile = async (req, res) => {
  const user = await prisma.account.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
  });
};