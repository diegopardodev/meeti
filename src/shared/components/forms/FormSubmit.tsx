import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormSubmit(props: Props) {
    return (
        <button {...props} type="submit" className={clsx("bg-pink-600 hover:bg-pink-700 transition-colors ease-in-out duration-300 w-full p-2 uppercase font-black text-white cursor-pointer mt-5 disabled:bg-pink-700/70 disabled:cursor-not-allowed", props.className)}>
            {props.children}
        </button>
    )
}
