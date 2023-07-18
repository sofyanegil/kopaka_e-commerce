import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { FaCakeCandles, FaStore, FaTruck } from "react-icons/fa6";
import LayoutWeb from "../../../Layouts/Web";
import Slider from "../../../Components/Slider";
import Button from "../../../Components/Button";

export default function Index() {
    const { sliders, categories } = usePage().props;

    return (
        <>
            <Head>
                <title>Kopaka Taarts & Cakes</title>
            </Head>
            <LayoutWeb>
                <div className="w-full bg-black ">
                    <Slider sliders={sliders} />
                </div>
                <div className="container mx-auto px-4 my-5">
                    <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl">
                        Our Menu
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                        {categories.map((category, index) => (
                            <div
                                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                                key={index}
                            >
                                <a
                                    href={`/categories/${category.category_slug}`}
                                >
                                    <img
                                        className="rounded-t-lg h-60 w-full object-cover"
                                        src={category.category_image_url}
                                        alt="x"
                                    />
                                </a>
                                <div className="p-2">
                                    <a
                                        href={`/categories/${category.category_slug}`}
                                    >
                                        <h5 className="btn btn-primary text-center">
                                            {category.category_name}
                                        </h5>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center my-10">
                        <a href="/products">
                            <Button color="primary">SEE MORE</Button>
                        </a>
                    </div>
                </div>
                <section className="bg-gray-200 py-16">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                                <FaCakeCandles className="w-10 h-10" />
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                                    Fresh from the Oven
                                </h5>
                                <p className="-mb-2 font-normal text-gray-500 ">
                                    Experience the irresistible freshness of our
                                    cakes straight from the oven. Indulge in the
                                    delightful flavors of our freshly baked
                                    creations, made with love and delivered with
                                    care.
                                </p>
                            </div>
                            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                                <FaStore className="w-10 h-10" />
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                                    Pickup in Store
                                </h5>
                                <p className="-mb-2 font-normal text-gray-500 ">
                                    Order online, pickup in-store! Enjoy the
                                    convenience of seamless cake shopping by
                                    placing your order on our website and
                                    conveniently collecting it fresh from our
                                    store.
                                </p>
                            </div>
                            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                                <FaTruck className="w-10 h-10" />
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                                    Delivery Service
                                </h5>
                                <p className="-mb-2 font-normal text-gray-500 ">
                                    Reliable delivery to your doorstep. Trust in
                                    the expertise of Kopaka Taarts & Cakes to
                                    bring you our delectable creations with
                                    care, ensuring they arrive fresh and
                                    delightful.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </LayoutWeb>
        </>
    );
}
