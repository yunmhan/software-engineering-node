import Follow from "../models/Follow";

export default interface FollowDaoI {
    userFollowsAnotherUser (uid1:string, uid2:string): Promise<any>;
    userUnfollowsAnotherUser (uid1:string, uid2:string): Promise<any>;
    findAllUsersFollowedByUser (uid:string): Promise<Follow[]>;
    findAllUsersFollower (uid:string): Promise<Follow[]>;
};