"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [provider, setProvider] = useState(null);
  const [isOpenToggle, setOpenToggle] = useState(false);

  useEffect(() => {
    const setupProvider = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setupProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  type="button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="Profile"
              className="rounded-full hover:cursor-pointer"
              onClick={() => setOpenToggle((prev) => !prev)}
            />

            {isOpenToggle && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setOpenToggle(false)}
                >
                  Profile
                </Link>
                <Link className="dropdown_link" href="/create-prompt">
                  Create Post
                </Link>
                <button
                  className="black_btn w-full"
                  type="button"
                  onClick={() => {
                    signOut();
                    setOpenToggle(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  type="button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
