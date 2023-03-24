import { MMKV, MMKVConfiguration } from 'react-native-mmkv';
import { SPOTIFY_CLIENT_SECRET } from '@spotify-clone/shared/secrets';
import { Storage } from 'redux-persist';

const createStorage = (configuration?: MMKVConfiguration): Storage => {
  const mmkv = new MMKV(configuration);
  return {
    setItem: (key, value) => {
      mmkv.set(key, value);
      return Promise.resolve(true);
    },
    getItem: key => {
      const value = mmkv.getString(key);
      return Promise.resolve(value);
    },
    removeItem: key => {
      mmkv.delete(key);
      return Promise.resolve();
    },
  };
};

export const storage = createStorage();
export const encryptedStorage = createStorage({
  id: 'encrypted-storage',
  encryptionKey: SPOTIFY_CLIENT_SECRET,
});
