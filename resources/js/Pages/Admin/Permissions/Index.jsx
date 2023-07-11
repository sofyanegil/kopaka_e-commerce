import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Pagination from "../../../Components/Pagination";
import Card from "../../../Components/Card";
import SearchInput from "../../../Components/SearchInput";
import Button from "../../../Components/Button";
import TextInput from "../../../Components/TextInput";
import { FaPlus, FaShield, FaUserShield } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function Index() {
    const { permissions, errors } = usePage().props;
    const [showAddForm, setShowAddForm] = useState(false);
    const [permissionName, setPermissionName] = useState("");

    const handleToggleForm = () => {
        setShowAddForm(!showAddForm);
        setPermissionName("");
    };

    const handleAddPermission = (e) => {
        e.preventDefault();
        router.post(
            "/admin/permissions",
            { name: permissionName },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Permission added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    return (
        <>
            <Head>
                <title>Permissions | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/permissions" />
                <button
                    onClick={handleToggleForm}
                    className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2"
                >
                    <FaPlus /> Permission
                </button>
                {showAddForm && (
                    <Card
                        title={
                            <>
                                <FaShield />
                                Add New Permission
                            </>
                        }
                    >
                        <form onSubmit={handleAddPermission}>
                            <TextInput
                                placeholder={"Permission Name"}
                                type={"text"}
                                label={"permission"}
                                value={permissionName}
                                onChange={setPermissionName}
                                error={errors.name}
                            />
                            <Button color={"primary"}>Save</Button>
                        </form>
                    </Card>
                )}
                <Card
                    title={
                        <>
                            <FaUserShield /> Permissions
                        </>
                    }
                >
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                        style={{ width: "5%" }}
                                    >
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Permission Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.data.map((permission, index) => (
                                    <tr
                                        className="bg-white border-b "
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {++index +
                                                (permissions.current_page - 1) *
                                                    permissions.per_page}
                                        </th>
                                        <td className="px-6 py-4">
                                            {permission.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={permissions.links} align={"end"} />
                    </div>
                </Card>
            </LayoutAccount>
        </>
    );
}