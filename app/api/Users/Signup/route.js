import dbConnect from "@/lib/db";
import {NextResponse} from "next/server";
import User from "../../../../models/User";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, password, phone } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { phone: phone }]
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email or phone already exists' },
                { status: 409 }
            );
        }

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            phone,
            role: 'user'
        });

        const sessionData = JSON.stringify({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            exp: Date.now() + 2 * 60 * 60 * 1000
        });

        const response = NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );

        response.cookies.set('session', Buffer.from(sessionData).toString('base64'), {
            httpOnly: false,
            maxAge: 60 * 60 * 24, // 24 ساعت
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
