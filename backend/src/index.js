import express from "express";

const app = express();

app.use("/api/auth", authRoutes)


app.listen(5001, () => {
    console.log('Server running on port 5001')
})