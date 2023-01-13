import { sumProxy } from '@nx-custom-migration-demo/common-lib';
import { useState } from 'react';
import { deprecatedSum } from 'try-lib';

export function App() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>();

  const [d, setD] = useState<number>(0);
  const [e, setE] = useState<number>(0);
  const [f, setF] = useState<number>();

  return (
    <>
      <div>
        <h2>Using internal lib</h2>
        <div>
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
        </div>
      </div>

      <div>
        <h2>Using external lib</h2>
        <div>
          <input
            value={d}
            onChange={(e) => {
              setD(+e.target.value);
            }}
          />
          <input
            value={e}
            onChange={(e) => {
              setE(+e.target.value);
            }}
          />
          <button
            onClick={() => {
              setF(deprecatedSum(d, e));
            }}
          >
            is
          </button>
          <span>{f}</span>
        </div>
      </div>
    </>
  );
}

export default App;
