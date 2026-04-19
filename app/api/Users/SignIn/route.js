import dbConnect from "../../../../lib/db";
import {NextResponse} from "next/server";
import User from "../../../../models/User";
import {redirect} from "next/navigation";

export async function POST(requset){
    try {
        await dbConnect();
        const body = await requset.json()
        const {email , password} = body
        if(!email || !password)return NextResponse.json(
            {error: 'email and password are required'},
            {status: 400}
        )
        const user = await User.findOne({email:email.toLowerCase()})
        if (!user) return NextResponse.json
        ({error: 'User does not exist'}, {status:401});
        
        if( user.password !== password )return NextResponse.json(
            {error: "Email or password is wrong check your credentials"},
            {status:401}
        );
        const sessionData = JSON.stringify({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            exp: Date.now() + 2 * 60 * 60 * 1000 
        });
        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: { name: user.name, email: user.email, role: user.role }
            },
            { status: 200 }
        );

        // ست کردن کوکی
        response.cookies.set('session', Buffer.from(sessionData).toString('base64'), {
            httpOnly: false,
            maxAge: 60 * 60 * 24, // 24 ساعت
            path: '/'
        });

        return response;

    }catch (error){
        console.error('Sign in error:', error);
        return NextResponse.json(
            { error: 'Failed to sign in' },
            { status: 500 }
        );
    }

    
    }
