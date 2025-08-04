import React, { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MySwaps = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    api.get(`/swaps/pending/${user.userId}`)
      .then(res => setIncoming(res.data))
      .catch(() => setError('Failed to load incoming requests'));

    api.get(`/swaps/sent/${user.userId}`)
      .then(res => setOutgoing(res.data))
      .catch(() => setError('Failed to load outgoing requests'));
  }, [user]);

  const handleRespond = async (swapId, status) => {
    try {
      await api.patch(`/swaps/status/${swapId}?status=${status}`);
      setIncoming(incoming.filter(req => req.id !== swapId));
    } catch {
      setError('Failed to update request status');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        className="mb-6 text-indigo-600 hover:underline"
        onClick={() => navigate('/')}
        type="button"
      >
        &larr; Back to Dashboard
      </button>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Incoming Swap Requests</h2>
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">{error}</div>
      )}

      {incoming.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded mb-8">
          You have no pending incoming swap requests.
        </div>
      ) : (
        <ul className="space-y-4">
          {incoming.map(req => (
            <li className="bg-white rounded shadow p-4" key={req.id}>
              <p><strong>From:</strong> {req.sender?.username || 'Unknown'}</p>
              <p><strong>Skill Wanted:</strong> {req.desiredSkill}</p>
              <p><strong>Skill Offered:</strong> {req.requestedSkill}</p>
              <p><strong>Phone:</strong> {req.phoneNumber || 'N/A'}</p>
              <p><strong>Proposed Time:</strong> {new Date(req.proposedDateTime).toLocaleString()}</p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleRespond(req.id, 'ACCEPTED')}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  type="button"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRespond(req.id, 'REJECTED')}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  type="button"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4">Outgoing Swap Requests</h2>
      {outgoing.length === 0 ? (
        <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded">
          You have not sent any swap requests.
        </div>
      ) : (
        <ul className="space-y-4">
          {outgoing.map(req => (
            <li className="bg-white rounded shadow p-4" key={req.id}>
              <p><strong>To:</strong> {req.recipient?.username || 'Unknown'}</p>
              <p><strong>Skill Offered:</strong> {req.requestedSkill}</p>
              <p><strong>Skill Wanted:</strong> {req.desiredSkill}</p>
              <p><strong>Phone:</strong> {req.phoneNumber || 'N/A'}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Proposed Time:</strong> {new Date(req.proposedDateTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySwaps;
