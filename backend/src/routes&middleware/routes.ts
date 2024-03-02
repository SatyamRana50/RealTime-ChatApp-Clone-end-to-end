import {Router} from 'express';
import zod from 'zod';
import { addFriend, createUser, findByUandP, getFriends } from '../db';
import jwt from 'jsonwebtoken';
import { verifyToken } from './middleware';
const jwtSecret:string="mysecretkey";
// import middleware from './middleware';
export const mainRouter=Router();
mainRouter.post("/signup",async(req,res)=>{
    const {username,firstName,lastName,password}=req.body;
    const signupSchema=zod.object({
        username:zod.string().email(),
        firstName:zod.string().min(3).max(50),
        lastName:zod.string().min(3).max(50),
        password:zod.string().min(6)
    });
        const {success}=signupSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({error:"invalid data"});
        }
        try{
            const newUser=await createUser(firstName,lastName,username,password);
            return res.status(200).json({message:"User created successfully"});
        }catch(error){
            return res.status(500).json({error:"user already exists"});
        }
});

mainRouter.use(verifyToken);

mainRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const found_user = await findByUandP(username, password);
        if (found_user) {
            const userId = found_user.id;
            const token = jwt.sign({ userId }, jwtSecret);
            return res.status(200).json({ token:token,
            firstName:found_user.firstName});
        } else {
            return res.status(411).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

mainRouter.get("/friends", async (req:any, res:any) => {
    const friends=await getFriends(parseInt(req.query.userId, 10));
    console.log(friends)
    return res.status(200).json(friends);
}
);

mainRouter.post("/addfriend", async (req:any, res:any) => {
    const {userId,friendId}=req.body;
    await addFriend(userId,friendId);
    return res.status(200).json({message:"Friend added successfully"});
});

