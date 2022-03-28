import DisLikeDaoI from "../interfaces/DisLikeDaoI";
import DisLikeModel from "../mongoose/dislikes/DisLikeModel";
import DisLike from "../models/dislikes/DisLike";

export default class DisLikeDao implements DisLikeDaoI{
    private static dislikeDao: DisLikeDao | null = null;
    public static getInstance = () : DisLikeDao => {
        if (DisLikeDao.dislikeDao === null){
            DisLikeDao.dislikeDao = new DisLikeDao();
        }
        return DisLikeDao.dislikeDao;
    }

    private constructor() {}

    findAllUsersThatDisLikedTuit = async (tid: string): Promise<DisLike[]> =>
        DisLikeModel
            .find({tuit: tid})
            .populate("disLikedBy")
            .exec();

    findAllTuitsDisLikedByUser = async (uid: string): Promise<DisLike[]> =>
        DisLikeModel
            .find({disLikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    userDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DisLikeModel.create({tuit: tid, disLikedBy: uid});

    findUserDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DisLikeModel.findOne({tuit: tid, disLikedBy: uid});

    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DisLikeModel.deleteOne({tuit: tid, disLikedBy: uid});

    countHowManyDisLikedTuit = async (tid: string): Promise<any> =>
        DisLikeModel.count({tuit: tid});

}