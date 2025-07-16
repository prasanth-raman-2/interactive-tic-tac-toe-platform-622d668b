import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const GameHistory = ({ history }) => {
  return (
    <Paper 
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 400,
        width: '100%',
        maxHeight: 300,
        overflow: 'auto'
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Game History
      </Typography>
      <List>
        {history.map((game, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Game #${game.id}`}
              secondary={`Winner: ${game.winner || 'Draw'}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GameHistory;
