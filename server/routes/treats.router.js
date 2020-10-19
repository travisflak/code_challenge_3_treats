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

// PUT /treats/<id> -- PUT /treats/<id>` updates the treat description (the edit button is also 
// displayed with the Mode Toggle button)
router.put('/:idParam', (req,res) => {
    let param=req.params.idParam;
    let queryText= `UPDATE "treats" SET "description" = 'modeToggle'
    WHERE "id" = $1;`;
    pool.query(queryText, [param])
    .then((result) => {
        console.log('in PUT request', req.params.idParam);
        res.sendStatus(200);
    }).catch((err) => {
        console.log('error in PUT pg', err);
        res.sendStatus(500);
    })
})//end PUT


// DELETE /treats/<id>`
router.delete('/:idParam', (req,res) => {
    let param=req.params.idParam;
    let queryText= `DELETE FROM "treats" WHERE "id" = $1;`;
    pool.query(queryText, [param])
    .then((result) => {
        console.log('in DELETE request', req.params.idParam);
        res.sendStatus(200);
    }).catch((err) => {
        console.log('error in DELETE pg', err);
        res.sendStatus(500);
    })
})//end DELETE

module.exports = router;
