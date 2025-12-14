import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2>Create Account 🍭</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Register</button>

        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "320px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Register;

