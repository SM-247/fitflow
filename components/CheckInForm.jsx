import { useState } from 'react';

export default function CheckInForm({ onGenerate }) {
  const [energy, setEnergy] = useState(3);
  const [soreness, setSoreness] = useState(2);
  const [timeAvailable, setTimeAvailable] = useState(45);
  const [location, setLocation] = useState('gym');

  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate({
      energy,
      soreness,
      timeAvailable,
      location
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Energy (1–5)
    </label>
    <input
      type="number"
      min="1"
      max="5"
      value={energy}
      onChange={(e) => setEnergy(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Soreness (1–5)
    </label>
    <input
      type="number"
      min="1"
      max="5"
      value={soreness}
      onChange={(e) => setSoreness(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Time Available (minutes)
    </label>
    <input
      type="number"
      value={timeAvailable}
      onChange={(e) => setTimeAvailable(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Location
    </label>
    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    >
      <option value="gym">Gym</option>
      <option value="home">Home</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-black text-white py-2.5 rounded-lg hover:opacity-90 transition font-medium"
  >
    Generate Workout
  </button>

</form>

  );
}
