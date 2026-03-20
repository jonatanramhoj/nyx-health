import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { EntryModal } from "@/components/entry-modal";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NYX",
  description: "Your holistic health partner",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-center bg-no-repeat! bg-cover!"
        style={{
          backgroundImage: "url('/iceland-3.png')",
        }}
      >
        <Nav user={user} />
        {children}
        <EntryModal />
      </body>
    </html>
  );
}
