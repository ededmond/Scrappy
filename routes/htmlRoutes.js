const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = db => {
    router.get("/", (req,res) => {
        axios.get("https://www.theonion.com/").then(response => {
            const $ = cheerio.load(response.data);
            const data = [];
            $("article").each((i, element) => {
                const category = $(element).find(".storytype-label").text();
                //  videos are a different format and not good to display
                if (category !== "Video") {
                    const header = $(element).children("header").first().children().first();
                    const title = $(header).text();
                    const link = $(header).html().split('\"')[1];

                    const date = $(element).children("header").first().children("div").first().children().first().children().html().split('\"')[3];
                    
                    const body =  $(element).children(".item__content").first()
                    const image = body.find("picture").first().children().first().attr("data-srcset");
                    const blurb = body.children(".excerpt").first().text();
                    data.push({title, link, image, blurb,date, index:i, category});
                }
            })
            res.render("index",{article:data});
        }).catch(error => {
            res.json(error);
        })
    })

    router.get("/saved",(req,res) => {
        db.Article.find({}).populate("Comment")
        .then(article => {
            console.log(article);
            res.render("saved",{article});
        })
        .catch(error => {
            res.json(error);
        })
    })

    return router;
}