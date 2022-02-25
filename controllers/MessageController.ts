import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";
import Message from "../models/Message";

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null){
            MessageController.messageController = new MessageController();
            app.post("/api/users/uid1/messages/uid2", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/uid/messages", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/uid1/messagesfrom/uid2", MessageController.messageController.findAllMessagesSentToUser);
            app.delete("/api/users/uid1/deletemessages/uid2", MessageController.messageController.userDeletesMessage);

        }
        return MessageController.messageController;
    }
    private constructor() {}

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body, req.params.uid1, req.params.uid2)
            .then((messages:Message) =>res.json(messages));

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then((messages:Message[]) => res.json(messages));
    findAllMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then((messages:Message[]) => res.json(messages));
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.body,req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

}