import {useState} from 'react'

import { MdEdit, MdDelete, MdAdd} from "react-icons/md";
import { camelCaseToSpace, getDate, handleSuccess } from '../../utils/helper';
import usePagination from '../../hooks/usePagination';
import Pagination from '../../utils/Pagination';
import AddMusicForm from '../Form/addMusicForm';

import {getMusics,createMusic, updateMusic, deleteMusic} from '../../api/apiLayer';
import Loading from '../../utils/loading';

const hiddenFields =['_id'];

export default function Songs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        albumName: '',
        genre: '',
    });

    const {
        data: musics,
        loading,
        currentPage,
        totalPages,
        paginate,
        nextPage,
        prevPage,
        } = usePagination(getMusics);

        const handleDelete=async(id)=>{
            await deleteMusic(id).then(({data})=>{
                handleSuccess(data.message);
            });
            paginate(currentPage);
        }

        const handleEdit=(id)=>{
            const musicToEdit=musics.find(music=>music._id === id);
            setFormData(musicToEdit);
            setIsModalOpen(true);
        }

        const handleAddMusic=async(newMusic)=>{
            await createMusic(newMusic).then(({data})=>{
                handleSuccess(data.message);
            });
            paginate(currentPage);
            setIsModalOpen(false);
        }

        const handleUpdateMusic=async(id, updatedMusic)=>{
            await updateMusic(id,updatedMusic).then(({data})=>{
                handleSuccess(data.message);
            })
            paginate(currentPage);
            setIsModalOpen(false);
        }


    if(loading) return <Loading/>;

    return (
    <div className="flex flex-col p-1 bg-slate-300 h-[100%]">
      <h1 className='px-2 mt-2 text-4xl font-bold'>Song</h1>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-violet-500 text-white px-4 py-2 rounded w-max mx-auto mb-10 flex items-center gap-2 text-lg font-semibold"
        >
        <MdAdd size={20}/>&nbsp;Add Song
      </button>
      <div>
        <table className="border border-violet-400 w-full">
          <thead>
            <tr>
            {Object.keys(musics[0] || {}).filter(key => !hiddenFields.includes(key)).map((key) => {
                return <th key={key} className="px-6">{camelCaseToSpace(key).toUpperCase()}</th>;
            })}
            {musics.length>0 && <th>ACTION</th>}
            </tr>
          </thead>
          <tbody>
          {musics?.map((music) => (
            <tr key={music.id} className="text-center capitalize">
            {Object.entries(music).filter(([key]) => !hiddenFields.includes(key)).map(([key, value]) => (
                <td key={key}>{typeof value === 'string' && value.includes('-') ? getDate(value) : value}</td>
            ))}
            <td>
              <button 
              onClick={() => handleEdit(music._id)} 
              className="bg-yellow-500 px-2 py-1 rounded text-white mx-1"
              >
              <MdEdit size={20}/>
              </button>
              <button 
              onClick={() => handleDelete(music._id)} 
              className="bg-red-500 px-2 py-1 rounded text-white mx-1"
              >
              <MdDelete size={20}/>
              </button>
            </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      {
      musics.length>0 && 
        <Pagination
        totalPosts={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      }

      {isModalOpen && 
        <AddMusicForm
        formData={formData}
        setFormData={setFormData}
        handleAddMusic={handleAddMusic}
        handleUpdateMusic={handleUpdateMusic}
        setIsModalOpen={setIsModalOpen}
        />
      }
  </div>
    )
}
