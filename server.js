const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let users = [];
let posts =[];
app.post("/post",(req,res)=> {
    const{user,content}=req.body;
    posts.push({user,content, likes: 0, comments: [] });
    res.send("post added");
});
app.get("/posts",(req,res) => {
    res.json(posts);
});
app.post("/like", (req, res) => {
  const { index } = req.body;
  posts[index].likes++;
  res.send("Liked");
});
app.post("/register",(req,res)=>{
    const{name,email,password}=req.body;
    users.push({name,email,password});
    res.send("user registered successfully");
});
app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    const user = users.find(
    (u) => u.email ===email&&u.password===password
    );
    if(user){
        res.send("login successful");
    }else{
        res.send("invalid credentisals");

    }
});
app.post("/comment", (req, res) => {
  const { index, text } = req.body;
  posts[index].comments.push(text);
  res.send("Comment Added");
});
app.listen(3000,()=>{
    console.log("server running on port 3000");
});