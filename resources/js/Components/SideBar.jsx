import React from "react";
import { usePage } from "@inertiajs/react";
import {
    FaUser,
    FaReceipt,
    FaChartPie,
    FaCartShopping,
    FaBorderAll,
    FaCakeCandles,
    FaRegImages,
    FaUserGear,
    FaUsers,
    FaUserShield,
    FaMapLocationDot,
    FaStore,
} from "react-icons/fa6";
import SidebarItem from "./SidebarItem";

export default function SideBar({ isSidebarOpen }) {
    const { auth } = usePage().props;

    return (
        <aside
            className={`fixed top-0 left-0 w-64 z-40 h-screen transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-label="Sidebar"
        >
            <div className="h-full py-4 overflow-y-auto bg-slate-100 mt-14 scroll-smooth">
                <div className=" p-5 shadow bg-slate-800 ">
                    <h6 className="mb-1 text-white">Welcome Back,</h6>
                    <p className="font-bold text-xl text-white ">
                        {auth.user.user_name}
                    </p>
                </div>

                <ul className="font-medium -mt-1">
                    <SidebarItem
                        href={"/account/profile"}
                        permission="profile.index"
                        name="Profile"
                        icon={<FaUser />}
                    />
                    <SidebarItem
                        href={"/account/order"}
                        permission="orderHistory.index"
                        name="Order History"
                        icon={<FaReceipt />}
                    />
                    <SidebarItem
                        href={"/admin/dashboard"}
                        permission="dashboard.index"
                        name="Dashboard"
                        icon={<FaChartPie />}
                    />
                    <SidebarItem
                        href={"/admin/order"}
                        permission="orders.index"
                        name="Transaction"
                        icon={<FaCartShopping />}
                    />
                    <SidebarItem
                        href={"/admin/categories"}
                        permission="categories.index"
                        name="Categories"
                        icon={<FaBorderAll />}
                    />
                    <SidebarItem
                        href={"/admin/products"}
                        permission="products.index"
                        name="Products"
                        icon={<FaCakeCandles />}
                    />
                    <SidebarItem
                        href={"/admin/sliders"}
                        permission="sliders.index"
                        name="Sliders"
                        icon={<FaRegImages />}
                    />
                    <SidebarItem
                        href={"/admin/stores"}
                        permission="stores.index"
                        name="Stores"
                        icon={<FaStore />}
                    />
                    <SidebarItem
                        href={"/admin/delivery"}
                        permission="deliveryAreas.index"
                        name="Delivery Area"
                        icon={<FaMapLocationDot />}
                    />
                    <SidebarItem
                        href={"/admin/roles"}
                        permission="roles.index"
                        name="Roles"
                        icon={<FaUserGear />}
                    />
                    <SidebarItem
                        href={"/admin/permissions"}
                        permission="permissions.index"
                        name="Permissions"
                        icon={<FaUserShield />}
                    />
                    <SidebarItem
                        href={"/admin/users"}
                        permission="users.index"
                        name="Users"
                        icon={<FaUsers />}
                    />
                </ul>
            </div>
        </aside>
    );
}
