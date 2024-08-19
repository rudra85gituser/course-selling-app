const fs =require("fs");

const jwt =require("jsonwebtoken");

const secret ="superS3cr3t1";


//encrypting
let ans = jwt.sign("abc" , secret);
console.log(ans);
//decrypting
jwt.verify(ans , secret , (err , originalString)=>{
    console.log("asadadsadmk");
    console.log(originalString);
})

//we can encrypt and decrypt the object
let ans2 =jwt.sign({
    username: "Rudra@123",
    password: "123456"
} , secret);
console.log(ans);

jwt.verify(ans , secret , (err , originalstring2)=>{
        console.log("afhsikuf");
        console.log(originalstring2);
})
 