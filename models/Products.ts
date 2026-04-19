import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        minimum:5,
        maximum:20,
    },
    category:{
        type:String,
        enum:["product","service"],
        default:"product",
        required:true
    },
        creator: {
            type: mongoose.Schema.Types.Mixed,
            ref: "User",
            required: true
        }
}
)

export default mongoose.models.Products || mongoose.model("Products" , ProductSchema)
