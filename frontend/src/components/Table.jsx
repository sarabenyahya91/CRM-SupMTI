import React from 'react';


const Table = ({ columns, data, renderRow }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full text-left border-collapse table-auto">
                <thead className='text-gray-700 bg-gray-200'>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index} className='px-6 py-3 text-sm font-medium'>
                                    {column}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        renderRow(row, index)
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

