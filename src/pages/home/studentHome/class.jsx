const Class = ({_class}) => {

    return (
        <tr className='flex justify-between' key={_class._id}>
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className="inline antialiased text-sm">
                    {_class.name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className="inline antialiased text-sm">
                    {_class['Teacher.name']}
                </p>
            </td>
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className={`inline antialiased text-sm p-1 rounded-lg ${_class.attendance<75?"bg-red-200":"bg-green-200"}`}>
                    {_class.attendance}
                </p>
            </td>
        </tr>
    )
}

export default Class