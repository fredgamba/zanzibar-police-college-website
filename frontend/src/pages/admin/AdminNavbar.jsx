// src/components/admin/AdminNavbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Phone, 
  Users as UsersIcon,
  LogOut
} from 'lucide-react';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to homepage or login
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
        <span>Welcome, Admin</span>
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
            cursor: 'pointer'
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
}
