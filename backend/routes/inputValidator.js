const zod=require("zod");
const schema1=zod.object({
    username:zod.string().min(3).max(50),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50),
    password:zod.string().min(3).max(20)
})
const schema2=zod.object({
    username:zod.string().min(3).max(50),
    password:zod.string().min(3).max(20)
})
const schema3=zod.object({
    password:zod.string().min(3).max(20).optional(),
    firstName:zod.string().max(50).optional(),
    lastName:zod.string().max(50).optional()
})
module.exports={"schema1":schema1,"schema2":schema2,"schema3":schema3};