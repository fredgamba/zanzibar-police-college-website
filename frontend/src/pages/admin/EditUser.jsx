<<<<<<< HEAD
// src/pages/admin/EditUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Save,
  ArrowLeft,
  User,
  Mail,
  Shield,
  UserCheck,
  Key
} from 'lucide-react';
import api from '../../utils/api';

// Admin Navbar Component - MOVED TO TOP LEVEL
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
};

export default function EditUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchUser();
  }, [id, navigate]);

  const fetchUser = async () => {
    try {
      const res = await api.get(`users/${id}/`);
      const userData = res.data;
      
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        is_staff: Boolean(userData.is_staff),
        is_superuser: Boolean(userData.is_superuser),
        is_active: userData.is_active !== undefined ? Boolean(userData.is_active) : true,
      });
    } catch (err) {
      console.error('Failed to load user:', err);
      alert('Error loading user data.');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      // Ensure boolean values are properly sent
      const submitData = {
        ...formData,
        is_staff: Boolean(formData.is_staff),
        is_superuser: Boolean(formData.is_superuser),
        is_active: Boolean(formData.is_active),
      };
      
      await api.put(`users/${id}/`, submitData);
      alert('User updated successfully!');
      navigate('/admin/users');
    } catch (err) {
      console.error('Failed to update user:', err);
      if (err.response?.data) {
        // Handle API validation errors
        const apiErrors = err.response.data;
        const formattedErrors = {};
        
        Object.keys(apiErrors).forEach(key => {
          if (Array.isArray(apiErrors[key])) {
            formattedErrors[key] = apiErrors[key].join(', ');
          } else {
            formattedErrors[key] = apiErrors[key];
          }
        });
        
        setErrors(formattedErrors);
        alert('Please check the form for errors.');
      } else {
        alert('Error updating user. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/users');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="dashboard-content">
          <div className="loading">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/users" className="back-btn">
            <ArrowLeft size={20} />
            Back to Users
          </Link>
          <h1>Edit User</h1>
          <p>Update user information and permissions</p>
        </div>

        <div className="user-edit-container">
          <form onSubmit={handleSubmit} className="user-edit-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first_name">
                    <User size={16} />
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.first_name ? 'error' : ''}`}
                    placeholder="Enter first name..."
                  />
                  {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">
                    <User size={16} />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.last_name ? 'error' : ''}`}
                    placeholder="Enter last name..."
                  />
                  {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">
                    <UserCheck size={16} />
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Enter username..."
                  />
                  {errors.username && <span className="error-text">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter email address..."
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Permissions & Role</h3>
              
              <div className="permission-options">
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_staff"
                    name="is_staff"
                    checked={formData.is_staff}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_staff">
                    <UserCheck size={16} />
                    Staff Member
                  </label>
                  <span>Can access admin panel and manage content</span>
                </div>
                
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_superuser"
                    name="is_superuser"
                    checked={formData.is_superuser}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_superuser">
                    <Shield size={16} />
                    Super Administrator
                  </label>
                  <span>Full system access including user management</span>
                </div>
                
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_active">
                    <Key size={16} />
                    Active Account
                  </label>
                  <span>User can login to the system</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? 'Updating...' : 'Update User'}
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
=======
// src/pages/admin/EditUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Save,
  ArrowLeft,
  User,
  Mail,
  Shield,
  UserCheck,
  Key
} from 'lucide-react';
import api from '../../utils/api';

// Admin Navbar Component - MOVED TO TOP LEVEL
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
};

export default function EditUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchUser();
  }, [id, navigate]);

  const fetchUser = async () => {
    try {
      const res = await api.get(`users/${id}/`);
      const userData = res.data;
      
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        is_staff: Boolean(userData.is_staff),
        is_superuser: Boolean(userData.is_superuser),
        is_active: userData.is_active !== undefined ? Boolean(userData.is_active) : true,
      });
    } catch (err) {
      console.error('Failed to load user:', err);
      alert('Error loading user data.');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      // Ensure boolean values are properly sent
      const submitData = {
        ...formData,
        is_staff: Boolean(formData.is_staff),
        is_superuser: Boolean(formData.is_superuser),
        is_active: Boolean(formData.is_active),
      };
      
      await api.put(`users/${id}/`, submitData);
      alert('User updated successfully!');
      navigate('/admin/users');
    } catch (err) {
      console.error('Failed to update user:', err);
      if (err.response?.data) {
        // Handle API validation errors
        const apiErrors = err.response.data;
        const formattedErrors = {};
        
        Object.keys(apiErrors).forEach(key => {
          if (Array.isArray(apiErrors[key])) {
            formattedErrors[key] = apiErrors[key].join(', ');
          } else {
            formattedErrors[key] = apiErrors[key];
          }
        });
        
        setErrors(formattedErrors);
        alert('Please check the form for errors.');
      } else {
        alert('Error updating user. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/users');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="dashboard-content">
          <div className="loading">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/users" className="back-btn">
            <ArrowLeft size={20} />
            Back to Users
          </Link>
          <h1>Edit User</h1>
          <p>Update user information and permissions</p>
        </div>

        <div className="user-edit-container">
          <form onSubmit={handleSubmit} className="user-edit-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first_name">
                    <User size={16} />
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.first_name ? 'error' : ''}`}
                    placeholder="Enter first name..."
                  />
                  {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">
                    <User size={16} />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.last_name ? 'error' : ''}`}
                    placeholder="Enter last name..."
                  />
                  {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">
                    <UserCheck size={16} />
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Enter username..."
                  />
                  {errors.username && <span className="error-text">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter email address..."
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Permissions & Role</h3>
              
              <div className="permission-options">
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_staff"
                    name="is_staff"
                    checked={formData.is_staff}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_staff">
                    <UserCheck size={16} />
                    Staff Member
                  </label>
                  <span>Can access admin panel and manage content</span>
                </div>
                
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_superuser"
                    name="is_superuser"
                    checked={formData.is_superuser}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_superuser">
                    <Shield size={16} />
                    Super Administrator
                  </label>
                  <span>Full system access including user management</span>
                </div>
                
                <div className="permission-item">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_active">
                    <Key size={16} />
                    Active Account
                  </label>
                  <span>User can login to the system</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? 'Updating...' : 'Update User'}
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}