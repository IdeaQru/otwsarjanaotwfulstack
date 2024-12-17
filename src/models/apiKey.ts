import mongoose, { Schema, Document } from 'mongoose';

interface ApiKey extends Document {
  key: string;                // API Key
  userId: string;             // ID pengguna yang membuat API Key
  username: string;           // Username pengguna yang membuat API Key
  email: string;              // Email pengguna yang membuat API Key
  createdAt: Date;            // Waktu pembuatan API Key
}

const apiKeySchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,  // Membuat API Key harus unik
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model untuk ApiKey
const ApiKey = mongoose.model<ApiKey>('ApiKey', apiKeySchema);

export default ApiKey;
