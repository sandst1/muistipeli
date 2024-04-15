"use client";

import { useEffect, useRef, useState } from "react";
import Game from "./game";

const btnStyle =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

export default function Home() {
  const [gameOn, setGameOn] = useState<boolean>(false);
  const [gameSize, setGameSize] = useState(0);

  useEffect(() => {
    if (!gameOn && gameSize > 0) {
      setGameOn(true);
    }
  }, [gameOn, gameSize]);

  return (
    <main className="flex h-dvh flex-col items-center justify-between p-6">
      {gameOn ? (
        <Game
          gameOver={() => {
            setGameSize(0);
            setGameOn(false);
          }}
          size={gameSize}
        />
      ) : (
        <div>
          <div className="flex flex-row text-white justify-center w-full text-xl">
            Valitse koko
          </div>
          <div className="flex flex-row gap-8 p-12">
            <button className={btnStyle} onClick={() => setGameSize(4)}>
              2x2
            </button>
            <button className={btnStyle} onClick={() => setGameSize(12)}>
              4x3
            </button>
            <button className={btnStyle} onClick={() => setGameSize(16)}>
              4x4
            </button>
            <button className={btnStyle} onClick={() => setGameSize(20)}>
              5x4
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
