import React from "react";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa6";

export default function AddToCart({
    product_id,
    product_variant_id,
    qty,
    onCartAdded,
}) {
    const { auth } = usePage().props;

    const addToCart = () => {
        if (!auth.user) {
            Swal.fire({
                title: "Oopss!",
                text: "Please login!",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
            });

            return router.visit("/login");
        }

        router.post(
            "/carts",
            {
                product_id: product_id,
                product_variant_id: product_variant_id,
                product_quantity: qty,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success!",
                        text: "Add to Cart successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    onCartAdded();
                },
            }
        );
    };

    return (
        <>
            <div className="justify-content-center fixed-bottom">
                <button
                    type="button"
                    onClick={() => addToCart()}
                    className="btn btn-primary flex gap-2 justify-center"
                >
                    <FaCartPlus className="w-5 h-5" />
                    Add to cart
                </button>
            </div>
        </>
    );
}
