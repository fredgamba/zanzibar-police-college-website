<<<<<<< HEAD
// src/pages/admin/PostsList.jsx - COMPLETELY FIXED
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
  Tag,
  User,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('posts/');
      
      // 🔥 COMPLETE FIX: Handle all possible API response formats
      let postsData = [];
      
      if (res.data && Array.isArray(res.data)) {
        // Filter out invalid data and ensure proper objects
        postsData = res.data
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined && 
            item.id !== null
          )
          .map(item => ({
            // Ensure all required properties with safe defaults
            id: item.id || 0,
            title: item.title || 'Untitled Post',
            content: item.content || '',
            excerpt: item.excerpt || '',
            post_type: item.post_type || 'news',
            author: item.author || null,
            author_name: item.author_name || 'Unknown Author',
            author_username: item.author_username || 'unknown',
            image: item.image || null,
            video: item.video || null,
            document: item.document || null,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
            is_published: item.is_published !== undefined ? Boolean(item.is_published) : true,
            views: item.views || 0,
            // 🔥 FIX: Safe derived properties
            shortContent: String(item.content || '').substring(0, 150) + '...',
            formattedDate: formatDate(item.created_at),
            typeLabel: getTypeLabel(item.post_type),
            statusLabel: item.is_published ? 'Published' : 'Draft'
          }));
      } else if (res.data && typeof res.data === 'object') {
        // Handle object response - convert to array
        const postsArray = Object.values(res.data);
        postsData = postsArray
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined
          )
          .map(item => ({
            id: item.id || 0,
            title: item.title || 'Untitled Post',
            content: item.content || '',
            excerpt: item.excerpt || '',
            post_type: item.post_type || 'news',
            author: item.author || null,
            author_name: item.author_name || 'Unknown Author',
            author_username: item.author_username || 'unknown',
            image: item.image || null,
            video: item.video || null,
            document: item.document || null,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
            is_published: item.is_published !== undefined ? Boolean(item.is_published) : true,
            views: item.views || 0,
            shortContent: String(item.content || '').substring(0, 150) + '...',
            formattedDate: formatDate(item.created_at),
            typeLabel: getTypeLabel(item.post_type),
            statusLabel: item.is_published ? 'Published' : 'Draft'
          }));
      } else {
        console.warn('Unexpected posts data format:', res.data);
        // Fallback to empty array
        postsData = [];
      }
      
      console.log('Processed posts data:', postsData);
      setPosts(postsData);
      
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Failed to load posts. Please try again.');
      setPosts([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Completely safe search filter
  const filteredPosts = posts.filter(post => {
    if (!post || typeof post !== 'object') return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Safe property access with string conversion
    const title = String(post.title || '');
    const content = String(post.content || '');
    const excerpt = String(post.excerpt || '');
    const authorName = String(post.author_name || '');
    const authorUsername = String(post.author_username || '');
    
    const matchesSearch = 
      title.toLowerCase().includes(searchLower) ||
      content.toLowerCase().includes(searchLower) ||
      excerpt.toLowerCase().includes(searchLower) ||
      authorName.toLowerCase().includes(searchLower) ||
      authorUsername.toLowerCase().includes(searchLower);
    
    const matchesType = 
      filterType === 'all' || 
      post.post_type === filterType;
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.is_published) ||
      (filterStatus === 'draft' && !post.is_published);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = async (id, title) => {
    if (!id) {
      alert('Invalid post ID');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`posts/${id}/`);
        setPosts(posts.filter(post => post.id !== id));
        alert('Post deleted successfully!');
      } catch (err) {
        console.error('Delete post error:', err);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const togglePublish = async (post) => {
    if (!post || !post.id) {
      alert('Invalid post data');
      return;
    }

    const action = post.is_published ? 'unpublish' : 'publish';
    if (window.confirm(`Are you sure you want to ${action} this post?`)) {
      try {
        const response = await api.post(`posts/${post.id}/toggle_publish/`);
        if (response.status === 200) {
          setPosts(posts.map(p => 
            p.id === post.id ? { ...p, is_published: response.data.is_published } : p
          ));
          alert(`Post ${action}ed successfully!`);
        }
      } catch (err) {
        console.error('Toggle publish error:', err);
        alert(`Error ${action}ing post. Please try again.`);
      }
    }
  };

  // Helper functions
  const getTypeLabel = (type) => {
    const typeLabels = {
      'news': 'News',
      'announcement': 'Announcement',
      'event': 'Event'
    };
    return typeLabels[type] || type;
  };

  const getTypeColor = (type) => {
    const typeColors = {
      'news': '#1976d2',
      'announcement': '#d32f2f', 
      'event': '#2e7d32'
    };
    return typeColors[type] || '#666';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
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
              <h1>Posts Management</h1>
              <p>Manage blog posts, announcements, and events</p>
            </div>
            <Link to="/admin/posts/create" className="btn-primary">
              <PlusCircle size={18} />
              Create Post
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
              onClick={fetchPosts}
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

        {/* Filters and Search */}
        <div className="posts-filters" style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div className="search-box" style={{ flex: 1, minWidth: '300px' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search posts by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              minWidth: '150px'
            }}
          >
            <option value="all">All Types</option>
            <option value="news">News</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              minWidth: '150px'
            }}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Posts Grid */}
        <div className="posts-container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                // 🔥 FIX: Proper key prop and safe rendering
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onEdit={() => navigate(`/admin/posts/edit/${post.id}`)}
                  onDelete={() => handleDelete(post.id, post.title)}
                  onTogglePublish={() => togglePublish(post)}
                  onView={() => navigate(`/posts/${post.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-posts" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <FileText size={48} color="#ccc" />
              <h3>No posts found</h3>
              <p>
                {posts.length > 0 
                  ? 'Try changing your filters or search terms' 
                  : 'No posts available. Create your first post!'
                }
              </p>
              <Link to="/admin/posts/create" className="btn-primary">
                <PlusCircle size={18} />
                Create Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 NEW: Extract PostCard component for better error handling
const PostCard = ({ post, onEdit, onDelete, onTogglePublish, onView }) => {
  if (!post || typeof post !== 'object') {
    return null; // Skip invalid posts
  }

  const typeColor = getTypeColor(post.post_type);

  return (
    <div className="post-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    }}>
      <div className="post-header" style={{
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
            {post.title || 'Untitled Post'}
          </h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Tag size={14} color={typeColor} />
              <span style={{ 
                color: typeColor,
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {post.typeLabel || 'Unknown'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <User size={14} color="#666" />
              <span style={{ 
                color: '#666',
                fontSize: '0.85rem'
              }}>
                {post.author_name || 'Unknown Author'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Calendar size={14} color="#666" />
              <span style={{ 
                color: '#666',
                fontSize: '0.85rem'
              }}>
                {post.formattedDate || 'Unknown date'}
              </span>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            background: post.is_published ? '#e8f5e8' : '#fff3e0',
            color: post.is_published ? '#2e7d32' : '#f57c00',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {post.statusLabel}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#666',
            fontSize: '0.85rem'
          }}>
            <BarChart3 size={14} />
            <span>{post.views || 0}</span>
          </div>
        </div>
      </div>

      <div className="post-content" style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: '#555',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {post.shortContent || 'No content available'}
        </p>
      </div>

      <div className="post-actions" style={{
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
          onClick={onTogglePublish}
          className="action-btn publish"
          style={{
            background: 'transparent',
            color: post.is_published ? '#f57c00' : '#2e7d32',
            border: `1px solid ${post.is_published ? '#f57c00' : '#2e7d32'}`,
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          {post.is_published ? 'Unpublish' : 'Publish'}
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

// Helper functions
const getTypeColor = (type) => {
  const typeColors = {
    'news': '#1976d2',
    'announcement': '#d32f2f', 
    'event': '#2e7d32'
  };
  return typeColors[type] || '#666';
};

// AdminNavbar component
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Contact', path: '/admin/contact', icon: Phone },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
  ];

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-brand">
          <h1>DPA Admin</h1>
        </div>
        
        <div className="admin-nav-menu">
          {adminNavItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className="admin-nav-link"
              >
                <IconComponent size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="admin-user-menu">
          <span>Welcome, Admin</span>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
=======
// src/pages/admin/PostsList.jsx - COMPLETELY FIXED
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
  Tag,
  User,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('posts/');
      
      // 🔥 COMPLETE FIX: Handle all possible API response formats
      let postsData = [];
      
      if (res.data && Array.isArray(res.data)) {
        // Filter out invalid data and ensure proper objects
        postsData = res.data
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined && 
            item.id !== null
          )
          .map(item => ({
            // Ensure all required properties with safe defaults
            id: item.id || 0,
            title: item.title || 'Untitled Post',
            content: item.content || '',
            excerpt: item.excerpt || '',
            post_type: item.post_type || 'news',
            author: item.author || null,
            author_name: item.author_name || 'Unknown Author',
            author_username: item.author_username || 'unknown',
            image: item.image || null,
            video: item.video || null,
            document: item.document || null,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
            is_published: item.is_published !== undefined ? Boolean(item.is_published) : true,
            views: item.views || 0,
            // 🔥 FIX: Safe derived properties
            shortContent: String(item.content || '').substring(0, 150) + '...',
            formattedDate: formatDate(item.created_at),
            typeLabel: getTypeLabel(item.post_type),
            statusLabel: item.is_published ? 'Published' : 'Draft'
          }));
      } else if (res.data && typeof res.data === 'object') {
        // Handle object response - convert to array
        const postsArray = Object.values(res.data);
        postsData = postsArray
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined
          )
          .map(item => ({
            id: item.id || 0,
            title: item.title || 'Untitled Post',
            content: item.content || '',
            excerpt: item.excerpt || '',
            post_type: item.post_type || 'news',
            author: item.author || null,
            author_name: item.author_name || 'Unknown Author',
            author_username: item.author_username || 'unknown',
            image: item.image || null,
            video: item.video || null,
            document: item.document || null,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
            is_published: item.is_published !== undefined ? Boolean(item.is_published) : true,
            views: item.views || 0,
            shortContent: String(item.content || '').substring(0, 150) + '...',
            formattedDate: formatDate(item.created_at),
            typeLabel: getTypeLabel(item.post_type),
            statusLabel: item.is_published ? 'Published' : 'Draft'
          }));
      } else {
        console.warn('Unexpected posts data format:', res.data);
        // Fallback to empty array
        postsData = [];
      }
      
      console.log('Processed posts data:', postsData);
      setPosts(postsData);
      
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Failed to load posts. Please try again.');
      setPosts([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Completely safe search filter
  const filteredPosts = posts.filter(post => {
    if (!post || typeof post !== 'object') return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Safe property access with string conversion
    const title = String(post.title || '');
    const content = String(post.content || '');
    const excerpt = String(post.excerpt || '');
    const authorName = String(post.author_name || '');
    const authorUsername = String(post.author_username || '');
    
    const matchesSearch = 
      title.toLowerCase().includes(searchLower) ||
      content.toLowerCase().includes(searchLower) ||
      excerpt.toLowerCase().includes(searchLower) ||
      authorName.toLowerCase().includes(searchLower) ||
      authorUsername.toLowerCase().includes(searchLower);
    
    const matchesType = 
      filterType === 'all' || 
      post.post_type === filterType;
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.is_published) ||
      (filterStatus === 'draft' && !post.is_published);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = async (id, title) => {
    if (!id) {
      alert('Invalid post ID');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`posts/${id}/`);
        setPosts(posts.filter(post => post.id !== id));
        alert('Post deleted successfully!');
      } catch (err) {
        console.error('Delete post error:', err);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const togglePublish = async (post) => {
    if (!post || !post.id) {
      alert('Invalid post data');
      return;
    }

    const action = post.is_published ? 'unpublish' : 'publish';
    if (window.confirm(`Are you sure you want to ${action} this post?`)) {
      try {
        const response = await api.post(`posts/${post.id}/toggle_publish/`);
        if (response.status === 200) {
          setPosts(posts.map(p => 
            p.id === post.id ? { ...p, is_published: response.data.is_published } : p
          ));
          alert(`Post ${action}ed successfully!`);
        }
      } catch (err) {
        console.error('Toggle publish error:', err);
        alert(`Error ${action}ing post. Please try again.`);
      }
    }
  };

  // Helper functions
  const getTypeLabel = (type) => {
    const typeLabels = {
      'news': 'News',
      'announcement': 'Announcement',
      'event': 'Event'
    };
    return typeLabels[type] || type;
  };

  const getTypeColor = (type) => {
    const typeColors = {
      'news': '#1976d2',
      'announcement': '#d32f2f', 
      'event': '#2e7d32'
    };
    return typeColors[type] || '#666';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
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
              <h1>Posts Management</h1>
              <p>Manage blog posts, announcements, and events</p>
            </div>
            <Link to="/admin/posts/create" className="btn-primary">
              <PlusCircle size={18} />
              Create Post
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
              onClick={fetchPosts}
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

        {/* Filters and Search */}
        <div className="posts-filters" style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div className="search-box" style={{ flex: 1, minWidth: '300px' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search posts by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              minWidth: '150px'
            }}
          >
            <option value="all">All Types</option>
            <option value="news">News</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              minWidth: '150px'
            }}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Posts Grid */}
        <div className="posts-container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map(post => (
                // 🔥 FIX: Proper key prop and safe rendering
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onEdit={() => navigate(`/admin/posts/edit/${post.id}`)}
                  onDelete={() => handleDelete(post.id, post.title)}
                  onTogglePublish={() => togglePublish(post)}
                  onView={() => navigate(`/posts/${post.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-posts" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <FileText size={48} color="#ccc" />
              <h3>No posts found</h3>
              <p>
                {posts.length > 0 
                  ? 'Try changing your filters or search terms' 
                  : 'No posts available. Create your first post!'
                }
              </p>
              <Link to="/admin/posts/create" className="btn-primary">
                <PlusCircle size={18} />
                Create Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 NEW: Extract PostCard component for better error handling
const PostCard = ({ post, onEdit, onDelete, onTogglePublish, onView }) => {
  if (!post || typeof post !== 'object') {
    return null; // Skip invalid posts
  }

  const typeColor = getTypeColor(post.post_type);

  return (
    <div className="post-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    }}>
      <div className="post-header" style={{
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
            {post.title || 'Untitled Post'}
          </h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Tag size={14} color={typeColor} />
              <span style={{ 
                color: typeColor,
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {post.typeLabel || 'Unknown'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <User size={14} color="#666" />
              <span style={{ 
                color: '#666',
                fontSize: '0.85rem'
              }}>
                {post.author_name || 'Unknown Author'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Calendar size={14} color="#666" />
              <span style={{ 
                color: '#666',
                fontSize: '0.85rem'
              }}>
                {post.formattedDate || 'Unknown date'}
              </span>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            background: post.is_published ? '#e8f5e8' : '#fff3e0',
            color: post.is_published ? '#2e7d32' : '#f57c00',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {post.statusLabel}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#666',
            fontSize: '0.85rem'
          }}>
            <BarChart3 size={14} />
            <span>{post.views || 0}</span>
          </div>
        </div>
      </div>

      <div className="post-content" style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: '#555',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {post.shortContent || 'No content available'}
        </p>
      </div>

      <div className="post-actions" style={{
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
          onClick={onTogglePublish}
          className="action-btn publish"
          style={{
            background: 'transparent',
            color: post.is_published ? '#f57c00' : '#2e7d32',
            border: `1px solid ${post.is_published ? '#f57c00' : '#2e7d32'}`,
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          {post.is_published ? 'Unpublish' : 'Publish'}
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

// Helper functions
const getTypeColor = (type) => {
  const typeColors = {
    'news': '#1976d2',
    'announcement': '#d32f2f', 
    'event': '#2e7d32'
  };
  return typeColors[type] || '#666';
};

// AdminNavbar component
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Contact', path: '/admin/contact', icon: Phone },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
  ];

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-brand">
          <h1>DPA Admin</h1>
        </div>
        
        <div className="admin-nav-menu">
          {adminNavItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className="admin-nav-link"
              >
                <IconComponent size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="admin-user-menu">
          <span>Welcome, Admin</span>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
};