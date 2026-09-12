import { useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <strong>Socket Chat</strong>
      {user ? (
        <>
          <span className="nav-user">{user.username}</span>
          <button onClick={() => navigate("/socket")}>
            Socket UI
          </button>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <span className="nav-actions">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </span>
        </>
      )}
    </nav>
  );
};

export default Navbar;