import React, { createContext, useCallback, useEffect, useState } from 'react';

export const UserAvatarContext = createContext();

export const UserAvatarProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const loadUsername = useCallback(async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/name/firstName',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const firstName = await res.json();
      setFirstName(firstName);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadAvatar = useCallback(async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/attachment/avatar',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.ok) {
        const avatarBlob = await res.blob();
        setAvatar(URL.createObjectURL(avatarBlob));
      }
    } catch (err) {
      console.error(err);
    }
    setAvatarLoaded(true);
  }, []);

  useEffect(() => {
    loadAvatar();
  }, [loadAvatar]);

  useEffect(() => {
    if (!avatar && avatarLoaded) {
      loadUsername();
    }
  }, [avatar, avatarLoaded, loadUsername]);

  return (
    <UserAvatarContext.Provider
      value={{ avatar, setAvatar, firstName, setFirstName }}
    >
      {children}
    </UserAvatarContext.Provider>
  );
};

export default UserAvatarProvider;
