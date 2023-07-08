import React from "react";

const Card = ({ children }) => {
    return (
        <div className="max-w mx-auto bg-white shadow-md rounded-lg p-4 mt-4 border border-slate-200">
            {children}
        </div>
    );
};

export default Card;
