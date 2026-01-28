// ===== GLOBAL CSS IMPORTS (REQUIRED FOR REACT-SLICK) =====
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== REACT / ROUTER =====
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ===== LAYOUT COMPONENTS =====
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

<<<<<<< HEAD
// ===== PUBLIC PAGES =====
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import News from "./pages/News";
import ApplyOnline from "./pages/ApplyOnline";
=======
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
>>>>>>> 51269c8b2b91bce0f011c6d20f30baad6dde0e43

// ===== ABOUT =====
import History from "./pages/About/History";
import Organization from "./pages/About/Organization";
import Department from "./pages/About/Department";

// ===== ADMISSION =====
import Course from "./pages/Admission/Course";
import FeeStructure from "./pages/Admission/FeeStructure";
import AdmissionRequirements from "./pages/Admission/AdmissionRequirements";
import ApplicationProcess from "./pages/Admission/ApplicationProcess";

// ===== FACILITIES =====
import ClassesAccomodations from "./pages/Facilities/Classes_Accomodations";
import DrivingSchool from "./pages/Facilities/DrivingSchool"
import Dispensary from "./pages/Facilities/Dispensary";
import Library from "./pages/Facilities/Library"
import Range from "./pages/Facilities/Range";
import Recreation from "./pages/Facilities/Recreation";

// ===== ADMIN =====
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPages from "./pages/admin/Pages";
import AdminNews from "./pages/admin/AdminNews";
import AdminContact from "./pages/admin/Contact";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import PostsList from "./pages/admin/PostsList";
import CreateNews from "./pages/admin/CreateNews";
import EditNews from "./pages/admin/EditNews";


// ===== PUBLIC LAYOUT =====
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="main-content">{children}</div>
    <Footer />
  </>
);

// ===== ADMIN PROTECTION =====
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

// ===== TEMP PAGE =====
const TempPage = ({ title }) => (
  <div className="temp-page">
    <h1>{title}</h1>
    <p>Page is under development</p>
  </div>
);

// ===== APP =====
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>

          {/* ===== ADMIN LOGIN ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ===== ADMIN ROOT ===== */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedAdminRoute>
            }
          />

          {/* ===== ADMIN DASHBOARD ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <AdminDashboard />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          {/* ===== ADMIN PAGES ===== */}
          <Route
            path="/admin/pages"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <AdminPages />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          {/* ===== ADMIN NEWS ===== */}
          <Route
            path="/admin/news"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <AdminNews />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/news/create"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <CreateNews />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/news/edit/:newsId"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <EditNews />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          {/* ===== ADMIN POSTS ===== */}
          <Route
            path="/admin/posts"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <PostsList />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          {/* ===== USERS ===== */}
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <Users />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users/add"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <AddUser />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users/:id/edit"
            element={
              <ProtectedAdminRoute>
                <ErrorBoundary>
                  <EditUser />
                </ErrorBoundary>
              </ProtectedAdminRoute>
            }
          />

          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about/history" element={<PublicLayout><History /></PublicLayout>} />
          <Route path="/about/organization" element={<PublicLayout><Organization /></PublicLayout>} />
          <Route path="/about/department" element={<PublicLayout><Department /></PublicLayout>} />

          <Route path="/admission/course" element={<PublicLayout><Course /></PublicLayout>} />
          <Route path="/admission/admission-requirements" element={<PublicLayout><AdmissionRequirements /></PublicLayout>} />
          <Route path="/admission/fee-structure" element={<PublicLayout><FeeStructure /></PublicLayout>} />
          <Route path="/admission/application-process" element={<PublicLayout><ApplicationProcess /></PublicLayout>} />

          <Route path="/facilities/classes-accommodation" element={
            <PublicLayout>
              <ClassesAccomodations />
            </PublicLayout>
          } />

          <Route path="/facilities/sport-gym" element={<PublicLayout><TempPage title="Sport & Gym" /></PublicLayout>} />
          <Route path="/facilities/recreation" element={<PublicLayout><Recreation/></PublicLayout>} />
          <Route path="/facilities/library" element={<PublicLayout><Library/></PublicLayout>} />
          <Route path="/facilities/range" element={<PublicLayout><Range/></PublicLayout>} />
          <Route path="/facilities/driving-school" element={<PublicLayout><DrivingSchool/></PublicLayout>} />
          <Route path="/facilities/dispensary" element={<PublicLayout><Dispensary/></PublicLayout>} />

          <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/apply" element={<PublicLayout><ApplyOnline /></PublicLayout>} />

          {/* ===== REDIRECTS ===== */}
          <Route path="/user_login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/management" element={<Navigate to="/admin/login" replace />} />

          {/* ===== FALLBACK ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
