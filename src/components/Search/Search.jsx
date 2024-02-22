import { useTrips } from '../../context/TripsContext';
import styles from './Search.module.css';

function Search() {
  const { filterTrips } = useTrips();
  return (
    <input
      type="text"
      placeholder={`Search your trip`}
      className={styles.search}
      onChange={(e) => filterTrips(e.target.value)}
    />
  );
}

export default Search;
