import { any } from '@hapi/joi';
import mongoose, { Schema, Document } from 'mongoose';

interface IAddress {
  _id?: any;
  address: string;
  state: string;
  city: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  residential_address: IAddress; 
  role: string; 
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  residential_address: {
    _id: false,
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
  role: { type: String, required: true },
});

export default mongoose.model<IUser>('Users', UserSchema);
