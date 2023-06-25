import { useEffect, useRef } from 'react';

type Handler = () => void;

export const useKeyPress = (
  targetKey: string,
  onKeydown: Handler,
  onKeyup: Handler
): void => {
  const keydownRef = useRef(onKeydown);
  const keyupRef = useRef(onKeyup);

  useEffect(() => {
    keydownRef.current = onKeydown;
    keyupRef.current = onKeyup;
  }, [onKeydown, onKeyup]);

  useEffect(() => {
    function downHandler({ key }: KeyboardEvent) {
      if (key === targetKey) {
        keydownRef.current && keydownRef.current();
      }
    }

    function upHandler({ key }: KeyboardEvent) {
      if (key === targetKey) {
        keyupRef.current && keyupRef.current();
      }
    }

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);
};
