import { format } from 'date-fns';
import { week_days } from '../../data/data_days';
import { weather_icons } from '../../data/data_weather_icons';
import styles from './WeatherCard.module.css';

function WeatherCard({ day }) {
  const { datetime, icon, tempmax, tempmin } = day;

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>
        {week_days[new Date(datetime).getDay()]}
      </h4>
      <h5 className={styles.heading_date}>{format(datetime, 'dd.MM.yyyy')}</h5>
      <div className={styles.image_wrapper}>
        <img
          className={styles.image}
          data-set={icon}
          src={
            weather_icons[icon] ? weather_icons[icon] : weather_icons.default
          }
          alt="weather icon"
        />
      </div>
      <p className={styles.temp}>{`${tempmax}°/${tempmin}°`}</p>
    </div>
  );
}

export default WeatherCard;
