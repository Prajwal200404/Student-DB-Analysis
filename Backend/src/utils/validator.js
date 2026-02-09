const validator=require('validator');
const validate=(data)=>
{
    if (!data || typeof data !== "object") {
        throw new Error("Request body is missing or invalid");
    }
    const mandatoryfield=["firstName","emailId","password"];
    const isAllowed=mandatoryfield.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed)
        throw new Error ("Field is missing");
    if(!validator.isEmail(data.emailId))
        throw new Error("Email is not valid");
}

module.exports=validate;
