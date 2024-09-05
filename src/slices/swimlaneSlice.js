import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lanes: ['To Do', 'In Progress', 'Done'],
  blocks: [
    { id: 'block-1', content: 'Task 1', lane: 'To Do', history: [] },
    { id: 'block-2', content: 'Task 2', lane: 'In Progress', history: [] },
    { id: 'block-3', content: 'Task 3', lane: 'Done', history: [] },
  ],
  config: {
    'To Do': ['In Progress'],
    'In Progress': ['To Do', 'Done'],
    'Done': [],
  },
  selectedBlock: null,
  filter: '',
};

const swimlaneSlice = createSlice({
  name: 'swimlane',
  initialState,
  reducers: {
    moveBlock: (state, action) => {
      const { id, newLane } = action.payload;
      const block = state.blocks.find(block => block.id === id);
      if (block && state.config[block.lane].includes(newLane)) {
        block.history.push({
          lane: newLane,
          timestamp: new Date().toISOString(),
        });
        block.lane = newLane;
      }
    },
    selectBlock: (state, action) => {
      state.selectedBlock = state.blocks.find(block => block.id === action.payload);
    },
    filterBlocks: (state, action) => {
      state.filter = action.payload;
    },
    updateBlockContent: (state, action) => {
      const { id, content } = action.payload;
      const block = state.blocks.find(block => block.id === id);
      if (block) {
        block.content = content;
      }
    },
  },
});

export const { moveBlock, selectBlock, filterBlocks, updateBlockContent } = swimlaneSlice.actions;
export default swimlaneSlice.reducer;
