const express = require('express');
const app = express();

app.set('port', process.env.PORT || 1000);

/*
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});
*/

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


app.get('/GAME_RESULT/:table_id/:seat_no/:bet_p/:bet_b/:bet_t/:bet_pp/:bet_bp', (req, res) => {
  const rq = req.params;
  console.log(rq);

  res.json({'TABLE_ID': rq.table_id,
            'SEAT_NO': rq.seat_no,
            'BET_P': rq.bet_p,
            'BET_B': rq.bet_b,
            'BET_T': rq.bet_t,
            'BET_PP': rq.bet_pp,
            'BET_BP': rq.bet_bp });
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

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
