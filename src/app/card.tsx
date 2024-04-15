"use client";
import Image from "next/image";

export enum CardState {
  Hidden,
  Visible,
  Found,
}

export type CardData = {
  id: string;
  img: string;
};

export type CardProps = {
  cards: number;
  data: CardData;
  state: CardState;
  onClicked: (cardData: CardData) => void;
};

const cover = "kansi.png";

const bgColorFor = (state: CardState) => {
  switch (state) {
    case CardState.Visible:
    case CardState.Hidden:
      return "#cdcdcd";

    case CardState.Found:
      return "#00000000";
  }
};

export default function Card({ cards, data, state, onClicked }: CardProps) {
  const img = state == CardState.Visible ? data.img : cover;

  const bgColor = bgColorFor(state);

  const width = cards > 12 ? 135 : 188;
  const height = width * 1.25;

  return (
    <div
      className="w-full h-full p-2"
      style={{ backgroundColor: bgColor }}
      onClick={() => {
        if (state !== CardState.Found) {
          onClicked(data);
        }
      }}
    >
      <Image
        width={width}
        height={height}
        alt={data.img}
        src={`/${img}`}
        hidden={state === CardState.Found}
        priority={true}
      />
    </div>
  );
}
