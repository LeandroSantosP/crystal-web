// @ts-nocheck

import { Star } from 'lucide-react';

interface SingleStartProps {
  note: number;
  max_note: number;
  note_color: string;
  star_size: number;
  full: boolean;
}

interface StartNoteProps {
  note: number;
  star_size?: number;
  full?: boolean;
  custom_color?: string;
}

export const StarNote = ({
  note,
  star_size = 10,
  full = true,
  custom_color,
}: StartNoteProps) => {
  let node_color = 'text-yellow-500 fill-yellow-500';

  return (
    <>
      {Array.from({ length: 5 }).map((_, max_note) => {
        return (
          <SingleStar
            star_size={star_size}
            key={max_note}
            note_color={custom_color || node_color}
            max_note={max_note}
            note={note}
            full={full}
          />
        );
      })}
    </>
  );
};
const SingleStar = ({
  note,
  max_note,
  note_color,
  star_size,
  full,
}: SingleStartProps) => {
  return (
    <div className={`${note >= max_note && note !== 0 ? note_color : ''}`}>
      <Star
        className={`${
          full && note >= max_note && note !== 0 ? note_color : ''
        }`}
        size={star_size}
        absoluteStrokeWidth
      />
    </div>
  );
};
