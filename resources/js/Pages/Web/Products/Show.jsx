import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { FaCartPlus } from "react-icons/fa6";
import LayoutWeb from "../../../Layouts/Web";
import formatPrice from "../../../Utils/FormatPrice";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Show() {
    const { product } = usePage().props;
    const [variantId, setVariantId] = useState();
    const [price, setPrice] = useState(
        product.product_variants[0].product_variant_price
    );
    const [qty, setQty] = useState(1);

    const images =
        product.product_images.length > 0
            ? product.product_images.map((product) => ({
                  original: product.product_image_url,
                  thumbnail: product.product_image_url,
              }))
            : [
                  {
                      original: "/assets/images/no-image.png",
                      thumbnail: "/assets/images/no-image.png",
                  },
              ];

    const setVariantPrice = (id) => {
        const variant = product.product_variants.find(
            (variant) => variant.product_variant_id == id
        );
        setPrice(variant?.product_variant_price || 0);
    };

    const handleDecrease = () => {
        if (qty > 1) setQty(qty - 1);
    };

    const handleIncrease = () => {
        setQty(qty + 1);
    };

    return (
        <>
            <Head>
                <title>{`${product.product_name} | Kopaka`}</title>
            </Head>
            <LayoutWeb>
                <div className="container mx-auto px-4 my-5 min-h-[50vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 md:my-16">
                        <ImageGallery
                            items={images}
                            classNames={{
                                gallery: "custom-gallery",
                                thumbnail: "custom-thumbnail",
                                thumbnailImage: "custom-thumbnail-image",
                                selectedItem: "custom-selected-item",
                            }}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={false}
                            autoPlay
                        />
                        <div>
                            <h1 className="text-3xl font-bold my-2">
                                {product.product_name}
                            </h1>
                            <p className="text-2xl font-bold my-2">
                                Rp.
                                {formatPrice(price)}
                            </p>
                            <div className="min-h-[15vh] border-t-2 border-b-2 border-gray-300 py-2 my-4">
                                <p className="font-semibold">Description :</p>
                                <p
                                    className="text-gray-700"
                                    dangerouslySetInnerHTML={{
                                        __html: product.product_description,
                                    }}
                                />
                            </div>
                            <div className="flex w-full gap-5 my-5 justify-start">
                                <div className="w-3/4">
                                    <label
                                        htmlFor="variant"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Select variant
                                    </label>
                                    <select
                                        value={variantId}
                                        id="variant"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => {
                                            setVariantId(e.target.value);
                                            setVariantPrice(e.target.value);
                                        }}
                                    >
                                        {product.product_variants.map(
                                            (variant) => (
                                                <option
                                                    key={
                                                        variant.product_variant_id
                                                    }
                                                    value={
                                                        variant.product_variant_id
                                                    }
                                                >
                                                    {
                                                        variant.product_variant_name
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="qty"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Qty
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l focus:outline-none btn"
                                            onClick={handleDecrease}
                                        >
                                            -
                                        </button>
                                        <input
                                            readOnly
                                            type="number"
                                            id="qty"
                                            min={1}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-center"
                                            placeholder=""
                                            required
                                            value={qty}
                                            onChange={(event) =>
                                                setQty(event.target.value)
                                            }
                                        />
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r focus:outline-none btn  rounded-none"
                                            onClick={handleIncrease}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-content-center fixed-bottom">
                                <button
                                    type="button"
                                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2 gap-2 justify-center w-full"
                                >
                                    <FaCartPlus className="w-5 h-5" />
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
