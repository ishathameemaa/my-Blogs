import mongoose from "mongoose";
export  const ConnectDB = async () =>{
  await mongoose.connect('mongodb+srv://My-Blog:Ass9A90ZgflhVQ0d@cluster0.sn1fs.mongodb.net/blog-ones ')

  console.log("DB Connected")
}

