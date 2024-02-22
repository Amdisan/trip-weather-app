import { useQuery } from '@tanstack/react-query';
import { useTrips } from '../context/TripsContext';

const URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const KEY = '77CULEV4D2NPPLTMYHX8FQWJF';

async function getWeatherForecast(trip) {
  try {
    const res = await fetch(
      `${URL}/${trip.city.name}/${trip.startDate}/${trip.endDate}?unitGroup=metric&include=days&key=${KEY}&contentType=json`
    );
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Failed to fetch weather forecast');
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function getTodayWeatherForecast(trip) {
  try {
    const res = await fetch(
      `${URL}/${trip.city.name}/today?unitGroup=metric&include=days&key=${KEY}&contentType=json`
    );
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to fetch today's weather forecast`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export function useWeatherForecast() {
  const { selectedTrip } = useTrips();
  const {
    isLoading,
    data: weatherForecast,
    error,
  } = useQuery({
    queryKey: ['weatherForecast', selectedTrip],
    queryFn: () => getWeatherForecast(selectedTrip),
    enabled: !!selectedTrip?.id,
    retry: false,
  });

  return {
    isLoading,
    weatherForecast,
    error,
  };
}

export function useTodayWeatherForecast() {
  const { selectedTrip } = useTrips();
  const {
    isLoading,
    data: todayWeatherForecast,
    error,
  } = useQuery({
    queryKey: ['todayWeatherForecast', selectedTrip],
    queryFn: () => getTodayWeatherForecast(selectedTrip),
    enabled: !!selectedTrip?.id,
    retry: false,
  });

  return {
    isLoading,
    todayWeatherForecast,
    error,
  };
}
