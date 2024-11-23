import React, { useState } from 'react';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionMatrix from './components/PermissionMatrix';
import { RBACProvider } from './context/RBACContext';

export default function App() {
  const [currentSection, setCurrentSection] = useState('users');

  const renderSection = () => {
    switch (currentSection) {
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'permissions':
        return <PermissionMatrix />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <RBACProvider>
      <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
        {renderSection()}
      </Layout>
    </RBACProvider>
  );
}