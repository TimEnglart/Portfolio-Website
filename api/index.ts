
import { MongoClient, Db, Collection } from 'mongodb';

const {
    mdb_username,
    mdb_password,
    mdb_cluster,
    mdb_database,
 } = process.env;

const mdb_connection_string = `mongodb+srv://${mdb_username}:${mdb_password}@${mdb_cluster}/${mdb_database}?poolSize=20&retryWrites=true&w=majority`;

export class MongoDBHandler {
    public static _instance?: MongoDBHandler;
    public client: MongoClient;
    private _db: Db;

    constructor() {
        this.client = new MongoClient(mdb_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
        this.connect();
    }


    public async connect(): Promise<void> {
        console.log("Hello")
        if(!this.client)
            this.client = new MongoClient(mdb_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await this.client.connect();
            this._db = this.client.db(mdb_database);
            this._db.command({ ping: 1 });
        }
        catch {
            console.error("Failed to Connect to Database");
        }
    }

    static get instance(): MongoDBHandler {
        if(!MongoDBHandler._instance) 
            MongoDBHandler.instance = new MongoDBHandler();
        return MongoDBHandler._instance;
    }
    static set instance(value: MongoDBHandler) {
        MongoDBHandler._instance = value;
    }

    public async collection<T = any>(collectionName: string): Promise<Collection<T>> {
        if(!this.client || !this.client.isConnected())
            await this.connect();
        return this._db.collection<T>(collectionName);
    }



    // Map to Collections in MongoDB
    public static Collections = {
        GithubLanguageStatistics: "github_language_stats",
        GithubRepositories: "github_repos"
    }
}

// const handler = new MongoDBHandler();


export default MongoDBHandler;

