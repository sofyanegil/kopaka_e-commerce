import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { FaUserGear } from 'react-icons/fa6';
import LayoutAccount from '../../../Layouts/Account';
import Card from '../../../Components/Card';
import TextInput from '../../../Components/TextInput';
import Button from '../../../Components/Button';

export default function Create() {
  const { errors, permissions, role } = usePage().props;
  const [roleName, setRoleName] = useState(role.name);
  const [permissionsData, setPermissionsData] = useState(
    role.permissions.map((obj) => obj.name),
  );

  const checkboxChangeHandler = (e) => {
    let data = permissionsData;
    if (data.some((name) => name === e.target.value)) {
      data = data.filter((name) => name !== e.target.value);
    } else {
      data.push(e.target.value);
    }
    setPermissionsData(data);
  };

  const updateRoleHandler = async (e) => {
    e.preventDefault();

    router.put(
      `/admin/roles/${role.id}`,
      {
        name: roleName,
        permissions: permissionsData,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Role Updated',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      },
    );
  };

  return (
    <LayoutAccount>
      <Head>
        <title>Edit Roles | Kopaka</title>
      </Head>
      <Card
        title={(
          <>
            <FaUserGear />
            {' '}
            Edit Role
          </>
                      )}
      >
        <form onSubmit={updateRoleHandler}>
          <TextInput
            type="text"
            label="role name"
            error={errors.name}
            value={roleName}
            onChange={setRoleName}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Permissions
          </label>
          {errors.permissions && (
          <div className="text-red-500 text-sm mt-1">
            {errors.permissions}
          </div>
          )}
          <div className="mb-3 flex flex-wrap gap-1">
            {permissions.map((permission, index) => (
              <div className="flex items-cente" key={index}>
                <input
                  id={`checkbox-${permission.id}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  value={permission.name}
                  defaultChecked={permissionsData.some(
                    (name) => name === permission.name ?? true,
                  )}
                  onChange={checkboxChangeHandler}
                />
                <label
                  htmlFor={`checkbox-${permission.id}`}
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
          <Button color="success">Save</Button>
        </form>
      </Card>
    </LayoutAccount>
  );
}
