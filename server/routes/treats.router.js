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
router.post('/', (req,res) => {
    let treat = req.body;
    let queryText = `INSERT INTO "treats"( "name", "description", "pic" )
    VALUES($1, $2, $3);`;
    pool.query(queryText, [treat.name, treat.description, treat.pic])
    .then((result)=>{
        console.log('back from POST pg,', result.rows);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error in POST pg', err);
        res.sendStatus(500);
    })
})//end POST

// PUT /treats/<id>

// DELETE /treats/<id>

module.exports = router;
