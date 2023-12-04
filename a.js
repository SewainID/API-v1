const jwt = require("jsonwebtoken");


const user = {id : "asdasd"}
const userencode = jwt.sign(user, "pisang")
console.log(userencode)
const userdecode = jwt.verify(userencode, "pisang")
console.log(userdecode)

