const express = require('express');
const router = express.Router();


let apis = [
    'photo',
];


for(let api of apis){
    router.use('/' + api, require('./' + api + '/index'));
}


// router.use((req, res, next) => {
//     res.status(404).json({
//         message: 'API NOT FOUND',
//     });
// });


router.use((err, req, res, next) => {
    console.log(1222222222222222);
    console.error(err);
    res.status(err.status).json( err );
});
module.exports = router;
