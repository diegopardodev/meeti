import Link from "next/link";

export default function UserNavigation() {
    return (
        <nav className="flex justify-center items-center mt-5 md:mt-0">
            <Link
                href="/dashboard"
                className="text-center text-white font-bold text-sm md:text-base py-2 px-5 bg-pink-500 hover:bg-pink-600 hover:cursor-pointer block w-full transition-colors ease-in-out duration-300"
            >Admin panel</Link>
        </nav>
    )
}
