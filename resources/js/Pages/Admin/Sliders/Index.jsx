import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import hasAnyPermission from "../../../Utils/Permissions";
import Card from "../../../Components/Card";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import SliderCreate from "./Create";
import { FaPlus, FaImages } from "react-icons/fa6";
import NoDataFound from "../../../Components/NoDataFound";

export default function Index() {
    const { sliders } = usePage().props;
    const [showAddForm, setShowAddForm] = useState(false);

    const toggleFromHandler = () => {
        setShowAddForm(!showAddForm);
    };

    return (
        <>
            <Head>
                <title>Sliders | Kopaka</title>
            </Head>
            <LayoutAccount>
                <button
                    onClick={toggleFromHandler}
                    className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2"
                >
                    <FaPlus /> Slider
                </button>
                {showAddForm && <SliderCreate />}
                <Card
                    title={
                        <>
                            <FaImages />
                            Sliders
                        </>
                    }
                >
                    {sliders.data.length > 0 ? (
                        <>
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
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Slider Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Slider Link
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sliders.data.map((slider, index) => (
                                            <tr
                                                className="bg-white border-b "
                                                key={index}
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {++index +
                                                        (sliders.current_page -
                                                            1) *
                                                            sliders.per_page}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img
                                                        src={
                                                            slider.slider_image_url
                                                        }
                                                        className="h-auto max-w-lg max-md:w-40 rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {slider.slider_link}
                                                </td>
                                                <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                                    {hasAnyPermission([
                                                        "sliders.delete",
                                                    ]) && (
                                                        <Delete
                                                            URL={
                                                                "/admin/sliders"
                                                            }
                                                            id={
                                                                slider.slider_id
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination
                                    align={"start"}
                                    links={sliders.links}
                                />
                            </div>
                        </>
                    ) : (
                        <NoDataFound data={"slider"} />
                    )}
                </Card>
            </LayoutAccount>
        </>
    );
}
