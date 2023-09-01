import React from 'react';
import MyInfoContentList from './MyInfoContentList';
import UserProfile from './UserProfile';


const MyInfoLayout = () => {
    return (
        <div className='flex flex-col items-start mb-[10%] w-[90%] md:w-[95%] md:flex-row'>
            <UserProfile />
            <MyInfoContentList />
            
        </div>
    );
}

export default MyInfoLayout