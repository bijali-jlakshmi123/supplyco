import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      recentOrders,
      topProducts,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID" },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } }, items: true },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { orderItems: { _count: "desc" } },
        include: { category: true, _count: { select: { orderItems: true } } },
      }),
      prisma.product.findMany({
        where: { stock: { lte: 10 }, isActive: true },
        take: 5,
        orderBy: { stock: "asc" },
      }),
    ]);
    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
      topProducts,
      lowStockProducts,
    };
  } catch {
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
      recentOrders: [],
      topProducts: [],
      lowStockProducts: [],
    };
  }
}

export default async function AdminPage() {
  const stats = await getStats();
  return <AdminDashboardClient stats={stats} />;
}
