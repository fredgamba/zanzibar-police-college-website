// src/pages/admin/AddUser.jsx - COMPLETE FIX
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Save,
  ArrowLeft,
  UserPlus,
  Shield,
  UserCheck,
  Key,
  Mail,
  User,
  Eye,
  EyeOff
} from 'lucide-react';
import api from '../../utils/api';

export default function AddUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the form errors before submitting.');
      return;
    }
    
    setSaving(true);
    setErrors({});
    
    try {
      // 🔥 FIX: Prepare data for backend - remove confirm_password
      const submitData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        is_staff: formData.is_staff,
        is_superuser: formData.is_superuser,
        is_active: formData.is_active,
      };

      console.log('Submitting user data:', submitData);

      const response = await api.post('users/', submitData);
      
      console.log('User created successfully:', response.data);
      alert('User created successfully!');
      navigate('/admin/users');
      
    } catch (err) {
      console.error('Failed to create user:', err);
      
      if (err.response?.status === 400) {
        // Handle backend validation errors
        const backendErrors = err.response.data;
        console.log('Backend validation errors:', backendErrors);
        
        if (typeof backendErrors === 'object') {
          setErrors(backendErrors);
          
          // Show specific error messages
          const errorMessages = Object.values(backendErrors).flat();
          alert('Please fix the following errors:\n' + errorMessages.join('\n'));
        } else {
          alert('Error creating user. Please check the form data.');
        }
      } else if (err.response?.status === 403) {
        alert('Permission denied. You do not have permission to create users.');
      } else {
        alert('Error creating user. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const permissionLevels = [
    {
      level: 'user',
      title: 'Regular User',
      description: 'Can view content only',
      is_staff: false,
      is_superuser: false
    },
    {
      level: 'staff',
      title: 'Staff Member',
      description: 'Can manage content and posts',
      is_staff: true,
      is_superuser: false
    },
    {
      level: 'superadmin',
      title: 'Super Administrator',
      description: 'Full system access including user management',
      is_staff: true,
      is_superuser: true
    }
  ];

  const setPermissionLevel = (level) => {
    const selected = permissionLevels.find(p => p.level === level);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        is_staff: selected.is_staff,
        is_superuser: selected.is_superuser
      }));
    }
  };

  const getCurrentPermissionLevel = () => {
    if (formData.is_superuser) return 'superadmin';
    if (formData.is_staff) return 'staff';
    return 'user';
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/users" className="back-btn">
            <ArrowLeft size={20} />
            Back to Users
          </Link>
          <h1>Add New User</h1>
          <p>Create a new user account with appropriate permissions</p>
        </div>

        <div className="user-create-container">
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
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter email address..."
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Security</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">
                    <Key size={16} />
                    Password *
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter password..."
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                  <small className="form-help">
                    Password must be at least 8 characters long
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password">
                    <Key size={16} />
                    Confirm Password *
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className={`form-input ${errors.confirm_password ? 'error' : ''}`}
                      placeholder="Confirm password..."
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirm_password && <span className="error-text">{errors.confirm_password}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Permissions & Role</h3>
              
              <div className="permission-levels">
                <h4>Select Permission Level</h4>
                <div className="permission-cards">
                  {permissionLevels.map(level => (
                    <div 
                      key={level.level}
                      className={`permission-card ${
                        getCurrentPermissionLevel() === level.level ? 'selected' : ''
                      }`}
                      onClick={() => setPermissionLevel(level.level)}
                    >
                      <div className="permission-icon">
                        {level.level === 'superadmin' && <Shield size={24} />}
                        {level.level === 'staff' && <UserCheck size={24} />}
                        {level.level === 'user' && <User size={24} />}
                      </div>
                      <div className="permission-content">
                        <h5>{level.title}</h5>
                        <p>{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="permission-details">
                <h4>Current Permissions</h4>
                <div className="permission-list">
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="is_staff"
                      name="is_staff"
                      checked={formData.is_staff}
                      onChange={handleChange}
                    />
                    <label htmlFor="is_staff">Staff Member</label>
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
                    <label htmlFor="is_superuser">Super Administrator</label>
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
                    <label htmlFor="is_active">Active Account</label>
                    <span>User can login to the system</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={saving}
              >
                <UserPlus size={18} />
                {saving ? 'Creating User...' : 'Create User'}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/admin/users')}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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