import mongoose from "mongoose";
import config from "../config";
import { myDataSource } from "../config/ormConfig";

const connectTypeORM = async () => {
  try {
    await myDataSource.initialize();
    console.log("PostgreSQL Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        mongoose.set('autoCreate', true);

        console.log("Mongoose Connected ...");
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export { connectTypeORM, connectMongoDB }