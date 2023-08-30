import React from 'react';
import UserInfoDetails from './UserInfoDetails';
import FollowList from './FollowList';

const UserProfile = () => {
    return (
        <div className='bg-white border rounded'>
            <UserInfoDetails />
            <FollowList />
        </div>
    );
}

export default UserProfile