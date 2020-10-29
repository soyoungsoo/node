const express = require('express');
const router = express.Router();

const multer = require('multer');
const memorystorage = multer.memoryStorage();
const upload = multer({ storage: memorystorage });

const fs = require('fs');
const ran_str = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';


router.get('/img', (req,res,next) => {
    let directory = __base + 'directory/photo/';
    res.json(fs.readdirSync(directory));
});

router.post('/img', upload.array('file'), async (req, res, next) => {
    let directory = 'directory/photo/';
    let files = req.files;

    if(files == undefined || files.length == 0){
        throw Error("not exist file");
    }

    req.keys = [];

    for(let f of files){
        let ran_key = true;
        let file_key, root_path, db_path, extension;

        extension = f.originalname.substring(f.originalname.lastIndexOf('.'));

        while(ran_key){
            file_key = '';

            for(let i=0 ; i<20 ; i++){
                let ran = parseInt(Math.random()*ran_str.length);
                file_key += ran_str[ran];
            }

            file_key += extension;

            root_path = __base + directory + file_key;

            ran_key = fs.existsSync(root_path);
        }

        db_path = file_key;

        fs.writeFileSync(root_path, f.buffer);

        req.keys.push(db_path);
    }
    res.json(req.keys);
}, async (err, req, res, next) => {
    if(req.keys.length != 0){
        for(let k of req.keys){
            fs.unlinkSync(__base + k);
        }
    }
    console.log(err);
    throw err;
});

router.delete('/img', (req,res,next) => {
    let { filename } = req.body;
    if(filename == undefined){
        throw new Error("not exist file");
    }

    try {
        fs.unlinkSync(__base + 'directory/photo/' + filename);
    } catch (e) {
        throw new Error("not exist file");
    }

    res.json(true);
});

router.get('/download', (req, res, next) => {
    let upload_folder = __base + 'directory/photo/';
    let q_filename = req.query.filename;
    var file = upload_folder + q_filename;

    try {
        if (fs.existsSync(file)) { // 파일이 존재하는지 체크
            var filename = q_filename.substr(0, q_filename.lastIndexOf("."));
            var mimetype = q_filename.substr(q_filename.lastIndexOf("."));

            res.setHeader('Content-disposition', 'attachment; filename=' + filename + '.' + mimetype); // 다운받아질 파일명 설정
            res.setHeader('Content-type', 'application/octet-stream;charset=utf-8'); // 파일 형식 지정
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            res.send('해당 파일이 없습니다.');
            return;
        }
    } catch (e) { // 에러 발생시
        console.log(e);
        res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
        return;
    }
});
module.exports = router;
