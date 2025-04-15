import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgentCard from '../components/AgentCard';
import { fetchVerifiedAgents, setPage } from '../redux/agentSlice';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  Container
} from '@mui/material';

const AgentList = () => {
  const dispatch = useDispatch();
  const { agents, loading, error, currentPage, totalPages } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(fetchVerifiedAgents({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (_, page) => {
    dispatch(setPage(page));
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        px: { xs: 2, sm: 3 },
        py: 3
      }}
    >
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        All Agents
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && agents.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No agents found.
        </Alert>
      )}

      <Stack spacing={3} sx={{ mb: 4 }}>
        {agents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </Stack>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
          />
        </Box>
      )}
    </Box>
    </Container>
  );
};

export default AgentList;



