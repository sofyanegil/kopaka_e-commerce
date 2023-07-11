import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import TextInput from "../../../Components/TextInput";
import Card from "../../../Components/Card";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";
import { FaMapLocation } from "react-icons/fa6";

export default function Edit() {
    const { delivery_area, errors } = usePage().props;
    const [deliveryAreaName, setdeliveryAreaName] = useState(
        delivery_area.delivery_area_name
    );
    const [storeAddress, setstoreAddress] = useState(
        delivery_area.delivery_area_price
    );

    const editDeliveryAreaHandler = (e) => {
        e.preventDefault();
        router.put(
            `/admin/delivery_areas/${delivery_area.delivery_area_id}`,
            {
                delivery_area_name: deliveryAreaName,
                delivery_area_price: storeAddress,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Delivery Area Updated",
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
                <title>Edit Delivery Area | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaMapLocation />
                            Edit Delivery Area
                        </>
                    }
                >
                    <form onSubmit={editDeliveryAreaHandler}>
                        <TextInput
                            placeholder={"Kopaka"}
                            type={"text"}
                            label={"store name"}
                            value={deliveryAreaName}
                            onChange={setdeliveryAreaName}
                            error={errors.delivery_area_name}
                        />
                        <TextInput
                            placeholder={"Jalan"}
                            type={"number"}
                            label={"store adress"}
                            value={storeAddress}
                            onChange={setstoreAddress}
                            error={errors.delivery_area_price}
                        />
                        <Button color={"primary"}>Save</Button>
                    </form>
                </Card>
            </LayoutAccount>
        </>
    );
}
