/* eslint-disable react/prop-types */
import React from 'react';

export default function AddMusicForm({
  formData,setFormData, handleAddMusic,handleUpdateMusic,setIsModalOpen
}) {
  const genres = ['rnb', 'country', 'classic', 'rock', 'jazz'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData._id){
        const updatedMusic = {...formData, updatedAt:new Date()};
        handleUpdateMusic(formData._id,updatedMusic);
    }else{
        const newUser = { ...formData, createdAt: new Date(), updatedAt: new Date() };
        handleAddMusic(newUser);
    }
    setIsModalOpen(false);
    setFormData(null);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-200 w-[50%] p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold">{formData._id ? 'Edit New Music Record' : 'Add New Music Record'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          Album Name:
          <input
            type="text"
            name="albumName"
            value={formData.albumName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          Genre:
          <select
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre} className='capitalize'>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={()=>setIsModalOpen(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Save
            </button>
          </div>
      </form>
      </div>
    </div>
  );
}
