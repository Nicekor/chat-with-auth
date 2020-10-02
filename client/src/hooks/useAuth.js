import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = (authDoneCb) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/chats');
    }
  }, [isAuthenticated, history]);

  const loginUser = async (userData) => {
    try {
      const res = await fetch('http://192.168.1.157:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await fetch('http://192.168.1.157:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const authenticate = async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/auth/authenticate',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.ok) {
        const userData = await res.json();
        localStorage.setItem('isAuthenticated', true);
        authDoneCb(userData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { isAuthenticated, authenticate, loginUser, registerUser };
};

export default useAuth;
