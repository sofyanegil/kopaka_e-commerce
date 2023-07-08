import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaCakeCandles, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import LayoutAccount from "../../../Layouts/Account";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";

export default function Profile() {
    const { user } = usePage().props;

    return (
        <>
            <Head>
                <title>Profile | Kopaka</title>
            </Head>
            <LayoutAccount>
                <h1 className="text-center font-bold text-3xl">Profile</h1>
                <Card>
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-8">
                            <img
                                className="w-32 h-32 rounded-full object-cover mb-4"
                                src={`https://ui-avatars.com/api/?name=${user.user_name}&background=random&`}
                                alt="Profile Image"
                            />
                            <h2 className="text-xl font-bold">
                                {user.user_name}
                            </h2>
                            <p className="text-gray-500  flex items-center gap-2">
                                <FaRegEnvelope /> {user.user_email}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaPhone /> {user.user_phone}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaCakeCandles />{" "}
                                {new Date(user.user_dob).toLocaleDateString(
                                    "id-ID",
                                    { dateStyle: "long" }
                                )}
                            </p>
                        </div>

                        <div className="flex justify-center gap-2">
                            <Link href="/account/profile/edit">
                                <Button
                                    type="submit"
                                    color="primary"
                                    name="Edit"
                                />
                            </Link>
                        </div>
                    </div>
                </Card>
            </LayoutAccount>
        </>
    );
}
