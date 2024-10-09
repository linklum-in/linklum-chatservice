import mongoose, {Schema} from "mongoose";



const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            // unique:true
        },
        name:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        contactNumber:{
            type:String,
        },
        collegeName:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
        },
        location:{
            type:String
        },
        roll:{
            type:String
        },
        branch:{
            type:String,
        },
        state:{
            type:String,
        },
        batch:{
            type:String,
        },
        companyName:{
            type:String,
        },
        jobTitle:{
            type:String,
        },
        connectedUsers:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
            }
        ],
        invitations:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
            }
        ]
    },
    {
        timestamps:true
    }
)

// const User = mongoose.model("User", userSchema);

export default userSchema;