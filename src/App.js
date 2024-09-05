import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveBlock, selectBlock, filterBlocks, updateBlockContent } from './slices/swimlaneSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { lanes, blocks, filter, selectedBlock } = useSelector(state => state.swimlane);
  const [modalOpen, setModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newLane = destination.droppableId;

    dispatch(moveBlock({ id: draggableId, newLane }));
    dispatch(selectBlock(draggableId));
    setModalOpen(true);
  };

  const handleSave = () => {
    dispatch(updateBlockContent({ id: selectedBlock.id, content: newContent }));
    setModalOpen(false);
  };

  const handleFilterChange = (e) => {
    dispatch(filterBlocks(e.target.value));
  };

  const filteredBlocks = blocks.filter(block => block.content.includes(filter));

  return (
    <div>
      <input
        type="text"
        placeholder="Filter tasks..."
        value={filter}
        onChange={handleFilterChange}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {lanes.map(lane => (
            <Droppable droppableId={lane} key={lane}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    padding: 8,
                    width: 250,
                    minHeight: 500,
                    backgroundColor: '#f0f0f0',
                    margin: '0 8px'
                  }}
                >
                  <h2>{lane}</h2>
                  {filteredBlocks.filter(block => block.lane === lane).map((block, index) => (
                    <Draggable draggableId={block.id} index={index} key={block.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: 16,
                            margin: '0 0 8px 0',
                            backgroundColor: 'lightgrey',
                            borderRadius: 4,
                            ...provided.draggableProps.style
                          }}
                          onClick={() => dispatch(selectBlock(block.id))}
                        >
                          {block.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {modalOpen && (
        <div className="modal">
          <h3>Edit Block</h3>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      )}

      {selectedBlock && (
        <div className="preview">
          <h3>Block Preview</h3>
          <p><strong>ID:</strong> {selectedBlock.id}</p>
          <p><strong>Content:</strong> {selectedBlock.content}</p>
          <h4>History</h4>
          <ul>
            {selectedBlock.history.map((entry, index) => (
              <li key={index}>
                <strong>{entry.lane}</strong> at {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
