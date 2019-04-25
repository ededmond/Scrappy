const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = db => {
    router.post("/article", (req,res) => {
        axios.get(req.body.link).then(response => {
            const $ = cheerio.load(response.data);
            const title = $(".headline").first().children().first().text();
            const image = $("picture").find("img").first().attr("src");
            const category = $(".storytype-label").first().text();
            let body = "";
            if (category !== "News In Photos") {
                body = $(".post-content").first().text().split("Advertisement")[0];
            }
            const date = $(".meta__time").first().attr("datetime");
            const article = {
                title,
                image,
                body,
                category,
                date,
                link: req.body.link
            }
            db.Article.create(article)
            .then(dbArticle => {
                res.json(article);
            })
            .catch(err => {
                res.json(err);
            })
        })
    });

    router.delete("/article/:id",(req,res) => {
        db.Article.remove({_id: req.params.id})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        })
    })

    router.post("/comment/:id",(req,res) => {
        const id = req.params.id;
        const comment = {
            author: req.body.author.trim(),
            body: req.body.body.trim()
        }
        db.Comment.create(comment)
        .then(comment => {
            return db.Article.findOneAndUpdate({_id: id},{$push: {comments:comment._id}},{new:true});
        })
        .then(article => {
            res.json(article);
        })
        .catch(error => {
            res.json(error);
        })
    })

    router.delete("/comment/:id",(req,res) => {
        const id = req.params.id;
        console.log(id);
        db.Comment.remove({_id:id}).then(response => {
            console.log(response);
            res.json(response);
        }).catch(error => {
            res.json(error);
        })
    })
    return router;
}