import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from './Components/Header/Home';
import Header from './Components/Header/Header';
import Login from './Components/user/Login';
import { loadUser } from './Components/Actions/User';
import Account from './Components/user/Account';
import NewPost from './Components/Post/NewPost';
import Register from './Components/user/Register';
import UpdateProfile from './Components/user/UpdateProfile';
import Profile from './Components/user/Profile';
import Search from './Components/Search/Search';
import ErrorPage from './Components/Loader/ErrorPage';

const App = ()=>{
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(loadUser());
	}, [dispatch]);

	const {isAuthenticated} = useSelector((state)=> state.user);

  return(
    <>
        { isAuthenticated && <Header />}

        <div className="body">
            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Login/>} />
                <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
                <Route path='/account' element={isAuthenticated ? <Account /> : <Login/>} />
                <Route path='/update/profile' element={isAuthenticated ? <UpdateProfile /> : <Login/>} />
                <Route path='/newpost' element={isAuthenticated ? <NewPost /> : <Login/>} />
                <Route path='/user/:id' element={isAuthenticated ? <Profile /> : <Login/>} />
                <Route path='/search' element={isAuthenticated ? <Search/> : <Login/>} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    </>
  )
}

export default App;
