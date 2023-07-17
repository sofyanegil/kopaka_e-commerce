import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";

export default function LayoutWeb({ children }) {
    return (
        <>
            <Header />
            <main className="relative">{children}</main>
            <Footer />
        </>
    );
}
