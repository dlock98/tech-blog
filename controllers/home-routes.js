const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get("/", (req, res) => {  
    Post.findAll({
      attributes: [
          "id", 
          "title", 
          "body", 
          "user_id"],
      include: [
        {
          model: Comment,
          attributes: ["id", "body", "user_id", "post_id"],
          include: {
            model: User,
            attributes: ["id", "username", "email", "password"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((dbPostData) => {
        //passes a single post object into the homepage template
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/', (req, res) => {
    console.log(req.session);
  
    // other logic...
  });

  router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    
    res.render("login");
  });

module.exports = router;