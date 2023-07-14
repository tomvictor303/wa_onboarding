const express = require('express');
const path = require('path');
const app = express();

const port_number = 8010;
const build_dir_path = '/build'; // '../build';

app.use('/onboard', express.static(path.join(__dirname, build_dir_path)));

app.get('/onboard/*', function (req, res) {
  res.sendFile(path.join(__dirname, build_dir_path, 'index.html'));
});

app.listen(port_number);
console.log(`listening on ${port_number}`);