import Follow from "../models/Follow";
/**
 * @file Declares API for Follows related data access object methods
 */

export default interface FollowDaoI {
    userFollowsAnotherUser (uid1:string, uid2:string): Promise<any>;
    userUnfollowsAnotherUser (uid1:string, uid2:string): Promise<any>;
    findAllUsersFollowedByUser (uid:string): Promise<Follow[]>;
    findAllUsersFollower (uid:string): Promise<Follow[]>;
};