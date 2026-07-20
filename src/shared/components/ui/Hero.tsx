import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-hero h-150 bg-cover bg-center flex justify-center items-center">
            <div className="flex flex-col justify-center items-center max-w-2xl">
                <h1 className="text-3xl lg:text-4xl text-white uppercase font-black text-center">Find a Meetup or create a community to share what you love most.</h1>
                <Link
                    className="bg-orange-500 hover:bg-orange-600 transition-colors ease-in-out duration-300 text-xl text-white py-3 px-10 mt-5 font-bold"
                    href="/auth/sign-up"
                >Get an account</Link>
            </div>
        </section>
    )
}