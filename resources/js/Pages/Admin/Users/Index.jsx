import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import Pagination from "../../../Components/Pagination";
import SearchInput from "../../../Components/SearchInput";
import hasAnyPermission from "../../../Utils/Permissions";
import Delete from "../../../Components/Delete";
import Button from "../../../Components/Button";
import { FaUsers, FaPen } from "react-icons/fa6";

export default function Index() {
    const { users } = usePage().props;

    return (
        <>
            <Head>
                <title>Users | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/users" />
                <Card
                    title={
                        <>
                            <FaUsers />
                            Users
                        </>
                    }
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="p-2"
                                        style={{ width: "5%" }}
                                    >
                                        No
                                    </th>
                                    <th scope="col" className="p-2">
                                        Name
                                    </th>
                                    <th scope="col" className="p-2">
                                        Email
                                    </th>
                                    <th scope="col" className="p-2">
                                        role
                                    </th>
                                    <th scope="col" className="p-2 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr
                                        className="bg-white border-b"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="p-3 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {++index +
                                                (users.current_page - 1) *
                                                    users.per_page}
                                        </th>
                                        <td className="p-3">
                                            {user.user_name}
                                        </td>
                                        <td className="p-3">
                                            {user.user_email}
                                        </td>
                                        <td className="p-3">
                                            {user.roles.map((role, index) => (
                                                <span
                                                    className="btn btn-success shadow-sm border"
                                                    key={index}
                                                >
                                                    {role.name}
                                                </span>
                                            ))}
                                        </td>

                                        <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                            {hasAnyPermission([
                                                "users.edit",
                                            ]) && (
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                >
                                                    <Button color={"secondary"}>
                                                        <FaPen />
                                                    </Button>
                                                </Link>
                                            )}
                                            {hasAnyPermission([
                                                "users.delete",
                                            ]) && (
                                                <Delete
                                                    URL={"/admin/users"}
                                                    id={user.id}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={users.links} align={"end"} />
                </Card>
            </LayoutAccount>
        </>
    );
}
