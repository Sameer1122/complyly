import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-slate-50">{children}</main>
      <Footer />
    </div>
  );
}
