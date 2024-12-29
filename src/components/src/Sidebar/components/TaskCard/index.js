// src/app/components/Sidebar/components/TaskCard/index.js

'use client';

import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import Header from './components/Header';
import HeaderLocation from './components/Header/components/HeaderLocation';
import HeaderDate from './components/Header/components/HeaderDate';
import Status from './components/Status';
import ProfessionalsCounter from './components/ProfessionalsCounter';
import TaskDescription from './components/TaskDescription';
import ViewDetailsButton from './components/ViewDetailsButton';

const TaskCard = ({ task }) => {
  const { title, description, date, location, professionals, done } = task;

  return (
    <Card
      sx={{
        marginBottom: '20px',
        borderLeft: done ? '6px solid #4CAF50' : '6px solid #FF9800', // Green for done, Orange for pending
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Header title={title} />

        {/* Task Details */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '15px',
            flexWrap: 'wrap',
            gap: '15px',
          }}
        >
          {/* Location */}
          <HeaderLocation location={location} />

          {/* Date */}
          <HeaderDate date={date} />

          {/* Status */}
          <Status done={done} />

          {/* Professionals Counter */}
          <ProfessionalsCounter professionals={professionals} />
        </Box>

        {/* Task Description */}
        <TaskDescription description={description} />

        {/* View Details Button */}
        <ViewDetailsButton />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
