import { redirect } from "next/navigation";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";

export default async function DashboardPage() {
    const { isAuth } = await requireAuth();
    if (!isAuth) redirect("/auth/sign-in");

    return (
        <>
            <Heading>Admin Panel</Heading>
        </>
    )
}
