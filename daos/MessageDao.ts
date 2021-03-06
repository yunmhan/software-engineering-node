/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Users
 * @property {MessageDao} messageDao Private single instance of UserDao
 */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = () : MessageDao => {
        if (MessageDao.messageDao === null){
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userMessagesAnotherUser = async (message: String, uid1: String, uid2: String): Promise<Message> =>
        MessageModel.create({message: message, from: uid1, to: uid2});
    findAllMessagesSentByUser = async (uid: String): Promise<Message[]> =>
        MessageModel
            .find({from:uid})
            .populate("message")
            .exec()
    findAllMessagesSentToUser = async (uid: String): Promise<Message[]> =>
        MessageModel
            .find({to:uid})
            .populate("message")
            .exec()
    userDeletesMessage = async (message: String, uid1: String, uid2: String): Promise<any> =>
        MessageModel.deleteOne({message: message, from:uid1, to: uid2});
}