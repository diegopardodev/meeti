import { redirect } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { signOut } from "@/src/lib/auth-client";

export default function UserMenu() {
    return (
        <Menu as="div" className="relative ml-3">
            <MenuButton className="text-gray-400 relative flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Bars3Icon className='size-6' />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <MenuItem>
                    <a
                        href={`/p`}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        My Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Manage your profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/dashboard/security"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Danger zone
                    </a>
                </MenuItem>
                <MenuItem>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:cursor-pointer"
                        onClick={async () => {
                            await signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        redirect("/auth/sign-in");
                                    }
                                }
                            })
                        }}
                    >
                        Logout
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}