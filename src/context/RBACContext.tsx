import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, Role, Permission } from '../types';

interface RBACContextType {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
  updatePermissions: (roleId: string, permissionIds: string[]) => void;
}

const initialPermissions: Permission[] = [
  { id: '1', name: 'View Users', category: 'Users', description: 'Can view user list' },
  { id: '2', name: 'Create Users', category: 'Users', description: 'Can create new users' },
  { id: '3', name: 'Edit Users', category: 'Users', description: 'Can edit user details' },
  { id: '4', name: 'Delete Users', category: 'Users', description: 'Can delete users' },
  { id: '5', name: 'View Roles', category: 'Roles', description: 'Can view role list' },
  { id: '6', name: 'Manage Roles', category: 'Roles', description: 'Can manage roles' },
];

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: initialPermissions,
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage users and basic settings',
    permissions: initialPermissions.slice(0, 4),
  },
  {
    id: '3',
    name: 'User',
    description: 'Basic access',
    permissions: initialPermissions.slice(0, 2),
  },
];

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@vrv.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@vrv.com', role: 'Manager', status: 'active' },
  { id: '3', name: 'James Smeeth', email: 'james@vrv.com', role: 'User', status: 'inactive' },
  { id: '4', name: 'Alex Mercer', email: 'alex@vrv.com', role: 'User', status: 'inactive' },
  { id: '5', name: 'Bob Wilson', email: 'bob@vrv.com', role: 'User', status: 'inactive' }
];

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [permissions] = useState<Permission[]>(initialPermissions);

  const addUser = useCallback((userData: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { ...userData, id: crypto.randomUUID() }]);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  const addRole = useCallback((roleData: Omit<Role, 'id'>) => {
    setRoles(prev => [...prev, { ...roleData, id: crypto.randomUUID() }]);
  }, []);

  const updateRole = useCallback((updatedRole: Role) => {
    setRoles(prev => prev.map(role => role.id === updatedRole.id ? updatedRole : role));
  }, []);

  const deleteRole = useCallback((id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  }, []);

  const updatePermissions = useCallback((roleId: string, permissionIds: string[]) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: permissions.filter(p => permissionIds.includes(p.id))
        };
      }
      return role;
    }));
  }, [permissions]);

  return (
    <RBACContext.Provider value={{
      users,
      roles,
      permissions,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole,
      deleteRole,
      updatePermissions,
    }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}