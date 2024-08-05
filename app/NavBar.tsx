import React from "react";
import Link from "next/link";
import { GoGitMergeQueue } from "react-icons/go";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issue", href: "/issue" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center font-mono">
      <Link href="/">
        <GoGitMergeQueue />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link 
          href={link.href} 
          key={link.href}
          className="text-zinc-500 hover:text-zinc-800"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
