/* eslint-disable react/prop-types */
import {useState} from 'react'

export default function AddArtistForm({
  formData,setFormData, handleAddArtist,handleUpdateArtist, setIsModalOpen
}) {
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to create or update artist
    if(formData._id){
      const updatedUser = {...formData, updatedAt:new Date()};
      handleUpdateArtist(formData._id,updatedUser);
  }else{
      const newUser = { ...formData, createdAt: new Date(), updatedAt: new Date() };
      handleAddArtist(newUser);
  }
  setIsModalOpen(false);
  setFormData(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[50%] px-6 py-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {formData._id ? 'Edit Artist' : 'Add New Artist'}
        </h2>
        <form className="flex flex-col gap-4">
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border px-2 py-1 rounded"
          />
          <label htmlFor='dob'>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="border px-2 py-1 rounded"
          />
          <label htmlFor='gender'>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor='address'>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border px-2 py-1 rounded"
          />
          <label htmlFor='firstReleaseYear'>First Release Year</label>
          <input
            type="number"
            name="firstReleaseYear"
            value={formData.firstReleaseYear}
            onChange={handleInputChange}
            placeholder="First Release Year"
            className="border px-2 py-1 rounded"
          />
          <label htmlFor='noOfAlbumReleased'>no Of Album Released</label>
          <input
            type="number"
            name="noOfAlbumReleased"
            value={formData.noOfAlbumReleased}
            onChange={handleInputChange}
            placeholder="Number of Albums Released"
            className="border px-2 py-1 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={()=>setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

