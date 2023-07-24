import express from 'express';
import Route from './routes/route';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*
app.set('port', process.env.PORT || 1000);


app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
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

let port = 3000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

app.use(Route);

// GET 진입 시 실행
app.get('/', (req, res) => {
  res.json( {message: "hello world!2"} );
});

export default app;