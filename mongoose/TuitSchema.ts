import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";


const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: String, required: true},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;