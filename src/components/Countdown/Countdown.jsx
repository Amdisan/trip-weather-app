import { useState, useEffect } from 'react';
import { useTrips } from '../../context/TripsContext';
import styles from './Countdown.module.css';

function Countdown() {
  const [counter, setCounter] = useState(0);
  const { selectedTrip } = useTrips();

  const seconds = Math.floor(counter % 60);
  const minutes = Math.floor((counter / 60) % 60);
  const hours = Math.floor((counter / 3600) % 24);
  const days = Math.floor(counter / 3600 / 24);

  useEffect(
    function () {
      if (selectedTrip?.endDate) {
        const dateNow = new Date().getTime();
        const startDate = new Date(selectedTrip.startDate).getTime();
        if (startDate < dateNow) {
          setCounter(0);
        } else {
          const range = startDate - dateNow;
          setCounter(Math.floor(range / 1000));
        }
      }
    },
    [selectedTrip]
  );

  useEffect(
    function () {
      let timer;
      if (counter > 0) {
        timer = setTimeout(() => setCounter(counter - 1), 1000);
      }
      return function () {
        clearTimeout(timer);
      };
    },
    [counter]
  );

  return (
    <div className={styles.container}>
      {counter === 0 && selectedTrip?.endDate && (
        <div className={styles.same_day}>SAME DAY TRIP</div>
      )}
      {counter > 0 && (
        <>
          <div>
            <div className={styles.numbers}>{days}</div>
            <div className={styles.text}>days</div>
          </div>
          <div>
            <div className={styles.numbers}>{hours}</div>
            <div className={styles.text}>hours</div>
          </div>
          <div>
            <div className={styles.numbers}>{minutes}</div>
            <div className={styles.text}>minutes</div>
          </div>
          <div>
            <div className={styles.numbers}>{seconds}</div>
            <div className={styles.text}>seconds</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Countdown;
