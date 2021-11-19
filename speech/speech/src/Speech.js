import React, { useEffect, useState } from "react";

import "./index.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();

mic.continuos = true;
mic.interimResults = true;
mic.lang = "es-AR";

const Speech = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped mic whit click");
      };
    }

    mic.onstart = () => {
      console.log("mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Consola </h2>
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          Start / Stop
        </button>
        <button onClick={handleSaveNote}>Guardar Nota</button>
        <p>{note} </p>
      </div>
      <div className="box">
        <h2>Notas </h2>
        {savedNotes.map((n) => (
          <p key={n}> {n} </p>
        ))}
      </div>
    </div>
  );
};

export default Speech;
