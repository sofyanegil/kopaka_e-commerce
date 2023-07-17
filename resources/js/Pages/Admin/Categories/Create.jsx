import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FaBorderAll } from "react-icons/fa6";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/TextInput";
import Button from "../../../Components/Button";

export default function Create() {
    const { errors } = usePage().props;
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryImageURL, setCategoryImageURL] = useState("");

    const addCategoryHandler = async (e) => {
        e.preventDefault();
        router.post(
            "/admin/categories",
            {
                category_name: categoryName,
                category_image_url: categoryImageURL,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Category Added",
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
                <title>Add Category | Kopaka</title>
            </Head>
            <LayoutAccount>
                <Card
                    title={
                        <>
                            <FaBorderAll />
                            Add New Category
                        </>
                    }
                >
                    <form onSubmit={addCategoryHandler}>
                        <TextInput
                            type="text"
                            label="category name"
                            placeholder="Kue"
                            value={categoryName}
                            onChange={setCategoryName}
                            error={errors.category_name}
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
                            PNG or JPG (MAX. 2mb)
                        </p>
                        {errors.category_image_url && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.category_image_url}
                            </div>
                        )}
                        <img id="frame" className="mt-5 w-1/2 mb-2" />
                        <Button color="success">Save</Button>
                    </form>
                </Card>
            </LayoutAccount>
        </>
    );
}
