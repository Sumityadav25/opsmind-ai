import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar glass">
      <div className="nav-content">
        <div className="logo" onClick={() => navigate('/')}>
          OpsMind AI
        </div>
        
        {userId && (
          <div className="nav-links">
            {role === 'admin' && (
              <button 
                className="admin-btn glass" 
                onClick={() => navigate('/admin')}
              >
                ⚙️ Admin Panel
              </button>
            )}
            
            <span className={`role-badge ${role}`}>
              {role?.toUpperCase() || 'GUEST'}
            </span>
            
            <button 
              className="logout-btn glass"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
