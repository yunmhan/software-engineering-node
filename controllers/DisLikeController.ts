

/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import {Express, Request, Response} from "express";
import DisLikeControllerI from "../interfaces/DisLikeControllerI";
import TuitDao from "../daos/TuitDao";
import DisLikeDao from "../daos/DisLikeDao";


/**
 * @class TuitController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no londer dislikes a tuit</li>
 * </ul>
 * @property {DisLikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DisLikeController} DisLikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DisLikeController implements DisLikeControllerI {
    private static dislikeDao: DisLikeDao = DisLikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DisLikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): DisLikeController => {
        if(DisLikeController.dislikeController === null) {
            DisLikeController.dislikeController = new DisLikeController();
            app.get("/api/users/:uid/dislikes", DisLikeController.dislikeController.findAllTuitsDisLikedByUser);
            app.get("/api/tuits/:tid/dislikes", DisLikeController.dislikeController.findAllUsersThatDisLikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", DisLikeController.dislikeController.userTogglesTuitDisLikes);
        }
        return DisLikeController.dislikeController;
    }

    private constructor() {}

    /**
     * Retrieves all users that disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatDisLikedTuit = (req: Request, res: Response) =>
        DisLikeController.dislikeDao.findAllUsersThatDisLikedTuit(req.params.tid)
            .then(disLikes => res.json(disLikes));

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsDisLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        DisLikeController.dislikeDao.findAllTuitsDisLikedByUser(userId)
            .then(disLikes => {
                const disLikesNonNullTuits = disLikes.filter(disLike => disLike.tuit);
                const tuitsFromDisLikes = disLikesNonNullTuits.map(disLike => disLike.tuit);
                res.json(tuitsFromDisLikes);
            });
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userTogglesTuitDisLikes = async (req: Request, res: Response) => {
        const dislikeDao = DisLikeController.dislikeDao;
        const tuitDao = DisLikeController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDisLikedTuit = await dislikeDao.findUserDisLikesTuit(userId, tid);
            const howManyDisLikedTuit = await dislikeDao.countHowManyDisLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyDisLikedTuit) {
                await dislikeDao.userUnDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDisLikedTuit - 1;
            } else {
                await DisLikeController.dislikeDao.userDisLikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDisLikedTuit + 1;
            };
            await tuitDao.updateDisLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};