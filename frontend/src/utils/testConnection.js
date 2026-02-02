
// src/utils/testConnection.js
export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    
    // Test public endpoint
    const publicRes = await fetch('http://localhost:8000/api/public/news/');
    console.log('Public endpoint status:', publicRes.status);
    
    // Test authentication
    const authRes = await fetch('http://localhost:8000/api/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    console.log('Auth endpoint status:', authRes.status);
    
    if (authRes.ok) {
      const data = await authRes.json();
      console.log('Auth successful, token received');
      localStorage.setItem('test_token', data.access);
    }
    
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }

};