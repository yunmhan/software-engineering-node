import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedBy: {type:Schema.Types.ObjectId, ref:"UserModel"},
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    }, {collection:"bookmarks"});

export default BookmarkSchema;