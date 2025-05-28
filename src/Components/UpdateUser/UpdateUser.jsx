import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateUser.css';

const UpdateUser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [prevData, setPrevData] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = await response.json();
        setPrevData(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(`Failed to fetch user data: ${error.message}`);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const prevUserData = prevData.find(e => e._id === id);

    if (prevUserData) {
      setUser({
        name: prevUserData.name || '',
        email: prevUserData.email || '',
        password: '',
        role: prevUserData.role || '',
      });
    }
  }, [prevData, id]);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert('User Updated Successfully!');
        navigate('/userlist');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrorMessage(`An error occurred. Please try again later. ${error.message}`);
    }
  };

  return (
    <div className="sign-in-form">
      <form className="sign-in" onSubmit={updateUser}>
        <h2>Update User Info</h2>
        <input
          type="text"
          placeholder='Enter your name'
          name='name'
          value={user.name}
          onChange={changeHandler}
          required
        />
        <input
          type="email"
          placeholder='Enter your email'
          name='email'
          value={user.email}
          onChange={changeHandler}
          required
        />
        <input
          type="password"
          placeholder='Enter your password'
          name='password'
          value={user.password}
          onChange={changeHandler}
          required
        />
        <select
          name='role'
          value={user.role}
          onChange={changeHandler}
          required
        >
          <option value="">Select category</option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update User</button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default UpdateUser;
