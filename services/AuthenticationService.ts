import mongoose from "mongoose";
import UserDao from "../daos/UserDao";

const userDao: UserDao = UserDao.getInstance();
mongoose.connect('mongodb+srv://yunmhan:Hym246494726@cluster0.md46p.mongodb.net/tuiter?retryWrites=true&w=majority');

export const login = (u: string, p: string) =>
    userDao.findUserByCredentials(u, p)
        .then(user => {
            if (user) {
                return user;
            } else {
                throw "Unknown user"
            }
        })
        .then(user => user)
        .catch(e => e)