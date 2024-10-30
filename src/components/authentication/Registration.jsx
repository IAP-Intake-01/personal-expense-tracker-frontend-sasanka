import  { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import axios from "../../services/AxiosOrder";

const PaperContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export default function Register() {
  // Form field states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submit
  const handleRegister = async (event) => {
    event.preventDefault(); // Form submit prevent කරන්න
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Axios request to send data to backend register API
      const response = await axios.post("register", {
        username,
        email,
        password,
      });
      console.log("Registered successfully:", response.data);
      alert("User registered successfully");

      //clear කරන්න
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error("Registration failed:", error.response.data);
      alert("Registration failed: " + error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <PaperContainer>
        <AvatarStyled sx={{ bgcolor: '#0d47a1' }}>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          REGISTER
        </Typography>
        <FormStyled noValidate onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Register
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Already have an account?</p>
            <Link href="/login" variant="body2">
              {" Log In"}
            </Link>
          </div>
        </FormStyled>
      </PaperContainer>
    </Container>
  );
}
