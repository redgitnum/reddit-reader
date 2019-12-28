const express = require('express');
const Snoowrap = require('snoowrap');
const cors = require('cors');

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const r = new Snoowrap({
    userAgent: process.env.SNOO_USER_AGENT,
    clientId: process.env.SNOO_CLIENT_ID,
    clientSecret: process.env.SNOO_CLIENT_SECRET,
    refreshToken: process.env.SNOO_REFRESH_TOKEN
});

app.route('/:sort').get((req, res) => {
    let sort = req.params.sort;
    r[sort]({limit: 50})
        .then(list => {
            res.json(list);
        })
        .catch(err => res.json(err))
})

// app.route('/').get((req, res) => {
//     res.json({hello: 'hello'})
// })

app.route('/more/:sort/:lastPost').get((req, res) => {
    let sort = req.params.sort;
    let last = req.params.lastPost;
    r[sort]({limit: 50, after: last})
        .then(list => {
            res.json(list);
        })
        .catch(err => res.json(err))
})

app.route('/postComments/:id').get((req, res) => {
    let postId = req.params.id;
    r.getContentByIds([postId])[0].comments.fetchAll()
        .then(post => res.json(post))
        .catch(err => res.json(err))
})

app.route('/postBody/:id').get((req, res) => {
    let postId = req.params.id;
    r.getContentByIds([postId])
        .then(post => res.json(post))
        .catch(err => res.json(err))
})
    
app.listen(process.env.PORT || 5000, () => {
    console.log('App running on port 5000');
    
});