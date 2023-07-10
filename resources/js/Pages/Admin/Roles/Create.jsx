import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, router, usePage } from "@inertiajs/react";
import Card from "../../../Components/Card";
import { FaUserGear } from "react-icons/fa6";
import TextInput from "../../../Components/TextInput";
import Swal from "sweetalert2";
import Button from "../../../Components/Button";

export default function Create() {
    const { errors, permissions } = usePage().props;
    const [roleName, setRoleName] = useState("");
    const [permissionsData, setPermissionsData] = useState([]);

    const handleChekboxChange = (e) => {
        let data = permissionsData;
        if (e.target.checked) {
            data.push(e.target.value);
        } else {
            const index = data.indexOf(e.target.value);
            data.splice(index, 1);
        }
        setPermissionsData(data);
    };

    const storeRole = (e) => {
        e.preventDefault();

        router.post(
            "/admin/roles",
            {
                name: roleName,
                permissions: permissionsData,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Role added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    return (
        <>
            <LayoutAccount>
                <Head>
                    <title>Create Roles | Kopaka</title>
                </Head>
                <Card
                    title={
                        <>
                            <FaUserGear /> Add New Role
                        </>
                    }
                >
                    <form onSubmit={storeRole}>
                        <TextInput
                            type={"text"}
                            label={"role name"}
                            error={errors.name}
                            value={roleName}
                            onChange={setRoleName}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Permissions
                        </label>
                        {errors.permissions && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.permissions}
                            </div>
                        )}
                        <div className="mb-3 flex flex-wrap gap-1">
                            {permissions.map((permission, index) => (
                                <div className="flex items-cente" key={index}>
                                    <input
                                        id={`checkbox-${permission.id}`}
                                        type="checkbox"
                                        value={permission.name}
                                        onChange={handleChekboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                                    />
                                    <label
                                        htmlFor={`checkbox-${permission.id}`}
                                        className="ml-2 text-sm font-medium text-gray-900"
                                    >
                                        {permission.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <Button color={"success"}>Save</Button>
                    </form>
                </Card>
            </LayoutAccount>
        </>
    );
}
