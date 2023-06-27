// 스키마에 따른 CRUD 정리

const sql = require('./db.js');

const Betdata = function(bet_data) { // 생성자 
  this.table_id = bet_data.table_id;
  this.seat_no = bet_data.seat_no;
  this.bet_p = bet_data.bet_p;
  this.bet_b = bet_data.bet_b;
  this.bet_t = bet_data.bet_t;
  this.bet_pp = bet_data.bet_pp,
  this.bet_bp = bet_data.bet_bp,
  this.org_amt = bet_data.org_amt,
  this.tie_amt =  bet_data.tie_amt,
  this.pair_amt = bet_data.pair_amt,
  this.org_gbn = bet_data.org_gbn,
  this.tie_gbn = bet_data.tie_gbn,
  this.pair_gbn = bet_data.pair_gbn,
  this.bet_ls = bet_data.bet_ls, // 추가
  this.lucky6_gbn = bet_data.lucky6_gbn,
  this.lucky6_amt = bet_data.lucky6_amt
}


Betdata.create = (newData, result) => {
  sql.query("INSERT INTO BET_DATA SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("Created data: ", {table_id: res.inserttableid, ...newData});
    console.log("Created data: ", {id: res.insertId, ...newData});
    result(null, {id: res.insertId, ...newData});
  })
}

Betdata.getAll = result => {
  sql.query('SELECT * FROM BET_DATA', (err, res) => {
    if(err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("bet_data: ", res);
    result(null, res);
  });
}

Betdata.removeAll = result => {
  sql.query('DELETE FORM BET_DATA', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) { // id 결과가 없을 시 ?
      result({kind: "not_found"}, null);
      return;
    }
    console.log(`deleted ${res.affectedRows} datas`);
    result(null, res);
  });
}

// key 있으면 -> 수정,삭제,조건조회

module.exports = Betdata;