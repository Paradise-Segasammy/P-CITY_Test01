// CRUD 구현

const BetData = require('../models/betdata.model');

// 새 객체 생성 
exports.create = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  };

  const betdata = new BetData ({
    table_id: req.body.table_id,
    seat_no: req.body.seat_no,
    bet_p: req.body.bet_p,
    bet_b: req.body.bet_b,
    bet_t: req.body.bet_t,
    bet_pp: req.body.bet_pp,
    bet_bp: req.body.bet_bp,
    org_amt: req.body.org_amt,
    tie_amt: req.body.tie_amt,
    pair_amt: req.body.pair_amt,
    org_gbn: req.body.org_gbn,
    tie_gbn: req.body.tie_gbn,
    pair_gbn: req.body.pair_gbn,
    bet_ls: req.body.bet_ls, // 추가
    lucky6_gbn: req.body.lucky6_gbn,
    lucky6_amt: req.body.lucky6_amt,
  });

  BetData.create(betdata, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message
      });
    };
  })
}

exports.findAll = (req,res)=> {
  BetData.getAll((err, data) => {
      if (err) {
        res.status(500).send({ message: err.message || "Some error occurred."});
      } else res.send(data);
  });
};

// 나머지 생략