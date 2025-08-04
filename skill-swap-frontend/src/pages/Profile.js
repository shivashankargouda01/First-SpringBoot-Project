import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', type: 'teach' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`/skills/user/${user.userId}`)
      .then(res => setSkills(res.data))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, [user.userId]);

  const handleSkillAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!newSkill.name.trim()) {
      setError('Skill name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/skills/add', {
        userId: user.userId,
        name: newSkill.name.trim(),
        type: newSkill.type,
      });
      setSkills(prev => [...prev, res.data]);
      setNewSkill({ name: '', type: 'teach' });
    } catch {
      setError('Failed to add skill. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-indigo-700">{user.username}</h2>
        <button
          className="bg-red-100 text-red-700 px-4 py-1 rounded hover:bg-red-200"
          type="button"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">My Skills</h3>

      {loading ? (
        <p className="text-indigo-600 font-medium animate-pulse">Loading skills...</p>
      ) : (
        <div className="flex flex-wrap gap-3 mb-4">
          {skills.length > 0 ? skills.map(skill => (
            <span
              key={skill.id}
              className={`cursor-default select-none rounded-full px-4 py-1 text-sm font-semibold 
                ${
                  skill.type === 'teach'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg hover:from-green-500 hover:to-green-600 transition transform hover:scale-105 hover:shadow-xl'
                    : 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 shadow-md hover:from-yellow-400 hover:to-yellow-500 transition transform hover:scale-105 hover:shadow-lg'
                }
              `}
              title={`${skill.name} (${skill.type === 'teach' ? 'Can Teach' : 'Want to Learn'})`}
            >
              {skill.name} <small className="text-xs font-light">{`(${skill.type === 'teach' ? 'Teach' : 'Learn'})`}</small>
            </span>
          )) : (
            <p className="text-gray-400 italic">You haven't added any skills yet.</p>
          )}
        </div>
      )}

      <form onSubmit={handleSkillAdd} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add skill e.g. Python"
          className="border px-3 py-2 rounded flex-grow focus:outline-indigo-600"
          value={newSkill.name}
          onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
          disabled={loading}
          required
          aria-label="Skill name"
        />
        <select
          className="border rounded px-3 py-2 focus:outline-indigo-600"
          value={newSkill.type}
          onChange={e => setNewSkill({ ...newSkill, type: e.target.value })}
          disabled={loading}
          aria-label="Skill type"
        >
          <option value="teach">Can Teach</option>
          <option value="learn">Want to Learn</option>
        </select>
        <button
          type="submit"
          className={`bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400`}
          disabled={loading}
        >
          Add
        </button>
      </form>

      {error && <p className="mt-3 text-red-600">{error}</p>}

      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="mt-6 text-indigo-600 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
