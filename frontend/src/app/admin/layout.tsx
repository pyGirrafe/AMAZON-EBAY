import type { Metadata } from "next";

import SideNav from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin Page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex w-1/6"><SideNav /></div>
            <div className="flex w-5/6 p-6">{children}</div>
        </div>
    );
}
