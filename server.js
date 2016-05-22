'use strict';
var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
// var Firebase = require('firebase');

var app = express();
var server = http.Server(app);

var upload = multer(); // for parsing multipart/form-data

// settings
app.set('json spaces', 4);
app.set('x-powered-by', false);

// middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// static middleware
app.use(express.static(path.join(__dirname, '/')));

// Firebase
// var ref = new Firebase('https://scorching-inferno-8541.firebaseio.com');

// app.post('/profile', upload.array(), function (request, response, next) {
//     console.log(request.body);
//     response.json(request.body);
// });

app.get('/products/all', function(request, response) {
    let products = [
        {
            id: 0,
            name: '商品0', 
            img: 'img/product/PY4194.jpg'
        },
        {
            id: 1,
            name: '商品1', 
            img: 'img/product/PY4195.jpg'
        },
        {
            id: 2,
            name: '商品2', 
            img: 'img/product/PY4196.jpg'
        },
        {
            id: 3,
            name: '商品3', 
            img: 'img/product/PY4197.jpg'
        },
        {
            id: 4,
            name: '商品4', 
            img: 'img/product/PY4198.jpg'
        },
        {
            id: 5,
            name: '商品5', 
            img: 'img/product/PY4199.jpg'
        },
        {
            id: 6,
            name: '商品6', 
            img: 'img/product/PY4200.jpg'
        },
        {
            id: 7,
            name: '商品7', 
            img: 'img/product/PY4201.jpg'
        },{
            id: 8,
            name: '商品8', 
            img: 'img/product/PY4202.jpg'
        },
        {
            id: 9,
            name: '商品9', 
            img: 'img/product/PY4203.jpg'
        },
        {
            id: 10,
            name: '商品10', 
            img: 'img/product/PY4204.jpg'
        },
    ]
    
    response.header('Access-Control-Allow-Origin', '*');    // 允許跨網域存取的網域
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允許跨網域存取的方法
    response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    
    response.json(products);
});

app.get('*', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

var port = 8080 || '3000';
var host = process.env.C9_HOSTNAME || process.env.HOSTNAME || 'localhost';

server.listen(port, function() {
   console.log('server is running on', 'http://' + host + ':' + port); 
});

// ----------------------------------/ express
