import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { EntryModal } from "@/components/entry-modal";
import { getUser } from "@/lib/supabase/server";
import { SWRConfig } from "swr";
import { AuthProvider } from "@/components/auth-provider";

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
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
          }}
        >
          <AuthProvider user={user} />
          <Nav />
          {children}
          <EntryModal />
        </SWRConfig>
      </body>
    </html>
  );
}
