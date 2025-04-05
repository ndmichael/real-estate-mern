// components/AgentList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgentCard from './AgentCard';
import { fetchVerifiedAgents, setPage } from '../redux/slices/agentSlice';

const AgentList = () => {
  const dispatch = useDispatch();
  const { agents, loading, error, currentPage, totalPages } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(fetchVerifiedAgents({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Verified Agents</h1>
      {loading && <p>Loading agents...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && agents.length === 0 && <p>No agents found.</p>}

      {agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}

      <div className="flex gap-2 justify-center mt-6">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
