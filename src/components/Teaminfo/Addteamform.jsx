import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'



const Addteamform = ({ onClose, editAddteam }) => {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        location: '',
        name: '',
        contact: ''
    });

    useEffect(() => {
        if (editAddteam) {
            setFormData({
                location: editAddteam.location,
                name: editAddteam.name,
                contact: editAddteam.contact,
            });
        }
    }, [editAddteam])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const createFunction = async (e) => {
        e.preventDefault();
        try {
            const method = editAddteam ? 'PUT' : 'POST';
            const url = editAddteam ? `${import.meta.env.VITE_BACKEND_URL}/team/team/${editAddteam._id}`
                : `${import.meta.env.VITE_BACKEND_URL}/team/team`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    contact: Number(formData.contact),
                })
            });

            if (response) {
                console.log(response)
               toast.success(editAddteam ? 'Team updated successfully' : 'Team added successfully');
                if (onClose) onClose();
            } else {
                const errorData = await response.json();
               toast.error('Failed to add team.');
            }
        } catch (e) {
            console.log('Data not added', e);
            toast.error('Error connecting to the server.');
        }
    };



    return (
        <div className='flex justify-center fixed z-10 inset-[220px]'>
            <div className=' p-6 bg-white border border-[#004AAD] rounded-lg'>
                <div className='flex justify-end'>
                    <button className="close-button " onClick={onClose}> X </button>
                </div>
                <form onSubmit={createFunction} className='grid-cols-2 gap-4'>
                    <div className='flex gap-3 p-2'>
                        <p className='font-Regular font-family:DM Sans text-[#444444] flex-1  text-2xl'>Adding Team </p>
                        <div>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="border border-[#004AAD] p-3 w-full rounded-lg text-[#004AAD]">
                                <option value="" disabled>
                                    Select Office Location
                                </option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Bangalore">Bangalore</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full p-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Team name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Team Contact Number"
                            value={formData.contact}
                            onChange={handleChange}
                            className="border-2 border-[#004AAD] p-3 rounded-lg w-full"
                            required
                        />
                    </div>
                    <div>
                        <button type='submit' className='bg-[#004AAd] text-white p-2 rounded-lg ml-80' >Add Team</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addteamform