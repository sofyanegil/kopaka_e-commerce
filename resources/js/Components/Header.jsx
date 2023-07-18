import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FaAlignJustify,
    FaCartShopping,
    FaMagnifyingGlass,
} from "react-icons/fa6";
import Button from "./Button";

export default function Header() {
    const {
        url,
        props: { auth, dataCarts },
    } = usePage();

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-white shadow">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <img
                            src="/assets/images/logo.png"
                            className="max-md:h-12 h-14 mx-auto w-full"
                            alt="Kopaka Logo"
                        />
                    </a>
                    <div className="flex items-center md:order-2 gap-3 max-md:gap-2">
                        <a href="/search">
                            <span className="w-5 h-5 text-2xl max-sm:text-xl">
                                <FaMagnifyingGlass />
                            </span>
                        </a>
                        <a href="/carts">
                            <div className="relative">
                                <span className="w-5 h-5 text-2xl max-sm:text-xl">
                                    <FaCartShopping />
                                </span>
                                {dataCarts && (
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white font-bold rounded-full px-2 py-1 text-xs">
                                        {dataCarts.total}
                                    </span>
                                )}
                            </div>
                        </a>
                        {auth.user ? (
                            <>
                                <button
                                    type="button"
                                    className="flex ml-2 mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${auth.user.user_name}&background=random&`}
                                        alt="profile"
                                    />
                                </button>
                                <div
                                    className="z-50 hidden my-4 text-base list-none bg-gray-50 divide-y divide-gray-100 rounded-lg shadow"
                                    id="user-dropdown"
                                >
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 ">
                                            {auth.user.user_name}
                                        </span>
                                        <span className="block text-sm  text-gray-500 truncate">
                                            {auth.user.user_email}
                                        </span>
                                    </div>
                                    <ul
                                        className="py-2"
                                        aria-labelledby="user-menu-button"
                                    >
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            href="/account/profile"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            href="/account/orders"
                                        >
                                            Orders
                                        </a>
                                        <Link
                                            href="/logout"
                                            method="POST"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            as="button"
                                        >
                                            Signout
                                        </Link>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <a href="/login">
                                <Button color="primary">Login</Button>
                            </a>
                        )}
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            aria-controls="navbar-user"
                            aria-expanded="false"
                        >
                            <FaAlignJustify />
                        </button>
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 max-md:fixed max-md:right-0 max-md:top-16"
                        id="navbar-user"
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-b-lg bg-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            <a
                                href="/"
                                className={`block py-2 pl-3 pr-4 md:bg-transparent md:p-0 rounded ${
                                    url === "/"
                                        ? "text-orange-600 font-bold max-md:text-white md bg-orange-600"
                                        : "text-gray-900 "
                                }`}
                            >
                                Home
                            </a>
                            <a
                                href="/products"
                                className={`block py-2 pl-3 pr-4 md:bg-transparent md:p-0 rounded ${
                                    url.startsWith("/products")
                                        ? "text-orange-600 font-bold max-md:text-white md bg-orange-600"
                                        : "text-gray-900 "
                                }`}
                            >
                                Products
                            </a>
                            <a
                                href="/categories"
                                className={`block py-2 pl-3 pr-4 md:bg-transparent md:p-0 rounded ${
                                    url.startsWith("/categories")
                                        ? "text-orange-600 font-bold max-md:text-white md bg-orange-600"
                                        : "text-gray-900 "
                                }`}
                            >
                                Categories
                            </a>
                            <a
                                href="/contacts"
                                className={`block py-2 pl-3 pr-4 md:bg-transparent md:p-0 rounded ${
                                    url.startsWith("/contatcs")
                                        ? "text-orange-600 font-bold max-md:text-white md bg-orange-600"
                                        : "text-gray-900 "
                                }`}
                            >
                                Contacts
                            </a>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
