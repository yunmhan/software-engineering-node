import DisLike from "../models/dislikes/DisLike";


/**
 * @file Declares API for disLikes related data access object methods
 */

export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit(tid:string): Promise<DisLike[]>;
    findAllTuitsDislikedByUser(uid:string): Promise<DisLike[]>;
    userUnDislikesTuit(tid:string, uid: string): Promise<any>;
    userDislikesTuit(tid:string, uid:string): Promise<DisLike>;
}