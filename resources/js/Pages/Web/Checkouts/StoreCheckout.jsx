import React from "react";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function StoreCheckout({
    deliveryAreaId,
    storeId,
    deliveryData,
    deliveryPhone,
    orderNote,
    orderType,
    deliveryAddress,
    deliveryCost,
}) {
    const { dataCarts } = usePage().props;
    //method checkout
    const storeCheckout = () => {
        router.post(
            "/checkouts",
            {
                delivery_area_id: deliveryAreaId,
                store_id: storeId,
                delivery_date: deliveryData,
                delivery_phone: deliveryPhone,
                order_note: orderNote,
                order_type: orderType,
                delivery_address: deliveryAddress,
                grand_total: dataCarts.price + deliveryCost,
                delivery_cost: deliveryCost,
            },
            {
                onSuccess: () => {
                    //show alert
                    Swal.fire({
                        title: "Success!",
                        text: "Checkout successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                },
            }
        );
    };

    return (
        <>
            <button
                onClick={storeCheckout}
                className="btn btn-success btn-md border-0 shadow rounded-3 w-100 mb-5"
                disabled={dataCarts.total == 0}
            >
                BAYAR SEKARANG
            </button>
        </>
    );
}
