const { pool } = require("../../config/database");

exports.updateStudents = async function (
  connection,
  studentIdx,
  studentName,
  major,
  birth,
  address
) {
  // 업데이트할 컬럼들을 보낼수도 있고 안보낼 수도 있다.
  const Query = `update Students set studentName = ifnull(?, studentName), major = ifnull(?, major), birth = ifnull(?, birth), address = ifnull(?, address) where studentIdx = ?;`;
  const Params = [studentName, major, birth, address, studentIdx]; // 물음표 순서에 맞춰 params에 들어갈 값들을 정해줘야함

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.isValidstudentIdx = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Students where studentIdx = ?;`;
  const Params = [studentIdx];

  const [rows] = await connection.query(Query, Params);

  if (rows < 1) {
    return false;
  }
  return true;
};

exports.insertStudents = async function (
  connection,
  studentName,
  major,
  birth,
  address
) {
  const Query = `insert into Students(studentName, major, birth, address) values (?,?,?,?);`;
  const Params = [studentName, major, birth, address];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectStudents = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Students where studentIdx = ?;`;
  // const selectStudentByNameQuery = `SELECT * FROM Students where studentName = ?;`;
  const Params = [studentIdx];

  // studentName에 검색된게 있으면 그 학생 조회, 아니면 모든 학생이 조회
  // let Query = studentName ? selectStudentByNameQuery : selectAllStudentsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Students;`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};
