/**
 * @file Controller RESTful Web service API for follows resource
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:tid to record that a user
 *     no londer follows another user</li>
 *     <li>GET /api/users/:uid/follows to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all users following the user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */


export default class FollowController implements FollowControllerI{
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null){
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersFollower);
        }
        return FollowController.followController;
    }
    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is following another user
     * and another user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unfollowing
     * another user and another user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all users that the user is following from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */

    findAllUsersFollowedByUser= (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that a user is followed by from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollower= (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollower(req.params.uid)
            .then(follows => res.json(follows));
    }
