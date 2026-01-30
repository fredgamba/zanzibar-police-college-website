<<<<<<< HEAD
// src/pages/admin/Dashboard.jsx - UPDATED WITH ADMIN NAVBAR (MATCHING CREATE NEWS STYLE)
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Users, 
  BookOpen, 
  BarChart3, 
  Activity, 
  Plus, 
  RefreshCw,
  AlertTriangle 
} from 'lucide-react';
import api from '../../utils/api';

// Admin Navbar Component (consistent with other admin pages)
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
    <nav style={{
      backgroundColor: '#4338ca',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DPA Admin</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {adminNavItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease',
                  fontWeight: window.location.pathname === item.path ? 'bold' : 'normal'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <IconComponent size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: 'white' }}>Welcome, Admin</span>
        <button 
          onClick={handleLogout} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalPages: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postsRes, pagesRes, usersRes] = await Promise.allSettled([
        api.get('posts/'),
        api.get('pages/'),
        api.get('users/')
      ]);

      setStats({
        totalUsers: usersRes.status === 'fulfilled' ? (usersRes.value.data.count || usersRes.value.data.length || 0) : 0,
        totalPosts: postsRes.status === 'fulfilled' ? (postsRes.value.data.count || postsRes.value.data.length || 0) : 0,
        totalPages: pagesRes.status === 'fulfilled' ? (pagesRes.value.data.count || pagesRes.value.data.length || 0) : 0,
        recentActivity: []  // Add real fetch if needed
      });

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Inline styles (no Tailwind)
  const globalStyles = {
    container: {
      minHeight: 'calc(100vh - 64px)',  // Account for navbar height
      backgroundColor: 'white',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    headerSubtitle: {
      color: '#6b7280',
      margin: '0',
      fontSize: '1rem'
    },
    refreshBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
      transition: 'all 0.2s ease',
      opacity: isRefreshing ? 0.7 : 1
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '0.9rem',
      margin: '0'
    },
    quickActions: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    quickTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    actionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px'
    },
    actionBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '6px',
      textDecoration: 'none',
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    activitySection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    activityTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      marginBottom: '8px'
    },
    chartSection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    chartPlaceholder: {
      height: '160px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'white'
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'white',
      padding: '24px'
    },
    errorCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #fecaca',
      textAlign: 'center',
      maxWidth: '400px'
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div style={globalStyles.loadingContainer}>
          <div style={{ textAlign: 'center' }}>
            <RefreshCw size={48} className="animate-spin mx-auto mb-4" style={{ color: '#3b82f6' }} />
            <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <div style={globalStyles.errorContainer}>
          <div style={globalStyles.errorCard}>
            <AlertTriangle size={64} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Error!</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>{error}</p>
            <button 
              onClick={handleRefresh}
              style={{
                width: '100%',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={20} />
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div style={globalStyles.container}>
        {/* Header */}
        <div style={globalStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={globalStyles.headerTitle}>Main Dashboard</h1>
              <p style={globalStyles.headerSubtitle}>Welcome to the administration panel</p>
            </div>
            <button
              onClick={handleRefresh}
              onMouseEnter={(e) => Object.assign(e.target.style, globalStyles.refreshBtnHover)}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              style={globalStyles.refreshBtn}
            >
              <RefreshCw size={20} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={globalStyles.statsGrid}>
          {/* Users */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#dbeafe' }}>
              <Users size={32} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalUsers}</p>
              <p style={globalStyles.statLabel}>Total Users</p>
            </div>
          </div>

          {/* Posts */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#dcfce7' }}>
              <FileText size={32} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalPosts}</p>
              <p style={globalStyles.statLabel}>Total Posts</p>
            </div>
          </div>

          {/* Pages */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#f3e8ff' }}>
              <BookOpen size={32} style={{ color: '#9333ea' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalPages}</p>
              <p style={globalStyles.statLabel}>Total Pages</p>
            </div>
          </div>

          {/* Visits */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#eef2ff' }}>
              <BarChart3 size={32} style={{ color: '#7c3aed' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>0</p>
              <p style={globalStyles.statLabel}>Today's Visitors</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={globalStyles.quickActions}>
          <h2 style={globalStyles.quickTitle}>
            <Plus size={24} style={{ color: '#3b82f6' }} />
            Quick Actions
          </h2>
          <div style={globalStyles.actionsGrid}>
            <a 
              href="/admin/posts/create" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <FileText size={32} />
              <span style={{ marginTop: '8px' }}>Create New Post</span>
            </a>
            <a 
              href="/admin/pages" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <BookOpen size={32} />
              <span style={{ marginTop: '8px' }}>Manage Pages</span>
            </a>
            <a 
              href="/admin/users" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <Users size={32} />
              <span style={{ marginTop: '8px' }}>Manage Users</span>
            </a>
            <a 
              href="/admin/news" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <Activity size={32} />
              <span style={{ marginTop: '8px' }}>Manage News</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={globalStyles.activitySection}>
          <h2 style={globalStyles.activityTitle}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={globalStyles.activityItem}>
              <Activity size={24} style={{ color: '#3b82f6', marginTop: '4px', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>Dashboard loaded successfully</p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>{new Date().toLocaleString('en-US')}</p>
              </div>
            </div>
            {stats.recentActivity.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <Activity size={40} style={{ color: '#d1d5db', margin: '0 auto 12px' }} />
                <p style={{ color: '#6b7280', fontWeight: '500', margin: '0 0 4px 0' }}>No recent activity</p>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>Start by creating a new post</p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div style={globalStyles.chartSection}>
          <h2 style={globalStyles.activityTitle}>Recent Visitors</h2>
          <div style={globalStyles.chartPlaceholder}>
            <BarChart3 size={64} style={{ color: '#d1d5db' }} />
            <span style={{ marginLeft: '12px', fontSize: '1.1rem' }}>Visitor chart (coming soon)</span>
          </div>
        </div>
      </div>
    </>
  );
=======
// src/pages/admin/Dashboard.jsx - UPDATED WITH ADMIN NAVBAR (MATCHING CREATE NEWS STYLE)
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut,
  Users, 
  BookOpen, 
  BarChart3, 
  Activity, 
  Plus, 
  RefreshCw,
  AlertTriangle 
} from 'lucide-react';
import api from '../../utils/api';

// Admin Navbar Component (consistent with other admin pages)
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
    <nav style={{
      backgroundColor: '#4338ca',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DPA Admin</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {adminNavItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s ease',
                  fontWeight: window.location.pathname === item.path ? 'bold' : 'normal'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <IconComponent size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: 'white' }}>Welcome, Admin</span>
        <button 
          onClick={handleLogout} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalPages: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postsRes, pagesRes, usersRes] = await Promise.allSettled([
        api.get('posts/'),
        api.get('pages/'),
        api.get('users/')
      ]);

      setStats({
        totalUsers: usersRes.status === 'fulfilled' ? (usersRes.value.data.count || usersRes.value.data.length || 0) : 0,
        totalPosts: postsRes.status === 'fulfilled' ? (postsRes.value.data.count || postsRes.value.data.length || 0) : 0,
        totalPages: pagesRes.status === 'fulfilled' ? (pagesRes.value.data.count || pagesRes.value.data.length || 0) : 0,
        recentActivity: []  // Add real fetch if needed
      });

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  // Inline styles (no Tailwind)
  const globalStyles = {
    container: {
      minHeight: 'calc(100vh - 64px)',  // Account for navbar height
      backgroundColor: 'white',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    },
    headerTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    headerSubtitle: {
      color: '#6b7280',
      margin: '0',
      fontSize: '1rem'
    },
    refreshBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
      transition: 'all 0.2s ease',
      opacity: isRefreshing ? 0.7 : 1
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '0.9rem',
      margin: '0'
    },
    quickActions: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    quickTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    actionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '12px'
    },
    actionBtn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '6px',
      textDecoration: 'none',
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    activitySection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    activityTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      marginBottom: '8px'
    },
    chartSection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    chartPlaceholder: {
      height: '160px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'white'
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'white',
      padding: '24px'
    },
    errorCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #fecaca',
      textAlign: 'center',
      maxWidth: '400px'
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div style={globalStyles.loadingContainer}>
          <div style={{ textAlign: 'center' }}>
            <RefreshCw size={48} className="animate-spin mx-auto mb-4" style={{ color: '#3b82f6' }} />
            <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <div style={globalStyles.errorContainer}>
          <div style={globalStyles.errorCard}>
            <AlertTriangle size={64} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Error!</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>{error}</p>
            <button 
              onClick={handleRefresh}
              style={{
                width: '100%',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={20} />
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div style={globalStyles.container}>
        {/* Header */}
        <div style={globalStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={globalStyles.headerTitle}>Main Dashboard</h1>
              <p style={globalStyles.headerSubtitle}>Welcome to the administration panel</p>
            </div>
            <button
              onClick={handleRefresh}
              onMouseEnter={(e) => Object.assign(e.target.style, globalStyles.refreshBtnHover)}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              style={globalStyles.refreshBtn}
            >
              <RefreshCw size={20} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={globalStyles.statsGrid}>
          {/* Users */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#dbeafe' }}>
              <Users size={32} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalUsers}</p>
              <p style={globalStyles.statLabel}>Total Users</p>
            </div>
          </div>

          {/* Posts */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#dcfce7' }}>
              <FileText size={32} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalPosts}</p>
              <p style={globalStyles.statLabel}>Total Posts</p>
            </div>
          </div>

          {/* Pages */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#f3e8ff' }}>
              <BookOpen size={32} style={{ color: '#9333ea' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>{stats.totalPages}</p>
              <p style={globalStyles.statLabel}>Total Pages</p>
            </div>
          </div>

          {/* Visits */}
          <div 
            style={globalStyles.statCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' })}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style={{ ...globalStyles.statIcon, backgroundColor: '#eef2ff' }}>
              <BarChart3 size={32} style={{ color: '#7c3aed' }} />
            </div>
            <div>
              <p style={globalStyles.statNumber}>0</p>
              <p style={globalStyles.statLabel}>Today's Visitors</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={globalStyles.quickActions}>
          <h2 style={globalStyles.quickTitle}>
            <Plus size={24} style={{ color: '#3b82f6' }} />
            Quick Actions
          </h2>
          <div style={globalStyles.actionsGrid}>
            <a 
              href="/admin/posts/create" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <FileText size={32} />
              <span style={{ marginTop: '8px' }}>Create New Post</span>
            </a>
            <a 
              href="/admin/pages" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <BookOpen size={32} />
              <span style={{ marginTop: '8px' }}>Manage Pages</span>
            </a>
            <a 
              href="/admin/users" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <Users size={32} />
              <span style={{ marginTop: '8px' }}>Manage Users</span>
            </a>
            <a 
              href="/admin/news" 
              style={{
                ...globalStyles.actionBtn,
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <Activity size={32} />
              <span style={{ marginTop: '8px' }}>Manage News</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={globalStyles.activitySection}>
          <h2 style={globalStyles.activityTitle}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={globalStyles.activityItem}>
              <Activity size={24} style={{ color: '#3b82f6', marginTop: '4px', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>Dashboard loaded successfully</p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>{new Date().toLocaleString('en-US')}</p>
              </div>
            </div>
            {stats.recentActivity.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <Activity size={40} style={{ color: '#d1d5db', margin: '0 auto 12px' }} />
                <p style={{ color: '#6b7280', fontWeight: '500', margin: '0 0 4px 0' }}>No recent activity</p>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>Start by creating a new post</p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div style={globalStyles.chartSection}>
          <h2 style={globalStyles.activityTitle}>Recent Visitors</h2>
          <div style={globalStyles.chartPlaceholder}>
            <BarChart3 size={64} style={{ color: '#d1d5db' }} />
            <span style={{ marginLeft: '12px', fontSize: '1.1rem' }}>Visitor chart (coming soon)</span>
          </div>
        </div>
      </div>
    </>
  );
>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
}