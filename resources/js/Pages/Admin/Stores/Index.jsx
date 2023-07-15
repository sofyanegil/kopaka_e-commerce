import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import hasAnyPermission from "../../../Utils/Permissions";
import Card from "../../../Components/Card";
import Button from "../../../Components/Button";
import TextInput from "../../../Components/TextInput";
import Delete from "../../../Components/Delete";
import Swal from "sweetalert2";
import { FaPen, FaPlus, FaStore } from "react-icons/fa6";

export default function Index() {
    const { stores, errors } = usePage().props;
    const [showAddForm, setShowAddForm] = useState(false);
    const [storeName, setstoreName] = useState("");
    const [storeAddress, setstoreAddress] = useState("");
    const [storePhone, setstorePhone] = useState("");
    const [storeOpen, setstoreOpen] = useState("");
    const [storeClose, setstoreClose] = useState("");

    const toggleFromHandler = () => {
        setShowAddForm(!showAddForm);
        setstoreName("");
        setstoreAddress("");
        setstorePhone("");
        setstoreOpen("");
        setstoreClose("");
    };

    const addStoreHandler = async (e) => {
        e.preventDefault();
        router.post(
            "/admin/stores",
            {
                store_name: storeName,
                store_address: storeAddress,
                store_phone: storePhone,
                store_open: storeOpen,
                store_close: storeClose,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Store added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShowAddForm(!showAddForm);
                },
            }
        );
    };

    return (
        <>
            <Head>
                <title>Stores | Kopaka</title>
            </Head>
            <LayoutAccount>
                <button
                    onClick={toggleFromHandler}
                    className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2"
                >
                    <FaPlus /> Store
                </button>
                {showAddForm && (
                    <Card
                        title={
                            <>
                                <FaStore />
                                Add New Stores
                            </>
                        }
                    >
                        <form onSubmit={addStoreHandler}>
                            <TextInput
                                placeholder={"Kopaka"}
                                type={"text"}
                                label={"store name"}
                                value={storeName}
                                onChange={setstoreName}
                                error={errors.store_name}
                            />
                            <TextInput
                                placeholder={"Jalan"}
                                type={"text"}
                                label={"store adress"}
                                value={storeAddress}
                                onChange={setstoreAddress}
                                error={errors.store_address}
                            />
                            <TextInput
                                placeholder={"022"}
                                type={"text"}
                                label={"store phone"}
                                value={storePhone}
                                onChange={setstorePhone}
                                error={errors.store_phone}
                            />
                            <TextInput
                                placeholder={"08:00"}
                                type={"text"}
                                label={"store open"}
                                value={storeOpen}
                                onChange={setstoreOpen}
                                error={errors.store_open}
                            />
                            <TextInput
                                placeholder={"14:00"}
                                type={"text"}
                                label={"store close"}
                                value={storeClose}
                                onChange={setstoreClose}
                                error={errors.store_close}
                            />
                            <Button color={"success"}>Save</Button>
                        </form>
                    </Card>
                )}
                <Card
                    title={
                        <>
                            <FaStore />
                            Stores
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
                                        Store Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Store Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Store Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Store Open
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Store Close
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.data.map((store, index) => (
                                    <tr
                                        className="bg-white border-b "
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {++index +
                                                (stores.current_page - 1) *
                                                    stores.per_page}
                                        </th>
                                        <td className="px-6 py-4">
                                            {store.store_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {store.store_phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {store.store_address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {store.store_open}
                                        </td>
                                        <td className="px-6 py-4">
                                            {store.store_close}
                                        </td>
                                        <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                            {hasAnyPermission([
                                                "stores.edit",
                                            ]) && (
                                                <Link
                                                    href={`/admin/stores/${store.store_id}/edit`}
                                                >
                                                    <Button color={"secondary"}>
                                                        <FaPen />
                                                    </Button>
                                                </Link>
                                            )}
                                            {hasAnyPermission([
                                                "stores.delete",
                                            ]) && (
                                                <Delete
                                                    URL={"/admin/stores"}
                                                    id={store.store_id}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </LayoutAccount>
        </>
    );
}
