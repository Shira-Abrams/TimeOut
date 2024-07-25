
import { populate } from 'dotenv';
import Users from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find().populate('visitsWebsites.websiteId  profiles.blockedSites profiles.limitedWebsites.websiteId')
    .select('-__v')
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const getUserById = async (req, res,next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})
  try {

    const id = req.params.id;
    const user = await Users.findById(id).populate('visitsWebsites profiles preferences').select('-__v');
    if (!user) {
        return next({message:'user not found ',status:404})
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Missing required fields');
    }
    const newUserDetails = {
      name,email,password: await bcrypt.hash(password, 10),};
    if (req.file) {
      newUserDetails.profileImage = req.file.originalname;
    }
    const newUser = new Users(newUserDetails);
    await newUser.save();   
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }  
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
       return  res.status(404).send('User not found');     
    }
    res.send('User deleted successfully!');
  } catch (err) {
    console.error(err);
   return res.status(500).send('Error deleting user');
  }
};

export const updatedUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ message: 'ID is not valid' });
  }
  try {
    const { name, email, password } = req.body;
    const updateFields = { name, email };   
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }    
    if (req.file) {
      updateFields.profileImage = req.file.originalname;
    }
    const updatedUser = await Users.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
};

