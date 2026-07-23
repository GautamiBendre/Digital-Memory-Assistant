import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {   name:{
        type :String,
        required :true,
        trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        phone: {
            type: String, //Phone numbers are identifiers, not values you perform calculations on.
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        reminderEnabled: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps:true, //instead of manualy storing createdAt ,updatedAt 
    }
);

const User = mongoose.model("User", userSchema);

export default User;