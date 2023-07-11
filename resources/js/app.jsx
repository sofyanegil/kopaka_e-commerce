import React from "react";
import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: "#ffa500",
    },
});

router.on("navigate", () => {
    document.getElementById("app").removeAttribute("data-page");
});
