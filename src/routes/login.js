import { Router } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../db/models';

const router = Router();

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ where: {email: req.body.email} });
        console.log(user)
        if (!user) return res.status(400).send("Invalid email or password");
        const token = generateAccessToken(user.dataValues);
        res.json({token});
    } catch (error) {
        res.send("An error occured");
    }
});

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '3360s' });
  }

export default router;
