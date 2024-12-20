import {useState} from 'react';
import { MdEdit, MdDelete, MdAdd} from "react-icons/md";
import { TbMusicShare } from "react-icons/tb";
import {useNavigate} from 'react-router-dom';

import usePagination from '../../hooks/usePagination';

import Pagination from '../../utils/Pagination';
import { camelCaseToSpace, getDate, handleSuccess } from '../../utils/helper';

import Loading from '../../utils/loading';
import AddArtistForm from '../Form/addArtistForm';

import { getArtists, createArtist, updateArtist, deleteArtist,getMusicsByArtist, importArtists, exportArtists } from '../../api/apiLayer';

const hiddenFields = ['_id'];
export default function Artist() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(
    {
      name: '',
      dob: '',
      gender: '',
      address: '',
      firstReleaseYear: '',
      noOfAlbumReleased: 0,
    }
  );

  const {
    data: artists,
    loading,
    currentPage,
    totalPages,
    paginate,
    nextPage,
    prevPage,
  } = usePagination(getArtists);


  const handleDelete = async(id) => {
    await deleteArtist(id).then(({data})=>{
      handleSuccess(data.message);
    });
  };

    const handleEdit = (id) => {
    const artistToEdit = artists.find(artist => artist._id === id);
    setFormData(artistToEdit);
    setIsModalOpen(true);
    };

    const handleAddArtist = async(newArtist) => {
      await createArtist(newArtist).then(({data})=>{
        handleSuccess(data.message);
      });
      paginate(currentPage);
      setIsModalOpen(false);
    }

    const handleUpdateArtist = async (id, updatedArtist) => {
      await updateArtist(id, updatedArtist).then(({data})=>{
        handleSuccess(data.message);
      });
      paginate(currentPage);
      setIsModalOpen(false);
    };
  
    const handleImportCSV = () => {
      importArtists((data) => {
        console.log('Imported data:', data);
      });
    };
  
    const handleExportCSV = async() => {
      try{
        const response = await exportArtists();
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'artists.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleViewSongs = async(artistName) => {
      await getMusicsByArtist(artistName).then(data=>{
        console.log(data);
      });
      navigate(`/songs`);
    };

    if (loading) return <Loading/>;

  return (
    <div className="flex flex-col p-1 bg-slate-300 h-[100%]">
        <h1 className='px-2 mt-2 text-4xl font-bold'>Artist</h1>
        <div className='flex justify-between w-[50%] mx-auto mb-10'>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-violet-500 text-white px-4 py-2 rounded w-max flex items-center gap-2 text-lg font-semibold"
            >
            <MdAdd size={20}/>&nbsp;Add Artist
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleImportCSV}
              className="bg-slate-500 text-white px-4 py-2 rounded"
            >
              Import CSV
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div>
        <table className="border border-violet-400 w-full">
          <thead>
            <tr>
              {Object.keys(artists?.[0] || {}).filter(key=>!hiddenFields.includes(key)).map((key) => {
                return <th key={key} className="px-6">{camelCaseToSpace(key).toUpperCase()}</th>;
              })}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {artists?.map((artist) => (
            <tr key={artist.id} className="text-center capitalize">
              {Object.entries(artist).filter(([key])=>!hiddenFields.includes(key)).map(([key,value]) => (
                <td key={key}>{typeof value === 'string' && value.includes('-') ? getDate(value) : value}</td>
              ))}
              <td>
                <button 
                  onClick={() => handleEdit(artist._id)} 
                  className="bg-yellow-500 px-2 py-1 rounded text-white mx-1"
                >
                <MdEdit size={20}/>
                </button>
                <button 
                  onClick={() => handleDelete(artist._id)} 
                  className="bg-red-500 px-2 py-1 rounded text-white mx-1"
                >
                  <MdDelete size={20}/>
                </button>
                <button
                  onClick={() => handleViewSongs(artist.name)}
                  className="bg-lime-500 px-2 py-1 text-white rounded"
                >
                  <TbMusicShare size={20}/>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        <Pagination
        totalPosts={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />

        {isModalOpen && 
          <AddArtistForm
            formData={formData}
            setFormData={setFormData}
            handleAddArtist={handleAddArtist}
            handleUpdateArtist={handleUpdateArtist}
            setIsModalOpen={setIsModalOpen}
          />
        }
    </div>
  )
}
