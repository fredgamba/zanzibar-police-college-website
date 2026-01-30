<<<<<<< HEAD
// src/components/DebugPosts.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function DebugPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [rawData, setRawData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('posts/');
        console.log('DEBUG - All posts:', response.data);
        setAllPosts(response.data);
        setRawData(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error('DEBUG - Error:', error);
        setRawData('Error: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <h2>Debug Posts Data</h2>
      <p>Total Posts: {allPosts.length}</p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Posts List:</h3>
          {allPosts.map(post => (
            <div key={post.id} style={{ 
              marginBottom: '10px', 
              padding: '10px', 
              border: '1px solid #ddd',
              background: post.is_published ? '#e8f5e8' : '#ffebee'
            }}>
              <strong>{post.title}</strong>
              <div>Type: {post.post_type}</div>
              <div>Published: {post.is_published ? 'Yes' : 'No'}</div>
              <div>Date: {new Date(post.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3>Raw JSON:</h3>
          <pre style={{ 
            background: '#333', 
            color: '#fff', 
            padding: '10px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {rawData}
          </pre>
        </div>
      </div>
    </div>
  );
=======
// src/components/DebugPosts.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function DebugPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [rawData, setRawData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('posts/');
        console.log('DEBUG - All posts:', response.data);
        setAllPosts(response.data);
        setRawData(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error('DEBUG - Error:', error);
        setRawData('Error: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <h2>Debug Posts Data</h2>
      <p>Total Posts: {allPosts.length}</p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Posts List:</h3>
          {allPosts.map(post => (
            <div key={post.id} style={{ 
              marginBottom: '10px', 
              padding: '10px', 
              border: '1px solid #ddd',
              background: post.is_published ? '#e8f5e8' : '#ffebee'
            }}>
              <strong>{post.title}</strong>
              <div>Type: {post.post_type}</div>
              <div>Published: {post.is_published ? 'Yes' : 'No'}</div>
              <div>Date: {new Date(post.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3>Raw JSON:</h3>
          <pre style={{ 
            background: '#333', 
            color: '#fff', 
            padding: '10px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {rawData}
          </pre>
        </div>
      </div>
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}