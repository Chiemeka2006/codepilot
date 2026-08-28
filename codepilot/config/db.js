import mongoose from 'mongoose'

// Called once when the server boots (see server.js). Mongoose queues up any
// model calls made before the connection finishes, so nothing else needs to
// wait on this promise directly.
export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}
