import React, { useState } from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";
import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";

export default function Register() {
    const { errors } = usePage().props;

    // state user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();
        router.post("/register", {
            user_name: name,
            user_email: email,
            user_phone: phone,
            password: password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <>
            <Head>
                <title>Register | Kopaka</title>
            </Head>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md max-md:w-11/12">
                    <Link href="/">
                        <img
                            src="./assets/images/logo.png"
                            alt="Kopaka Logo"
                            className="mx-auto mb-2 w-64 max-md:w-44"
                        />
                    </Link>
                    <div className="flex flex-col break-words bg-white border shadow-md p-6 rounded-xl">
                        <div className="font-semibold text-gray-700 py-2 text-center text-3xl max-md:text-2xl">
                            Create account
                        </div>
                        <form onSubmit={registerHandler}>
                            <TextInput
                                type={"text"}
                                label="name"
                                value={name}
                                onChange={setName}
                                placeholder="Jhon Doe"
                                error={errors.user_name}
                            ></TextInput>
                            <TextInput
                                type={"email"}
                                label="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="jhon@doe.com"
                                error={errors.user_email}
                            ></TextInput>
                            <TextInput
                                type={"number"}
                                label="phone number"
                                value={phone}
                                onChange={setPhone}
                                placeholder="08888"
                                error={errors.user_phone}
                            ></TextInput>
                            <PasswordInput
                                label="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Password"
                                error={errors.password}
                            ></PasswordInput>
                            <PasswordInput
                                label="password confirmation"
                                value={passwordConfirmation}
                                onChange={setPasswordConfirmation}
                                placeholder="Confirm Password"
                            ></PasswordInput>
                            <Button
                                type={"submit"}
                                name={"REGISTER"}
                                color="primary"
                            />
                        </form>
                        <hr className="mt-4" />
                        <div className="text-center mt-4">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500">
                                Login!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
