import User from "./User";

export default class Tuit {
    private tuit: string = '';
    private postedBy: User | null = null;
    private postedOn: Date = new Date();

}
