import User from "../../../models/User";
import { cookies } from 'next/headers';
import dbConnect from "../../../lib/db";

export async function POST(request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        const session = JSON.parse(
            Buffer.from(sessionCookie.value, 'base64').toString()
        );

        const id = session.id;
        const body = await request.json();
        const {email , password , phone} = body
        let update ={}
     
        if (email && email !== session.email) {
            update.email = email;
        }

   
        if (phone && phone !== session.phone) {
            update.phone = phone;
        }

        if (password && password !== session.password) {
            update.password = password;
        }


        const user = await User.findByIdAndUpdate(id,
            {$set:update},
            {runValidators: false},
       );
        
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }
        const char ="*"
        const passlen = char.repeat(password.length);

        return Response.json({
            success: true,
            user: {
                passlen:passlen,
                email: user.email,
                phone: user.phone,
                _id:id,

               
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        const session = JSON.parse(
            Buffer.from(sessionCookie.value, 'base64').toString()
        );

        const id = session.id;

        const user = await User.findOne({  _id: id });
        
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }
       const pass = user.password
        const char = "*"
        const len =pass.length
       const passlen= char.repeat(len)
        
        

        return Response.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                _id:id,
                passlen:passlen,
                role : user.role,
                test:session,


            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
