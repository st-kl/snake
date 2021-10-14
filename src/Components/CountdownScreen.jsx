import React, { useEffect, useState } from 'react';

const CountdownScreen = ({setCountDownScreen}) => {
  const [index, setIndex] = useState(0);
  const values = ["Ready?", "Go!"]

  useEffect(() => {
    if (index < 2) {
      setTimeout(() => setIndex(index + 1), 750 );
    } else {
      setCountDownScreen(false)
    }
  });

  return (
    <div className="info">
       <p>{values[index]}</p>
    </div>
  );
};

export default CountdownScreen;