import express from 'express';
import bodyParser  from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo/es5';
import path from 'path';
import config from './modules/config';
import mongoose from './modules/mongoose';
import https from 'https';
import ws from 'ws';
import fs from 'fs';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import apiController from './controllers/api-controller';
import wsModule from './modules/ws/ws-module';

let app = express();
let mongoStore = connectMongo(session);

let key = fs.readFileSync('./server.key');
let cert = fs.readFileSync('./server.crt');

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(session({
    secret: config.get("session:secret"),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
/*-----------------------------------------------*/
app.get('/styles/main.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/app/styles/main.css'));
});

app.get('/admin/styles/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/admin/styles/' + req.params[0]));
});
/*-----------------------------------------------*/
app.get('/admin/templates/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/admin/app/' + req.params[0]));
});
app.get('/js/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/js/' + req.params[0]));
});

app.get(['/admin', '/admin/*'], (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/admin.html'));
});

app.use('/api', apiController);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/site.html'));
});

mongoose.connection.on('open', () => console.log('Connect to DB'));
let server = https.createServer(
    {
        key: key,
        cert: cert
    }, app).listen(config.get('port'));

let wss = new ws.Server({
    server : server,
    path : '/wss'
});

wss.on('connection', (socket) => {
    wsModule.addUser(socket);
});