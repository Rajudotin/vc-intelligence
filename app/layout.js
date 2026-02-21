import { SidebarProvider } from "./providers";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "VC Intelligence",
  description: "AI-powered venture capital intelligence platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SidebarProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1 relative">
              <Sidebar />
              <main className="flex-1 w-full max-w-full overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}