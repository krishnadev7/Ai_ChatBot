import { connect, disconnect } from 'mongoose';
async function connectToDatabase() {
    try {
        if (typeof process.env.MONGODB_URL === 'undefined') {
            throw new Error('Environment variable MONGODB_URL is not set.');
        }
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not connect to MongoDB");
    }
}
async function disconnectFromDB() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from DB");
    }
}
export { connectToDatabase, disconnectFromDB };
//# sourceMappingURL=connection.js.map