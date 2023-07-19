import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import { FaCalendar, FaKey, FaUserPen } from "react-icons/fa6";
import Swal from "sweetalert2";
import LayoutAccount from "../../../Layouts/Account";
import TextInput from "../../../Components/TextInput";
import PasswordInput from "../../../Components/PasswordInput";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import "react-datepicker/dist/react-datepicker.css";

export default function edit() {
    const { errors, user } = usePage().props;
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [phone, setPhone] = useState(user.user_phone);
    const [dob, setDob] = useState(new Date(user.user_dob));
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const editProfileHandler = async (e) => {
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
                        text: "Profile Updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    const updatePasswordHandler = async (e) => {
        e.preventDefault();

        router.patch(
            "/account/profile/password",
            {
                password,
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
                <title>Edit Profile | Kopaka</title>
            </Head>
            <LayoutAccount>
                <div className="flex-wrap">
                    <Card
                        title={
                            <>
                                <FaUserPen />
                                Edit Profile
                            </>
                        }
                    >
                        <form onSubmit={editProfileHandler}>
                            <TextInput
                                type="text"
                                label="name"
                                value={name}
                                onChange={setName}
                                error={errors.user__name}
                            />
                            <TextInput
                                type="email"
                                label="email"
                                value={email}
                                onChange={setEmail}
                                error={errors.user_email}
                            />
                            <TextInput
                                type="number"
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
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-10">
                                    <FaCalendar />
                                </div>
                                <DatePicker
                                    id="dob"
                                    dateFormat="dd MMMM yyyy"
                                    selected={dob}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    minDate={new Date("1945-01-01")}
                                    maxDate={new Date()}
                                    dropdownMode="select"
                                    onChange={(date) => setDob(date)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                />
                            </div>
                            <div className="mt-2">
                                <Button color="success">Save Changes</Button>
                            </div>
                        </form>
                    </Card>
                    <Card
                        title={
                            <>
                                <FaKey />
                                Update Password
                            </>
                        }
                    >
                        <form onSubmit={updatePasswordHandler}>
                            <PasswordInput
                                label="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Password"
                                error={errors.password}
                            />
                            <PasswordInput
                                label="password confirmation"
                                value={passwordConfirmation}
                                onChange={setPasswordConfirmation}
                                placeholder="Confirm Password"
                            />
                            <div className="mt-2">
                                <Button color="success">Change Password</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </LayoutAccount>
        </>
    );
}
