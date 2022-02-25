import Message from "../models/Message";

export default interface MessageDaoI{
    userMessagesAnotherUser(message: String, uid1: String, uid2: String, sentOn: Date): Promise<Message>;
    findAllMessagesSentByUser(uid: String): Promise<Message[]>;
    findAllMessagesSentToUser(uid: String): Promise<Message[]>;
    userDeletesMessage(message: String, uid1: String, uid2: String, sentOn: Date): Promise<any>;

}