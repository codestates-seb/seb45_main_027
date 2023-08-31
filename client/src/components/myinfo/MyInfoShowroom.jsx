import React from 'react';
import MyInfoContent from './MyInfoContent';

const MyInfoShowroom = () => {
    return (
        <div className=' '>
            <div className='text-[#F5634A] text-4xl font-bold mb-[2%]'>Show Room</div>
            <div className='flex flex-wrap justify-center items-start'>
            <MyInfoContent />
            <MyInfoContent />
            <MyInfoContent />
            <MyInfoContent />
            <MyInfoContent />
            <MyInfoContent />
            <MyInfoContent />



            </div>

        </div>
    );
}

export default MyInfoShowroom