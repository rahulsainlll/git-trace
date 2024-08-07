"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Button } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-20 items-center text-xl justify-between">
      <div className="flex space-x-6">
        <Link href="/">Trace ↯</Link>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={classNames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <Link href="/api/login">
          <Button size="3" color="blue" variant="soft">Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
