import { useWeatherForecast } from '../../hooks/useWeatherForecast';
import WeatherCard from '../../ui/WeatherCard/WeatherCard';
import Spinner from '../../ui/Spinner/Spinner';
import styles from './WeatherForecast.module.css';

function WeatherForecast() {
  const { isLoading, weatherForecast } = useWeatherForecast();
  const days = weatherForecast?.days || [];

  return (
    <div>
      <h2 className={styles.heading}>Week</h2>
      <div className={styles.card_container}>
        {!weatherForecast && !isLoading && (
          <div className={styles.no_trip}>Please, select your trip!</div>
        )}
        {isLoading && <Spinner />}
        {!isLoading &&
          weatherForecast &&
          days.map((day) => <WeatherCard key={day.datetime} day={day} />)}
      </div>
    </div>
  );
}

export default WeatherForecast;
