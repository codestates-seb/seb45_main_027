import React from 'react';
import MyInfoContentList from './MyInfoContentList';
import UserProfile from './UserProfile';


const MyInfoLayout = () => {
    return (
        <div className='flex flex-col items-start w-[90%] md:flex-row md:'>
            <UserProfile />
            <MyInfoContentList />
            
        </div>
    );
}

export default MyInfoLayout