import Link from "next/link";

export default function GuestNavigation() {
    return (
        <nav className="flex flex-col md:flex-row justify-center items-center gap-4 mt-5 md:mt-0">
            <Link
                className="font-bold text-sm"
                href="/auth/sign-in"
            >Sign In</Link>
            <Link
                className=" font-bold text-sm bg-pink-600 p-2  text-white "
                href="/auth/sign-up"
            >Sign Up</Link>
        </nav>
    )
}
