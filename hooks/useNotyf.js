import { useEffect, useState } from 'react';
import { Notyf } from 'notyf';

export const useNotyf = () => {
  const [notyf, setNotyf] = useState(null);

  useEffect(() => {
    const notyInstance = new Notyf({
      duration: 3000,
      position: { x: 'right', y: 'bottom' },
    });
    setNotyf(notyInstance);
  }, []);

  return notyf;
};