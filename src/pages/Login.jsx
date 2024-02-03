import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/globalCompnent/PageNav";
import Button from "../components/appLayoutComponents/Button";
import { useFakeAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const { login, isAuthenticate, isLoading } = useFakeAuth();
  const [email, setEmail] = useState("o@example.com");
  const [password, setPassword] = useState("qwerty");
  const [err, setErr] = useState("");

  async function handelLogin(e) {
    e.preventDefault();
    await login(email, password);
    if(!isAuthenticate) setErr("Username Or Password Is Wrong");
  }

  useEffect(() => {
    if (isAuthenticate) navigate("/app", { replace: true });
  }, [isAuthenticate, navigate]);

  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form} onSubmit={handelLogin}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className={styles["load-container"]}>
            <Button type="primary">Login</Button>
            <p className={styles.load}>{isLoading ? "Loading..." : err.length > 0 ? "Something Is Wrong" : ""}</p>
          </div>
        </form>
      </main>
    </>
  );
}
export default Login;
