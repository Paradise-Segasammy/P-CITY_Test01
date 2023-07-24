module.exports = {
  HOST: 'localhost',
  //port,
  USER: 'root',
  PASSWORD: 'Paradise12!@',
  DB: 'HOTEL_INFO',
  //connectionLimit?
}

/* ???
비즈니스 로직에서 호출하는 DB release function 
export const MRDBRelease = async(connection: any) => {
  // return await connection.close();
  return await connection.release();
}
*/