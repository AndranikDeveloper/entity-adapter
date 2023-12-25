import React, { useState } from 'react';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addComment, dataSelectors } from '../../store/slice';

interface IModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<IModalProps> = ({ setIsModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const comments = useAppSelector(dataSelectors.selectAll);
  const dispatch = useAppDispatch();

  function submit() {
    setIsModal(false);
    const latestId = comments[comments.length - 1].id;
    dispatch(addComment({ id: latestId + 1, postId: 1, name, email, body }));
  }
  return (
    <div className='modal'>
      <div
        className='modal-bgc'
        onClick={() => setIsModal((prev) => !prev)}
      ></div>

      <div className='modal-content'>
        <form onSubmit={submit}>
          <div className='inputs'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='item-input'
              placeholder='Email'
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='item-input'
              placeholder='Name'
            />
            <input
              value={body}
              onChange={(e) => setBody(e.target.value)}
              type='text'
              className='item-input'
              placeholder='Body'
            />

            <button className='btn' type='submit'>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
