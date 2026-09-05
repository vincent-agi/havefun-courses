import { useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { buildMediaImageSource } from '../../infrastructure/http/media-source';

/**
 * Résout un `mediaUrl` d'API ("/media/<id>") en source <Image> authentifiée.
 * Usage : const source = useMediaImageSource(submission.mediaUrl);
 *         {source && <Image source={source} style={...} />}
 */
export function useMediaImageSource(
  mediaUrl: string | null | undefined,
): ImageSourcePropType | null {
  const [source, setSource] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    let active = true;
    buildMediaImageSource(mediaUrl).then(resolved => {
      if (active) {
        setSource(resolved);
      }
    });
    return () => {
      active = false;
    };
  }, [mediaUrl]);

  return source;
}
