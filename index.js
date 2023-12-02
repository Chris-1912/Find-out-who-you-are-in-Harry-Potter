import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;


const API_Url = "https://api.potterdb.com/v1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", async(req,res)=>{
    try{ const response1 = await axios.get(API_Url+"characters");
         const characters = response1.data.data;
         const character = characters[Math.floor(Math.random()*characters.length)];
         const imgCha = character.attributes.image;
         while(!imgCha){response1();}

         const response2= await axios.get(API_Url+"potions");
         const potions = response2.data.data;
         const potion = potions[Math.floor(Math.random()*potions.length)];
         const imgPo = potion.attributes.image;
         if(!imgPo){response2();}

         const response3= await axios.get(API_Url+"spells");
         const spells = response3.data.data;
         const spell = spells[Math.floor(Math.random()*spells.length)];
         const imgSpell = spell.attributes.image;
         if(!imgSpell){response3();}

         const response4= await axios.get(API_Url+"books");
         const books = response4.data.data;
         const book = books[Math.floor(Math.random()*books.length)];
         

         const response5= await axios.get(API_Url+"movies");
         const movies = response5.data.data;
         const movie = movies[Math.floor(Math.random()*movies.length)];
         

        res.render("index.ejs", {
            characterName: character.attributes.name, 
            imgCha: imgCha,
            chaWiki: character.attributes.wiki,

            potionName: potion.attributes.name,
            imgPo:imgPo,

            spellName: spell.attributes.name,
            imgSpell:imgSpell,
            spellEffect:spell.attributes.effect,

            movieName: movie.attributes.title,
            imgMovie:movie.attributes.poster,

            bookName: book.attributes.title,      
         });

    }catch(error){
        console.log(error.message);
        res.render("index.ejs", {content: error.message.data});
    }
    
})



app.listen(port,()=>{
    console.log(`Server is running on ${port}.`);
})
