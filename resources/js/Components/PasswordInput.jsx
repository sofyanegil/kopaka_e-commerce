import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordField = ({ label, value, onChange, placeholder, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

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
            <div className="flex">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`bg-gray-50 border ${
                        error ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="focus:outline-none ml-2"
                >
                    {showPassword ? (
                        <FaRegEye size={20} />
                    ) : (
                        <FaRegEyeSlash size={20} />
                    )}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default PasswordField;
