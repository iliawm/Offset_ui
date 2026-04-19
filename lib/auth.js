// lib/auth.js
export function getSession() {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split('; ');
    const sessionCookie = cookies.find(row => row.startsWith('session='));

    if (!sessionCookie) return null;

    try {
        // گرفتن مقدار کوکی و URL decode کردن
        const cookieValue = sessionCookie.split('=')[1];
        const decodedValue = decodeURIComponent(cookieValue);

        const session = JSON.parse(
            Buffer.from(decodedValue, 'base64').toString()
        );

        // چک کردن انقضا
        if (session.exp < Date.now()) {
            logout();
            return null;
        }

        return session;
    } catch (e) {
        console.error("Session parse error:", e);
        return null;
    }
}

export function logout() {
    // پاک کردن کوکی
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
}