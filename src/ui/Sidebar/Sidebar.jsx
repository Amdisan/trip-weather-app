import styles from './Sidebar.module.css';
import Header from '../Header/Header';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import Countdown from '../../components/Countdown/Countdown';

function Sidebar() {
  return (
    <aside className={styles.aside}>
      <Header />
      <CurrentWeather />
      <Countdown />
    </aside>
  );
}

export default Sidebar;
