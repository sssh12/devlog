import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "DevLog",
  description: "A simple dev log with Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* AuthProvider로 전체를 감싸서 세션 정보를 공유 */}
        <AuthProvider>
          <div className="max-w-3xl mx-auto p-4">
            <Header />
            <main className="py-8">{children}</main>
            <footer className="text-center border-t py-4 text-gray-500">
              @ 2025 DevLog
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
