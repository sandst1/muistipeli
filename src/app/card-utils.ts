import { CardData } from "./card";

const CARDS = 15;

const allCardNames = Array.from({ length: CARDS }, (_, i) => i).map(
  (i) => `k${i}.png`
);

export const pickCards = (amount: number) => {
  const selected = [];
  const copy = [...allCardNames];
  for (let i = 0; i < amount; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(idx, 1)[0]);
  }

  return selected;
};

export const shuffle = (cards: CardData[]) => {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getCards = (amount: number) => {
  const picked = pickCards(amount / 2);
  let cards: CardData[] = [];
  picked.forEach((cardName) => {
    cards.push({
      id: `${cardName}_${cards.length}`,
      img: cardName,
    });
    cards.push({
      id: `${cardName}_${cards.length}`,
      img: cardName,
    });
  });

  cards = shuffle(cards);

  return cards;
};
