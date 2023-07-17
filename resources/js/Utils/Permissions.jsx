import { usePage } from '@inertiajs/react';

export default function hasAnyPermission(permissions) {
  // destruct auth from props
  const { auth } = usePage().props;

  // get all permissions from props
  const allPermissions = auth.permissions;

  let hasPermission = false;

  permissions.forEach((item) => {
    if (allPermissions[item]) hasPermission = true;
  });
  return hasPermission;
}
