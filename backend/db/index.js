// backend/db/index.js
const users = [];
const db = {
  findUserByEmail: async (email) => {
    console.log(`[DB] 이메일로 사용자 검색: ${email}`);
    return users.find(user => user.email === email);
  },
  createUser: async (userDetails) => {
    const newUser = { id: Date.now(), ...userDetails };
    users.push(newUser);
    console.log('[DB] 새 사용자 생성 완료:', newUser);
    return newUser;
  }
};
module.exports = db;