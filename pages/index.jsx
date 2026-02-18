import { useState } from 'react';
import { generateWorkout } from '../lib/workoutGenerator';
import { suggestProgression } from '../lib/progressionEngine';
import { calculateRollingFatigue } from '../lib/fatigueEngine';

import CheckInForm from '../components/CheckInForm';
import WorkoutCard from '../components/WorkoutCard';

export default function Home() {
  const [workout, setWorkout] = useState([]);
  const [history, setHistory] = useState([]);
  const [progression, setProgression] = useState([]);

  const handleGenerate = ({
    energy,
    soreness,
    timeAvailable,
    location
  }) => {
    const result = generateWorkout({
      location,
      energy,
      soreness,
      timeAvailable,
      recentWorkouts: history
    });

    const totalFatigue = result.reduce(
      (sum, ex) => sum + ex.fatigue_score,
      0
    );

    const newEntry = {
      date: new Date().toISOString(),
      exercises: result,
      totalFatigue
    };

    const updatedHistory = [...history, newEntry];

    setHistory(updatedHistory);
    setWorkout(result);

    const suggestions = suggestProgression(updatedHistory);
    setProgression(suggestions || []);
  };

  const rolling = calculateRollingFatigue(history, 3);

  const fatigueStatus = () => {
    if (rolling <= 10) return { label: "Low", color: "text-green-600" };
    if (rolling <= 20) return { label: "Moderate", color: "text-yellow-600" };
    return { label: "High", color: "text-red-600" };
  };

  const status = fatigueStatus();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-2xl p-8">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            FitFlow
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Constraint-Based Adaptive Workout Generator
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition duration-300 hover:shadow-lg">
          <CheckInForm onGenerate={handleGenerate} />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition duration-300 hover:shadow-lg">
          <WorkoutCard workout={workout} />
        </div>

        {progression.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Progression Suggestions
            </h3>
            {progression.map(p => (
              <div
                key={p.id}
                className="border border-gray-200 rounded-lg p-3 mb-2 bg-gray-50 transition hover:bg-gray-100"
              >
                <p className="text-sm font-medium">
                  {p.name}
                </p>
                <p className="text-xs text-gray-600">
                  {p.suggestion}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Rolling 3-Day Fatigue
          </p>
          <p className={`text-lg font-semibold ${status.color}`}>
            {rolling} · {status.label}
          </p>
        </div>

      </div>
    </div>
  );
}
