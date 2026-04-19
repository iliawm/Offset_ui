import dbConnect from "../../../lib/db";

import Products from "../../../models/Products";
import User from "../../../models/User";
import {NextResponse} from "next/server";



export async function POST(request){
    try {
        await dbConnect()
        const body = await request.json()
        const {name,image,description,creator,category,admin } = body
        
        if (!creator) {
            return Response.json({ error: "Not authenticated" }, { status: 401 });
        }
        if (!admin){
            return NextResponse.json({
                massage:"Not Admin to post",
                
            },{
                staus:400,
            })
        }
        const id = creator.id;
        
        const permission = await User.findById(id)
        const role=permission.role
        if (role !== "admin"){
            return Response.json({
                massage:"Only Admin Can Post Products",
                user:permission._id,
            },{status:400})
        }
        const product = await Products.create({
            name:name,
            image:image,
            description:description,
            category:category,
            creator:creator,
        })

        return Response.json({
            success: true,
            product:product,
        },{status:200})
        
        
    }
    catch (error) {

        console.error("❌ خطا در ایجاد محصول:", error);

        return Response.json(
            {
                success: false,
                message: "خطایی در پردازش درخواست رخ داد",
                error: error.message 
            },
            { status: 500 }
        );
    }
}
export async function GET(request){
    try {
        await dbConnect()
        const products = await Products.find({})
        
        return Response.json({
            success: true,
            products:products,
        },{status:200})


    }
    catch (error) {
        console.error("❌ خطا در حذف محصول:", error);
        return Response.json(
            { success: false, message: "خطایی در حذف رخ داد" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();

        // const body = await request.json()
        // const {name , image, description , ProductPage , category } = body
        // const cname = await Products.find({name})
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        
        if (!id) {
            return Response.json(
                { success: false, message: "شناسه محصول (id) الزامی است" },
                { status: 400 }
            );
        }

        const productToDelete = await Products.findById(id);

        if (!productToDelete) {
            return Response.json(
                { success: false, message: "محصولی با این شناسه یافت نشد" },
                { status: 404 }
            );
        }

      
        await Products.deleteOne({ _id: id });

        console.log(`✅ محصول با ID ${id} با موفقیت حذف شد.`);

        return Response.json(
            {
                success: true,
                message: "محصول حذف شد",
                deletedId: id
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ خطا در حذف محصول:", error);
        return Response.json(
            { success: false, message: "خطایی در حذف رخ داد" },
            { status: 500 }
        );
    }
}
