import React from 'react';

import Profile from '../_components/module/dashboard/aboutManagement/profile';
import UpdateLinkForm from '../_components/module/dashboard/aboutManagement/links';

export default function Dashboard() {
  return (
    <div className='min-w-full'>
      <Profile />
      <UpdateLinkForm />
    </div>
  );
}
