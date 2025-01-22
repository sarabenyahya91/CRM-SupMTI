import React from 'react';


const Row = ({ children }) => {
    return (
        <tr className='border-b hover:bg-gray-100 las:border-b-0' >
            {children}
        </tr>
    );
};

export default Row;