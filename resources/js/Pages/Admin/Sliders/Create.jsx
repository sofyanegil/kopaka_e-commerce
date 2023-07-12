import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import Card from "../../../Components/Card";
import { FaImages } from "react-icons/fa6";
import TextInput from "../../../Components/TextInput";
import Button from "../../../Components/Button";

export default function SliderCreate() {
    const { errors } = usePage().props;
    const [sliderImageURL, setSliderImageURL] = useState("");
    const [sliderLink, setSliderLink] = useState("");

    const addSliderHandler = (e) => {
        e.preventDefault();
        router.post(
            "/admin/sliders",
            {
                slider_image_url: sliderImageURL,
                slider_link: sliderLink,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Slider added",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );

        setSliderImageURL(null);
        setSliderLink("");
        frame.src = "";
    };

    const previewImage = () =>
        (frame.src = URL.createObjectURL(event.target.files[0]));

    return (
        <>
            <Card
                title={
                    <>
                        <FaImages />
                        Add New Slider
                    </>
                }
            >
                <form onSubmit={addSliderHandler}>
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
                            setSliderImageURL(e.target.files[0]);
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
                    <img id="frame" src="" className="mt-5 w-full" />

                    <TextInput
                        placeholder={"Link"}
                        type={"link"}
                        label={"slider link"}
                        value={sliderLink}
                        onChange={setSliderLink}
                        error={errors.slider_link}
                    />
                    <Button color={"primary"}>Save</Button>
                </form>
            </Card>
        </>
    );
}
