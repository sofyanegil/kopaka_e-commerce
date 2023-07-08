import React, { useState } from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";
import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "../../Components/Button";
import Swal from "sweetalert2";

export default function Login() {
    const { errors } = usePage().props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        router.post(
            "/login",
            {
                user_email: email,
                password: password,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Login success",
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
                <title>Login | Kopaka</title>
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
                            Login
                        </div>
                        <form onSubmit={loginHandler}>
                            <TextInput
                                type={"email"}
                                label="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="jhon@doe.com"
                                error={errors.user_email}
                            />
                            <PasswordInput
                                label="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Password"
                                error={errors.password}
                            />
                            <Button
                                type={"submit"}
                                name={"LOGIN"}
                                color="primary"
                            />
                        </form>
                        <hr className="mt-4" />
                        <div className="text-center mt-4">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-500">
                                Register!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
