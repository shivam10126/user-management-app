import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser, fetchUser } from '../api/userApi';
import { Skeleton, Modal } from 'antd';
import { UserOutlined,EyeOutlined,DeleteOutlined,EditOutlined,FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then(response => {
        console.log(response)
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
    setUser(null); // Clear user data after closing modal
  };

  const findUser = (id) => {
    setLoading2(true);
    fetchUser(id)
      .then(response => {
        console.log(response)
        setUser(response.data[0]);
        setLoading2(false);
        setIsModalVisible(true);
      })
      .catch(() => {
        setError('Failed to fetch user');
        setLoading2(false);
      });
  };

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(() => alert('Failed to delete user'));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to /edit/:id
  };
  const handleCreate = () => {
    navigate(`/create`); // Navigate to /create
  };

  if (loading) {
    // Render 9 skeletons while loading
    return (
     <div className="p-4">
      <h1 className="text-2xl font-bold">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="p-4 border-b">
            <Skeleton active />
            <Link className="text-blue-500">View Details</Link>
            <button className="text-red-500 ml-4">Delete</button>
          </div>
        ))}
      </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border-b">
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button
              onClick={() => findUser(user.id)}
              className="bg-blue-500 px-2 py-[4px] my-3 text-white text-xl rounded-full"
            >
              <EyeOutlined />
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 ml-4 px-2 py-[4px] my-3 text-white text-xl rounded-full"
            >
              <DeleteOutlined />
            </button>
            <button
              onClick={() => handleEdit(user.id)}
              className="bg-green-500 ml-4 px-2 py-[4px] my-3 text-white text-xl rounded-full"
            >
              <EditOutlined />
            </button>
          </div>
        ))}
        <button 
        className='bg-transparent border-2 w-1/2 h-1/2 mt-auto hover:bg-slate-500 hover:text-white  duration-150 border-b-slate-900 ml-4 px-2 py-[4px] my-3 text-gray-700 text-xl rounded-lg'
        onClick={()=> handleCreate()}
        >
          Add a new user <FileAddOutlined />
        </button>
        
      </div>

      {user && (
        <Modal visible={isModalVisible} onCancel={closeModal} footer={null} title="User Details">
          {loading2 ? 
          <div className="flex items-center">
          <div className="w-1/4 flex flex-col justify-center align-middle items-center">
            <UserOutlined style={{ fontSize: '100px' }} className='mx-auto ' />
            <p className="font-bold mx-auto text-center mt-2"><Skeleton.Button active size='small' /></p>
          </div>
          <div className="w-3/4 grid grid-cols-1 gap-2">
            <div className="border p-2">
              <strong>Email:</strong> <Skeleton.Input active size='small' />
            </div>
            <div className="border p-2">
              <strong>Phone:</strong> <Skeleton.Input active size='small' />
            </div>
            <div className="border p-2">
              <strong>Address:</strong> <Skeleton.Input active size='small' />
            </div>
            <div className="border p-2">
              <strong>Website:</strong> <Skeleton.Input active size='small' />
            </div>
            <div className="border p-2">
              <strong>Current Employer:</strong> <Skeleton.Input active size='small' />
            </div>
          </div>
        </div>
        :
        <div className="flex items-center">
            <div className="w-1/4 flex flex-col justify-center align-middle items-center">
              <UserOutlined style={{ fontSize: '100px' }} className='mx-auto ' />
              <p className="font-bold mx-auto text-center mt-2">{user.name}</p>
            </div>
            <div className="w-3/4 grid grid-cols-1 gap-2">
              <div className="border p-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="border p-2">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="border p-2">
                <strong>Address:</strong> {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
              </div>
              <div className="border p-2">
                <strong>Website:</strong> {user.website}
              </div>
              <div className="border p-2">
                <strong>Current Employer:</strong> {user.company.name}
              </div>
            </div>
          </div>}
        </Modal>
      )}
    </div>
  );
};

export default Home;
