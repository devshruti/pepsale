# Swimlane UI

## Overview

The Swimlane UI is a React.js application designed to facilitate drag-and-drop functionality across lanes that represent various stages or states of tasks. The interface is configurable, allowing or restricting blocks from moving to specific stages based on predefined rules. The application also includes features such as data entry upon block transitions, block preview with history, and a top-level filter mechanism.

## Features

- **Drag-and-Drop:** Move blocks between lanes representing different stages.
- **Configurable Rules:** Restrict or allow block movements between lanes based on a master configuration.
- **Data Entry Prompt:** On moving a block, the UI prompts the user to update the block's content.
- **Block Preview:** Click on any block to view its details and history of state transitions.
- **Filtering:** Filter blocks based on their content using a top-level filter input.

## Tech Stack

- **Frontend:** React.js, Redux
- **Drag-and-Drop:** `react-beautiful-dnd`
- **Styling:** CSS

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/swimlane-ui.git
   cd swimlane-ui
   
2. **Install Dependencies**
    npm install

3. **Run the Application**
   npm start
