import React, { useState, useEffect } from 'react';
import OpenCamera from '../components/OpenCamera';

function FaceLogin() {
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFaceDescriptors = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('http://localhost:5000/api/users/face-descriptor');
        
        if (response.ok) {
          const data = await response.json();
          setFaceDescriptors(data);
          console.log('Face descriptors loaded:', data);
        } else {
          const errorData = await response.json();
          setError(`Failed to load face descriptors: ${errorData.message || 'Unknown error'}`);
        }
      } catch (err) {
        setError('Network error. Please check if the server is running.');
        console.error('Error fetching face descriptors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaceDescriptors();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Face Login</h2>
      
      {loading && (
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Loading face descriptors...
        </p>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '0.75rem', 
          borderRadius: '6px', 
          border: '1px solid #f5c6cb',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {!loading && !error && (
        <p style={{ color: '#28a745', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {faceDescriptors.length} face descriptor(s) loaded successfully
        </p>
      )}
      
      <OpenCamera />
    </div>
  );
}

export default FaceLogin;
