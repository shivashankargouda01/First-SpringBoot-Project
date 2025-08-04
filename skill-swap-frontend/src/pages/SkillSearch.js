import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const initialRequest = {
  skillToGive: '',
  skillToGet: '',
  dateTime: '',
  phoneNumber: ''
};

const SkillSearch = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState({ skill: '', type: 'teach' });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [swapModal, setSwapModal] = useState(null);
  const [form, setForm] = useState(initialRequest);
  const [success, setSuccess] = useState('');
  const [searching, setSearching] = useState(false);

  const handleChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!search.skill.trim()) {
      setError('Please enter a skill.');
      return;
    }
    setSearching(true);
    try {
      const res = await api.get('/search', { params: search });
      setResults(res.data.filter(u => u.id !== user.userId));
      setError('');
    } catch {
      setError('No users found');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const openSwap = (recipient) => {
    setSwapModal(recipient);
    setForm(initialRequest);
    setError('');
    setSuccess('');
  };

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmitSwap = async (e) => {
    e.preventDefault();
    if (
      !form.skillToGive ||
      !form.skillToGet ||
      !form.dateTime ||
      !form.phoneNumber
    ) {
      setError('All fields required');
      return;
    }
    // Basic phone validation (10+ digits, adjust as needed)
    if (!/^[\d+ \-()]{7,}$/.test(form.phoneNumber.trim())) {
      setError('Enter a valid phone number');
      return;
    }
    try {
      await api.post('/swaps/request', {
        senderId: user.userId,
        recipientId: swapModal.id,
        requestedSkill: form.skillToGive,
        desiredSkill: form.skillToGet,
        proposedDateTime: form.dateTime,
        phoneNumber: form.phoneNumber
      });
      setSuccess('Swap request sent!');
      setTimeout(() => setSwapModal(null), 1500); // Hide modal after short delay
    } catch {
      setError('Failed to send request');
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: 560,
    margin: '40px auto',
    background: '#fff',
    borderRadius: 12,
    padding: '32px 32px 28px 32px',
    boxShadow: '0 6px 24px rgba(70,70,150,0.09)',
  };

  const headingStyle = {
    fontWeight: 800,
    fontSize: '2rem',
    color: '#3730a3',
    marginBottom: 24,
    letterSpacing: '-1px',
  };

  const formStyle = {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 28,
  };

  const inputStyle = {
    border: '1px solid #b5b8ec',
    borderRadius: 6,
    padding: '10px 16px',
    fontSize: '1.05rem',
    minWidth: 140,
    flex: 1,
  };

  const selectStyle = {
    border: '1px solid #b5b8ec',
    borderRadius: 6,
    padding: '10px 12px',
    fontSize: '1.06rem',
  };

  const buttonStyle = {
    background: '#4338ca',
    color: 'white',
    padding: '11px 32px',
    borderRadius: 7,
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1.05rem',
    boxShadow: '0 2px 6px rgba(100,80,180,0.10)',
    cursor: 'pointer',
    transition: 'background .2s',
  };

  const listStyle = { paddingLeft: '4px', marginTop: 8 };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18,
    padding: 0,
    borderRadius: 8,
  };

  const dotStyle = {
    fontSize: '1.38rem',
    color: '#4338ca',
    marginRight: 10,
  };

  const usernameStyle = {
    flex: 1,
    fontWeight: 500,
    color: '#1f2937',
    fontSize: '1.13rem',
  };

  const emailStyle = {
    color: '#6366f1',
    fontSize: '0.98rem',
    fontWeight: 400,
  };

  const swapButtonStyle = {
    marginLeft: 12,
    padding: '7px 18px',
    borderRadius: 7,
    border: '1px solid #d8d8f2',
    background: '#f1f5ff',
    color: '#4e46e5',
    fontWeight: 600,
    fontSize: '1rem',
    boxShadow: '0 1px 4px rgba(70,80,150,0.07)',
    cursor: 'pointer',
    transition: 'background .15s, color .13s',
  };

  const noUsersStyle = {
    fontStyle: 'italic',
    color: '#7e7e91',
    marginTop: 12,
  };

  // Modal input style
  const modalInputStyle = {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #b5b8ec',
    marginBottom: 0,
    outline: 'none'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Find Skill Swap Partners</h2>

      <form onSubmit={handleSearch} style={formStyle}>
        <input
          name="skill"
          value={search.skill}
          onChange={handleChange}
          placeholder="Skill (e.g. Python)"
          style={inputStyle}
        />
        <select name="type" value={search.type} onChange={handleChange} style={selectStyle}>
          <option value="teach">Can Teach</option>
          <option value="learn">Want To Learn</option>
        </select>
        <button type="submit" style={buttonStyle} disabled={searching}>
          {searching ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && !swapModal && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}

      {results.length === 0 && !searching && !error && (
        <div style={noUsersStyle}>No users found</div>
      )}

      {results.length > 0 && (
        <ul style={listStyle}>
          {results.map(u => (
            <li key={u.id} style={listItemStyle}>
              <span style={dotStyle}>•</span>
              <span style={usernameStyle}>
                {u.username}{' '}
                {u.email && <span style={emailStyle}>({u.email})</span>}
              </span>
              <button
                style={swapButtonStyle}
                onClick={() => openSwap(u)}
              >
                Send Swap Request
              </button>
            </li>
          ))}
        </ul>
      )}

      {swapModal && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: '#0004',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 24,
              borderRadius: 14,
              width: '350px',
              boxShadow: '0 4px 16px rgba(60,60,100,0.14)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 18, color: '#2d2369', fontWeight: 700 }}>
              Propose Swap with {swapModal.username}
            </h3>
            <form
              onSubmit={handleSubmitSwap}
              style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 0 }}
            >
              <input
                name="skillToGive"
                placeholder="Skill you teach"
                value={form.skillToGive}
                onChange={handleFormChange}
                style={modalInputStyle}
                autoFocus
              />
              <input
                name="skillToGet"
                placeholder="Skill you want"
                value={form.skillToGet}
                onChange={handleFormChange}
                style={modalInputStyle}
              />
              <input
                name="phoneNumber"
                placeholder="Your phone number"
                value={form.phoneNumber}
                onChange={handleFormChange}
                style={modalInputStyle}
                type="tel"
                autoComplete="tel"
                pattern="[0-9+\-\s()]{7,}"
                title="Please enter a valid phone number"
              />
              <input
                name="dateTime"
                type="datetime-local"
                value={form.dateTime}
                onChange={handleFormChange}
                style={modalInputStyle}
              />
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button
                  type="submit"
                  style={{
                    ...buttonStyle,
                    flex: 1,
                    padding: '13px 0',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setSwapModal(null)}
                  style={{
                    flex: 1,
                    padding: '13px 0',
                    background: '#f1f5ff',
                    borderRadius: 7,
                    border: '1px solid #d8d8f2',
                    color: '#4e46e5',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillSearch;
