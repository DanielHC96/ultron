import mongoose, { ConnectionOptions } from "mongoose";
import { config } from 'dotenv'
config();

const user =process.env.USER;
const pass = process.env.PASS;
const host = process.env.HOST;
const database = process.env.DATABASE;

function connect(): Promise<typeof mongoose> {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
    const uri = `mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`;
    return mongoose.connect(uri, options);
  }

export default { connect };

