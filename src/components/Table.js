import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Skeleton from "./Skeleton";
import { fetchUsers } from "../redux/slice/user";
import TableRow from "./TableRow";
import "../css/table.css";

function Table({ searchTerm }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUsers()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const filteredUsers = state.user.data?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table">
      <div className="tableHeader">
        <div className="id">
          <span>ID</span>
        </div>
        <div className="username">
          <span>Username</span>
        </div>
        <div className="name">
          <span>Name</span>
        </div>
        <div className="phone">
          <span>Phone</span>
        </div>
        <div className="email">
          <span>Email</span>
        </div>
        <div className="buttons">
        </div>
      </div>
      <div className="tableBody">
        {isLoading && <Skeleton />}
        {!isLoading && filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={user.id}>
              <TableRow {...user} index={index} />
            </div>
          ))
        ) : (
          !isLoading && <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default Table;
