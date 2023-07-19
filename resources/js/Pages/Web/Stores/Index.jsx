import { Head, usePage } from "@inertiajs/react";
import React from "react";
import LayoutWeb from "../../../Layouts/Web";

export default function Index() {
    const { stores } = usePage().props;
    const data = [
        {
            url: "/assets/images/kopaka.jpg",
            map: "https://goo.gl/maps/Wkr2qK1GCGJq4PAP7",
        },
        {
            url: "/assets/images/kopaka-my.jpg",
            map: "https://goo.gl/maps/Nyua6jAi46MZgCdW9",
        },
        {
            url: "/assets/images/kopaka-paskal.jpg",
            map: "https://goo.gl/maps/k4Q2evxikHC2xD169",
        },
    ];
    return (
        <>
            <Head>
                <title>Stores | Kopaka Taarts & Cakes</title>
            </Head>
            <LayoutWeb>
                <div className="container mx-auto px-4 my-5 min-h-[50vh]">
                    <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl">
                        Store Location
                    </h1>

                    <div className="grid grid-cols-1 gap-4 my-10 item-center">
                        {stores.map((store, index) => (
                            <a
                                href={data[index].map}
                                class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 mx-auto"
                                target="_blank"
                            >
                                <img
                                    class="object-fill w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-l-lg"
                                    src={data[index].url}
                                    alt=""
                                />
                                <div class="flex flex-col justify-between p-4 leading-normal">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                        {store.store_name}
                                    </h5>
                                    <p class="mb-3 font-normal text-gray-700 ">
                                        {store.store_address}
                                    </p>
                                    <p class="mb-3 font-normal text-gray-700 ">
                                        {store.store_phone}
                                    </p>
                                    <p class="mb-3 font-normal text-gray-700 ">
                                        {store.store_open} - {store.store_close}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
