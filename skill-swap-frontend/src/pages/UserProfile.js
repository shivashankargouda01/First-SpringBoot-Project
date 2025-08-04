import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(res => { setProfile(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading user profile...</div>;

  if (!profile) return <div className="p-4 text-red-600">User not found.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-12">
      <button
        className="mb-6 text-indigo-600 hover:underline"
        onClick={() => navigate('/')}
        type="button"
      >
        &larr; Back to Dashboard
      </button>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">{profile.username}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {profile.skills?.length > 0 ? profile.skills.map(skill => (
            <span
              key={skill.id}
              className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm"
            >
              {skill.name} ({skill.type})
            </span>
          )) : (
            <p className="text-gray-500 italic">This user has not listed any skills.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
