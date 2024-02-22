import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { cities } from '../../data/data_cities';
import { useTrips } from '../../context/TripsContext';
import { extraDaysFn } from '../../helpers/extraDaysFn';
import styles from './NewTripForm.module.css';

function NewTripForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createTrip } = useTrips();

  const dateNow = useMemo(function () {
    return format(new Date(), 'yyyy-MM-dd');
  }, []);

  const startDateMax = useMemo(() => extraDaysFn(dateNow), [dateNow]);
  const [selectedStartDate, setSelectedStartDate] = useState(dateNow);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [endDateMax, setEndDateMax] = useState();

  useEffect(
    function () {
      setSelectedEndDate(selectedStartDate);
      setEndDateMax(() => extraDaysFn(selectedStartDate));
    },
    [selectedStartDate]
  );

  const onStartDate = function (e) {
    setSelectedStartDate(e.target.value);
  };
  const onEndDate = function (e) {
    setSelectedEndDate(e.target.value);
  };

  function submitForm(data) {
    const id = Math.floor(Math.random() * 1000);
    const newTrip = { ...data, id };
    createTrip(newTrip);
    onCloseModal?.();
  }

  function resetForm() {
    setSelectedStartDate(dateNow);
    reset();
  }

  return (
    <div className={styles.container_modal}>
      <h2>Create trip</h2>
      <div className={styles.top_line}></div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={styles.box}>
          <label htmlFor="city">
            <span>* </span>
            City
            <span className={styles.error_txt}>{errors?.city?.message}</span>
          </label>
          <select
            id="city"
            {...register('city', {
              validate: (value) =>
                value === 'Please select a city'
                  ? 'Please select a city'
                  : true,
            })}
          >
            <option>Please select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.box}>
          <label htmlFor="start_date">
            <span>* </span>
            Start date
          </label>
          <input
            id="start_date"
            type="date"
            min={dateNow}
            max={startDateMax}
            defaultValue={dateNow}
            onInput={onStartDate}
            {...register('start_date')}
          />
        </div>
        <div className={styles.box}>
          <label htmlFor="end_date">
            <span>* </span>
            End date
          </label>
          <input
            id="end_date"
            type="date"
            min={selectedStartDate}
            max={endDateMax}
            value={selectedEndDate}
            onInput={onEndDate}
            {...register('end_date')}
          />
        </div>
        <div className={styles.bottom_line}></div>
        <div className={styles.button_box}>
          <button type="reset" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default NewTripForm;
