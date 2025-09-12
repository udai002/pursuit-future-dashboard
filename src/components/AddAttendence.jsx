import React from 'react'

function AddAttendence() {
    const employee = [{ employeeName: "Navya", employeeId: "1233456" }, { employeeName: "Navya", employeeId: "1233456" }, { employeeName: "Navya", employeeId: "1233456" }]

    return (
        <div className='border-1 border-blue-700 rounded-2xl flex h-auto justify-center align-centers '>
            <div>
                {employee.map((emp) => (
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-2'>
                            <p>{emp.employeeName}</p>
                            <p>{emp.employeeId}</p>
                        </div>

                        <div className='flex gap-3'>
                            <select
                                name="location"

                                required
                                className="border border-[#004AAD] p-2 w-full rounded-lg text-[#004AAD]">
                                <option value="" disabled>
                                    Attendence
                                </option>
                                <option value="Hyderabad">Present</option>
                                <option value="Bangalore">Absent</option>
                                <option value="Bangalore">Leave</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Title"
                                name="title"

                                className="border-2 rounded-xl  border-[#004AAD] outline-none placeholder-[#004AAD80] flex-1"
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AddAttendence