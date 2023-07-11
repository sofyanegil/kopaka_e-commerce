import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/TextInput";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function Edit() {
    const { errors, roles, user } = usePage().props;
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [rolesData, setRolesData] = useState(
        user.roles.map((obj) => obj.name)
    );

    const checkboxChangeHandler = (e) => {
        let data = rolesData;
        if (data.some((name) => name === e.target.value)) {
            data = data.filter((name) => name !== e.target.value);
        } else {
            data.push(e.target.value);
        }
        setRolesData(data);
    };

    const editUserHandler = (e) => {
        e.preventDefault();

        router.put(
            `/admin/users/${user.id}`,
            {
                user_name: name,
                user_email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                roles: rolesData,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "User Updated",
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
                <title>Edit User | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaUsers /> Edit User
                        </>
                    }
                >
                    <form onSubmit={editUserHandler}>
                        <TextInput
                            type={"text"}
                            label={"name"}
                            error={errors.user_name}
                            value={name}
                            onChange={setName}
                        />
                        <TextInput
                            type={"text"}
                            label={"email"}
                            error={errors.user_email}
                            value={email}
                            onChange={setEmail}
                        />
                        <PasswordInput
                            label={"Password"}
                            value={password}
                            onChange={setPassword}
                            error={errors.password}
                            placeholder={"********"}
                        />
                        <PasswordInput
                            label={"Password"}
                            value={passwordConfirmation}
                            onChange={setPasswordConfirmation}
                            error={errors.password}
                            placeholder={"********"}
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Roles
                        </label>
                        {errors.roles && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.roles}
                            </div>
                        )}
                        <div className="mb-3 flex flex-wrap gap-1">
                            {roles.map((role, index) => (
                                <div className="flex items-cente" key={index}>
                                    <input
                                        id={`checkbox-${role.id}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        value={role.name}
                                        defaultChecked={rolesData.some(
                                            (name) => name === role.name ?? true
                                        )}
                                        onChange={checkboxChangeHandler}
                                    />
                                    <label
                                        htmlFor={`checkbox-${role.id}`}
                                        className="ml-2 text-sm font-medium text-gray-900"
                                    >
                                        {role.name}
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
