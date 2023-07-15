import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import SearchInput from "../../../Components/SearchInput";
import { FaCakeCandles, FaImages, FaPen, FaPlus } from "react-icons/fa6";
import Pagination from "../../../Components/Pagination";
import hasAnyPermission from "../../../Utils/Permissions";
import Button from "../../../Components/Button";
import Delete from "../../../Components/Delete";
import NoDataFound from "../../../Components/NoDataFound";

export default function Index() {
    const { products } = usePage().props;

    return (
        <>
            <Head>
                <title>Products | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/products" />
                <Link href="/admin/products/create">
                    <button className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2">
                        <FaPlus /> Product
                    </button>
                </Link>
                <Card
                    title={
                        <>
                            <FaCakeCandles />
                            Products
                        </>
                    }
                >
                    {products.data.length > 0 ? (
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
                                                Product Name
                                            </th>
                                            <th scope="col" className="p-2">
                                                Category
                                            </th>
                                            <th scope="col" className="p-2 ">
                                                Variants
                                            </th>
                                            <th scope="col" className="p-2 ">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product, index) => (
                                            <tr
                                                className="bg-white border-b"
                                                key={index}
                                            >
                                                <th
                                                    scope="row"
                                                    className="p-3 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {++index +
                                                        (products.current_page -
                                                            1) *
                                                            products.per_page}
                                                </th>
                                                <td className="p-3">
                                                    {product.product_name}
                                                </td>
                                                <td className="p-3">
                                                    {
                                                        product.category
                                                            .category_name
                                                    }
                                                </td>
                                                <td className="p-3">
                                                    {product.product_variants.map(
                                                        (
                                                            product_variant,
                                                            index
                                                        ) => (
                                                            <p
                                                                key={index}
                                                                className="inline-block px-2 py-1 mr-2 rounded-full bg-gray-200 text-gray-800 text-sm"
                                                            >
                                                                {
                                                                    product_variant.product_variant_name
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </td>
                                                <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                                    {hasAnyPermission([
                                                        "products.show",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/products/${product.product_id}`}
                                                        >
                                                            <Button
                                                                color={
                                                                    "success"
                                                                }
                                                            >
                                                                <FaImages />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission([
                                                        "products.edit",
                                                    ]) && (
                                                        <Link
                                                            href={`/admin/products/${product.product_id}/edit`}
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
                                                    {hasAnyPermission([
                                                        "products.delete",
                                                    ]) && (
                                                        <Delete
                                                            URL={
                                                                "/admin/products"
                                                            }
                                                            id={
                                                                product.product_id
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={products.links} align={"end"} />
                        </>
                    ) : (
                        <NoDataFound data={"product"} />
                    )}
                </Card>
            </LayoutAccount>
        </>
    );
}
