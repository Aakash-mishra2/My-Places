import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import UsersList from '../components/UsersList';
//get request for users whenever this page loads.
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUser] = useState();

  const errorHandler = () => { setError(null); }

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUser(responseData.users);

      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading &&
        (<div className="center">
          <h2>Loading...</h2>
        </div>)
      }
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
