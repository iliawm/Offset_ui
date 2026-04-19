import dbConnect from "../../../../lib/db";
import Products from "../../../../models/Products";
import {NextResponse} from "next/server";

export async function POST(request){
    try {
        await dbConnect()
        const body =await request.json()
        const {name,image,description,category,admin,id } = body

        if (!admin) {
            return NextResponse.json({ message: "Not Admin" }, { status: 400 });
        }

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }
        
        const updateData = {};
        if (name) updateData.name = name;
        if (image) updateData.image = image;
        if (description) updateData.description = description;
        if (category) updateData.category = category;

        const data = await Products.findByIdAndUpdate(id,{
            $set:updateData
        },
            {runValidators:true,new:true}
            )
        if (!data) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({
            success:true,
            name:data.name,
            image:data.image,
            description:data.description,
            category:data.category
        })
        
    }catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}
