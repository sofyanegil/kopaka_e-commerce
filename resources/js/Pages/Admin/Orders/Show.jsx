import { Head, usePage } from "@inertiajs/react";
import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import formatPrice from "../../../Utils/FormatPrice";
import { FaCakeCandles, FaCartShopping } from "react-icons/fa6";

export default function Show() {
    const { data } = usePage().props;
    const { order, orderDetails, store, deliveryArea } = data;

    return (
        <>
            <Head>
                <title>Order Details | Kopaka</title>
            </Head>

            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaCartShopping />
                            Order Details
                        </>
                    }
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody className="text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <td style={{ width: "15%" }}>NO. ORDER</td>
                                    <td style={{ width: "1%" }}>:</td>
                                    <td className="p-2">
                                        {order.order_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td>NAME</td>
                                    <td>:</td>
                                    <td className="p-2">{data.user}</td>
                                </tr>
                                <tr>
                                    <td>PHONE</td>
                                    <td>:</td>
                                    <td className="p-2">
                                        {order.delivery_phone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ORDER DATE</td>
                                    <td>:</td>
                                    <td className="p-2">{order.order_date}</td>
                                </tr>
                                <tr>
                                    <td>DELIVERY DATE</td>
                                    <td>:</td>
                                    <td className="p-2">
                                        {order.delivery_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td>GRAND TOTAL</td>
                                    <td>:</td>
                                    <td className="p-2">
                                        Rp. {formatPrice(order.grand_total)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>NOTES</td>
                                    <td>:</td>
                                    <td className="p-2">{order.order_note}</td>
                                </tr>
                                <tr>
                                    <td>PAYMENT STATUS</td>
                                    <td>:</td>
                                    <td className="p-2">
                                        {order.payment_status}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ORDER STATUS</td>
                                    <td>:</td>
                                    <td className="p-2">
                                        {order.order_status}
                                    </td>
                                </tr>
                                <tr>
                                    <td>ORDER TYPE</td>
                                    <td>:</td>
                                    <td className="p-2">{order.order_type}</td>
                                </tr>
                                {order.order_type === "PICKUP" && (
                                    <>
                                        <tr>
                                            <td>PICKUP LOCATION</td>
                                            <td>:</td>
                                            <td className="p-2">
                                                {store.store_name}
                                            </td>
                                        </tr>
                                    </>
                                )}

                                {order.order_type === "DELIVERY" && (
                                    <>
                                        <tr>
                                            <td>ADRESS</td>
                                            <td>:</td>
                                            <td className="p-2">
                                                {order.delivery_address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DELIVERY AREA</td>
                                            <td>:</td>
                                            <td className="p-2">
                                                {
                                                    deliveryArea.delivery_area_name
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DELIVERY COST</td>
                                            <td>:</td>
                                            <td className="p-2">
                                                Rp.{" "}
                                                {formatPrice(
                                                    deliveryArea.delivery_area_price
                                                )}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card
                    title={
                        <>
                            <FaCakeCandles />
                            Detail Product
                        </>
                    }
                >
                    <div className="overflow-x-auto">
                        <div className="w-full text-sm text-left text-gray-500">
                            {orderDetails.map((detail, index) => (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4">
                                            <img
                                                src={
                                                    detail.product
                                                        .product_images[0]
                                                        .product_image_url
                                                }
                                                className="w-full rounded-3"
                                                alt={
                                                    detail.product
                                                        .product_images
                                                        .product_image_url
                                                }
                                            />
                                        </div>
                                        <div className="md:w-3/4">
                                            <div className="p-4">
                                                <h4 className="text-xl font-bold mb-4">
                                                    {
                                                        detail.product
                                                            .product_name
                                                    }
                                                </h4>

                                                <div className="flex flex-wrap">
                                                    <div className="w-full md:w-1/2">
                                                        <div>
                                                            Qty :{" "}
                                                            <strong>
                                                                {
                                                                    detail.product_quantity
                                                                }
                                                            </strong>
                                                        </div>
                                                        <div className="mt-3">
                                                            Variant :{" "}
                                                            <strong>
                                                                {
                                                                    detail
                                                                        .product_variant
                                                                        .product_variant_name
                                                                }
                                                            </strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />

                                                <h5>
                                                    Rp.{" "}
                                                    {formatPrice(
                                                        detail.product_variant
                                                            .product_variant_price *
                                                            detail.product_quantity
                                                    )}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </LayoutAccount>
        </>
    );
}
