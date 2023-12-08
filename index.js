import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port = 3000;



const API_Url = "https://api.potterdb.com/v1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.post("/answer", async(req,res)=>{
    try {
        const response1 = await axios.get(API_Url + "characters");
        const characters = response1.data.data;
        let character = characters[Math.floor(Math.random() * characters.length)];
        let imgCha = character.attributes.image;
    
        while (!imgCha) {
          const response2 = await axios.get(API_Url + "characters");
          const characters2 = response2.data.data;
          character = characters2[Math.floor(Math.random() * characters2.length)];
          imgCha = character.attributes.image;
        }
 

        res.render("answer.ejs", {
            characterName: character.attributes.name, 
            imgCha: imgCha,
            Alias_names: character.attributes.alias_names,
            Patronus:character.attributes.patronus,
            Animagus: character.attributes.animagus,
            Boggart: character.attributes.boggart,
            Jobs:character.attributes.jobs,
            Wands:character.attributes.wands,
            Eye_color: character.attributes.eye_color,
            Hair_color: character.attributes.hair_color,
            House:character.attributes.houe, 
            Family_members: character.attributes.family_members,
            Romances:character.attributes.romances,        
            
         });

    }catch(error){
        console.log(error.message);
        res.render("index.ejs", {content: error.message.data});
    }
    
})



app.listen(port,()=>{
    console.log(`Server is running on ${port}.`);
})
