/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between users,
 * as in a user follows another user
 * @property {User} userFollowed user being followed
 * @property {User} userFollowedBy User is following by other users
 */
export default interface Follow{
    userFollowed: User,
    userFollowedBy: User
}