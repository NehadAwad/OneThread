
import express from 'express';
const router = express.Router();

router.get("/test", async (req, res) => {
    return res.status(400).json({ message: "okkk" });
})

export default router;