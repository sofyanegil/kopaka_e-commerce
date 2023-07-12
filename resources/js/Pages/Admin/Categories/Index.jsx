import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import LayoutAccount from "../../../Layouts/Account";
import Card from "../../../Components/Card";
import SearchInput from "../../../Components/SearchInput";
import hasAnyPermission from "../../../Utils/Permissions";
import Button from "../../../Components/Button";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import { FaBorderAll, FaPen, FaPlus } from "react-icons/fa6";

export default function Index() {
    const { categories } = usePage().props;
    return (
        <>
            <Head>
                <title>Categories | Kopaka</title>
            </Head>
            <LayoutAccount>
                <SearchInput URL="/admin/categories" />
                <Link href="/admin/categories/create">
                    <button className="btn btn-primary flex flex-row items-center justify-center gap-2 mt-2">
                        <FaPlus /> Category
                    </button>
                </Link>
                <Card
                    title={
                        <>
                            <FaBorderAll />
                            Categories
                        </>
                    }
                >
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
                                        Category Name
                                    </th>
                                    <th scope="col" className="p-2">
                                        Category Slug
                                    </th>
                                    <th scope="col" className="p-2">
                                        Category Description
                                    </th>
                                    <th scope="col" className="p-2">
                                        Category Image
                                    </th>
                                    <th scope="col" className="p-2 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((category, index) => (
                                    <tr
                                        className="bg-white border-b"
                                        key={index}
                                    >
                                        <th
                                            scope="row"
                                            className="p-3 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {++index +
                                                (categories.current_page - 1) *
                                                    categories.per_page}
                                        </th>
                                        <td className="p-3">
                                            {category.category_name}
                                        </td>
                                        <td className="p-3">
                                            {category.category_slug}
                                        </td>
                                        <td className="p-3">
                                            {category.category_description}
                                        </td>
                                        <td className="p-3">
                                            <img
                                                src={
                                                    category.category_image_url
                                                }
                                                className="w-20"
                                                alt={category.category_name}
                                            />
                                        </td>
                                        <td className="p-3 flex flex-row gap-1 max-md:flex-col items-center content-center">
                                            {hasAnyPermission([
                                                "categories.edit",
                                            ]) && (
                                                <Link
                                                    href={`/admin/categories/${category.category_id}/edit`}
                                                >
                                                    <Button color={"secondary"}>
                                                        <FaPen />
                                                    </Button>
                                                </Link>
                                            )}
                                            {hasAnyPermission([
                                                "categories.delete",
                                            ]) && (
                                                <Delete
                                                    URL={"/admin/categories"}
                                                    id={category.category_id}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={categories.links} align={"end"} />
                </Card>
            </LayoutAccount>
        </>
    );
}
