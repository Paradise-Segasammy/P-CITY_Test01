module.exports = app => {
  const betdata = require('../controllers/controller.js');

  app.get('/GAME_RESULT', betdata.findAll);
  
  // 튜플 생성
  app.post('/GAME_RESULT', betdata.create); 
  //app.post('/GAME_RESULT/:table_id/:seat_no', betdata.create); 
}