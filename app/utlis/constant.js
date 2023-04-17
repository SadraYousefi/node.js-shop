module.exports = {
  EXPIRES_IN: new Date().getTime() + 120000,
  MONGOIDPATTERN : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
  USER_ROLE: {
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  },
};
