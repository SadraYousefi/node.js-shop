module.exports = {
  EXPIRES_IN: new Date().getTime() + 120000,
  MONGOIDPATTERN : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
  USER_ROLE: Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),
  PERMISSIONS: Object.freeze({
    USER: "user",
    CHAPTER: "chapter",
    COURSE: "course",
    CATEGORY: "category",
    EPISODE: "episode",
    BLOG: "blog",
    PRODUCT: "product",
    SUPER_ADMIN : "superadmin"
  }),
  NOTACCESPTABLEINPUT : [' ' , '' ,'0' , 0 , NaN , undefined , null] ,
};
