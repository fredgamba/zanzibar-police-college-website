
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
  Search,
  PlusCircle,
  Globe,
  Calendar,
  AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

export default function AdminPages() {
  const [pages, setPages] = useState([]);
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

    fetchPages();
  }, [navigate]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('pages/');
      
      // 🔥 COMPLETE FIX: Handle all possible API response formats
      let pagesData = [];
      
      if (res.data && Array.isArray(res.data)) {
        // Filter out invalid data and ensure proper objects
        pagesData = res.data
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined && 
            item.id !== null &&
            item.page !== undefined
          )
          .map(item => ({
            // Ensure all required properties with safe defaults
            id: item.id || 0,
            page: item.page || 'unknown',
            title: item.title || 'Untitled Page',
            content: item.content || '',
            updated_at: item.updated_at || new Date().toISOString(),
            // Add derived properties safely
            displayTitle: getPageDisplayTitle(item.page),
            lastUpdated: formatDate(item.updated_at),
            excerpt: (item.content || '').substring(0, 150) + '...'
          }));
      } else if (res.data && typeof res.data === 'object') {
        // Handle object response - convert to array
        const pagesArray = Object.values(res.data);
        pagesData = pagesArray
          .filter(item => 
            item && 
            typeof item === 'object' && 
            item.id !== undefined
          )
          .map(item => ({
            id: item.id || 0,
            page: item.page || 'unknown',
            title: item.title || 'Untitled Page',
            content: item.content || '',
            updated_at: item.updated_at || new Date().toISOString(),
            displayTitle: getPageDisplayTitle(item.page),
            lastUpdated: formatDate(item.updated_at),
            excerpt: (item.content || '').substring(0, 150) + '...'
          }));
      } else {
        console.warn('Unexpected pages data format:', res.data);
        // Fallback to empty array
        pagesData = [];
      }
      
      console.log('Processed pages data:', pagesData);
      setPages(pagesData);
      
    } catch (err) {
      console.error('Failed to load pages:', err);
      setError('Failed to load pages. Please try again.');
      setPages([]); // Ensure empty array on error
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: Safe search filter
  const filteredPages = pages.filter(page => {
    if (!page || typeof page !== 'object') return false;
    
    const searchLower = searchTerm.toLowerCase();
    const title = String(page.title || '');
    const pageName = String(page.page || '');
    const displayTitle = String(page.displayTitle || '');
    const content = String(page.content || '');
    
    return (
      title.toLowerCase().includes(searchLower) ||
      pageName.toLowerCase().includes(searchLower) ||
      displayTitle.toLowerCase().includes(searchLower) ||
      content.toLowerCase().includes(searchLower)
    );
  });

  // Helper functions
  const getPageDisplayTitle = (pageKey) => {
    const pageTitles = {
      'home': 'Home Page',
      'history': 'History',
      'organization': 'Organization Structure',
      'department': 'Department',
      'sport_gym': 'Sport & Gym',
      'recreation': 'Recreation',
      'classes_accommodation': 'Classes & Accommodation',
      'range': 'Range',
      'library': 'Library',
      'driving_school': 'Driving School',
      'dispensary': 'Dispensary',
      'course': 'Course Information',
      'admission_requirements': 'Admission Requirements',
      'fee_structure': 'Fee Structure',
      'application_process': 'Application Process'
    };
    return pageTitles[pageKey] || pageKey;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never updated';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
              <h1>Pages Management</h1>
              <p>Manage website page content</p>
            </div>
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
              onClick={fetchPages}
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
            placeholder="Search pages by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Pages Grid */}
        <div className="pages-container">
          {loading ? (
            <div className="loading">Loading pages...</div>
          ) : filteredPages.length > 0 ? (
            <div className="pages-grid">
              {filteredPages.map(page => (
                // 🔥 FIX: Proper key prop and safe rendering
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <div className="no-pages" style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <FileText size={48} color="#ccc" />
              <h3>No pages found</h3>
              <p>
                {pages.length > 0 
                  ? 'Try changing your search terms' 
                  : 'No pages available in the system'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔥 NEW: Extract PageCard component for better error handling
const PageCard = ({ page }) => {
  if (!page || typeof page !== 'object') {
    return null; // Skip invalid pages
  }

  return (
    <div className="page-card" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease'
    }}>
      <div className="page-header" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#1c236d',
            fontSize: '1.2rem'
          }}>
            {page.displayTitle || 'Untitled Page'}
          </h3>
          <p style={{ 
            margin: 0,
            color: '#666',
            fontSize: '0.9rem',
            fontFamily: 'monospace'
          }}>
            /{page.page || 'unknown'}
          </p>
        </div>
        <div style={{
          background: '#e8eaf6',
          padding: '0.5rem',
          borderRadius: '6px'
        }}>
          <Globe size={16} color="#1c236d" />
        </div>
      </div>

      <div className="page-content" style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: '#555',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {page.excerpt || 'No content available'}
        </p>
        
        <div className="page-meta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#888',
          fontSize: '0.85rem'
        }}>
          <Calendar size={14} />
          <span>Updated: {page.lastUpdated || 'Unknown'}</span>
        </div>
      </div>

      <div className="page-actions" style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
        <Link 
          to={`/admin/pages/edit/${page.id}`}
          className="action-btn edit"
          style={{
            background: '#1c236d',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Edit size={16} />
          Edit Page
        </Link>
        
        <button 
          onClick={() => window.open(`/page/${page.page}`, '_blank')}
          className="action-btn view"
          style={{
            background: 'transparent',
            color: '#1c236d',
            border: '1px solid #1c236d',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Globe size={16} />
          View
        </button>
      </div>
    </div>
  );
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

};