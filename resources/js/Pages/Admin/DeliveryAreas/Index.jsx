import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FaPen, FaPlus, FaMapLocation } from "react-icons/fa6";
import LayoutAccount from "../../../Layouts/Account";
import hasAnyPermission from "../../../Utils/Permissions";
import Card from "../../../Components/Card";
import Button from "../../../Components/Button";
import TextInput from "../../../Components/TextInput";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import SearchInput from "../../../Components/SearchInput";

export default function Index() {
    const { deliveryAreas, errors } = usePage().props;
    const [showAddForm, setShowAddForm] = useState(false);
    const [deliveryAreaName, setdeliveryAreaName] = useState("");
    const [deliveryAreaPrice, setdeliveryAreaPrice] = useState("");

    const toogleFormHandler = () => {
        setShowAddForm(!showAddForm);
        setdeliveryAreaName("");
        setdeliveryAreaPrice("");
    };

    const addDeliveryAreaHandler = async (e) => {
        e.preventDefault();
        router.post(
            "/admin/delivery_areas",
            {
                delivery_area_name: deliveryAreaName,
                delivery_area_price: deliveryAreaPrice,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Delivery area added",
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
                <title>Delivery Area | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL={"/admin/delivery_areas"} />
                <button
                    type="button"
                    onClick={toogleFormHandler}
                    className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2"
                >
                    <FaPlus /> Delivery Area
                </button>
                {showAddForm && (
                    <Card
                        title={
                            <>
                                <FaMapLocation />
                                Add New Delivery Area
                            </>
                        }
                    >
                        <form onSubmit={addDeliveryAreaHandler}>
                            <TextInput
                                placeholder="Buah Batu"
                                type="text"
                                label="delivery area name"
                                value={deliveryAreaName}
                                onChange={setdeliveryAreaName}
                                error={errors.delivery_area_name}
                            />
                            <TextInput
                                placeholder="7500"
                                type="number"
                                label="delivery area price"
                                value={deliveryAreaPrice}
                                onChange={setdeliveryAreaPrice}
                                error={errors.delivery_area_price}
                            />
                            <Button color="success">Save</Button>
                        </form>
                    </Card>
                )}
                <Card
                    title={
                        <>
                            <FaMapLocation /> Delivery Area
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
                                        Delivery Area Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveryAreas.data.map(
                                    (deliveryArea, index) => (
                                        <tr
                                            className="bg-white border-b "
                                            key={index}
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {++index +
                                                    (deliveryAreas.current_page -
                                                        1) *
                                                        deliveryAreas.per_page}
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    deliveryArea.delivery_area_name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    deliveryArea.delivery_area_price
                                                }
                                            </td>
                                            <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                                {hasAnyPermission([
                                                    "deliveryAreas.edit",
                                                ]) && (
                                                    <Link
                                                        href={`/admin/delivery_areas/${deliveryArea.delivery_area_id}/edit`}
                                                    >
                                                        <Button color="secondary">
                                                            <FaPen />
                                                        </Button>
                                                    </Link>
                                                )}
                                                {hasAnyPermission([
                                                    "deliveryAreas.delete",
                                                ]) && (
                                                    <Delete
                                                        URL="/admin/delivery_areas"
                                                        id={
                                                            deliveryArea.delivery_area_id
                                                        }
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                        <Pagination links={deliveryAreas.links} align={"end"} />
                    </div>
                </Card>
            </LayoutAccount>
        </>
    );
}
