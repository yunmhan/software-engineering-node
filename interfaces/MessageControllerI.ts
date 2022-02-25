import {Request, Response} from "express";

export default interface MessageControllerI{
    userMessagesAnotherUser(req:Request, res: Response): void;
    findAllMessagesSentByUser(req:Request, res: Response): void;
    findAllMessagesSentToUser(req:Request, res: Response): void;
    userDeletesMessage(req:Request, res: Response): void;
}