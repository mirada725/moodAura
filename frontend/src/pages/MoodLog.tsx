import { useState, useEffect } from "react";

const moodImages: { [key: number]: string } = {
  5: "/src/images/moods/angry.png",
  4: "/src/images/moods/happy.png",
  3: "/src/images/moods/calm.png",
  2: "/src/images/moods/sad.png",
  1: "/src/images/moods/excited.png",
};

const moodLog = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<{ id: number; date: string; mood: number; note: string; }[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/mood/entries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError('Failed to load mood entries.');
    }
  };
  //   const storedEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
  //   setEntries(storedEntries);
  // }, []);

  const selectMood = (mood: number) => {
    setSelectedMood(mood);
  };

  const addEntry = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/mood/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, mood: selectedMood, note }),
      });

      if (!response.ok) throw new Error('Failed to add entry');
      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
      setSelectedMood(3);
    } catch (err) {
      setError('Failed to save mood entry.');
    }
  };

    //   const newEntry = {
    //   id: Date.now(),
    //   date,
    //   mood: selectedMood,
    //   note,
    // };

  //   const updatedEntries = [newEntry, ...entries];
  //   setEntries(updatedEntries);
  //   localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));

  //   // Reset form
  //   setDate(new Date().toISOString().split("T")[0]);
  //   setNote("");
  //   setSelectedMood(3);
  // };

  const deleteEntry = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/mood/entries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete entry');
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError('Failed to delete mood entry.');
    }
  };
  //   const updatedEntries = entries.filter((entry) => entry.id !== id);
  //   setEntries(updatedEntries);
  //   localStorage.setItem("moodEntries", JSON.stringify(updatedEntries));
  // };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8 mt-4">
        Daily Mood Tracker
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-4 justify-center mb-6">
            {Object.keys(moodImages).map((mood) => (
              <img
                key={mood}
                src={moodImages[Number(mood)]}
                alt={`Mood ${mood}`}
                className={`w-12 h-12 cursor-pointer hover:scale-110 transition-transform ${
                  selectedMood === Number(mood) ? "ring-4 ring-purple-500 ring-offset-2" : ""
                }`}
                onClick={() => selectMood(Number(mood))}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How are you feeling today?"
              className="flex-2 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={addEntry}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
          >
            <img src={moodImages[entry.mood]} className="w-10 h-10" />
            <div className="flex-1">
              <div className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="text-gray-700">{entry.note}</div>
            </div>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default moodLog;
