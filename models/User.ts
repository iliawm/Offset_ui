import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
    phone: {
        type: String,
        match: /^09\d{9}$/,
        // unique:true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


export default mongoose.models.User || mongoose.model('User', userSchema)
