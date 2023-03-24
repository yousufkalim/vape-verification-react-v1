import React, { FC } from 'react';
import Error from '../../assets/error.jpg';

const NotFound: FC = () => {
  return (
    <div>
      <img src={Error} alt="error" />
    </div>
  );
};

export default NotFound;
