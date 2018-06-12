import path from 'path';
import express from 'express';
import api from './api/api';
import reckonAPI from './api/reckonAPI';

const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

app.use(publicPath);

app.get('/', (req, res) => {
    res.sendFile(indexPath);
})

app.get('/api/test1', function (req, res) {
    reckonAPI.rangeInfo()
        .then(
            results => {
                console.log("/api/test1 ~~~~~~~~~~~~~~~ GET results: ~~~~~~~~~~~~~~~~~");
                console.log(results);
                res.json(results)
            },
            err => res.status(500).send(err)
        );
});

app.get('/api/test2', function (req, res) {
    reckonAPI.search(req.headers)
        .then(
            results => {
                console.log("/api/test2 ~~~~~~~~~~~~~~~ GET results: ~~~~~~~~~~~~~~~~~");
                console.log(results);
                res.json(results)
            },
            err => res.status(500).send(err)
        );
});

export default app;
