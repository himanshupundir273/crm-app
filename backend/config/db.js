const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sarvagyasingh4516:himanshuproj@cluster0.lr9gbvv.mongodb.net/Himanshu-Proj?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://himanshu9711:himanshu9711@cluster0.6wgcunh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

module.exports = connectDB;
