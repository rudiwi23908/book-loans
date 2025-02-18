"use client";
import { useState, useMemo } from "react";

// Skenario 1: Tanpa useMemo (Performa Buruk)
export default function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [inputNumbers, setInputNumbers] = useState("5,2,1,9,3");

  const numbers = inputNumbers.split(",").map(Number);

  console.log("Component is rendering...");

  // Sorting dilakukan setiap kali render ulang
  const sortedNumbers = numbers.sort((a, b) => {
    console.log("Sorting numbers...");
    return a - b;
  });

  return (
    <div>
      <h3>Skenario 1: Tanpa useMemo</h3>
      <input
        type="text"
        className="text-black"
        value={inputNumbers}
        onChange={(e) => setInputNumbers(e.target.value)}
      />
      <p>Sorted Numbers: {sortedNumbers.join(", ")}</p>
      <button onClick={() => setCount(count + 1)}>
        Tambah Count ({count})
      </button>
    </div>
  );
}

// Skenario 2: Menggunakan useMemo untuk array numbers
// export default function OptimizedComponent() {
//   const [count, setCount] = useState(0);
//   const [inputNumbers, setInputNumbers] = useState("5,2,1,9,10");

//   console.log("Component re-rendered");

//   const numbers = useMemo(
//     () => inputNumbers.split(",").map(Number),
//     [inputNumbers]
//   );

//   const sortedNumbers = useMemo(() => {
//     console.log("Sorting numbers...");
//     return [...numbers].sort((a, b) => a - b);
//   }, [numbers]);

//   return (
//     <div>
//       <h3>Skenario 2: useMemo untuk array numbers</h3>
//       <input
//         type="text"
//         className="text-black"
//         value={inputNumbers}
//         onChange={(e) => setInputNumbers(e.target.value)}
//       />
//       <p>Sorted Numbers: {sortedNumbers.join(", ")}</p>
//       <button onClick={() => setCount(count + 1)}>Render ({count})</button>
//     </div>
//   );
// }
