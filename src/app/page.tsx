"use client";

import { useRef, useState } from "react";
import Card, { CardData, CardState } from "./card";
import { getCards } from "./card-utils";

const CARDS_VISIBLE_MS = 1500;

const cards = getCards(12);
const initialCardState = cards.reduce(
  (cards: { [key: string]: CardState }, curCard) => {
    cards[curCard.id] = CardState.Hidden;
    return cards;
  },
  {}
);

type VisibleCard = CardData | null;

export default function Home() {
  const [cardState, setCardState] = useState(initialCardState);
  const [visibleCard, setVisibleCard] = useState<VisibleCard>(null);
  const [resetting, setResetting] = useState(false);

  const successFxRef = useRef<HTMLAudioElement>(null);
  const failFxRef = useRef<HTMLAudioElement>(null);

  const play = (audio: HTMLAudioElement | null) => {
    if (audio) {
      setTimeout(() => audio.play(), 400);
    }
  };

  const handleClick = (cardData: CardData) => {
    // If clicked already visible card, do nothing
    if (visibleCard?.id === cardData.id || resetting) {
      return;
    }

    if (visibleCard) {
      setResetting(true);
      let nextState = CardState.Hidden;
      if (visibleCard.img === cardData.img) {
        // we found a pair!
        console.log("PARI!");
        play(successFxRef.current);
        nextState = CardState.Found;
      } else {
        play(failFxRef.current);
        console.log("NO MATCH!");
      }

      setTimeout(() => {
        setVisibleCard(null);
        setResetting(false);
        setCardState({
          ...cardState,
          [visibleCard.id]: nextState,
          [cardData.id]: nextState,
        });
      }, CARDS_VISIBLE_MS);
    } else {
      setVisibleCard(cardData);
    }

    setCardState({
      ...cardState,
      [cardData.id]: CardState.Visible,
    });
  };

  return (
    <main className="flex h-dvh flex-col items-center justify-between p-6">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card: CardData) => (
          <Card
            key={card.id}
            onClicked={(cardData) => handleClick(cardData)}
            data={card}
            state={cardState[card.id]}
          />
        ))}
      </div>
      <audio ref={successFxRef} controls className="hidden">
        <source src="success.wav" type="audio/mp3" />
      </audio>
      <audio ref={failFxRef} controls className="hidden">
        <source src="fail.wav" type="audio/mp3" />
      </audio>
    </main>
  );
}
