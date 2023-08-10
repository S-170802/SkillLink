import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.router.js";
import gigRoutes from "./routes/gig.router.js";
import reviewRoutes from "./routes/review.route.js";
import orderRoutes from "./routes/order.route.js"
import conversationRoutes from "./routes/conversation.route.js"
import messageRoutes from "./routes/message.route.js";
import cookieparser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();
mongoose.set('strictQuery', true);


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error + "$$");
    }
};

// app.listen(8000, (err) => {
//     connect();
//     if (err) {
//         console.log(err);
//     }
//     console.log("Server is running on port 8000");
// }
// );

app.use(cors({origin:"http://localhost:5173",credentials:true,optionsSuccessStatus:200}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

app.use("/api/users", userRoutes);
app.use("/api/auths", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});