import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lanes: ["Backlog", "In Progress", "Review", "Done"],
  blocks: [
    { id: '1', content: 'Task 1', lane: 'Backlog', history: [] },
    { id: '2', content: 'Task 2', lane: 'Backlog', history: [] },
  ],
  config: {
    "Backlog": ["In Progress"],
    "In Progress": ["Review", "Done"],
    "Review": ["Done"],
    "Done": []
  }
};

const swimlaneSlice = createSlice({
  name: 'swimlane',
  initialState,
  reducers: {
    moveBlock: (state, action) => {
      const { id, newLane } = action.payload;
      const block = state.blocks.find(block => block.id === id);
      if (block) {
        const allowedTransitions = state.config[block.lane];
        if (allowedTransitions.includes(newLane)) {
          block.lane = newLane;
          block.history.push({ lane: newLane, timestamp: new Date().toISOString() });
        }
      }
    },
    addBlock: (state, action) => {
      state.blocks.push(action.payload);
    }
  }
});

export const { moveBlock, addBlock } = swimlaneSlice.actions;
export default swimlaneSlice.reducer;
