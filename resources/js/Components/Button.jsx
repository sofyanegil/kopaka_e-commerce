import React from "react";

export default function Button({ name, color }) {
    return (
        <button type="submit" className={`btn btn-${color}`}>
            {name}
        </button>
    );
}
