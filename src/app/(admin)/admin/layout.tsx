import React from 'react';
import {getServerAuthSession} from "@/lib/nextauthOptions";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {SidebarProvider} from "@/contexts/SidebarContext";
import BaseLayout from "@/components/AdminPageComponent/BaseLayout";
import ReduxProviders from "@/app/(admin)/admin/AdminReduxProviders";

interface LayoutProps {
    children: React.ReactNode;
};

async function RootLayout({children}: LayoutProps) {
    const session = await getServerAuthSession();
    const header = headers();
    const pathname = header.get("x-pathname");
    if (pathname !== "/admin") {
        if (!session) {
            return redirect('/');
        }
        if (!session.user.role.includes("admin")) {
            return redirect('/');
        }
    }

    return (
       <>
           <ReduxProviders>
               {children}
           </ReduxProviders>
       </>
    );
}

export default RootLayout;