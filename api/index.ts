import mongoose from 'mongoose';

const {
    mdb_username,
    mdb_password,
    mdb_cluster,
    mdb_database,
 } = process.env;

const mdb_connection_string = `mongodb+srv://${mdb_username}:${mdb_password}@${mdb_cluster}/${mdb_database}?retryWrites=true&w=majority`;

function initConnection() {
    if(mongoose.connection.db) return;

    mongoose.connect(mdb_connection_string, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', (e) => {
        console.error("MongoDB Error: " + e);
    }).once('open', () => {
        console.log("Connected to Mongo");
    }).on('disconnected', () => {
        console.log("Disconnected from MongoDB");
    });
}

function killConnection() {
    mongoose.connect(mdb_connection_string, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    if(db)
        mongoose.disconnect((e) => {
            console.log("Forced MongoDB Connection Closed:\nError: " + e);
        });
}

if(!mongoose.connection.db)
    initConnection();

export default initConnection;

