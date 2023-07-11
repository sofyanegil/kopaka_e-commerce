import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import TextInput from "../../../Components/TextInput";
import Card from "../../../Components/Card";
import { FaStore } from "react-icons/fa6";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";

export default function Edit() {
    const { store, errors } = usePage().props;
    console.log(store);
    const [storeName, setstoreName] = useState(store.store_name);
    const [storeAddress, setstoreAddress] = useState(store.store_address);
    const [storePhone, setstorePhone] = useState(store.store_phone);
    const [storeOpen, setstoreOpen] = useState(store.store_open);
    const [storeClose, setstoreClose] = useState(store.store_close);

    const handleEditStore = (e) => {
        e.preventDefault();
        router.put(
            `/admin/stores/${store.store_id}`,
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
                        text: "Store Updated",
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
                <title>Edit Store | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaStore />
                            Edit Store
                        </>
                    }
                >
                    <form onSubmit={handleEditStore}>
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
                        <Button color={"primary"}>Save</Button>
                    </form>
                </Card>
            </LayoutAccount>
        </>
    );
}
