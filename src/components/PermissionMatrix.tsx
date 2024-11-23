import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useRBAC } from '../context/RBACContext';

export default function PermissionMatrix() {
  const { roles, permissions, updatePermissions } = useRBAC();
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>(
    Object.fromEntries(roles.map(role => [role.id, role.permissions.map(p => p.id)]))
  );
  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const handlePermissionChange = (roleId: string, permissionId: string) => {
    setSelectedPermissions(prev => {
      const rolePermissions = prev[roleId] || [];
      const newPermissions = rolePermissions.includes(permissionId)
        ? rolePermissions.filter(id => id !== permissionId)
        : [...rolePermissions, permissionId];
      return { ...prev, [roleId]: newPermissions };
    });
  };

  const handleSave = () => {
    Object.entries(selectedPermissions).forEach(([roleId, permissionIds]) => {
      updatePermissions(roleId, permissionIds);
    });
    alert('Permissions updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Permission Matrix</h2>
        <p className="mt-1 text-sm text-gray-500">Manage role permissions in a comprehensive view</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                {roles.map(role => (
                  <th key={role.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <Lock className="h-4 w-4 mr-2" />
                      {role.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map(category => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-50">
                    <td colSpan={roles.length + 1} className="px-6 py-3">
                      <span className="text-sm font-medium text-gray-900">{category}</span>
                    </td>
                  </tr>
                  {permissions
                    .filter(permission => permission.category === category)
                    .map(permission => (
                      <tr key={permission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{permission.name}</div>
                            <div className="text-gray-500">{permission.description}</div>
                          </div>
                        </td>
                        {roles.map(role => (
                          <td key={`${role.id}-${permission.id}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            <input
                              type="checkbox"
                              checked={selectedPermissions[role.id]?.includes(permission.id)}
                              onChange={() => handlePermissionChange(role.id, permission.id)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 rounded-b-lg">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}