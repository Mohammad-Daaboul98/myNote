const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
mongoose.connect("mongodb+srv://Mohammad:zxc12312zx@cluster0.gmru2.mongodb.net/noteDB",{useNewUrlParser: true });


const noteSchema = {
    title: String,
    content: String
  };

const Notes = mongoose.model("note", noteSchema);


app.delete("/api/delete/:id",function(req,res){
    const id = req.params.id;
    console.log(id);
    Notes.findByIdAndDelete(id,function(err){
        if(!err){
            console.log("the item has been deleted");
        }
    })
})

app.get("/api/get",function(req,res){
    Notes.find({},function(err,foundNote){
        if(!err){
            if(foundNote){
                res.send(foundNote)
            }
        }
    })
});


app.post("/api/insert",function(req,res){
    const title = req.body.title;
    const content = req.body.content;
    // console.log(title + "   " + content);
    Notes.insertMany({title,content},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("seucssfuly inserted");
        }
    })
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}


app.listen(port,function() {
  console.log("Server started on port 3000");
});
