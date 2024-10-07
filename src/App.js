import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons'

import UserInfo from './components/UserInfo';
import Header from './components/Header';
import Table from './components/Table';

import "./css/app.css"

function App() 
{
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<div className='app'>
          <Header/>
          <div className='app__body'>
            <div className='app__header'>

            <h1>Users:</h1>
            <div className='search__container'>
            <input 
                  type="text" 
                  placeholder="Search by username..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
            <Search2Icon/>
            </div>
            </div>
            <hr/>
            <Table searchTerm={searchTerm}/>
            {/* <button onClick={(e) => dispatch(fetchUsers())}>Fetch Users</button>
      {state.user.data && state.user.data.map((e) => <li>{e.username}</li>)} */}
          </div>
        </div>}/>
        <Route path="/user/:slug" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
