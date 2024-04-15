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

export default function Card({ data, state, onClicked }: CardProps) {
  const img = state == CardState.Visible ? data.img : cover;

  const bgColor = bgColorFor(state);

  return (
    <div
      className="w-full h-full p-2"
      style={{ backgroundColor: bgColor }}
      onClick={() => onClicked(data)}
    >
      <Image
        width={188}
        height={234}
        alt={data.img}
        src={`/${img}`}
        hidden={state === CardState.Found}
        priority={true}
      />
    </div>
  );
}
