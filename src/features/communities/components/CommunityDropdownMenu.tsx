"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { SelectCommunity } from "../types";
import { useCommunityStore } from "../store/community";

type Props = {
    community: SelectCommunity;
}

export default function CommunityDropdownMenu({ community }: Props) {
    const { setOpen, setCommunity } = useCommunityStore();

    return (
        <Menu as="div" className="relative flex-none">
            <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Open Menu</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <MenuItem>
                    <a
                        href={``}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        See members <span className="sr-only">, {community.name}</span>
                    </a>
                </MenuItem>
                <MenuItem>
                    <Link
                        href={`/dashboard/communities/${community.id}/edit`}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        Edit <span className="sr-only">, {community.name}</span>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(true);
                            setCommunity(community);
                        }}
                        className="block text-left w-full px-3 py-1 text-sm/6 text-red-600 data-focus:bg-gray-50 data-focus:outline-hidden cursor-pointer"
                    >
                        Delete<span className="sr-only">, {community.name}</span>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}