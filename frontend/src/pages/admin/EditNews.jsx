<<<<<<< HEAD
// src/pages/admin/EditNews.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users, 
  LogOut,
  Save,
  ArrowLeft,
  Upload,
  Calendar
} from 'lucide-react';
import api from '../../utils/api';

export default function EditNews() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchNews();
  }, [newsId, navigate]);

  const fetchNews = async () => {
    try {
      const response = await api.get(`news/${newsId}/`);
      setNews(response.data);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        image: null
      });
      if (response.data.image) {
        setImagePreview(response.data.image);
      }
    } catch (err) {
      console.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await api.put(`news/${newsId}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('News article updated successfully!');
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to update news');
      alert('Error updating news article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="dashboard-content">
          <div className="loading">Loading news article...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/news" className="back-btn">
            <ArrowLeft size={20} />
            Back to News
          </Link>
          <h1>Edit News Article</h1>
          <p>Update the news article content</p>
          
          {news && (
            <div className="news-meta-info">
              <span className="news-date">
                <Calendar size={16} />
                Created: {new Date(news.date_posted).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="news-edit-form">
          <div className="form-group">
            <label htmlFor="title">News Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter news title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">News Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="image" className="file-upload-label">
                <Upload size={20} />
                {imagePreview ? 'Change Image' : 'Choose Image'}
              </label>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({...formData, image: null});
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-help">
              Leave empty to keep current image. Recommended size: 800x400px.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content">News Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="12"
              className="form-textarea"
              placeholder="Enter news content here..."
            />
            <small className="form-help">
              You can use HTML tags for formatting.
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Updating...' : 'Update News Article'}
            </button>
            <Link to="/admin/news" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Admin Navbar Component
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Contact', path: '/admin/contact', icon: Phone },
    { name: 'Users', path: '/admin/users', icon: Users },
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
// src/pages/admin/EditNews.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users, 
  LogOut,
  Save,
  ArrowLeft,
  Upload,
  Calendar
} from 'lucide-react';
import api from '../../utils/api';

export default function EditNews() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchNews();
  }, [newsId, navigate]);

  const fetchNews = async () => {
    try {
      const response = await api.get(`news/${newsId}/`);
      setNews(response.data);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        image: null
      });
      if (response.data.image) {
        setImagePreview(response.data.image);
      }
    } catch (err) {
      console.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await api.put(`news/${newsId}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('News article updated successfully!');
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to update news');
      alert('Error updating news article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="dashboard-content">
          <div className="loading">Loading news article...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/news" className="back-btn">
            <ArrowLeft size={20} />
            Back to News
          </Link>
          <h1>Edit News Article</h1>
          <p>Update the news article content</p>
          
          {news && (
            <div className="news-meta-info">
              <span className="news-date">
                <Calendar size={16} />
                Created: {new Date(news.date_posted).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="news-edit-form">
          <div className="form-group">
            <label htmlFor="title">News Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter news title..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">News Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="image" className="file-upload-label">
                <Upload size={20} />
                {imagePreview ? 'Change Image' : 'Choose Image'}
              </label>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({...formData, image: null});
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-help">
              Leave empty to keep current image. Recommended size: 800x400px.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content">News Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="12"
              className="form-textarea"
              placeholder="Enter news content here..."
            />
            <small className="form-help">
              You can use HTML tags for formatting.
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Updating...' : 'Update News Article'}
            </button>
            <Link to="/admin/news" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Admin Navbar Component
const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Contact', path: '/admin/contact', icon: Phone },
    { name: 'Users', path: '/admin/users', icon: Users },
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