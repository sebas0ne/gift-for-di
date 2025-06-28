import { useState, useEffect, useCallback } from "react";
import { LayoutGrid, StretchHorizontal, ListRestart, CircleFadingPlus } from "lucide-react";

import PageTitle from "../components/common/PageTitle";
import StickyNote from "../components/common/StickyNote";

import CONSTANT from "../utils/constant";
import "../styles/Pages/ThingsAboutYou.css";

export default function ThingsAboutYou() {
  const [notes, setNotes] = useState(CONSTANT.initialThings);
  const [canRevealSecret, setCanRevealSecret] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const revealedCount = parseInt(localStorage.getItem("secretNoteIndex") || "0", 10);
  const totalSecrets = CONSTANT.secretThings.length;
  const [viewMode, setViewMode] = useState("grid");

  // Check daily secret only once when component mounts
  useEffect(() => {
    checkDailySecret();
  }, []);

  const checkDailySecret = () => {
    const today = new Date().toLocaleDateString("sv-SE");
    const lastReveal = localStorage.getItem("lastSecretReveal");
    const hasRevealedToday = localStorage.getItem("secretRevealedToday") === "true";

    const isNewDay = lastReveal !== today;

    setCanRevealSecret(isNewDay);
    setSecretRevealed(!isNewDay && hasRevealedToday);

    if (isNewDay) {
      localStorage.setItem("secretRevealedToday", "false");
    }
  };

  const revealSecretNote = useCallback(() => {
    if (!canRevealSecret || secretRevealed) return;

    const nextIndex = revealedCount % CONSTANT.secretThings.length;
    const nextSecret = CONSTANT.secretThings[nextIndex];

    setNotes((prevNotes) => [nextSecret, ...prevNotes]);

    const today = new Date().toLocaleDateString("sv-SE");
    localStorage.setItem("lastSecretReveal", today);
    localStorage.setItem("secretRevealedToday", "true");
    localStorage.setItem("secretNoteIndex", (nextIndex + 1).toString());

    setCanRevealSecret(false);
    setSecretRevealed(true);
  }, [canRevealSecret, secretRevealed]);

  return (
    <div className="pageContainer">
      <header className="header">
        <PageTitle
          text={CONSTANT.pageTitleThingsAboutYou}
          size="4rem"
          weight="800"
        />
      </header>

      <section className="progressCounter">
        <p>
          Has descubierto <strong>{Math.min(revealedCount)}</strong> de <strong>{totalSecrets}</strong> notas secretas
        </p>
      </section>

      <section className="controlsContainer">
        {canRevealSecret && !secretRevealed && (
          <button
            onClick={revealSecretNote}
            className="secretButton"
            aria-label="Revelar una nota secreta"
          >
            {revealedCount === totalSecrets ? <ListRestart size={20} /> : <CircleFadingPlus size={20} />}
          </button>
        )}
      </section>

      <section className="contentSection">
        <div className="viewToggle">
          <button
            className={`toggleButton ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Vista de cuadrícula"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            className={`toggleButton ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="Vista de lista"
          >
            <StretchHorizontal size={20} />
          </button>
        </div>

        <div className={`notesContainer ${viewMode === "grid" ? "gridView" : "listView"}`}>
          {notes.map((note, index) => (
            <StickyNote
              key={note.id}
              note={note}
              viewMode={viewMode}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
