'use client'
import { TokenContext } from "@/context/UserAuth";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {

 const token = useContext(TokenContext);

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          StackVerse
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="btn btn-ghost">
          <div className="w-10">
            <p> {token?.email} </p>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <Link href="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
