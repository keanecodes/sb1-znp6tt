import { useEffect, useRef } from 'react';
import JitsiMeetExternalAPI from 'jitsi-meet-react';

interface VideoConferenceProps {
  roomName: string;
  displayName: string;
  onApiReady?: (api: JitsiMeetExternalAPI) => void;
}

export const useVideoConference = ({ roomName, displayName, onApiReady }: VideoConferenceProps) => {
  const apiRef = useRef<JitsiMeetExternalAPI | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const domain = 'meet.jit.si';
    const options = {
      roomName,
      width: '100%',
      height: '100%',
      parentNode: containerRef.current,
      userInfo: {
        displayName,
      },
    };

    apiRef.current = new JitsiMeetExternalAPI(domain, options);

    if (onApiReady) {
      onApiReady(apiRef.current);
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, [roomName, displayName, onApiReady]);

  return { containerRef };
};