import { format } from 'date-fns';
import { useTrips } from '../../context/TripsContext';
import styles from './Card.module.css';

function Card({ trip }) {
  const {
    id,
    city: { image, name },
    startDate,
    endDate,
  } = trip;

  const { selectedTrip = {}, selectTrip } = useTrips();

  return (
    <div
      className={`${styles.container} ${
        selectedTrip.id === id && styles.focus
      }`}
      onClick={() => selectTrip(trip)}
    >
      <img className={styles.image} src={image} />
      <div className={styles.container_text}>
        <h4 className={styles.heading}>{name}</h4>
        <span className={styles.dates}>{`${format(
          startDate,
          'dd.MM.yyyy'
        )} - ${format(endDate, 'dd.MM.yyyy')}`}</span>
      </div>
    </div>
  );
}

export default Card;
