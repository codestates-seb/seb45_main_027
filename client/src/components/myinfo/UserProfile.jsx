import React from 'react';
import UserProfileDetails from './UserProfileDetails';
import UserInfoFollowList from './UserInfoFollowList';

const UserProfile = () => {
    return (
        <div className='flex flex-col bg-white rounded-md mr-[3%] w-[25%] shadow-md'>
            <UserProfileDetails />
            <UserInfoFollowList />
        </div>
    );
}

export default UserProfile