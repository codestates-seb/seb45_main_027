import React from 'react';
import UserInfoDetails from './UserInfoDetails';
import FollowList from './FollowList';

const UserProfile = () => {
    return (
        <div>
            <UserInfoDetails />
            <FollowList />
        </div>
    );
}

export default UserProfile