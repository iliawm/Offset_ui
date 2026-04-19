import { cookies } from 'next/headers';

export async function getServerSession() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return null;
        }

        const decodedValue = decodeURIComponent(sessionCookie.value);

        const session = JSON.parse(
            Buffer.from(decodedValue, 'base64').toString()
        );

        // بررسی انقضا
        if (session.exp && session.exp < Date.now()) {
            return null; // منقضی شده
        }

        return session;
    } catch (error) {
        console.error("Error parsing server session:", error);
        return null;
    }
}
