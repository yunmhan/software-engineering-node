/**
 * @file Implements DAO managing data storage of follows. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/Follow";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkDao} bookmarkDao Private single instance of UserDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    userFollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowed: uid2, userFollowedBy:uid1});
    userUnfollowsAnotherUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid2, userFollowedBy:uid1})
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowedBy:uid})
            .populate("userFollowed")
            .exec();
    findAllUsersFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed:uid})
            .populate("userFollowedBy")
            .exec();

}