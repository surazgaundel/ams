/* eslint-disable react/prop-types */
import {useState} from 'react'

export default function AddUserForm({
    formData,setFormData, handleAddUser,handleUpdateUser, setIsModalOpen
}) {

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(formData._id){
            const updatedUser = {...formData, updatedAt:new Date()};
            handleUpdateUser(formData._id,updatedUser);
        }else{
            const newUser = { ...formData, createdAt: new Date(), updatedAt: new Date() };
            handleAddUser(newUser);
        }
        setIsModalOpen(false);
        setFormData(null);
    };


  return (
<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-gray-200 w-[50%] p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">{formData._id ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
            <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleInputChange} 
            placeholder="First Name" 
            required 
            className="border rounded-md w-full px-2 py-1"
            />
            <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleInputChange} 
            placeholder="Last Name" 
            required 
            className="border rounded-md w-full px-2 py-1"
            />
            </div>
            <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Email" 
            required 
            className="border rounded-md px-2 py-1"
            />
            <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            placeholder="Password" 
            required 
            className="border rounded-md px-2 py-1"
            />
            <input 
            type="number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            placeholder="Phone" 
            required 
            className="border rounded-md px-2 py-1"
            />
            <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleInputChange} 
            required 
            className="border rounded-md px-2 py-1"
            />
            <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange} 
            required 
            className="border rounded-md px-2 py-1"
            >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>
            <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
            placeholder="Address" 
            required 
            className="border rounded-md px-2 py-1"
            ></textarea>
            <div className="flex gap-2 justify-end">
            <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {formData.id ? 'Update' : 'Add'}
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}
