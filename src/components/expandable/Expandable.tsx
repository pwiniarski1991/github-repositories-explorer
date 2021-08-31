import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, memo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposByUser } from '../../store';
import { Repo } from '../../types/repo';
import { RootState } from '../../types/rootState';
import { RepoState } from '../../types/state';
import './Expandable.css';

interface Props {
  user: { id: number, login: string };
}

const BaseExpandable: FC<Props> = ({ user }) => {
  const isLoaded = useRef(false);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector<RootState>(state => state.repos) as RepoState;

  const onClick = () => {
    if (!isLoaded.current) {
      dispatch(fetchReposByUser(user));
      isLoaded.current = true;
    }
    setOpen(!isOpen);
  }
  const openClassName = isOpen && list ? 'expanded' : '';
  return (
    <div className={`expandable-container ${openClassName}`}>
      <button aria-controls="content" className="expandable-header" onClick={onClick} aria-expanded={isOpen}>
        {user.login}
        <FontAwesomeIcon className={isOpen && list ? 'arrow-down-icon expanded' : 'arrow-down-icon'} icon={faChevronDown} />
      </button>
      <div id="content" className="expandable-body">
        {list.data[user.id] ? list.data[user.id].map((repo: Repo) => (
          <div key={repo.id} className="expandable-item">
            <div className="expandable-data">
              <span className="reponame">{repo.name}</span>
              <div>{repo.description}</div>
            </div>
            <div className="expandable-stars">
              <span className="stars-count">{repo.stargazers_count}</span>
              <FontAwesomeIcon className="stars-icon" icon={faStar} />
            </div>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export const Expandable = memo(BaseExpandable)
