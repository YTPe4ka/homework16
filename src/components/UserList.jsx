import React from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get('https://dummyjson.com/users');
  return data.users;
};

const UserList = () => {
  const { data, isLoading, error } = useQuery('users', fetchUsers);

  if (isLoading) {
    toast.info('Loading users...');
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error('Error fetching users!');
    return <div>Error fetching users!</div>;
  }

  return (
    <div className="user-list">
      {data.map((user) => (
        <div key={user.id} className="user-card">
          <img
            src={`https://i.pravatar.cc/150?img=${user.id}`} 
            alt={`${user.firstName} ${user.lastName}`}
            className="user-avatar"
          />
          <div className="user-info">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Email: <span>{user.email}</span></p>
            <p>Phone: <span>{user.phone}</span></p>
            <button onClick={() => toast.info(`User: ${user.firstName} ${user.lastName}`)}>
              More Info
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
