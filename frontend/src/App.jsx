// src/App.jsx - FULL FIXED VERSION WITH CORRECT IMPORTS
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import News from './pages/News';
import ApplyOnline from './pages/ApplyOnline';

// About imports
import History from './pages/About/History';
import Organization from './pages/About/Organization';
import Department from './pages/About/Department';


// Admission imports
import Course from './pages/Admission/Course';
import FeeStructure from './pages/Admission/FeeStructure';
import AdmissionRequirements from './pages/Admission/AdmissionRequirements';
import ApplicationProcess from './pages/Admission/ApplicationProcess';


// Admin imports - FIXED TO MATCH ORIGINAL FILENAMES
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPages from './pages/admin/Pages';
import AdminNews from './pages/admin/AdminNews'; // FIXED: Original path
import AdminContact from './pages/admin/Contact';
import Users from './pages/admin/Users';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';
import CreatePost from './pages/admin/CreateNews'; // FIXED: As per original (reuse for posts if needed)
import PostsList from './pages/admin/PostsList';
import EditPage from './pages/admin/EditNews'; // FIXED: As per original (reuse for pages if needed)
import CreateNews from './pages/admin/CreateNews';
import EditNews from './pages/admin/EditNews';
import SportGym from './pages/Facilities/SportGym';

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary';

// Public Layout Component (to avoid repetition)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="main-content">{children}</div>
    <Footer />
  </>
);

// Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

// Temp Page Component (with CSS class, no inline styles)
const TempPage = ({ title }) => (
  <div className="temp-page">
    <h1>{title}</h1>
    <p>Page is under development</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* === ADMIN LOGIN (No layout) === */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* === PROTECTED ADMIN ROUTES === */}
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading dashboard. <a href="/admin/login">Retry</a>
                </div>
              }>
                <AdminDashboard />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          
          {/* Pages Routes */}
          <Route path="/admin/pages" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading pages. <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              }>
                <AdminPages />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/pages/edit/:pageId" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error editing page. <a href="/admin/pages">Back to Pages</a>
                </div>
              }>
                <EditPage />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          
          {/* News Routes */}
          <Route path="/admin/news" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading news. <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              }>
                <AdminNews />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/news/create" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error creating news. <a href="/admin/news">Back to News</a>
                </div>
              }>
                <CreateNews />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/news/edit/:newsId" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error editing news. <a href="/admin/news">Back to News</a>
                </div>
              }>
                <EditNews />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          
          {/* Posts Routes */}
          <Route path="/admin/posts" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading posts. <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              }>
                <PostsList />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/posts/create" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error creating post. <a href="/admin/posts">Back to Posts</a>
                </div>
              }>
                <CreatePost />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          
          {/* Contact & Users Routes */}
          <Route path="/admin/contact" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading contact. <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              }>
                <AdminContact />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error loading users. <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              }>
                <Users />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users/add" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error adding user. <a href="/admin/users">Back to Users</a>
                </div>
              }>
                <AddUser />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users/:id/edit" element={
            <ProtectedAdminRoute>
              <ErrorBoundary fallback={
                <div className="error-fallback">
                  Error editing user. <a href="/admin/users">Back to Users</a>
                </div>
              }>
                <EditUser />
              </ErrorBoundary>
            </ProtectedAdminRoute>
          } />

          {/* === PUBLIC ROUTES WITH LAYOUT === */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about/history" element={<PublicLayout><History /></PublicLayout>} />
          <Route path="/about/organization" element={<PublicLayout><Organization /></PublicLayout>} />
          <Route path="/about/department" element={<PublicLayout><Department /></PublicLayout>} />
          <Route path="/admission/course" element={<PublicLayout><Course /></PublicLayout>} />
          <Route path="/admission/admission-requirements" element={<PublicLayout><AdmissionRequirements /></PublicLayout>} />
          <Route path="/admission/fee-structure" element={<PublicLayout><FeeStructure /></PublicLayout>} />
          <Route path="/admission/application-process" element={<PublicLayout><ApplicationProcess /></PublicLayout>} />
          <Route path="/facilities/sport-gym" element={<PublicLayout><TempPage title="Sport & Gym" /></PublicLayout>} />
          <Route path="/facilities/recreation" element={<PublicLayout><TempPage title="Recreation" /></PublicLayout>} />
          <Route path="/facilities/classes-accommodation" element={<PublicLayout><TempPage title="Classes & Accommodation" /></PublicLayout>} />
          <Route path="/facilities/range" element={<PublicLayout><TempPage title="Range" /></PublicLayout>} />
          <Route path="/facilities/library" element={<PublicLayout><TempPage title="Library" /></PublicLayout>} />
          <Route path="/facilities/driving-school" element={<PublicLayout><TempPage title="Driving School" /></PublicLayout>} />
          <Route path="/facilities/dispensary" element={<PublicLayout><TempPage title="Dispensary" /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/apply" element={<PublicLayout><ApplyOnline /></PublicLayout>} />

          {/* Redirects */}
          <Route path="/user_login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/management" element={<Navigate to="/admin/login" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;