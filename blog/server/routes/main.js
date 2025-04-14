const express = require('express');
const router = express.Router();


//Routes
router.get("", (req, res) => {
    const locals = {
        title: "Blog",
        description: "Simple blog using node, express, and mongo."
    }

    res.render('index', { locals });
});

router.get("/about", (req, res) => {
    res.render('about');
})

module.exports = router;