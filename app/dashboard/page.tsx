import { redirect } from "next/navigation";
import { requireAuth } from "@/src/lib/auth-server";

export default async function DashboardPage() {
    const { isAuth } = await requireAuth();
    if (!isAuth) redirect("/auth/sign-in");

    return (
        <div>DashboardPage</div>
    )
}
