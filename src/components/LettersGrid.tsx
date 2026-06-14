import LetterCard from "@/components/LetterCard";
import { LETTERS } from "@/lib/letters";

export default function LettersGrid() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      {LETTERS.map((l) => (
        <LetterCard key={l.id} title={l.menuLabel} href={`/letters/${l.slug}`} />
      ))}
    </div>
  );
}
