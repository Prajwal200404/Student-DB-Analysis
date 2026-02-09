
const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { personalinfo, workinfo, relationSchema } = require("./personalinfo");


const personalinfo = new Schema({
    firstName:{type:String,required:true},
    lastName: String,
    contactNumber: String,
    emailId:{type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        immutable:true},
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
    relation: String,        // father, mother, sibling, guardian
    personal: personalinfo,
    work: workinfo
}, { _id: false });


const UserSchema = new Schema({
// IDENTITY 
identity: {
    auth: {
        profile: personalinfo,
        password: {
            type: String,
            required: true
        }
    },
    roles: [{
        name: { type: String },        // student, CR, BR, admin, anything
        scope: { type: String },       // self, batch, branch, global
        referenceId: String            // batchId / branchId
    }],
},


// FAMILY 
family: {
     members: [relationSchema],
},

// ACADEMICS 
academics: {
    branch: { type: String, required: true },
    currentSemester: { type: Number, default: 1 },
    enrollmentNumber: { type: String, unique: true },
    selectedSpecialization: String,
    cgpa: { type: Number, min: 0, max: 10 },

    skills: [{
        name: String,
        proficiency: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"]
        }
    }],

    experience: [{
        role: String,
        company: String,
        startDate: Date,
        endDate: Date,
        isCurrent: Boolean,
        description: String
    }]
},

// SPORTS 
sports: [{
    sportName: String,
    category: { type: String, enum: ["team", "individual"] },
    level: {
        type: String,
        enum: ["college", "district", "state", "national", "international"]
    },
    positionOrRole: String,
    yearsOfExperience: Number,
    achievements: [{
        title: String,
        year: Number
    }],
    isActive: { type: Boolean, default: true }
}],

// CODING 
codingProfiles: [{
    platform: String,
    username: String,
    profileLink: String,
    problemsSolved: { type: Number, default: 0 },
    rating: Number,
    contestsParticipated: Number,
    bestRank: Number,
    lastActive: Date
}],

// CERTIFICATIONS 
certifications: [{
    title: String,
    provider: String,
    type: { type: String },
    domain: String,
    level: String,
    position: String,
    teamBased: Boolean,
    eventYear: Number,
    issueDate: Date,
    credentialUrl: String
}],

// MEDICAL 
medical: {
    bloodGroup: String,
    regularClinic: {
        name: String,
        location: String,
        contactNumber: String
    },
    medicalConditions: [String],
    physicalDisability: { type: Boolean, default: false },
    disabilityDetails: String,
    lastMedicalCheckup: Date,
    emergencyNotes: String
},

// ACCOUNT 
accountStatus: {
    type: String,
    enum: ["active", "suspended", "graduated"],
    default: "active"
}
}, { timestamps: true });

const User=mongoose.model("User",UserSchema);
module.exports=User;