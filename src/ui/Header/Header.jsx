import { useUser } from '../../context/UserContext';
import noProfileImg from '../../assets/no-profile-picture-15260.svg';
import styles from './Header.module.css';

function Header() {
  const { logOut, profile } = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <span>{profile?.given_name ? profile?.given_name : 'User'}</span>
        <button className={styles.logout} onClick={logOut}>
          LogOut
        </button>
      </div>
      <img
        src={profile?.picture ? profile.picture : noProfileImg}
        alt="avatar"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Header;
