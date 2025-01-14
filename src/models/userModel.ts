import mongoose from "mongoose";

export interface IUser extends Document {
    [x: string]: any;
    username: string;
    email: string;
    password: string;   
    role: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
role: { type: String, enum: ['user', 'admin', 'super-admin'], default: 'user' }, // Default ke 'user'
});
const User = mongoose.model<IUser>('User', userSchema);
export default User