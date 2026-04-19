
import {NextResponse} from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../models/User";
import {getServerSession} from "../../../../lib/aurh-server";
import Products from "../../../../models/Products";


export async function GET(request) {
    try {
        await dbConnect();

        // const session = await getServerSession();


        // if (!session || !session.id) {
        //     return Response.json(
        //         { error: "Not authenticated", message: "لطفاً ابتدا وارد شوید." },
        //         { status: 401 }
        //     );
        // }


        const admins = await User.find({ role: "user" });


        const safeAdmins = admins.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role,

        }));

        return Response.json(
            {
                success: true,
                count: safeAdmins.length,
                data: safeAdmins
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error in AdminPanel API:", error);


        return Response.json(
            {
                error: "Internal server error",
                details: error.message,

            },
            { status: 500 }
        );
    }
}
export async function POST(request) {
    try {
        await dbConnect();


        const body = await request.json();

        const { role, id, email, name, isadmin } = body;


        if (!id) {
            return NextResponse.json(
                { message: "NO ID FOUND", error: true },
                { status: 400 }
            );
        }
        if (!isadmin){
            return NextResponse.json({
                    error:true,
                    massage:"user does not have the sufficient role to change properties"
                },
                {
                    status : 400 }
            )
        }


        const user = await User.findByIdAndUpdate(
            id,
            {
                email,
                name,
                role
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found", error: true },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user: user
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Error in POST AdminPanel:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error.message
            },
            { status: 500 }
        );
    }
}
