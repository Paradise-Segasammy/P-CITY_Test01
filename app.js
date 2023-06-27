const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// GET 진입 시 실행
app.get('/', (req, res) => {
  res.json({message: "hello world!2"});
});


/*
app.set('port', process.env.PORT || 1000);


app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});


app.get('/', (req, res) => {
  console.log('GET / 요청에서만 실행됩니다.');
  // next();
  res.send('Hello, Express');
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.get('/GAME_RESULT', (req, res) => {
  res.send('GAME RESULT 수집 중 ...');
});



app.get('/sound/:name', (req, res) => {
  //console.log('dog');
  const { name } = req.params;
  const { bet_q } = req.params;

  if (name == 'dog') {
    res.json({ sound: '멍멍' });
  } else if (name == 'cat') {
    res.json({ sound: '야옹' });
  } else {
    res.json({ sound: '알 수 없음' });
  }
  //res.send("<h2>dog</h2>");
});
/*

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

*/
require('./routes/betdata.routes.js')(app);

app.listen(1000, () => {
  console.log('Server is running on port 1000.');
});
