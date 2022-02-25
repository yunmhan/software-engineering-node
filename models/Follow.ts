import User from "./User";

export default interface Follow{
    userFollowed: User,
    userFollowedBy: User
}