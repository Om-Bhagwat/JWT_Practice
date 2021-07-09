import React, { useState } from 'react';


import Login from '../src/Components/Login/Login';
import './App.css';

function App() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');



  return (
    <div>
      <Login name={name} setName={setName} email = {email} setEmail={setEmail} password = {password} setPassword={setPassword} />
    </div>
  );
}

export default App;
