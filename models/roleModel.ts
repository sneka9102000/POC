import mongoose, { Schema } from 'mongoose';

export interface IRole extends Document {
    role: 'admin' | 'employee' | 'user';
    users: { userid: string; name: string }[]; 
}

const RoleSchema: Schema = new Schema({
  role: { type: String, enum: ['admin', 'employee', 'user'], required: true },
  users: [{ userid: { type: Schema.Types.ObjectId, ref: 'User' }, name: String }]});

export default mongoose.model<IRole>('Role', RoleSchema);
