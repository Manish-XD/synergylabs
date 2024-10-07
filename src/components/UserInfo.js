import { useParams } from 'react-router-dom';
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

import "../css/user.css";
import { fetchUsers } from "../redux/slice/user";
import Spinner from './Spinner';

function UserInfo() 
{
    const { user: { data: users, isLoading, isError } } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { slug } = useParams();
    const [user, setUser] = useState();
    useEffect(()=>{
        if (!users) {
            // Fetch users if not already in the Redux store
            dispatch(fetchUsers());
        } else {
            // Find the user by ID
            const foundUser = users.find((item) => item.id === Number(slug));
            setUser(foundUser); // Set the found user
        }
      },[dispatch, users, slug]);
    return (
        <div>
            <Header userinfo/>
            {user ? (
                <div className='userinfo__container'>
                    {user.username && <p><em>Username:</em> {user.username}</p>}
                    {user.name && <p><em>Name:</em> {user.name}</p>}
                    {user.phone && <p><em>Phone:</em> {user.phone}</p>}
                    {user.email && <p><em>Email:</em> {user.email}</p>}
                    {(user.address || user.street) && <p><em>Street:</em> {user.address?user.address.street:user.street}</p>}
                    {(user.address || user.city) && <p><em>City:</em> {user.address?user.address.city:user.city}</p>}
                    {user.company && <p><em>company:</em> {user.company.name}</p>}
                    {user.website && <p><em>Website:</em> {user.website}</p>}
                </div>
            ) : (
                <Spinner/>
            )}
        </div>
    )
}

export default UserInfo;