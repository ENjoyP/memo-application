import express from 'express';
import Account from '../models/account';

const router = express.Router();

/*
    ACCOUNT SIGNUP : POST /api/account/signup
    BODY SAMPLE : { "username" : "test", "password" : "test" }
    ERROR CODE :
        1 : BAD USERNAME
        2 : BAD PASSWORD
        3 : USERNAME EXISTS
*/
router.post('/signup', (req, res) => {
    let usernameRegex = /^[a-z0-9]+$/;
    let p_username = req.body.username;
    let p_password = req.body.password;

    if(!usernameRegex.test(p_username)){
        return res.status(400).json({
            error : "BAD USERNAME",
            code : 1
        });
    }

    if(p_password.length < 4 || typeof p_password !== "string"){
        return res.status(400).json({
            error : "BAD PASSWORD",
            code : 2
        });
    }

    Account.findOne({username : p_username}, (err, exists) => {
        if(err) throw err;
        if(exists){
            return res.status(409).json({
                error : "USERNAME EXISTS",
                code : 3
            });
        }

        // CREATE ACCOUNT
        let account = new Account({
            username : p_username,
            password : p_password
        });

        account.password = account.generateHash(account.password);

        // SAVE IN THE DB
        account.save( err => {
            if(err) throw err;
            return res.json({
                success : true
            });
        });
    });
    
});

/*
    ACCOUNT SIGNIN : POST /api/account/signin
    BODY SAMPLE : { "username" : "test", "password" : "test" }
    ERROR CODES  :
        1 : LOGIN FAILED
*/

router.post('/signin', (req, res) => {
    let p_username = req.body.username;
    let p_password = req.body.password;

    if(typeof p_password !== "string"){
        return res.status(401).json({
            error : "LOGIN FAILED",
            code : 1
        });
    }

    Account.findOne({username : p_username}, (err, account) => {
        if(err) throw err;
        if(!account) {
            return res.status(401).json({
                error : "LOGIN FAILED",
                code : 1
            });
        }

        if(!account.validateHash(p_password)) {
            return res.status(401).json({
                error : "LOGIN FAILED",
                code : 1
            });
        }

        let session = req.session;
        session.loginInfo = {
            _id : account._id,
            username : account.username
        };

        return res.json({
            success : true
        });
    });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getInfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error : 1
        });
    }

    res.json({info : req.session.loginInfo});
});

/*
    LOGOUT : POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ success : true });
});

export default router;