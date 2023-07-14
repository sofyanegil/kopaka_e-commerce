import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/TextInput";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";
import { FaBorderAll } from "react-icons/fa6";

export default function Edit() {
    const { errors, category } = usePage().props;
    const [categoryName, setCategoryName] = useState(category.category_name);
    const [categoryDescription, setCategoryDescription] = useState(
        category.category_description
    );
    const [categoryImageURL, setCategoryImageURL] = useState(null);

    const editCategoryHandler = async (e) => {
        e.preventDefault();

        router.post(
            `/admin/categories/${category.category_id}`,
            {
                category_name: categoryName,
                category_description: categoryDescription,
                category_image_url: categoryImageURL,
                _method: "PUT",
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Category Updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    const previewImage = () =>
        (frame.src = URL.createObjectURL(event.target.files[0]));

    return (
        <>
            <Head>
                <title>Edit Category | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaBorderAll />
                            Edit Category
                        </>
                    }
                >
                    <form onSubmit={editCategoryHandler}>
                        <TextInput
                            type={"text"}
                            label={"category name"}
                            placeholder={"Kue"}
                            value={categoryName}
                            onChange={setCategoryName}
                            error={errors.category_name}
                        />
                        <TextInput
                            type={"text"}
                            label={"category description"}
                            placeholder={"Kue Lezat"}
                            value={categoryDescription}
                            onChange={setCategoryDescription}
                            error={errors.category_description}
                        />
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
                                setCategoryImageURL(e.target.files[0]);
                                previewImage();
                            }}
                        />
                        <p
                            className="mt-1 text-sm text-gray-500"
                            id="file_input_help"
                        >
                            PNG or JPG (MAX. 2Mb).
                        </p>
                        {errors.slider_image_url && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.slider_image_url}
                            </div>
                        )}
                        <img
                            id="frame"
                            src={category.category_image_url}
                            className="mt-5 w-full mb-2"
                        />

                        <Button color={"primary"}>Save</Button>
                    </form>
                </Card>
            </LayoutAccount>
        </>
    );
}
