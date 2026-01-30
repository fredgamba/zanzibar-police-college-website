<<<<<<< HEAD
// src/pages/admin/AdminNews.jsx - COMPLETELY FIXED
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Edit,
  Trash2,
  Search,
  PlusCircle,
  Calendar,
  Eye,
  AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('news/');
      
      // 🔥 COMPLETE FIX: Handle all possible API response formats
      let newsData = [];
      
      if (res.data && Array.isArray(res.data)) {
        // Filter out invalid data and ensure proper objects
        newsData = res.data
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined && 
            item.id !== null &&
            item.title !== undefined
          )
          .map(item => ({
            // Ensure all required properties with safe defaults
            id: item.id || 0,
            title: item.title || 'Untitled News',
            content: item.content || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            // 🔥 FIX: Safe substring with proper fallback
            shortContent: String(item.content || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else if (res.data && typeof res.data === 'object') {
        // Handle object response - convert to array
        const newsArray = Object.values(res.data);
        newsData = newsArray
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined
          )
          .map(item => ({
            id: item.id || 0,
            title: item.title || 'Untitled News',
            content: item.content || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            shortContent: String(item.content || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else {
        console.warn('Unexpected news data format:', res.data);
        // Fallback to empty array
        newsData = [];
      }
      
      console.log('Processed news data:', newsData);
      setNews(newsData);
      
    } catch (err) {
      console.error('Failed to load news:', err);
      setError('Failed to load news. Please try again.');
      setNews([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Safe search filter
  const filteredNews = news.filter(item => {
    if (!item || typeof item !== 'object') return false;
    
    const searchLower = searchTerm.toLowerCase();
    const title = String(item.title || '');
    const content = String(item.content || '');
    const excerpt = String(item.excerpt || '');
    
    return (
      title.toLowerCase().includes(searchLower) ||
      content.toLowerCase().includes(searchLower) ||
      excerpt.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (id, title) => {
    if (!id) {
      alert('Invalid news ID');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`news/${id}/`);
        setNews(news.filter(item => item.id !== id));
        alert('News deleted successfully!');
      } catch (err) {
        console.error('Delete news error:', err);
        alert('Error deleting news. Please try again.');
      }
    }
  };

  // Helper function
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-actions">
            <div>
              <h1>News Management</h1>
              <p>Manage news articles and announcements</p>
            </div>
            <Link to="/admin/news/create" className="btn-primary">
              <PlusCircle size={18} />
              Add New News
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-banner" style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button 
              onClick={fetchNews}
              style={{
                marginLeft: 'auto',
                background: '#c62828',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Search Box */}
        <div className="search-box" style={{ marginBottom: '2rem' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search news by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* News Grid */}
        <div className="news-container">
          {loading ? (
            <div className="loading">Loading news...</div>
          ) : filteredNews.length > 0 ? (
            <div className="news-grid">
              {filteredNews.map(item => (
                // 🔥 FIX: Proper key prop and safe rendering
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  onEdit={() => navigate(`/admin/news/edit/${item.id}`)}
                  onDelete={() => handleDelete(item.id, item.title)}
                  onView={() => navigate(`/news/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-news" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <Newspaper size={48} color="#ccc" />
              <h3>No news found</h3>
              <p>
                {news.length > 0 
                  ? 'Try changing your search terms' 
                  : 'No news articles available'
                }
              </p>
              <Link to="/admin/news/create" className="btn-primary">
                <PlusCircle size={18} />
                Create News
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 NEW: Extract NewsCard component for better error handling
const NewsCard = ({ item, onEdit, onDelete, onView }) => {
  if (!item || typeof item !== 'object') {
    return null; // Skip invalid items
  }

  return (
    <div className="news-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    }}>
      <div className="news-header" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#1c236d',
            fontSize: '1.2rem',
            lineHeight: '1.4'
          }}>
            {item.title || 'Untitled News'}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <Calendar size={14} />
            <span>{item.formattedDate || 'Unknown date'}</span>
          </div>
        </div>
      </div>

      <div className="news-content" style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: '#555',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {item.shortContent || 'No content available'}
        </p>
      </div>

      <div className="news-actions" style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={onView}
          className="action-btn view"
          style={{
            background: 'transparent',
            color: '#1c236d',
            border: '1px solid #1c236d',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Eye size={14} />
          View
        </button>
        
        <button 
          onClick={onEdit}
          className="action-btn edit"
          style={{
            background: '#1c236d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Edit size={14} />
          Edit
        </button>
        
        <button 
          onClick={onDelete}
          className="action-btn delete"
          style={{
            background: 'transparent',
            color: '#d32f2f',
            border: '1px solid #d32f2f',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

// AdminNavbar component (same as above)
const AdminNavbar = () => {
  // ... same AdminNavbar implementation as above
=======
// src/pages/admin/AdminNews.jsx - COMPLETELY FIXED
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Edit,
  Trash2,
  Search,
  PlusCircle,
  Calendar,
  Eye,
  AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('news/');
      
      // 🔥 COMPLETE FIX: Handle all possible API response formats
      let newsData = [];
      
      if (res.data && Array.isArray(res.data)) {
        // Filter out invalid data and ensure proper objects
        newsData = res.data
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined && 
            item.id !== null &&
            item.title !== undefined
          )
          .map(item => ({
            // Ensure all required properties with safe defaults
            id: item.id || 0,
            title: item.title || 'Untitled News',
            content: item.content || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            // 🔥 FIX: Safe substring with proper fallback
            shortContent: String(item.content || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else if (res.data && typeof res.data === 'object') {
        // Handle object response - convert to array
        const newsArray = Object.values(res.data);
        newsData = newsArray
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined
          )
          .map(item => ({
            id: item.id || 0,
            title: item.title || 'Untitled News',
            content: item.content || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            shortContent: String(item.content || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else {
        console.warn('Unexpected news data format:', res.data);
        // Fallback to empty array
        newsData = [];
      }
      
      console.log('Processed news data:', newsData);
      setNews(newsData);
      
    } catch (err) {
      console.error('Failed to load news:', err);
      setError('Failed to load news. Please try again.');
      setNews([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Safe search filter
  const filteredNews = news.filter(item => {
    if (!item || typeof item !== 'object') return false;
    
    const searchLower = searchTerm.toLowerCase();
    const title = String(item.title || '');
    const content = String(item.content || '');
    const excerpt = String(item.excerpt || '');
    
    return (
      title.toLowerCase().includes(searchLower) ||
      content.toLowerCase().includes(searchLower) ||
      excerpt.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (id, title) => {
    if (!id) {
      alert('Invalid news ID');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`news/${id}/`);
        setNews(news.filter(item => item.id !== id));
        alert('News deleted successfully!');
      } catch (err) {
        console.error('Delete news error:', err);
        alert('Error deleting news. Please try again.');
      }
    }
  };

  // Helper function
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-actions">
            <div>
              <h1>News Management</h1>
              <p>Manage news articles and announcements</p>
            </div>
            <Link to="/admin/news/create" className="btn-primary">
              <PlusCircle size={18} />
              Add New News
            </Link>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-banner" style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button 
              onClick={fetchNews}
              style={{
                marginLeft: 'auto',
                background: '#c62828',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Search Box */}
        <div className="search-box" style={{ marginBottom: '2rem' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search news by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* News Grid */}
        <div className="news-container">
          {loading ? (
            <div className="loading">Loading news...</div>
          ) : filteredNews.length > 0 ? (
            <div className="news-grid">
              {filteredNews.map(item => (
                // 🔥 FIX: Proper key prop and safe rendering
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  onEdit={() => navigate(`/admin/news/edit/${item.id}`)}
                  onDelete={() => handleDelete(item.id, item.title)}
                  onView={() => navigate(`/news/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-news" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <Newspaper size={48} color="#ccc" />
              <h3>No news found</h3>
              <p>
                {news.length > 0 
                  ? 'Try changing your search terms' 
                  : 'No news articles available'
                }
              </p>
              <Link to="/admin/news/create" className="btn-primary">
                <PlusCircle size={18} />
                Create News
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 NEW: Extract NewsCard component for better error handling
const NewsCard = ({ item, onEdit, onDelete, onView }) => {
  if (!item || typeof item !== 'object') {
    return null; // Skip invalid items
  }

  return (
    <div className="news-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    }}>
      <div className="news-header" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#1c236d',
            fontSize: '1.2rem',
            lineHeight: '1.4'
          }}>
            {item.title || 'Untitled News'}
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <Calendar size={14} />
            <span>{item.formattedDate || 'Unknown date'}</span>
          </div>
        </div>
      </div>

      <div className="news-content" style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: '#555',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {item.shortContent || 'No content available'}
        </p>
      </div>

      <div className="news-actions" style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={onView}
          className="action-btn view"
          style={{
            background: 'transparent',
            color: '#1c236d',
            border: '1px solid #1c236d',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Eye size={14} />
          View
        </button>
        
        <button 
          onClick={onEdit}
          className="action-btn edit"
          style={{
            background: '#1c236d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Edit size={14} />
          Edit
        </button>
        
        <button 
          onClick={onDelete}
          className="action-btn delete"
          style={{
            background: 'transparent',
            color: '#d32f2f',
            border: '1px solid #d32f2f',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

// AdminNavbar component (same as above)
const AdminNavbar = () => {
  // ... same AdminNavbar implementation as above
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
};