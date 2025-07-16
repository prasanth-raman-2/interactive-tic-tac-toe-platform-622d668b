import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import GameBoard from './GameBoard';
import GameHistory from './GameHistory';
import { createGame, makeMove, getGameHistory, getCurrentGame } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await getGameHistory();
      setHistory(historyData);
    } catch (err) {
      setError('Failed to load game history');
    }
  };

  const handleNewGame = async () => {
    try {
      const game = await createGame();
      setCurrentGame(game);
      setError(null);
    } catch (err) {
      setError('Failed to create new game');
    }
  };

  const handleMove = async (position) => {
    if (!currentGame) return;
    
    try {
      const updatedGame = await makeMove(currentGame.id, position);
      setCurrentGame(updatedGame);
      
      if (updatedGame.winner || updatedGame.isDraw) {
        await loadHistory();
      }
    } catch (err) {
      setError('Failed to make move');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Welcome, {user?.username}!
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleNewGame}
              sx={{ mb: 2 }}
            >
              New Game
            </Button>
          </Box>
          {currentGame && (
            <GameBoard
              board={currentGame.board}
              onMove={handleMove}
              isMyTurn={currentGame.currentPlayer === user?.id}
              gameOver={currentGame.winner || currentGame.isDraw}
            />
          )}
          {currentGame?.winner && (
            <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
              Winner: {currentGame.winner === user?.id ? 'You' : 'Opponent'}
            </Typography>
          )}
          {currentGame?.isDraw && (
            <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
              Game ended in a draw!
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <GameHistory history={history} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
