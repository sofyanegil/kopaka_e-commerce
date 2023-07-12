import React from "react";
import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(permissions) {
    // destruct auth from props
    const { auth } = usePage().props;

    // get all permissions from props
    let allPermissions = auth.permissions;

    let hasPermission = false;

    permissions.forEach(function (item, _) {
        if (allPermissions[item]) hasPermission = true;
    });
    return hasPermission;
}
