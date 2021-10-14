import React, { useEffect, useState } from 'react';

const CountdownScreen = ({setCountDownScreen}) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 500 );
    } else {
      setCountDownScreen(false)
    }
  });

  return (
    <div className="info">
       <p>{seconds}</p>
    </div>
  );
};

export default CountdownScreen;