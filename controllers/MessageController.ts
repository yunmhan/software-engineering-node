/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import Message from "../models/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/uid1/messages/uid2 to record that a user messages another user
 *     </li>
 *     <li>GET /api/users/uid/messages to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/uid1/messaged to retrieve all the messages sent to a user
 *     </li>
 *     <li>DELETE /api/users/uid1/deletemessages/uid2 to record that a user
 *     no londer messages another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null){
            MessageController.messageController = new MessageController();
            app.post("/api/users/uid1/messages/uid2", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/uid/messages", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/uid1/messaged", MessageController.messageController.findAllMessagesSentToUser);
            app.delete("/api/users/uid1/deletemessages/uid2", MessageController.messageController.userDeletesMessage);

        }
        return MessageController.messageController;
    }
    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is sending the message to another user
     * and another user being messaged
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body, req.params.uid1, req.params.uid2)
            .then((messages:Message) =>res.json(messages));

    /**
     * Retrieves all messages that the user messages from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the messages sent by user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then((messages:Message[]) => res.json(messages));

    /**
     * Retrieves all messages that the user messaged by from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the messages received by user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then((messages:Message[]) => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unmessaging
     * another user and another user being unmessaged
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.body,req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

}