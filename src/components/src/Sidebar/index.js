// src/app/components/Sidebar/index.js

'use client';

import { Box } from '@mui/material';
import TaskCard from './components/TaskCard';

const tasks = [
  {
    title: 'Fix plumbing issue in the bathroom',
    description: 'A leaking faucet and clogged drain need urgent attention.',
    date: 'Posted: Dec 15, 2024',
    location: 'New York, NY',
    professionals: 12,
    done: false,
  },
  {
    title: 'Translate a legal document to Spanish',
    description: 'Certified translator needed for a 10-page document.',
    date: 'Posted: Dec 14, 2024',
    location: 'Los Angeles, CA',
    professionals: 8,
    done: true,
  },
  {
    title: 'Math tutoring for Grade 9 student',
    description: 'Looking for an experienced math tutor for weekly lessons.',
    date: 'Posted: Dec 13, 2024',
    location: 'Chicago, IL',
    professionals: 15,
    done: false,
  },
  {
    title: 'Painting kitchen walls',
    description: 'Professional painter required for a 15x20 ft kitchen.',
    date: 'Posted: Dec 12, 2024',
    location: 'Houston, TX',
    professionals: 5,
    done: true,
  },
  // Add more tasks as needed
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '350px' },
        padding: '20px',
        backgroundColor: '#1A202C',
        overflowY: 'auto',
        height: '100vh', // Ensures the sidebar takes full viewport height
      }}
    >
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </Box>
  );
};

export default Sidebar;
