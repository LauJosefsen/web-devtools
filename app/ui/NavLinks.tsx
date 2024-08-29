'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
    { href: "/", text: "Home" },
    { href: "/uuid", text: "UUID" },
    { href: "/json-php", text: "JSON -> PHP array" },
    { href: "/base64", text: "Base 64" },
    { href: "/base64-urlsafe", text: "Base 64 URL-safe"},

];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="lg:sticky p-4 overflow-auto rounded-lg bg-contentBg mb-4 lg:w-[310px]">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                {navLinks.map(({ href, text }) => (
                    <Link key={href} className={`truncate ${pathname === href ? "font-bold" : ""}`} href={href}>
                        <li className="py-2 hover:bg-indigo-300 rounded">
                            <span className="hidden sm:inline">{text}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}