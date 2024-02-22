import Search from '../../components/Search/Search';
import ListOfTrips from '../../components/ListOfTrips/ListOfTrips';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';

function Home() {
  return (
    <>
      <h1>
        Weather <span style={{ fontWeight: 600 }}> Forecast</span>
      </h1>
      <Search />
      <ListOfTrips />
      <WeatherForecast />
    </>
  );
}

export default Home;
