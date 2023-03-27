import React, { FC } from 'react';
import Error from '../../assets/error.png';
// import notFound from '../../assets/not_found.png';

const NotFound: FC = () => {
  return (
    <div className="not_found">
      <div className="content">
        <h1 className="message">Please enter brand name in URL</h1>
        <img src={Error} alt="error" />
      </div>
    </div>
  );
};

export default NotFound;
