import { Head, usePage } from "@inertiajs/react";
import React from "react";
import LayoutWeb from "../../../Layouts/Web";
import Card from "../../../Components/Card";
import formatPrice from "../../../Utils/FormatPrice";
import Delete from "../../../Components/Delete";
import { FaCakeCandles, FaMoneyBill } from "react-icons/fa6";

export default function Index() {
    const { carts, dataCarts } = usePage().props;

    return (
        <>
            <Head>
                <title>Cart | Kopaka</title>
            </Head>
            <LayoutWeb>
                <div className="container mx-auto px-4 my-5 min-h-[50vh]">
                    <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl mb-4">
                        Shopping Cart
                    </h1>
                    {carts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:my-8">
                                <div className="col-span-2 md:col-span-3">
                                    <Card
                                        title={
                                            <>
                                                <FaCakeCandles /> Items
                                            </>
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {carts.map((cart, index) => (
                                                <Card
                                                    key={index}
                                                    title={
                                                        cart.product
                                                            .product_name
                                                    }
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <img
                                                            src={
                                                                cart.product
                                                                    .product_images[0]
                                                                    ?.product_image_url ??
                                                                "/assets/images/no-image.png"
                                                            }
                                                            alt={
                                                                cart
                                                                    .product_variant
                                                                    .product_variant_name
                                                            }
                                                            className="w-1/2 rounded-md object-cover mr-4"
                                                        />
                                                        <div className="w-1/2 p-1">
                                                            <p className="text-gray-500 text-sm mb-2">
                                                                Variant:{" "}
                                                                {
                                                                    cart
                                                                        .product_variant
                                                                        .product_variant_name
                                                                }
                                                            </p>
                                                            <p className="text-gray-500 text-sm mb-2">
                                                                Price: Rp.{" "}
                                                                {formatPrice(
                                                                    cart
                                                                        .product_variant
                                                                        .product_variant_price
                                                                )}
                                                            </p>
                                                            <p className="text-gray-500 text-sm mb-2">
                                                                Qty:{" "}
                                                                {
                                                                    cart.product_quantity
                                                                }
                                                            </p>
                                                            <p className="font-bold mb-2">
                                                                Total:{" "}
                                                                {formatPrice(
                                                                    cart.total_price
                                                                )}
                                                            </p>
                                                            <Delete
                                                                URL={"/carts"}
                                                                id={
                                                                    cart.cart_id
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <Card
                                        title={
                                            <>
                                                <FaMoneyBill /> Order Summary
                                            </>
                                        }
                                    >
                                        <div className="flex flex-col gap-2 mb-2">
                                            <div className="flex justify-between">
                                                <p className="text-gray-500">
                                                    Total Items
                                                </p>
                                                <p className="font-bold">
                                                    {dataCarts.total} items
                                                </p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-gray-500">
                                                    Subtotal
                                                </p>
                                                <p className="font-bold">
                                                    Rp.{" "}
                                                    {formatPrice(
                                                        dataCarts.price
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <a href="/checkout">
                                            <button className="btn btn-primary flex items-center gap-2">
                                                <FaMoneyBill />
                                                CHECKOUT
                                            </button>
                                        </a>
                                    </Card>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center flex-col">
                            <img
                                src="/assets/images/shopping-cart.png"
                                alt="empty-cart"
                                className="w-[30vh] my-10 "
                            />
                            <h3 className="text-xl font-semibold text-center">
                                Your cart is empty
                            </h3>
                        </div>
                    )}
                </div>
            </LayoutWeb>
        </>
    );
}
