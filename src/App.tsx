import { useEffect /* useState */, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { dataApi } from './store/request';
import {
  dataSelectors,
  deleteComment,
  removeComments,
  removeSelected,
  updateComment,
} from './store/slice';
import { Modal } from './components/modal';

// const [id, setId] = useState(-1);
// const total = useAppSelector(dataSelectors.selectTotal);
// const itemById = useAppSelector((state) =>
//   dataSelectors.selectById(state, id)
// );
// const entities = useAppSelector(dataSelectors.selectEntities);

function App() {
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<null | number>(null);
  const [editValue, setEditValue] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const allItems = useAppSelector(dataSelectors.selectAll);

  useEffect(() => {
    dispatch(dataApi());
  }, [dispatch]);

  function deleteItem(id: number) {
    dispatch(deleteComment(id));
  }
  function editItem(id: number) {
    setEditValue('');
    setEditId(id);
  }
  function saveItem(id: number) {
    setEditId(null);
    dispatch(updateComment({ id, editValue }));
  }
  function deleteAll() {
    dispatch(removeComments());
  }
  function handleCheckBox(id: number) {
    setSelected((prev) => [...prev, id]);
  }

  return (
    <>
      <div className='comments-block'>
        {allItems?.map(({ name, id }) => (
          <div key={id} className='comment'>
            <div>
              <h1>{id}</h1>
              {editId === id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveItem(id)}>Save</button>
                </>
              ) : (
                <>
                  {name}

                  <div className='buttons'>
                    <button className='mutation' onClick={() => deleteItem(id)}>
                      Delete
                    </button>
                    <button className='mutation' onClick={() => editItem(id)}>
                      Edit
                    </button>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '20px',
                      }}
                    >
                      <h6>Select for Delete</h6>
                      <input
                        type='checkbox'
                        onChange={() => handleCheckBox(id)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div
          style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
        >
          <button className='add-btn' onClick={() => setIsModal(true)}>
            Add New Comment
          </button>
          <div>
            <button className='add-btn delete' onClick={deleteAll}>
              Remove
            </button>
            <button
              className='add-btn selected'
              onClick={() => dispatch(removeSelected(selected))}
            >
              Remove Selected
            </button>
          </div>
        </div>
        {isModal && <Modal setIsModal={setIsModal} />}
      </div>
    </>
  );
}

export default App;
