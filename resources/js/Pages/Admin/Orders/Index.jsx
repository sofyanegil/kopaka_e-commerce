import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import SearchInput from "../../../Components/SearchInput";
import Pagination from "../../../Components/Pagination";
import hasAnyPermission from "../../../Utils/Permissions";
import Button from "../../../Components/Button";
import { FaCartShopping, FaEye, FaPen } from "react-icons/fa6";
import getColorStatus from "../../../Utils/GetColorStatus";
import formatDate from "../../../Utils/FormatDate";
import { data } from "autoprefixer";
import NoDataFound from "../../../Components/NoDataFound";

export default function Index() {
    const { orders } = usePage().props;

    return (
        <>
            <Head>
                <title>Orders | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/orders" />
                <Card
                    title={
                        <>
                            <FaCartShopping />
                            Orders
                        </>
                    }
                >
                    {orders.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="p-2"
                                                style={{ width: "5%" }}
                                            >
                                                No
                                            </th>
                                            <th scope="col" className="p-2">
                                                Name
                                            </th>
                                            <th scope="col" className="p-2">
                                                Order Number
                                            </th>
                                            <th scope="col" className="p-2">
                                                Order Date
                                            </th>
                                            <th scope="col" className="p-2">
                                                Delivery Date
                                            </th>
                                            <th scope="col" className="p-2">
                                                Order Type
                                            </th>
                                            <th scope="col" className="p-2 ">
                                                Payment Status
                                            </th>
                                            <th scope="col" className="p-2 ">
                                                Order Status
                                            </th>
                                            <th scope="col" className="p-2 ">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order, index) => (
                                            <tr
                                                className="bg-white border-b border-gray-400"
                                                key={index}
                                            >
                                                <th
                                                    scope="row"
                                                    className="p-3 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {++index +
                                                        (orders.current_page -
                                                            1) *
                                                            orders.per_page}
                                                </th>
                                                <td className="p-3">
                                                    {order.user.user_name}
                                                </td>
                                                <td className="p-3">
                                                    {order.order_number}
                                                </td>
                                                <td className="p-3">
                                                    {formatDate(
                                                        order.order_date
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    {formatDate(
                                                        order.delivery_date
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`p-1 px-2 rounded-full ${getColorStatus(
                                                            order.order_type
                                                        )}`}
                                                    >
                                                        {order.order_type}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`p-1 px-2 rounded-full ${getColorStatus(
                                                            order.payment_status
                                                        )}`}
                                                    >
                                                        {order.payment_status}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`p-1 px-2 rounded-full ${getColorStatus(
                                                            order.order_status
                                                        )}`}
                                                    >
                                                        {order.order_status}
                                                    </span>
                                                </td>
                                                <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                                    {hasAnyPermission([
                                                        "orders.show",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/orders/${order.order_number}`}
                                                        >
                                                            <Button
                                                                color={
                                                                    "success"
                                                                }
                                                            >
                                                                <FaEye />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission([
                                                        "orders.edit",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/orders/${order.order_number}/edit`}
                                                        >
                                                            <Button
                                                                color={
                                                                    "secondary"
                                                                }
                                                            >
                                                                <FaPen />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={orders.links} align={"end"} />
                        </>
                    ) : (
                        <NoDataFound data={"order"} />
                    )}
                </Card>
            </LayoutAccount>
        </>
    );
}
