import Logo from "../ui/Logo";
import DashboardNavigation from "./DashboardNavigation";

export default function MobileSidebar() {
    return (
        <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
            <div className="relative flex  w-full pt-5 justify-center">
                <div className="w-32">
                    <Logo />
                </div>
            </div>
            <DashboardNavigation />
        </div >
    )
}