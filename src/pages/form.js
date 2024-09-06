import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, createUser, updateUser } from '../api/userApi';
import { Input, Button, Form, message } from 'antd';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    website: '',
    company: {
      name: ''
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetchUser(id)
        .then(response => {
          const userData = response.data || {};
          setUser({
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: {
              street: (userData.address && userData.address.street) || '',
              suite: (userData.address && userData.address.suite) || '',
              city: (userData.address && userData.address.city) || '',
              zipcode: (userData.address && userData.address.zipcode) || ''
            },
            website: userData.website || '',
            company: {
              name: (userData.company && userData.company.name) || ''
            }
          });
          setLoading(false);
        })
        .catch(() => {
          message.error('Failed to fetch user data.');
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    if (isEdit) {
      updateUser(id, user)
        .then(() => {
          message.success('User updated successfully');
          navigate('/');
        })
        .catch(() => {
          message.error('Failed to update user');
        })
        .finally(() => setLoading(false));
    } else {
      createUser(user)
        .then(() => {
          message.success('User created successfully');
          navigate('/');
        })
        .catch(() => {
          message.error('Failed to create user');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl  p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit User' : 'Create User'}</h1>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={user}>
          <Form.Item label="Name" required>
            <Input name="name" value={user?.name || ''} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Username" required>
            <Input name="username" value={user?.username || ''} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input name="email" value={user?.email || ''} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Phone" required>
            <Input name="phone" value={user?.phone || ''} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Street">
            <Input name="street" value={user?.address?.street || ''} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item label="Suite">
            <Input name="suite" value={user?.address?.suite || ''} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item label="City">
            <Input name="city" value={user?.address?.city || ''} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item label="Zipcode">
            <Input name="zipcode" value={user?.address?.zipcode || ''} onChange={handleAddressChange} />
          </Form.Item>
          <Form.Item label="Website">
            <Input name="website" value={user?.website || ''} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input name="name" value={user?.company?.name || ''} onChange={handleCompanyChange} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full">
            {isEdit ? 'Update User' : 'Create User'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
