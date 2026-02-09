const mongoose = require("mongoose");
const { Schema } = mongoose;

const personalinfo = new Schema({
    firstName: String,
    lastName: String,
    contactNumber: String,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Prefer not to say"]
    },
    dateOfBirth: Date
}, { _id: false });

const workinfo = new Schema({
    occupation: String,
    companyName: String,
    designation: String,
    jobDomain: String,
    workLocation: {
        city: String,
        state: String,
        country: String
    }
}, { _id: false });

const relationSchema = new Schema({
    relation: String, // father, mother, sibling, guardian
    isEmergencyContact: {
        type: Boolean,
        default: false
    },
    personal: personalinfo,
    work: workinfo
}, { _id: false });

module.exports = { personalinfo, workinfo, relationSchema };
