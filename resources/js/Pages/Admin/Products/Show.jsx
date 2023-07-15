import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import Button from "../../../Components/Button";
import { FaImage, FaImages } from "react-icons/fa6";
import Swal from "sweetalert2";
import NoDataFound from "../../../Components/NoDataFound";

export default function Show() {
    const { errors, product } = usePage().props;
    const [productImageUrl, setproductImageUrl] = useState("");

    const uploadImageProductHandler = async (e) => {
        e.preventDefault();
        router.post(
            "/admin/products/store_image_product",
            {
                product_image_url: productImageUrl,
                product_id: product.product_id,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Image Product Added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setproductImageUrl(null);
                    frame.src = "";
                    formFile.value = "";
                },
            }
        );
    };

    const previewImage = () =>
        (frame.src = URL.createObjectURL(event.target.files[0]));

    return (
        <>
            <Head>
                <title>Detail Product | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaImage />
                            Upload Product Image
                        </>
                    }
                >
                    <form onSubmit={uploadImageProductHandler}>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900"
                            htmlFor="file_input"
                        >
                            Upload file
                        </label>
                        <input
                            className={`bg-gray-50 border ${
                                errors.slider_image_url
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            aria-describedby="file_input_help"
                            id="formFile"
                            type="file"
                            onChange={(e) => {
                                setproductImageUrl(e.target.files[0]);
                                previewImage();
                            }}
                        />
                        <p
                            className="mt-1 text-sm text-gray-500"
                            id="file_input_help"
                        >
                            PNG or JPG (MAX. 2mb)
                        </p>
                        {errors.product_image_url && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.product_image_url}
                            </div>
                        )}
                        <img id="frame" src="" className="mt-5 w-full mb-2" />
                        <Button color={"success"}>Save</Button>
                    </form>
                </Card>
                <Card
                    title={
                        <>
                            <FaImages />
                            Product Images
                        </>
                    }
                >
                    {product.product_images.data.length > 0 ? (
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
                                                Product Image
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
                                        {product.product_images.data.map(
                                            (image, index) => (
                                                <tr
                                                    className="bg-white border-b "
                                                    key={index}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {++index +
                                                            (product
                                                                .product_images
                                                                .current_page -
                                                                1) *
                                                                product
                                                                    .product_images
                                                                    .per_page}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={
                                                                image.product_image_url
                                                            }
                                                            alt={
                                                                image.product_image_id
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                                        <Delete
                                                            URL="/admin/products/destroy_image_product"
                                                            id={
                                                                image.product_image_id
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Pagination
                                    links={product.product_images.links}
                                    align={"end"}
                                />
                            </div>
                        </>
                    ) : (
                        <NoDataFound data={"product images"} />
                    )}
                </Card>
            </LayoutAccount>
        </>
    );
}
