import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links, align }) {
    return (
        <nav>
            <ul
                className={`flex items-center -space-x-px text-base justify-${align}`}
            >
                {links.map((link, index) => (
                    <li
                        className={`flex items-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg ${
                            link.active ? "btn-primary" : "btn-secondary"
                        }`}
                        key={index}
                    >
                        <Link
                            className="page-link"
                            href={link.url === null ? "#" : link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
