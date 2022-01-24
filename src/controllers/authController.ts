import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../models/entity/User';
import { createToken } from './jwtController';

// user register process
export const register_user: RequestHandler = async (req, res) => {

  // variables these are come from body
  const { firstName, lastName, userName, email, password } = req.body;

  // assign the entity to variable
  const userRepository = getRepository(User);

  // SELECT * FROM users WHERE userName = req.body 
  const existingUser = await userRepository.findOne({ email });

  try {

    if (!existingUser) {

      // assign that generated hash to hashPassword
      const hashPassword = await bcrypt.hash(password, 10);

      // create new user 
      const user = userRepository.create({
        firstName,
        lastName,
        userName,
        email: email.toLowerCase(),
        password: hashPassword
      })

      //save new user to DB
      await userRepository.save(user);

      //if all steps are ok show login page
      res.redirect('/login')

    } else {
      //show register page with message and response bad request if there is an user who is registered

      return res.status(400).render("register", {
        errorMessage: "The UserName or mail already taken", layout: "./layout/auth_layout.ejs"
      });
    }

  } catch (err) {
    //if there is error tha is server side throw error
    const error = new Error(err);
    throw error;
  }

};

// user login process
export const login_user: RequestHandler = async (req, res) => {
  // variables these are come from body
  const { userName, password } = req.body;
  //// assign the browser name the user loggined on it is in header to variable
  const browserInfo = req.headers["user-agent"]
  // assign the entity to variable
  const userRepository = getRepository(User);

  // check the user whether exist 
  const user = await userRepository.findOne({ userName });
  // if user doesnt exist return response with message and show login page again
  if (!user) return res.status(400).render("login", {
    errorMessage: "User Not Found! You may need to register!", layout: "./layout/auth_layout.ejs"
  });


  try {

    // Validate user input
    if (user == null || password == null) {
      return res.status(400).render("login", {
        errorMessage: "Please check your information to login", layout: "./layout/auth_layout.ejs"
      });

      // check password whether valid
    } else if (userName == user.userName && await bcrypt.compare(password, user.password)) {

      //call createToken function
      const token = createToken(user.id, browserInfo)

      //create  cookie that name is token
      res.cookie("token", token, { httpOnly: true });

      // save userId and browser info to session
      req.session.userInfo = {
        userID: user.id,
        browserInfo,
        token
      }

      res.redirect('/dashboard')

    } else return res.status(400).render("login", {
      errorMessage: "Invalid email or password.Try again!", layout: "./layout/auth_layout.ejs"
    });

  } catch (err) {
    const error = new Error(err)
    throw error;
  }

}

// user logout process
export const logout: RequestHandler = async (req, res) => {

  // clear session from db and browser application 
  req.session.destroy((err) => {
    if (err)
      res.send({ result: "Error", message: "User cannot be logged out!" });
    else {
      res.clearCookie("connect.sid", { path: "/" });
      res.clearCookie("token");
      res.status(200).render("login", { message: "Succesfully Logged out!", layout: "./layout/dataTable_layout.ejs" });
    }
  });
};

