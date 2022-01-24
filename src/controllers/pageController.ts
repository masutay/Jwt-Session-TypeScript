import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/entity/User';

// show login page 
export const showLoginForm: RequestHandler = (req, res) => {

    res.render("login", { layout: "./layout/auth_layout.ejs" })
}

// show register page 
export const showRegisterForm = (req, res, next) => {

    res.render("register", { layout: "./layout/auth_layout.ejs" })
}

//get users from Database
export const allUser: RequestHandler = async (req, res) => {
    try {
        // Gets repository for the User entity class and assign to userRepository.
        const userRepository = getRepository(User);
        // select all users from DB
        const users = await userRepository.find()

        res.render("index", { users: users, layout: "./layout/dataTable_layout.ejs" })
    } catch (err) {
        const error = new Error(err);
        throw error;
    }

}
