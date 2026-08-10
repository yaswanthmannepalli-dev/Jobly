import SiteHeader from "@/components/Header";
import SiteFooter from "@/components/Footer";
import GlobalCursor from "@/components/GlobalCursor";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Global Ribbons Cursor */}
      <GlobalCursor />

      <div className="flex min-h-screen flex-col w-full">
        {/* Navigation */}
        <SiteHeader />

        {/* Page Content */}
        <main className="flex-1 shrink-0">{children}</main>

        {/* Footer */}
        <SiteFooter />
      </div>
    </>
  );
}
