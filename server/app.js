let express = require('express');
let app = express();

app.use(express.static('../app'))

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});