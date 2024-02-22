import { useUser } from '../../context/UserContext';
import google_icon from '../../assets/google_icon.svg';
import styles from './Login.module.css';

function Login() {
  const {login} = useUser()
  return (
    <main className={styles.overlay}>
      <div className={styles.box}>
        <h1 className={styles.heading}>
          Log in to your <span>Weather Forecast</span> account
        </h1>
        <button className={styles.login_btn} onClick={login}>
          <span>Login with Google</span>
          <img src={google_icon} alt="login with google" />
        </button>
      </div>
    </main>
  );
}

export default Login;
