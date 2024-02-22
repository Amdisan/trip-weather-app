import { useTodayWeatherForecast } from '../../hooks/useWeatherForecast';
import { week_days } from '../../data/data_days';
import { weather_icons } from '../../data/data_weather_icons';
import Spinner from '../../ui/Spinner/Spinner';
import styles from './CurrentWeather.module.css';

function CurrentWeather() {
  const { isLoading, todayWeatherForecast } = useTodayWeatherForecast();
  const address = todayWeatherForecast?.address || '';
  const day = todayWeatherForecast?.days[0] || {};

  return (
    <div className={styles.container}>
      {!todayWeatherForecast && !isLoading && (
        <div className={styles.no_trip}>Please, select your trip!</div>
      )}
      {isLoading && <Spinner />}
      {!isLoading && todayWeatherForecast && (
        <>
          <h2>{week_days[new Date(day.datetime).getDay()]}</h2>
          <div className={styles.container_weather}>
            <img
              data-img={day.icon}
              src={
                weather_icons[day.icon]
                  ? weather_icons[day.icon]
                  : weather_icons.default
              }
            />
            <div className={styles.temp}>{day.temp}</div>
          </div>
          <span className={styles.city}>{address}</span>{' '}
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
