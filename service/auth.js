const sessionIdToUseMap = new Map();  // user state and payload(name,password) store krne k liye h.

function setUser(id, user) {
  sessionIdToUseMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUseMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
