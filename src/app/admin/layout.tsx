import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth();

  const config = await prisma.siteConfig.findFirst();
  const logoUrl = config?.logoUrl && config.logoUrl !== "" ? config.logoUrl : "/logo.png";
  const siteName = config?.siteName ?? "AMRT.dev";

  return (
    <div className="min-h-screen bg-surface-950 flex">
      <AdminSidebar logoUrl={logoUrl} siteName={siteName} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
