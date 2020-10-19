const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get('/', (req,res) => {
    let queryText = 'SELECT * FROM "treats";';
    pool.query(queryText).then((result) => {
        console.log('result', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log("error with get request", error);
        res.sendStatus(500);
    })
});// end GET


// POST /treats

// PUT /treats/<id>

// DELETE /treats/<id>

module.exports = router;
