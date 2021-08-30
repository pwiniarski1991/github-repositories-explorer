import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from './types/rootState';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserState } from './types/state';
import { fetchUsersByName } from './store';
import { Expandable } from './components/expandable/Expandable';

function App() {
  const dispatch = useDispatch();
  const users = useSelector<RootState>(state => state.users) as UserState;
  const [value, setValue] = useState('');

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const onClick = () => {
    dispatch(fetchUsersByName(value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Github repos explorer</h1>
        <div className="App-container App-column">
          <input className="App-input" type="text" onChange={onChange} value={value} placeholder="Enter username" />
          <button className="App-button" onClick={onClick}>search</button>
        </div>
      </header>
      <div className="App-container">
        {`Showing users for "${value}"`}
        {users.isLoading ? <FontAwesomeIcon className="App-spinner" size="4x" icon={faSpinner} spin /> : null}
        {!users.error && users.data.length ?
          <>
            {users.data.map(user => (
              <Expandable key={user.id} user={user} />
            ))}
          </>
          : <p>{users.error}</p>}
      </div>
    </div>
  );
}

export default App;
