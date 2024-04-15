import { useEffect, useRef, useState } from "react";
import Card, { CardData, CardState } from "./card";
import { getCards } from "./card-utils";

const CARDS_VISIBLE_MS = 1000;

type VisibleCard = CardData | null;
type CardsMap = { [key: string]: CardState };

export type GameProps = {
  size: number;
  gameOver: () => void;
};

export default function Game({ gameOver, size }: GameProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardState, setCardState] = useState<CardsMap>({});
  const [visibleCard, setVisibleCard] = useState<VisibleCard>(null);
  const [resetting, setResetting] = useState(false);

  const successFxRef = useRef<HTMLAudioElement>(null);
  const failFxRef = useRef<HTMLAudioElement>(null);

  const getGridCols = () => {
    if (size == 4) {
      return "grid-cols-2";
    }
    if (size == 12 || size == 16) {
      return "grid-cols-4";
    }
    return "grid-cols-5";
  };

  useEffect(() => {
    if (size > 0) {
      const cards = getCards(size);
      setCards(cards);
      setCardState(
        cards.reduce((cards: CardsMap, curCard) => {
          cards[curCard.id] = CardState.Hidden;
          return cards;
        }, {})
      );
    }
  }, [size]);

  useEffect(() => {
    const foundAmount = Object.values(cardState).filter(
      (state) => state === CardState.Found
    ).length;

    if (foundAmount === size) {
      gameOver();
    }
  }, [size, cardState, gameOver]);

  const play = (audio: HTMLAudioElement | null) => {
    if (audio) {
      setTimeout(() => audio.play(), 300);
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
        play(successFxRef.current);
        nextState = CardState.Found;
      } else {
        play(failFxRef.current);
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
    <>
      <div className={`grid ${getGridCols()} gap-4`}>
        {cards.map((card: CardData) => (
          <Card
            cards={size}
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
    </>
  );
}
