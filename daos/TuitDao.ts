/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit"
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Users
 * @property {TuitDao} tuitDao Private single instance of UserDao
 */

export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitsByUser = async (uid:string) : Promise<Tuit[]> =>
        TuitModel.find({postedBy:uid});

    /**
     * Uses TuitModel to retrieve single tuit document from users collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("tuit")
            .exec();

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    async updateTuit(tid:string, tuit:Tuit):Promise<any>{
        return await TuitModel.updateOne({_id:tid},{$set:tuit});
    }
    async deleteTuit(tid:string):Promise<any>{
        return await TuitModel.deleteOne({_id:tid});
    }
}