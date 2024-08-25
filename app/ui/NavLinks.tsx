'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
    { href: "/", text: "Home", icon: "home" },
    { href: "/uuid", text: "UUID", icon: "identification" }
];

export default function NavLinks() {

    const pathname = usePathname();

    return (
        <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                {
                    navLinks.map(({ href, text, icon }) => (
                        <Link key={href} className={`truncate ${pathname === href ? "font-bold}" : ""}`} href={href}>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <img src={`//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/${icon}.svg`} className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">{text}</span>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    );
}