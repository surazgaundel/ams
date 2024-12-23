import { useState } from 'react';
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { camelCaseToSpace, getDate, handleSuccess } from '../../utils/helper';
import Pagination from '../../utils/Pagination';
import Loading from '../../utils/loading';
import AddUserForm from '../Form/addUserForm';
import usePagination from '../../hooks/usePagination';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/apiLayer';

const hiddenFields = ['_id', 'password'];

export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'male',
      address: '',
  });
  
  const {
    data: users,
    loading,
    currentPage,
    totalPages,
    paginate,
    nextPage,
    prevPage,
  } = usePagination(getUsers);

  const handleDelete = async (id) => {
    await deleteUser(id).then(({data})=>{
      handleSuccess(data.message);
    });
    paginate(currentPage);
  };
  
  const handleEdit = (id) => {
    const userToEdit = users.find(user => user._id === id);
    setFormData(userToEdit);
    setIsModalOpen(true);
  };
  
  const handleAddUser = async (newUser) => {
    await createUser(newUser).then(({data})=>{
      handleSuccess(data.message);
    });
    paginate(currentPage);
    setIsModalOpen(false);
  };

  const handleUpdateUser = async (id, updatedUser) => {
    await updateUser(id, updatedUser).then(({data})=>{
      handleSuccess(data.message);
    });
    paginate(currentPage);
    setIsModalOpen(false);
  };
  // console.log('uss',users);
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col p-1 bg-slate-300 h-[100%]">
      <h1 className='px-2 mt-2 text-4xl font-bold'>User</h1>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-violet-500 text-white px-4 py-2 rounded w-max mx-auto mb-10 flex items-center gap-2 text-lg font-semibold"
      >
        <MdAdd size={20} />&nbsp;Add User
      </button>
      <div>
        <table className="border border-violet-400">
          <thead>
            <tr>
              {Object.keys(users?.[0] || {}).filter(key => !hiddenFields.includes(key)).map((key) => (
                <th key={key} className="px-6">{camelCaseToSpace(key).toUpperCase()}</th>
              ))}
              {users.length>0 && <th>ACTIONS</th> }
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="text-center capitalize">
                {Object.entries(user).filter(([key]) => !hiddenFields.includes(key)).map(([key, value]) => (
                  <td key={key}>{typeof value === 'string' && value.includes('-') ? getDate(value) : value}</td>
                ))}
                <td>
                  <button 
                    onClick={() => handleEdit(user._id)} 
                    className="bg-yellow-500 px-2 py-1 rounded text-white mx-1"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="bg-red-500 px-2 py-1 rounded text-white mx-1"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
          users.length>0 && 
            <Pagination
            totalPosts={totalPages}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        }

      {isModalOpen && (
        <AddUserForm 
          formData={formData}
          setFormData={setFormData}
          handleAddUser={handleAddUser}
          handleUpdateUser={handleUpdateUser}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}