import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorageState';

export function useGoogleAuth() {
  const [user, setUser] = useLocalStorageState({}, 'user');
  const [profile, setProfile] = useLocalStorageState({}, 'profile');

  const login = useGoogleLogin({
    onSuccess: (res) => setUser(res),
    onError: (err) => console.log('Login Failed: ', err),
  });

  useEffect(() => {
    (async function () {
      if (user?.access_token) {
        if (
          !profile?.endTimeStamp ||
          profile.endTimeStamp - new Date().getTime() <= 0
        ) {
          try {
            const res = await fetch(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json',
                },
              }
            );
            const data = await res.json();
            if (data?.error) {
              throw new Error(data.error);
            }
            setProfile({
              ...data,
              endTimeStamp: new Date().getTime() + user.expires_in * 1000,
            });
          } catch (error) {
            setUser({});
            setProfile({});
            console.log('Failed googleapis: ', error);
          }
        }
      }
    })();
  }, [user?.access_token, user?.expires_in, profile, setProfile, setUser]);

  const logOut = function () {
    googleLogout();
    setUser({});
    setProfile({});
  };

  return { profile, login, logOut };
}
