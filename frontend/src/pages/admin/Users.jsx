// src/pages/admin/Users.jsx - COMPLETE FIXED VERSION
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Filter,
  UserPlus,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Eye,
  Key,
  BarChart3,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import api from '../../utils/api';

// Custom hook for debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// User validation helper
const isValidUser = (user) => {
  return user && 
         typeof user === 'object' && 
         user.id && 
         user.username &&
         typeof user.is_active === 'boolean' &&
         typeof user.is_staff === 'boolean' &&
         typeof user.is_superuser === 'boolean';
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [bulkAction, setBulkAction] = useState('');
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Get current user info safely
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : {};
    } catch (err) {
      console.error('Error parsing current user:', err);
      return {};
    }
  };

  const currentUser = getCurrentUser();
  const currentUserId = currentUser.id;

  // Enhanced fetchUsers with better error handling
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const res = await api.get('users/');
      
      if (res.data && Array.isArray(res.data)) {
        const validUsers = res.data.filter(isValidUser);
        setUsers(validUsers);
        
        if (validUsers.length === 0 && res.data.length > 0) {
          console.warn('No valid users found in response');
        }
      } else if (res.data && typeof res.data === 'object') {
        const usersArray = Object.values(res.data).filter(isValidUser);
        setUsers(usersArray);
      } else {
        console.warn('Unexpected users data format:', res.data);
        setUsers([]);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
      
      // Fallback to sample data only in development
      if (process.env.NODE_ENV === 'development') {
        setUsers([
          {
            id: 1,
            username: 'admin',
            email: 'admin@dpacademy.go.tz',
            first_name: 'System',
            last_name: 'Administrator',
            is_staff: true,
            is_superuser: true,
            is_active: true,
            date_joined: '2024-01-01T00:00:00Z',
            last_login: '2024-01-15T10:30:00Z'
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshTrigger]);

  // Enhanced filter function with debounced search
  const getFilteredUsers = useCallback(() => {
    try {
      if (!Array.isArray(users)) {
        console.warn('Users is not an array:', users);
        return [];
      }

      return users
        .filter(user => {
          if (!isValidUser(user)) {
            console.warn('Invalid user object skipped:', user);
            return false;
          }

          // Safe property access with fallbacks
          const username = user.username || '';
          const email = user.email || '';
          const firstName = user.first_name || '';
          const lastName = user.last_name || '';
          const isStaff = Boolean(user.is_staff);
          const isSuperuser = Boolean(user.is_superuser);
          const isActive = Boolean(user.is_active);

          const matchesSearch = 
            username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            `${firstName} ${lastName}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
          
          const matchesRole = 
            filterRole === 'all' ||
            (filterRole === 'superadmin' && isSuperuser) ||
            (filterRole === 'staff' && isStaff && !isSuperuser) ||
            (filterRole === 'user' && !isStaff && !isSuperuser);
          
          const matchesStatus = 
            filterStatus === 'all' ||
            (filterStatus === 'active' && isActive) ||
            (filterStatus === 'inactive' && !isActive);
          
          return matchesSearch && matchesRole && matchesStatus;
        })
        .sort((a, b) => {
          // Safe date comparison with fallbacks
          const dateA = a.date_joined ? new Date(a.date_joined) : new Date(0);
          const dateB = b.date_joined ? new Date(b.date_joined) : new Date(0);
          const lastLoginA = a.last_login ? new Date(a.last_login) : new Date(0);
          const lastLoginB = b.last_login ? new Date(b.last_login) : new Date(0);
          const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim();
          const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim();

          switch (sortBy) {
            case 'newest':
              return dateB - dateA;
            case 'oldest':
              return dateA - dateB;
            case 'name':
              return nameA.localeCompare(nameB);
            case 'last_login':
              return lastLoginB - lastLoginA;
            default:
              return 0;
          }
        });
    } catch (error) {
      console.error('Error filtering users:', error);
      setError('Error filtering users');
      return [];
    }
  }, [users, debouncedSearchTerm, filterRole, filterStatus, sortBy]);

  const filteredUsers = getFilteredUsers();

  // Safe statistics calculation
  const stats = {
    total: Array.isArray(users) ? users.length : 0,
    active: Array.isArray(users) ? users.filter(u => u?.is_active).length : 0,
    staff: Array.isArray(users) ? users.filter(u => u?.is_staff).length : 0,
    superusers: Array.isArray(users) ? users.filter(u => u?.is_superuser).length : 0
  };

  // Action logging utility
  const logUserAction = useCallback((action, user, details = {}) => {
    console.log('User Action:', {
      action,
      userId: user?.id,
      username: user?.username,
      adminId: currentUserId,
      timestamp: new Date().toISOString(),
      ...details
    });

    // Send to backend if needed
    // api.post('admin-logs/', { action, user_id: user?.id, details });
  }, [currentUserId]);

  // Enhanced delete function
  const handleDelete = async (id, username) => {
    if (!id) {
      alert('Invalid user ID');
      return;
    }

    // Prevent deleting current logged in user
    if (currentUserId === id) {
      alert('You cannot delete your own account!');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete user "${username}"? This action cannot be undone.`)) {
      setActionLoading(prev => ({ ...prev, [`delete_${id}`]: true }));
      
      try {
        await api.delete(`users/${id}/`);
        
        logUserAction('delete_user', { id, username });
        
        // Safe array update
        if (Array.isArray(users)) {
          setUsers(users.filter(user => user.id !== id));
        }
        
        // Remove from selected users if present
        if (selectedUsers.has(id)) {
          const newSelected = new Set(selectedUsers);
          newSelected.delete(id);
          setSelectedUsers(newSelected);
        }
        
        alert('User deleted successfully!');
      } catch (err) {
        console.error('Delete user error:', err);
        logUserAction('delete_user_error', { id, username }, { error: err.message });
        
        if (err.response?.status === 403) {
          alert('Permission denied: ' + (err.response.data?.error || 'You do not have permission to delete users.'));
        } else if (err.response?.status === 404) {
          alert('User not found. It may have been already deleted.');
          fetchUsers(); // Refresh the list
        } else if (err.response?.data) {
          alert('Error: ' + JSON.stringify(err.response.data));
        } else {
          alert('Error deleting user. Please try again.');
        }
      } finally {
        setActionLoading(prev => ({ ...prev, [`delete_${id}`]: false }));
      }
    }
  };

  // Enhanced toggle user status
  const toggleUserStatus = async (user) => {
    if (!isValidUser(user)) {
      alert('Invalid user data');
      return;
    }

    // Prevent deactivating own account
    if (user.id === currentUserId) {
      alert('You cannot deactivate your own account!');
      return;
    }

    const action = user.is_active ? 'deactivate' : 'activate';
    const confirmMessage = user.is_active 
      ? `Are you sure you want to deactivate user "${user.username}"? They will not be able to login.`
      : `Are you sure you want to activate user "${user.username}"? They will be able to login again.`;

    if (window.confirm(confirmMessage)) {
      setActionLoading(prev => ({ ...prev, [`status_${user.id}`]: true }));
      
      try {
        const response = await api.patch(`users/${user.id}/`, {
          is_active: !user.is_active
        });
        
        if (response.status === 200) {
          // Safe array update
          if (Array.isArray(users)) {
            setUsers(users.map(u => u.id === user.id ? { ...u, is_active: response.data.is_active } : u));
          }
          
          logUserAction(`${action}_user`, user);
          alert(`User ${action}d successfully!`);
        }
      } catch (err) {
        console.error('Toggle user status error:', err);
        logUserAction(`${action}_user_error`, user, { error: err.message });
        
        if (err.response?.status === 403) {
          alert('Permission denied: ' + (err.response.data?.error || 'You do not have permission to modify user status.'));
        } else if (err.response?.data) {
          alert('Error: ' + JSON.stringify(err.response.data));
        } else {
          alert(`Error ${action}ing user. Please try again.`);
        }
      } finally {
        setActionLoading(prev => ({ ...prev, [`status_${user.id}`]: false }));
      }
    }
  };

  // Safe user data access functions
  const getRoleBadge = (user) => {
    if (!isValidUser(user)) {
      return { label: 'Unknown', color: '#666', bgColor: '#f5f5f5', icon: UsersIcon };
    }
    
    if (user.is_superuser) {
      return { label: 'Super Admin', color: '#d32f2f', bgColor: '#ffebee', icon: Shield };
    } else if (user.is_staff) {
      return { label: 'Staff', color: '#1c236d', bgColor: '#e8eaf6', icon: UserCheck };
    } else {
      return { label: 'User', color: '#2e7d32', bgColor: '#e8f5e8', icon: UsersIcon };
    }
  };

  const getStatusBadge = (isActive) => ({
    label: isActive ? 'Active' : 'Inactive',
    color: isActive ? '#2e7d32' : '#d32f2f',
    bgColor: isActive ? '#e8f5e8' : '#ffebee',
    icon: isActive ? UserCheck : UserX
  });

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never logged in';
    
    try {
      const date = new Date(lastLogin);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Enhanced password reset function
  const resetUserPassword = async (user) => {
    if (!isValidUser(user)) {
      alert('Invalid user data');
      return;
    }

    if (window.confirm(`Are you sure you want to reset password for user "${user.username}"? They will receive an email with instructions to set a new password.`)) {
      setActionLoading(prev => ({ ...prev, [`reset_${user.id}`]: true }));
      
      try {
        const response = await api.post(`users/${user.id}/reset-password/`);
        
        if (response.status === 200) {
          logUserAction('reset_password', user);
          alert('Password reset email sent successfully!');
        }
      } catch (err) {
        console.error('Reset password error:', err);
        logUserAction('reset_password_error', user, { error: err.message });
        
        if (err.response?.status === 403) {
          alert('Permission denied: You do not have permission to reset passwords.');
        } else if (err.response?.data) {
          alert('Error: ' + JSON.stringify(err.response.data));
        } else {
          alert('Error resetting password. Please try again.');
        }
      } finally {
        setActionLoading(prev => ({ ...prev, [`reset_${user.id}`]: false }));
      }
    }
  };

  // Enhanced role management
  const toggleUserRole = async (user, newRole) => {
    if (!isValidUser(user)) {
      alert('Invalid user data');
      return;
    }

    const roleActions = {
      'staff': { 
        message: `promote "${user.username}" to Staff member`, 
        data: { is_staff: true, is_superuser: false } 
      },
      'superuser': { 
        message: `promote "${user.username}" to Super Administrator`, 
        data: { is_staff: true, is_superuser: true } 
      },
      'user': { 
        message: `demote "${user.username}" to Regular User`, 
        data: { is_staff: false, is_superuser: false } 
      }
    };

    const action = roleActions[newRole];
    
    if (!action) {
      alert('Invalid role action');
      return;
    }

    if (window.confirm(`Are you sure you want to ${action.message}?`)) {
      setActionLoading(prev => ({ ...prev, [`role_${user.id}`]: true }));
      
      try {
        const response = await api.patch(`users/${user.id}/`, action.data);
        
        if (response.status === 200) {
          // Safe array update
          if (Array.isArray(users)) {
            setUsers(users.map(u => u.id === user.id ? response.data : u));
          }
          
          logUserAction('change_role', user, { newRole });
          alert(`User role updated successfully!`);
        }
      } catch (err) {
        console.error('Toggle user role error:', err);
        logUserAction('change_role_error', user, { newRole, error: err.message });
        
        if (err.response?.status === 403) {
          alert('Permission denied: You do not have permission to modify user roles.');
        } else if (err.response?.data) {
          alert('Error: ' + JSON.stringify(err.response.data));
        } else {
          alert('Error updating user role. Please try again.');
        }
      } finally {
        setActionLoading(prev => ({ ...prev, [`role_${user.id}`]: false }));
      }
    }
  };

  // Bulk operations
  const handleBulkAction = async (action) => {
    if (selectedUsers.size === 0) {
      alert('Please select users first');
      return;
    }

    const selectedIds = Array.from(selectedUsers);
    const actionText = action === 'activate' ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedIds.length} user(s)?`)) {
      setActionLoading(prev => ({ ...prev, bulk: true }));
      
      try {
        await Promise.all(
          selectedIds.map(id => 
            api.patch(`users/${id}/`, { is_active: action === 'activate' })
          )
        );
        
        logUserAction(`bulk_${action}`, null, { count: selectedIds.length });
        
        // Refresh users
        fetchUsers();
        setSelectedUsers(new Set());
        setBulkAction('');
        
        alert(`Successfully ${actionText}d ${selectedIds.length} user(s)!`);
      } catch (err) {
        console.error('Bulk action failed:', err);
        logUserAction(`bulk_${action}_error`, null, { error: err.message });
        alert(`Error ${actionText}ing users. Please try again.`);
      } finally {
        setActionLoading(prev => ({ ...prev, bulk: false }));
      }
    }
  };

  // Toggle user selection
  const toggleUserSelection = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  // Select all filtered users
  const selectAllFiltered = () => {
    const allFilteredIds = new Set(filteredUsers.map(user => user.id));
    setSelectedUsers(allFilteredIds);
  };

  // Clear all selections
  const clearSelection = () => {
    setSelectedUsers(new Set());
  };

  const viewUserDetails = (user) => {
    if (!isValidUser(user)) {
      alert('Invalid user data');
      return;
    }
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const refreshUsers = () => {
    setRefreshTrigger(prev => prev + 1);
    setSelectedUsers(new Set());
  };

  // Error boundary section
  if (error && users.length === 0) {
    return (
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="dashboard-content">
          <div className="error-boundary">
            <AlertCircle size={48} color="#d32f2f" />
            <h3>Failed to load users</h3>
            <p>{error}</p>
            <button onClick={fetchUsers} className="btn-primary">
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-actions">
            <div>
              <h1>Users Management</h1>
              <p>Manage system users and their permissions</p>
            </div>
            <div className="header-buttons">
              <button onClick={refreshUsers} className="btn-secondary" disabled={loading}>
                <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                Refresh
              </button>
              <Link to="/admin/users/add" className="btn-primary">
                <UserPlus size={18} />
                Add New User
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8eaf6' }}>
              <UsersIcon size={24} color="#1c236d" />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f5e8' }}>
              <UserCheck size={24} color="#2e7d32" />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.active}</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e3f2fd' }}>
              <Shield size={24} color="#1976d2" />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.staff}</div>
              <div className="stat-label">Staff Members</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fce4ec' }}>
              <Key size={24} color="#d32f2f" />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.superusers}</div>
              <div className="stat-label">Super Admins</div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div className="bulk-actions-bar">
            <div className="bulk-info">
              <strong>{selectedUsers.size} user(s) selected</strong>
            </div>
            <div className="bulk-buttons">
              <select 
                value={bulkAction} 
                onChange={(e) => setBulkAction(e.target.value)}
                className="bulk-select"
              >
                <option value="">Bulk Actions</option>
                <option value="activate">Activate Selected</option>
                <option value="deactivate">Deactivate Selected</option>
              </select>
              <button 
                onClick={() => handleBulkAction(bulkAction)}
                disabled={!bulkAction || actionLoading.bulk}
                className="btn-primary"
              >
                {actionLoading.bulk ? 'Processing...' : 'Apply'}
              </button>
              <button onClick={clearSelection} className="btn-secondary">
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="users-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {debouncedSearchTerm && (
              <span className="search-count">
                {filteredUsers.length} result(s)
              </span>
            )}
          </div>
          
          <div className="filter-controls">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="staff">Staff</option>
              <option value="user">User</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
              <option value="last_login">Last Login</option>
            </select>

            {filteredUsers.length > 0 && (
              <button onClick={selectAllFiltered} className="btn-secondary">
                Select All ({filteredUsers.length})
              </button>
            )}
          </div>
        </div>

        {/* Users Grid */}
        <div className="users-table-container">
          {loading ? (
            <div className="loading">
              <RefreshCw size={24} className="spinning" />
              Loading users...
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="users-grid">
              {filteredUsers.map(user => {
                if (!isValidUser(user)) return null;
                
                const roleInfo = getRoleBadge(user);
                const statusInfo = getStatusBadge(user.is_active);
                const RoleIcon = roleInfo.icon;
                const StatusIcon = statusInfo.icon;
                const isSelected = selectedUsers.has(user.id);
                const isCurrentUser = user.id === currentUserId;

                return (
                  <div key={user.id} className={`user-card ${isSelected ? 'selected' : ''}`}>
                    <div className="user-header">
                      <div className="user-select">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleUserSelection(user.id)}
                          disabled={isCurrentUser}
                        />
                      </div>
                      <div className="user-avatar">
                        {(user.first_name?.charAt(0) || '') + (user.last_name?.charAt(0) || '')}
                      </div>
                      <div className="user-info">
                        <h3 className="user-name">
                          {user.first_name || ''} {user.last_name || ''}
                          {isCurrentUser && <span className="current-user-badge">You</span>}
                        </h3>
                        <p className="user-username">@{user.username || 'unknown'}</p>
                      </div>
                      <div className="user-badges">
                        <div className="role-badge" style={{ 
                          background: roleInfo.bgColor, 
                          color: roleInfo.color 
                        }}>
                          <RoleIcon size={12} />
                          {roleInfo.label}
                        </div>
                        <div className="status-badge" style={{ 
                          background: statusInfo.bgColor, 
                          color: statusInfo.color 
                        }}>
                          <StatusIcon size={12} />
                          {statusInfo.label}
                        </div>
                      </div>
                    </div>

                    <div className="user-details">
                      <div className="detail-item">
                        <Mail size={14} />
                        <span>{user.email || 'No email'}</span>
                      </div>
                      <div className="detail-item">
                        <Calendar size={14} />
                        <span>Joined: {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                      <div className="detail-item">
                        <BarChart3 size={14} />
                        <span>Last login: {formatLastLogin(user.last_login)}</span>
                      </div>
                    </div>

                    <div className="user-actions">
                      <button 
                        onClick={() => viewUserDetails(user)}
                        className="action-btn view"
                        disabled={actionLoading[`view_${user.id}`]}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      
                      <Link 
                        to={`/admin/users/${user.id}/edit`}
                        className="action-btn edit"
                      >
                        <Edit size={14} />
                        Edit
                      </Link>
                      
                      <button 
                        onClick={() => toggleUserStatus(user)}
                        className={`action-btn ${user.is_active ? 'deactivate' : 'activate'}`}
                        disabled={isCurrentUser || actionLoading[`status_${user.id}`]}
                        title={isCurrentUser ? "Cannot modify your own status" : ""}
                      >
                        {actionLoading[`status_${user.id}`] ? (
                          <RefreshCw size={14} className="spinning" />
                        ) : user.is_active ? (
                          <UserX size={14} />
                        ) : (
                          <UserCheck size={14} />
                        )}
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      
                      {/* Role management actions */}
                      {!user.is_superuser && currentUser.is_superuser && (
                        <div className="role-actions">
                          {user.is_staff ? (
                            <button 
                              onClick={() => toggleUserRole(user, 'user')}
                              className="action-btn demote"
                              disabled={actionLoading[`role_${user.id}`]}
                              title="Demote to regular user"
                            >
                              {actionLoading[`role_${user.id}`] ? (
                                <RefreshCw size={14} className="spinning" />
                              ) : (
                                <Shield size={14} />
                              )}
                              Demote
                            </button>
                          ) : (
                            <button 
                              onClick={() => toggleUserRole(user, 'staff')}
                              className="action-btn promote"
                              disabled={actionLoading[`role_${user.id}`]}
                              title="Promote to staff"
                            >
                              {actionLoading[`role_${user.id}`] ? (
                                <RefreshCw size={14} className="spinning" />
                              ) : (
                                <Shield size={14} />
                              )}
                              Promote
                            </button>
                          )}
                        </div>
                      )}
                      
                      <button 
                        onClick={() => resetUserPassword(user)}
                        className="action-btn reset-password"
                        disabled={actionLoading[`reset_${user.id}`]}
                        title="Reset user password"
                      >
                        {actionLoading[`reset_${user.id}`] ? (
                          <RefreshCw size={14} className="spinning" />
                        ) : (
                          <Key size={14} />
                        )}
                        Reset PW
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(user.id, user.username)}
                        className="action-btn delete"
                        disabled={user.is_superuser || isCurrentUser || actionLoading[`delete_${user.id}`]}
                        title={user.is_superuser ? "Cannot delete super admin" : isCurrentUser ? "Cannot delete your own account" : "Delete user"}
                      >
                        {actionLoading[`delete_${user.id}`] ? (
                          <RefreshCw size={14} className="spinning" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-users">
              <UsersIcon size={48} color="#ccc" />
              <h3>No users found</h3>
              <p>{Array.isArray(users) && users.length > 0 ? 'Try changing your filters' : 'Create your first user to get started'}</p>
              <Link to="/admin/users/add" className="btn-primary">
                <UserPlus size={18} />
                Add User
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Details</h2>
              <button 
                onClick={() => setShowUserModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="user-detail-view">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Full Name:</strong>
                      <span>{selectedUser.first_name || ''} {selectedUser.last_name || ''}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Username:</strong>
                      <span>@{selectedUser.username || 'unknown'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Email:</strong>
                      <span>{selectedUser.email || 'No email'}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Account Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Role:</strong>
                      <span>
                        {selectedUser.is_superuser ? 'Super Administrator' : 
                         selectedUser.is_staff ? 'Staff Member' : 'Regular User'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Status:</strong>
                      <span className={`status ${selectedUser.is_active ? 'active' : 'inactive'}`}>
                        {selectedUser.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Date Joined:</strong>
                      <span>{selectedUser.date_joined ? new Date(selectedUser.date_joined).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Last Login:</strong>
                      <span>{formatLastLogin(selectedUser.last_login)}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Permissions</h3>
                  <div className="permissions-list">
                    <div className="permission-item">
                      <Shield size={16} />
                      <span>Super Administrator: {selectedUser.is_superuser ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="permission-item">
                      <UserCheck size={16} />
                      <span>Staff Member: {selectedUser.is_staff ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="permission-item">
                      <Key size={16} />
                      <span>Active Account: {selectedUser.is_active ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                onClick={() => setShowUserModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <Link 
                to={`/admin/users/${selectedUser.id}/edit`}
                className="btn-primary"
                onClick={() => setShowUserModal(false)}
              >
                <Edit size={16} />
                Edit User
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Admin Navbar Component
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
};