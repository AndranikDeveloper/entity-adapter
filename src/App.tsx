import { useEffect /* useState */, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { dataApi } from "./store/request";
import { dataSelectors, deleteComment, updateComment } from "./store/slice";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<null | number>(null);
  const [editValue, setEditValue] = useState("");
  // const [id, setId] = useState(-1);
  // const total = useAppSelector(dataSelectors.selectTotal);
  // const itemById = useAppSelector((state) =>
  //   dataSelectors.selectById(state, id)
  // );
  // const entities = useAppSelector(dataSelectors.selectEntities);
  const allItems = useAppSelector(dataSelectors.selectAll);

  // console.log(entities);

  useEffect(() => {
    dispatch(dataApi());
  }, [dispatch]);

  function deleteItem(id: number) {
    dispatch(deleteComment(id));
  }
  function editItem(id: number) {
    setEditValue("");
    setEditId(id);
  }
  function saveItem(id: number) {
    dispatch(updateComment({ id, editValue }));
    setEditId(null);
  }

  return (
    <>
      <div className="comments-block">
        {allItems?.map(({ name, id }) => (
          <div key={id} className="comment">
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

                  <div className="buttons">
                    <button className="mutation" onClick={() => deleteItem(id)}>
                      Delete
                    </button>
                    <button className="mutation" onClick={() => editItem(id)}>
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
