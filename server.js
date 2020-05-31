const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let count = 0;
let bullet_count = 0;
let players = [];
let bullets = [];

const http = require('http').createServer(app);
app.use(express.json())

app.get('/createMap', (req, res) => {

    let grid = new Array(parseInt(req.query.size));
    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(grid.length);
        for (var j = 0; j < grid[i].length; j++) {
            if (i == 0 || j == 0 || i == grid.length - 1 || j == grid[0].length - 1) {
                grid[i][j] = 1;
            } else {
                grid[i][j] = Math.round(Math.random() - 0.30);
            }
        }
    }
    res.send('Player:' + count);
    count++;
    bullets.push(new Array);
    app.get('/getMap', (req, res) => {
        res.send(grid);
    });
});

app.get('/players', (req, res) => {
    var count = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == req.query.id) {
            players[i] = ({
                id: req.query.id,
                x: req.query.x,
                y: req.query.y,
                angle: req.query.angle
            });
            break;
        }
        count++;
    }
    if (players.length == count) {
        players.push({
            id: req.query.id,
            x: req.query.x,
            y: req.query.y,
            angle: req.query.angle
        });
    }

    res.send(players);
});




app.get('/bulletWrite', (req, res) => {
    console.log(req.query.player);
    for (var i = 0; i < bullets.length; i++) {
        if (i != parseInt(req.query.player)) {
            bullets[i].push({
                player: req.query.player,
                x: req.query.x,
                y: req.query.y,
                angle: req.query.angle
            })
        }
    }
    res.status(200);
});

app.get('/bulletRead', (req, res) => {
    res.send(bullets[parseInt(req.query.player)]);
    bullets[parseInt(req.query.player)] = new Array;
});

app.get('/bulletReadAll', (req, res) => {
    res.send(bullets);
});

app.get('/', function (req, res) {
    res.send("Hello");
});

http.listen(process.env.PORT || 8888, function () {
    console.log(`Your port is ${process.env.PORT}`);
});