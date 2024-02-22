import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { cities } from '../data/data_cities';

const trips = [
  {
    id: 1,
    city: cities.find((city) => city.name === 'Berlin'),
    startDate: '2024-02-24',
    endDate: '2024-02-28',
  },
  {
    id: 2,
    city: cities.find((city) => city.name === 'Tokio'),
    startDate: '2024-03-05',
    endDate: '2024-03-20',
  },
];

const TripsContext = createContext();

function TripsProvider({ children }) {
  const { profile } = useUser();
  const [userTrips, setUserTrips] = useLocalStorageState(
    trips,
    `${profile.email}_trips`
  );

  const [filteredTrips, setFilteredTrips] = useState(userTrips);
  const [selectedTrip, setSelectedTrip] = useState();

  useEffect(
    function () {
      setFilteredTrips(userTrips);
    },
    [userTrips]
  );

  function createTrip(data) {
    if (data !== null && data.city) {
      const city = cities.find((city) => city.name === data.city);
      setUserTrips((userTrips) => [
        ...userTrips,
        {
          id: data.id,
          city,
          startDate: data.start_date,
          endDate: data.end_date,
        },
      ]);
    } else {
      console.log("Can't create new trip. No correct data.");
    }
  }

  function filterTrips(filter) {
    if (filter === '') {
      return setFilteredTrips(userTrips);
    }
    const filtered = userTrips.filter((trip) =>
      trip.city.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTrips(filtered);
  }

  function selectTrip(trip) {
    setSelectedTrip(trip);
  }

  return (
    <TripsContext.Provider
      value={{
        userTrips,
        createTrip,
        filteredTrips,
        filterTrips,
        selectedTrip,
        selectTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

function useTrips() {
  const context = useContext(TripsContext);
  if (context === undefined)
    throw new Error('TripsContext was used outside of TripsProvider');
  return context;
}

export { TripsProvider, useTrips };
