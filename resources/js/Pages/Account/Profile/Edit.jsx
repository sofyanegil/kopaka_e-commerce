import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import LayoutAccount from "../../../Layouts/Account";
import TextInput from "../../../Components/TextInput";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";

export default function edit() {
    const { errors, user } = usePage().props;
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [phone, setPhone] = useState(user.user_phone);
    const [dob, setDob] = useState(new Date(user.user_dob));
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    console.log(errors);
    const updateProfile = (e) => {
        e.preventDefault();

        router.patch(
            "/account/profile/update",
            {
                user_name: name,
                user_email: email,
                user_phone: phone,
                user_dob: dob.toISOString().split("T")[0],
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Profile updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    const updatePassword = (e) => {
        e.preventDefault();

        router.patch(
            "/account/profile/password",
            {
                password: password,
                password_confirmation: passwordConfirmation,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Password updated successfully",
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
                <title> Edit Profile | Kopaka</title>
            </Head>
            <LayoutAccount>
                <h1 className="text-center font-bold text-3xl">Edit Profile</h1>
                <div className="flex-wrap">
                    <Card>
                        <form onSubmit={updateProfile}>
                            <TextInput
                                type={"text"}
                                label="name"
                                value={name}
                                onChange={setName}
                                error={errors.user__name}
                            />
                            <TextInput
                                type={"email"}
                                label="email"
                                value={email}
                                onChange={setEmail}
                                error={errors.user_email}
                            />
                            <TextInput
                                type={"number"}
                                label="phone"
                                value={phone}
                                onChange={setPhone}
                                error={errors.user_phone}
                            />
                            <label
                                htmlFor="dob"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Birthday
                            </label>
                            <DatePicker
                                id="dob"
                                locale="id-ID"
                                dateFormat="dd MMMM yyyy"
                                selected={dob}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                minDate={new Date("1945-01-01")}
                                maxDate={new Date()}
                                dropdownMode="select"
                                onChange={(date) => setDob(date)}
                                className="bg-gray-50 border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5"
                            />
                            <div className="mt-2">
                                <Button color="success" name="Save Changes" />
                            </div>
                        </form>
                    </Card>
                    <Card>
                        <form onSubmit={updatePassword}>
                            <TextInput
                                type="password"
                                label="New Password"
                                value={password}
                                onChange={setPassword}
                                error={errors.password}
                            />
                            <TextInput
                                type="password"
                                label="Confirm Password"
                                value={passwordConfirmation}
                                onChange={setPasswordConfirmation}
                                error={errors.password}
                            />
                            <div className="mt-2">
                                <Button
                                    color="success"
                                    name="Change Password"
                                />
                            </div>
                        </form>
                    </Card>
                </div>
            </LayoutAccount>
        </>
    );
}