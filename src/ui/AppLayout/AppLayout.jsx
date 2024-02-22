import Sidebar from '../Sidebar/Sidebar';
import styles from './AppLayout.module.css';

function AppLayout({ children }) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Sidebar />
    </div>
  );
}

export default AppLayout;
