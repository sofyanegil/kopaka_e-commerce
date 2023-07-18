import React from "react";

export default function NoDataFound({ data }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex justify-center items-center flex-col">
                <img
                    src="/assets/images/not-found.png"
                    alt="empty-cart"
                    className="w-[30vh] my-10 "
                />
                <h3 className="text-xl font-semibold text-center">
                    No data {data} found
                </h3>
            </div>
        </div>
    );
}
