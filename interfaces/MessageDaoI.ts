import Message from "../models/Message";
/**
 * @file Declares API for Messages related data access object methods
 */

export default interface MessageDaoI{
    userMessagesAnotherUser(message: String, uid1: String, uid2: String): Promise<Message>;
    findAllMessagesSentByUser(uid: String): Promise<Message[]>;
    findAllMessagesSentToUser(uid: String): Promise<Message[]>;
    userDeletesMessage(message: String, uid1: String, uid2: String): Promise<any>;

}