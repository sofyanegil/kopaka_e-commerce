import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links, align }) {
    return (
        <nav>
            <ul
                className={`justify-${align} flex items-center -space-x-px text-base mt-2 gap-1`}
            >
                {links.map((link, index) => (
                    <li
                        className={`flex items-center px-4 h-10 leading-tight border border-gray-300 rounded-lg ${
                            link.active
                                ? "btn-primary font-bold"
                                : "btn-secondary"
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
