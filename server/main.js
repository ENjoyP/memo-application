// Express Server
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import api from './routes';
/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connection to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/memo');

const app = express();
const port = 3000;
const devPort = 4000;

/* handle error */
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* use session */
app.use(session({
    secret : 'CSH12#$',
    resave : false,
    saveUninitialized : true
}));

app.use(morgan('dev')); // HTTP 요청을 로그하는 미들웨어
app.use(bodyParser.json()); //요청에서 JSON을 파싱할때 사용되는 미들웨어

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.use('/api', api);

app.listen(port, ()=>{
    console.log('Express is listening on port ', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, ()=>{
            console.log('webpack-dev-server is listening on port ', devPort);
        }
    );
}