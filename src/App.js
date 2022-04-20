import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = { name, email };

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      });

  }

  return (
    <div className="App">
      <h1>My own data : {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' />
        <input type="email" name='email' placeholder='Email' />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map(user => <li key={user.id}>
          Id: {user.id} <br />
          Name: {user.name} <br />
          Email: {user.email} <br />
          Phone: {user.phone} <br /><br />
        </li>)
      }
    </div>
  );
}

export default App;
