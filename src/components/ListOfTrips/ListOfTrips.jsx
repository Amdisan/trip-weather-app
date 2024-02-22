import { useLayoutEffect, useRef, useState } from 'react';
import { useTrips } from '../../context/TripsContext';
import Modal from '../../ui/Modal/Modal';
import Card from '../../ui/Card/Card';
import NewTripForm from '../NewTripForm/NewTripForm';
import arrow_left from '../../assets/arrow_left.svg';
import arrow_right from '../../assets/arrow_right.svg';
import styles from './ListOfTrips.module.css';

function ListOfTrips() {
  const { filteredTrips } = useTrips();
  const containerRef = useRef();
  const [showBtn, setShowBtn] = useState();

  function handleScrollLeft() {
    containerRef.current.scrollBy(-450, 0);
  }
  function handleScrollRight() {
    containerRef.current.scrollBy(450, 0);
  }

  useLayoutEffect(
    function () {
      const handleResize = () => {
        if (
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        ) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    },
    [filteredTrips]
  );

  return (
    <div className={styles.wrapper}>
      {showBtn && (
        <button className={styles.arrow_button} onClick={handleScrollLeft}>
          <img src={arrow_left} />
        </button>
      )}
      <div className={styles.container} ref={containerRef}>
        {filteredTrips
          .sort(
            (tripA, tripB) =>
              new Date(tripA.startDate).getTime() -
              new Date(tripB.startDate).getTime()
          )
          .map((trip) => (
            <Card key={trip.id} trip={trip} />
          ))}
        <Modal>
          <Modal.Open opens="new_trip_form">
            <button className={styles.container_text}>
              <span>+</span>
              <span>Add trip</span>
            </button>
          </Modal.Open>
          <Modal.Window name="new_trip_form">
            <NewTripForm />
          </Modal.Window>
        </Modal>
      </div>
      {showBtn && (
        <button className={styles.arrow_button} onClick={handleScrollRight}>
          <img src={arrow_right} />
        </button>
      )}
    </div>
  );
}

export default ListOfTrips;
