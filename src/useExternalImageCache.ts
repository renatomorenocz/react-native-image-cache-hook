import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

import CacheManager from './cacheManager';

const useExternalImageCache = (uri: string, cacheDir: string = '/images/') => {
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
    (async () => {
      const cache = new CacheManager(cacheDir);
      setFilePath(await cache.getPathByUri(uri));
    })();
  });

  return Platform.OS === 'android' ? 'file://' + filePath : filePath;
};

export default useExternalImageCache;
