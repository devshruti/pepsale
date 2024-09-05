import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveBlock } from './slices/swimlaneSlice';
import { Button, Modal, TextField, Box } from '@mui/material';

const BlockModal = ({ open, onClose, blockId, onSave }) => {
  const { blocks } = useSelector(state => state.swimlane);
  const block = blocks.find(block => block.id === blockId);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 2, backgroundColor: 'white', margin: '50px auto', width: 300 }}>
        <h2>Block Details</h2>
        <TextField
          fullWidth
          label="Block Content"
          variant="outlined"
          value={block ? block.content : ''}
          disabled
        />
        <h3>History</h3>
        {block && block.history.map((entry, index) => (
          <div key={index}>
            <p>{entry.lane} - {new Date(entry.timestamp).toLocaleString()}</p>
          </div>
        ))}
        <Button onClick={() => onSave(blockId, block.content)} variant="contained" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { lanes, blocks } = useSelector(state => state.swimlane);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [filter, setFilter] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    // Update the block's lane and trigger the modal
    const newLane = destination.droppableId;
    setSelectedBlock(draggableId);
    setModalOpen(true);
    
    // Uncomment the following line if you want to move the block immediately without the modal
    dispatch(moveBlock({ id: draggableId, newLane }));
  };

  const handleSave = (blockId, newContent) => {
    // Save new content or lane here, based on your logic
    dispatch(moveBlock({ id: blockId, newLane: selectedBlock }));
    setModalOpen(false);
  };

  const filteredBlocks = blocks.filter(block => block.content.includes(filter));

  return (
    <>
      <input
        type="text"
        placeholder="Filter blocks"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        {lanes.map((lane, index) => (
          <Droppable droppableId={lane} key={lane}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ padding: 8, width: 250, minHeight: 500 }}
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
                        onClick={() => setSelectedBlock(block.id)}
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
      </DragDropContext>

      {selectedBlock && (
        <BlockModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          blockId={selectedBlock}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default App;
