import React from "react";

function TextInput({ label, value, onChange, placeholder, type, error }) {
    return (
        <div className="mb-4">
            <label
                htmlFor={label}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </label>

            <input
                type={type}
                id={label}
                className={`bg-gray-50 border ${
                    error ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                required
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}

export default TextInput;
