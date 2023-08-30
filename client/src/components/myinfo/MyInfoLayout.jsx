import React from 'react';
import MyInfoContentList from './MyInfoContentList';
import UserProfile from './UserProfile';


const MyInfoLayout = () => {
    return (
        <div>
            <UserProfile />
            <MyInfoContentList />
        </div>
    );
}

export default MyInfoLayout