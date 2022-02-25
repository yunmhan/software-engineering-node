import Tuit from "./Tuit";
import User from "./User";


export default interface Like{
    tuit:Tuit,
    likedBy: User
}