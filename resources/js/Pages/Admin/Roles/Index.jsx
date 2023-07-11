import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Pagination from "../../../Components/Pagination";
import Card from "../../../Components/Card";
import SearchInput from "../../../Components/SearchInput";
import hasAnyPermission from "../../../Utils/Permissions";
import Button from "../../../Components/Button";
import Delete from "../../../Components/Delete";
import { FaPen, FaPlus, FaUserGear } from "react-icons/fa6";

export default function Index() {
    const { roles } = usePage().props;

    return (
        <>
            <Head>
                <title>Roles | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/roles" />
                <Link href="/admin/roles/create">
                    <button className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2">
                        <FaPlus /> Role
                    </button>
                </Link>
                <Card
                    title={
                        <>
                            <FaUserGear />
                            Roles
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
                                        Roles Name
                                    </th>
                                    <th scope="col" className="p-2">
                                        Permissions
                                    </th>
                                    <th scope="col" className="p-2 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.data.map((role, index) => (
                                    <tr
                                        className="bg-white border-b"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="p-3 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {++index +
                                                (roles.current_page - 1) *
                                                    roles.per_page}
                                        </th>
                                        <td className="p-3">{role.name}</td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map(
                                                    (permission, index) => (
                                                        <span
                                                            className="text-xs btn btn-success"
                                                            key={index}
                                                        >
                                                            {permission.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                            {hasAnyPermission([
                                                "roles.edit",
                                            ]) && (
                                                <Link
                                                    href={`/admin/roles/${role.id}/edit`}
                                                >
                                                    <Button color={"secondary"}>
                                                        <FaPen />
                                                    </Button>
                                                </Link>
                                            )}
                                            {hasAnyPermission([
                                                "roles.delete",
                                            ]) && (
                                                <Delete
                                                    URL={"/admin/roles"}
                                                    id={role.id}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={roles.links} align={"end"} />
                </Card>
            </LayoutAccount>
        </>
    );
}
