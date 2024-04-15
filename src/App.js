import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [arrayStatus, setArrayStatus] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: 10 }, (_, idx) => ({
      id: idx, // Unique identifier
      value: Math.floor(Math.random() * 100) + 10 // Random value
    }));
    setArray(arr);
    setArrayStatus(Array(arr.length).fill('orange'));
  };


  const bubbleSort = () => {
    const arr = array.slice();
    const animations = [];
    let isSorted = false;
    let lastUnsorted = arr.length - 1;

    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < lastUnsorted; i++) {
        animations.push([i, i + 1, false]); // Mark elements being compared as blue
        if (arr[i].value > arr[i + 1].value) {
          animations.push([i, i + 1, true]); // Mark swap operation
          swap(arr, i, i + 1);
          isSorted = false;
        }
      }
      lastUnsorted--;
    }

    animateSort(animations, () => setArray(arr));
  };


  const swap = (arr, idx1, idx2) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  const animateSort = (animations, callback) => {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwapping] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];
      setTimeout(() => {
        barOne.classList.add('comparing');
        barTwo.classList.add('comparing');
        if (isSwapping) {
          setArray(prevArray => {
            const newArray = [...prevArray];
            swap(newArray, barOneIdx, barTwoIdx);
            return newArray;
          });
        }
        setTimeout(() => {
          barOne.classList.remove('comparing');
          barTwo.classList.remove('comparing');
          if (i === animations.length - 1) {
            callback();
          }
        }, 300);
      }, i * 50);
    }
  };
  return (
    <div className="App">
      <div className="array-container">
        {array.map(item => (
          <div className="array-bar" key={item.id} style={{ height: `${item.value}px`, backgroundColor: arrayStatus[item.id] }}>
            <span>{item.value}</span>
          </div>
        ))}
      </div>


      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={bubbleSort}>Start Bubble Sort</button>
    </div>
  );
}
