import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";



// connect to the database
mongoose.connect('mongodb+srv://yunmhan:Hym246494726@cluster0.md46p.mongodb.net/tuiter?retryWrites=true&w=majority');

// mongoose.connect('mongodb://localhost:27017/tuiter');

const app = express();
app.use(express.json());


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const bookmarksController = BookmarkController.getInstance(app);
const followsController = FollowController.getInstance(app);
const messagesController = MessageController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);