"use client";
import { SignInButton, SignUpButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { RssIcon } from "lucide-react";

const Header = () => {
  const { isSignedIn } = useSession();

  return (
    <header className="bg-[#2E7D32] shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="flex text-xl font-bold text-gray-900 gap-2">
                ConnectTree
                <RssIcon />
              </span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <SignInButton>
                  <button className=" hover:text-gray-800 font-medium">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
