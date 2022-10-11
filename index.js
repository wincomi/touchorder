const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.listen(port, function() {
    console.log('http://localhost:' + port);
});

// 실행 전 client 프로젝트에서 npm run build 하기
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
