import DashNav from "@/Components/Ui/DashNav";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="fa">
        <div
            className={`antialiased min-h-screen h-screen overflow-hidden `}
        >
            <DashNav/>
        {children}
        </div>
        </div>
    );
}
