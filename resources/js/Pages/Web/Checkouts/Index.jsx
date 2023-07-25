import { Head, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Card from "../../../Components/Card";
import { FaCalendar } from "react-icons/fa6";
import TextInput from "../../../Components/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatPrice from "../../../Utils/FormatPrice";
import LayoutWeb from "../../../Layouts/Web";
import StoreCheckout from "./StoreCheckout";

export default function Index() {
    const { auth, dataCarts, deliveryAreas, stores, errors } = usePage().props;
    const [orderType, setOrderType] = useState("DELIVERY");
    const [deliveryDate, setDeliveryDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        return date;
    });
    const [phone, setPhone] = useState(auth.user.user_phone);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryAreaId, setDeliveryAreaId] = useState(
        deliveryAreas[0]?.delivery_area_id
    );
    const [storeLocationId, setStoreLocationId] = useState(stores[0]?.store_id);
    const [note, setNote] = useState("");
    const [grandTotal, setGrandTotal] = useState(dataCarts.price);
    const [deliveryCost, setDeliveryCost] = useState(0);

    const calculateGrandTotal = () => {
        if (orderType === "DELIVERY") {
            const selectedDeliveryArea = deliveryAreas.find(
                (area) => area.delivery_area_id == deliveryAreaId
            );
            const cost = selectedDeliveryArea
                ? selectedDeliveryArea.delivery_area_price
                : 0;
            setDeliveryCost(cost);
            setGrandTotal(dataCarts.price + cost);
        } else {
            setGrandTotal(dataCarts.price);
            setDeliveryCost(0);
        }
    };

    useEffect(() => {
        calculateGrandTotal();
    }, [orderType, dataCarts, deliveryAreaId]);

    return (
        <>
            <Head>
                <title>Checkout | Kopaka</title>
            </Head>
            <LayoutWeb>
                <div className="container mx-auto px-4 my-5 min-h-[90vh]">
                    <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl mb-4">
                        Order
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:my-8">
                        <div className="col-span-1 md:col-span-3">
                            <Card title={<>Delivery</>}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="order_type"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Order Type
                                    </label>
                                    <select
                                        id="order_type"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                                        value={orderType}
                                        onChange={(e) =>
                                            setOrderType(e.target.value)
                                        }
                                    >
                                        <option value="DELIVERY" key="DELIVERY">
                                            DELIVERY
                                        </option>
                                        <option value="PICKUP" key="PICKUP">
                                            PICKUP
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <TextInput
                                        type="number"
                                        label="phone"
                                        value={phone}
                                        onChange={setPhone}
                                        error={errors.delivery_phone}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="deliveryDate"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Delivery Date
                                    </label>
                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-10">
                                            <FaCalendar />
                                        </div>
                                        <DatePicker
                                            id="deliveryDate"
                                            dateFormat="dd MMMM yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            selected={deliveryDate}
                                            minDate={deliveryDate}
                                            dropdownMode="select"
                                            onChange={(date) =>
                                                setDeliveryDate(date)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5"
                                        />
                                        {errors.delivery_date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.delivery_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {orderType === "DELIVERY" && (
                                    <>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="deliveryArea"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Delivery Area
                                            </label>
                                            <select
                                                id="deliveryArea"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                                                value={deliveryAreaId}
                                                onChange={(e) =>
                                                    setDeliveryAreaId(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {deliveryAreas.map((area) => (
                                                    <option
                                                        value={
                                                            area.delivery_area_id
                                                        }
                                                        key={
                                                            area.delivery_area_id
                                                        }
                                                    >
                                                        {
                                                            area.delivery_area_name
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="deliveryAddress"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Delivery Address
                                            </label>
                                            <textarea
                                                id="deliveryAddress"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                                placeholder="Delivery Address"
                                                value={deliveryAddress}
                                                required
                                                onChange={(e) =>
                                                    setDeliveryAddress(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.delivery_address && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.delivery_address}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                                {orderType === "PICKUP" && (
                                    <>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="storeLocation"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Store Location
                                            </label>
                                            <select
                                                id="storeLocation"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                                                value={storeLocationId}
                                                onChange={(e) =>
                                                    setStoreLocationId(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {stores.map((store) => (
                                                    <option
                                                        value={store.store_id}
                                                        key={store.store_id}
                                                    >
                                                        {store.store_name}
                                                    </option>
                                                ))}
                                            </select>
                                            {storeLocationId && (
                                                <div className="mt-4 bg-slate-50 p-2">
                                                    <p>
                                                        Store Address :{" "}
                                                        {stores.find(
                                                            (store) =>
                                                                store.store_id ==
                                                                storeLocationId
                                                        )?.store_address || ""}
                                                    </p>
                                                    <p>
                                                        Store Hours:{" "}
                                                        {
                                                            stores.find(
                                                                (store) =>
                                                                    store.store_id ==
                                                                    storeLocationId
                                                            )?.store_open
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            stores.find(
                                                                (store) =>
                                                                    store.store_id ==
                                                                    storeLocationId
                                                            )?.store_close
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="mt-4">
                                    <label
                                        htmlFor="note"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Note
                                    </label>
                                    <textarea
                                        id="note"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                        placeholder="Note"
                                        value={note}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <Card title={"Summary"}>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500 text-sm mb-2">
                                        Total Items
                                    </p>
                                    <p className="font-bold mb-2">
                                        {dataCarts.total} Items
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500 text-sm mb-2">
                                        Subtotal
                                    </p>
                                    <p className="font-bold mb-2">
                                        Rp. {formatPrice(dataCarts.price)}
                                    </p>
                                </div>

                                {orderType === "DELIVERY" && (
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-sm mb-2">
                                            Delivery Fee
                                        </p>
                                        <p className="font-bold mb-2">
                                            Rp.{" "}
                                            {formatPrice(
                                                deliveryAreas.find(
                                                    (area) =>
                                                        area.delivery_area_id ==
                                                        deliveryAreaId
                                                )?.delivery_area_price || 0
                                            )}
                                        </p>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500 text-sm mb-2">
                                        Grand Total
                                    </p>
                                    <p className="font-bold mb-2">
                                        Rp. {formatPrice(grandTotal)}
                                    </p>
                                </div>
                            </Card>
                            <div className="mt-2 w-full">
                                <StoreCheckout
                                    deliveryAreaId={deliveryAreaId}
                                    storeId={storeLocationId}
                                    deliveryDate={deliveryDate}
                                    deliveryPhone={phone}
                                    orderNote={note}
                                    orderType={orderType}
                                    deliveryAddress={deliveryAddress}
                                    deliveryCost={deliveryCost}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
