import React from 'react';
import { Paper, Grid, Button, Typography } from '@mui/material';

const GameBoard = ({ board, onMove, isMyTurn, gameOver }) => {
  const renderCell = (value, index) => {
    return (
      <Button
        onClick={() => onMove(index)}
        disabled={value !== null || !isMyTurn || gameOver}
        sx={{
          width: '100%',
          height: '100%',
          aspectRatio: '1',
          fontSize: '2rem',
          color: value === 'X' ? 'primary.main' : 'secondary.main',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        {value}
      </Button>
    );
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 400,
        width: '100%',
        mx: 'auto'
      }}
    >
      <Grid container spacing={1}>
        {board.map((cell, index) => (
          <Grid item xs={4} key={index}>
            {renderCell(cell, index)}
          </Grid>
        ))}
      </Grid>
      {gameOver && (
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Game Over!
        </Typography>
      )}
    </Paper>
  );
};

export default GameBoard;
