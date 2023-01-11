import { sumProxy } from '@nx-custom-migration-demo/common-lib';
import { useState } from 'react';

export function App() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>();

  return (
    <>
      <input
        value={a}
        onChange={(e) => {
          setA(+e.target.value);
        }}
      />
      <input
        value={b}
        onChange={(e) => {
          setB(+e.target.value);
        }}
      />
      <button
        onClick={() => {
          setC(sumProxy(a, b));
        }}
      >
        is
      </button>
      <span>{c}</span>
    </>
  );
}

export default App;
