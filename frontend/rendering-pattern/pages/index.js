import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({
    subscribers: 0,
    stars: 0,
  });

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData({
          subscribers: data['subscribers_count'],
          stars: data['watchers_count'],
        });
      })
      .catch(() => {
        console.log('failed to fetch data');
      });
  }, []);

  return (
    <div>
      <h3>Welcome to Next.js 12.3!</h3>
      <div>
        <p>{data.stars} stars</p>
      </div>
    </div>
  );
}
