
// src/pages/admin/CreatePost.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Calendar,
  Eye,
  Type,
  FileText as FileTextIcon
} from 'lucide-react';
import api from '../../utils/api';

export default function CreatePost() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    post_type: 'news',
    is_published: false,
    image: null,
    excerpt: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('post_type', formData.post_type);
      formDataToSend.append('is_published', formData.is_published);
      formDataToSend.append('excerpt', formData.excerpt);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await api.post('posts/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Post created successfully!');
      navigate('/admin/posts');
    } catch (err) {
      console.error('Failed to create post');
      alert('Error creating post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const postTypes = [
    { value: 'news', label: 'News Article', icon: Newspaper },
    { value: 'announcement', label: 'Announcement', icon: FileTextIcon },
    { value: 'event', label: 'Event', icon: Calendar }
  ];

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      
      <div className="dashboard-content">
        <div className="page-edit-header">
          <Link to="/admin/posts" className="back-btn">
            <ArrowLeft size={20} />
            Back to Posts
          </Link>
          <h1>Create New Post</h1>
          <p>Add a new news article, announcement, or event</p>
        </div>

        <div className="post-create-container">
          <form onSubmit={handleSubmit} className="post-edit-form">
            <div className="form-section">
              <h3>Post Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">
                    <Type size={16} />
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter post title..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post_type">
                    <FileTextIcon size={16} />
                    Post Type *
                  </label>
                  <select
                    id="post_type"
                    name="post_type"
                    value={formData.post_type}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    {postTypes.map(type => {
                      const IconComponent = type.icon;
                      return (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">
                  <FileTextIcon size={16} />
                  Short Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="2"
                  className="form-input"
                  placeholder="Brief description of the post..."
                  maxLength="200"
                />
                <small className="form-help">
                  {formData.excerpt.length}/200 characters
                </small>
              </div>
            </div>

            <div className="form-section">
              <h3>Featured Image</h3>
              <div className="form-group">
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
                    {imagePreview ? 'Change Image' : 'Choose Featured Image'}
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
                  Recommended size: 800x400px. Supported formats: JPG, PNG, GIF
                </small>
              </div>
            </div>

            <div className="form-section">
              <h3>Post Content</h3>
              <div className="form-group">
                <label htmlFor="content">
                  <FileTextIcon size={16} />
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="12"
                  className="form-textarea"
                  placeholder="Write your post content here..."
                />
                <small className="form-help">
                  You can use HTML tags for formatting. For rich text editing, this will be upgraded to a WYSIWYG editor.
                </small>
              </div>
            </div>

            <div className="form-section">
              <h3>Publishing Options</h3>
              <div className="publishing-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Publish immediately
                </label>
                <small className="form-help">
                  If unchecked, post will be saved as draft
                </small>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? 'Creating...' : 'Create Post'}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="btn-secondary"
              >
                Cancel
              </button>
              
              {formData.is_published && (
                <div className="preview-action">
                  <a 
                    href="#preview" 
                    className="btn-outline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Preview functionality would go here
                      alert('Preview feature coming soon!');
                    }}
                  >
                    <Eye size={16} />
                    Preview
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Admin Navbar Component (same as above)
const AdminNavbar = () => {
  // ... same AdminNavbar component as above

};