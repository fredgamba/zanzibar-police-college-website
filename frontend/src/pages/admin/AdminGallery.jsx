// src/pages/admin/AdminNews.jsx - COMPLETELY FIXED
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Newspaper, 
  PlusCircle, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  AlertCircle 
} from 'lucide-react';
import api from '../../utils/api';
import AdminNavbar from './AdminNavbar'; // ✅ Reuse the separate navbar

export default function AdminGallery() {
  const [news, setGallery] = useState([]);
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

    fetchGallery();
  }, [navigate]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.get('public/gallery/');
      
      let galleryData = [];
      if (res.data && Array.isArray(res.data)) {
        galleryData = res.data[1]
          .filter(item => item?.id !== undefined)
          .map(item => ({
            id: item.id,
            description: item.description || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            shortContent: String(item.description || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else if (res.data && typeof res.data === 'object') {
        const galleryArray = Object.values(res.data);
        galleryData = galleryArray
          .filter(item => item?.id !== undefined)
          .map(item => ({
            id: item.id,

            description: item.description || '',
            excerpt: item.excerpt || '',
            date_posted: item.date_posted || new Date().toISOString(),
            image: item.image || null,
            shortContent: String(item.description || '').substring(0, 100) + '...',
            formattedDate: formatDate(item.date_posted)
          }));
      } else {
        console.warn('Unexpected news data format:', res.data);
      }
      setGallery(galleryData);
      
    } catch (err) {
      console.error('Failed to load gallery:', err);
      setError('Failed to load gallery. Please try again.');
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = news.filter(item => {
    if (!item) return false;
    const searchLower = searchTerm.toLowerCase();
    return [item.description, item.excerpt].some(field => field?.toLowerCase().includes(searchLower));
  });

  const handleDelete = async (id, title) => {
    if (!id) {
      Swal.fire({ icon: 'error', title: 'Invalid ID', text: 'Cannot delete this gallery item.' });
      return;
    }

    const result = await Swal.fire({
      title: `Are you sure you want to delete ?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`admin/gallery/delete/${id}/`);
        setGallery(news.filter(item => item.id !== id));
        Swal.fire({ icon: 'success', title: 'Deleted!', text: `gallery has been deleted.`, timer: 2000, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete gallery. Please try again.' });
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar /> {/* ✅ Reused */}

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-actions">
            <div>
              <h1>Gallery Management</h1>
             
            </div>
            <Link to="/admin/gallery/create" className="btn-primary">
              <PlusCircle size={18} />
              Add New Gallery
            </Link>
          </div>
        </div>

        {error && (
          <div className="error-banner" style={{ background: '#ffebee', color: '#c62828', padding:'1rem', borderRadius:'8px', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={fetchGallery} style={{ marginLeft:'auto', background:'#c62828', color:'white', border:'none', padding:'0.5rem 1rem', borderRadius:'4px', cursor:'pointer' }}>Retry</button>
          </div>
        )}

        <div className="search-box" style={{ marginBottom:'2rem' }}>
          <Search size={18} />
          <input type="text" placeholder="Search gallery by  content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="news-container">
          {loading ? (
            <div className="loading">Loading news...</div>
          ) : filteredGallery.length > 0 ? (
            <div className="news-grid">
              {filteredGallery.map(item => (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  onEdit={() => navigate(`/admin/news/edit/${item.id}`)}
                  onDelete={() => handleDelete(item.id, item.title)}
                  onView={() => navigate(`/news/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-news" style={{ textAlign:'center', padding:'3rem', color:'#666' }}>
              <Newspaper size={48} color="#ccc" />
              <h3>No gallery found</h3>
              <p>{news.length > 0 ? 'Try changing your search terms' : 'No gallery available'}</p>
              <Link to="/admin/gallery/create" className="btn-primary"><PlusCircle size={18} /> Create Gallery</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



const GalleryCard = ({ item, onEdit, onDelete, onView }) => {
  const [showFullImage, setShowFullImage] = useState(false);

  if (!item) return null;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #e0e0e0',
          overflow: 'hidden', // keeps rounded corners
        }}
      >
        {/* Content */}
        <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 style={{ margin: 0, color: '#1c236d' }}>{item.title}</h4>
          <p style={{ margin: '0.3rem 0', color: '#555', fontSize: '0.9rem' }}>
            {item.shortContent}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              color: '#777',
            }}
          >
            <Calendar size={13} />
            {item.formattedDate}
          </div>
        </div>

        {/* Image (fully visible, clickable) */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{
              width: 'auto',
              height: '50%',       // keeps full image without cropping
              objectFit: 'contain', // maintain aspect ratio
              cursor: 'pointer',
              display: 'block',
            }}
            onClick={() => setShowFullImage(true)}
          />
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem' }}>
          <button
            onClick={onView}
            style={{
              border: '1px solid #1c236d',
              background: 'transparent',
              color: '#1c236d',
              padding: '0.5rem 0.8rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <Eye size={14} /> View
          </button>

          <button
            onClick={onEdit}
            style={{
              background: '#1c236d',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 0.8rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <Edit size={14} /> Edit
          </button>

          <button
            onClick={onDelete}
            style={{
              border: '1px solid #d32f2f',
              background: 'transparent',
              color: '#d32f2f',
              padding: '0.5rem 0.8rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Full Image Modal */}
      {showFullImage && (
        <div
          onClick={() => setShowFullImage(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '8px',
            }}
          />
        </div>
      )}
    </>
  );
};

