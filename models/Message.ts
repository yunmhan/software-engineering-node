/**
 * @file Declares Message data type representing relationship between
 * users, as in one user messages another
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between users,
 * as in a user messages another user
 * @property {String} message The message that the user sends
 * @property {User} to The user receiving message
 * @property {User} from The user sending message
 * @property {Date} sentOn The sending time of the message
 */
export default interface Message{
    message: String,
    to: User,
    from:User,
    sentOn: Date
};