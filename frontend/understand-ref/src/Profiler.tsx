import { useEffect, useRef, useState } from "react";

function Profiler() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState<number>(0);
  const startTs = useRef<number>(0);

  useEffect(() => {
    if (start) {
      startTs.current = window.performance.now();
    }
  }, [start]);

  useEffect(() => {
    if (start && count < 1000) {
      setCount(count + 1);
    }
  }, [start, count]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setStart(true);
          }}
        >
          Start
        </button>
      </div>
      {count === 1000
        ? `${Math.floor(window.performance.now() - startTs.current)}ms`
        : `count: ${count}`}
    </>
  );
}

export default Profiler;
