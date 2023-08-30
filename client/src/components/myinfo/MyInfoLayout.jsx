import React from 'react';
import MyInfoContentList from './MyInfoContentList';
import UserProfile from './UserProfile';


const MyInfoLayout = () => {
    return (
        <div className='flex justify-center w-[90%]'>
            <UserProfile />
            <MyInfoContentList />
            
        </div>
    );
}

export default MyInfoLayout