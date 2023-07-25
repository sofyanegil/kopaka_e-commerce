import React from "react";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FaMoneyCheck } from "react-icons/fa6";

export default function StoreCheckout({
    deliveryAreaId,
    storeId,
    deliveryDate,
    deliveryPhone,
    orderNote,
    orderType,
    deliveryAddress,
    deliveryCost,
}) {
    const { dataCarts } = usePage().props;
    //method checkout
    const checkoutHandler = () => {
        router.post(
            "/checkouts",
            {
                delivery_area_id: deliveryAreaId,
                store_id: storeId,
                delivery_date: deliveryDate,
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
                onClick={checkoutHandler}
                className="btn btn-primary border-0 shadow rounded-3 w-100 mb-5 flex items-center justify-center gap-2"
                disabled={dataCarts.total == 0}
            >
                <FaMoneyCheck /> PAY NOW
            </button>
        </>
    );
}
