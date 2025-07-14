import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL).then((res) => {
      console.log("MongoDb Connected Successfully");
    });
  } catch (error) {
    console.log("MongoDb Connection Failed");
    console.log(error);
    mongoose.disconnect();
  }
};
export default ConnectDb;