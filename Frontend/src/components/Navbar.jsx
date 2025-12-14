import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>🍭 Sweet Shop</h2>

      <div style={styles.links}>
        <Link to="/dashboard">Dashboard</Link>

        {user?.role === "admin" && (
          <Link to="/admin">Admin Panel</Link>
        )}

        <button onClick={handleLogout} style={styles.btn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1f2937",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  btn: {
    padding: "6px 12px",
    cursor: "pointer"
  }
};

export default Navbar;
