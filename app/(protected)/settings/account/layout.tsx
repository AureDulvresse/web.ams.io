import React from "react";
import Navbar from "@/src/components/partials/navbar";
import UserProfileSidebar from "./_components/user-profile-sidebar";

interface ProtectedLayoutProps {
   children: React.ReactNode;
}

const breadcrumbItems = [
   { href: "/", label: "Accueil" },
   { href: "#", label: "Paramètre" },
   { label: "Mon compte", isCurrent: true },
];

const UserProfileLayout = ({ children }: ProtectedLayoutProps) => {
   return (
      <div className="min-h-screen bg-background">
         <Navbar breadcrumb={breadcrumbItems} />
         <div className="flex h-[calc(100vh-4rem)]">
            <aside className="w-64 border-r shrink-0">
               <div className="sticky top-0 h-full overflow-y-auto">
                  <UserProfileSidebar />
               </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
               <div className="container max-w-6xl py-6 px-2">
                  {children}
               </div>
            </main>
         </div>
      </div>
   );
}

export default UserProfileLayout;