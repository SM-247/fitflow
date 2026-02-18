export default function WorkoutCard({ workout }) {
  if (!workout || workout.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Generate a workout to get started.
      </p>
    );
  }

  const totalFatigue = workout.reduce(
    (sum, ex) => sum + ex.fatigue_score,
    0
  );

  const totalTime = workout.reduce(
    (sum, ex) => sum + ex.estimated_time_minutes,
    0
  );

  const getFatigueColor = (score) => {
    if (score <= 6) return "text-green-600";
    if (score <= 12) return "text-yellow-600";
    return "text-red-600";
  };

  const getBadgeColor = (pattern) => {
    switch (pattern) {
      case "push":
        return "bg-blue-100 text-blue-700";
      case "pull":
        return "bg-purple-100 text-purple-700";
      case "squat":
        return "bg-green-100 text-green-700";
      case "hinge":
        return "bg-orange-100 text-orange-700";
      case "lunge":
        return "bg-pink-100 text-pink-700";
      case "core":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">

      {/* Summary Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-semibold">
            Today's Workout
          </h2>
          <p className="text-sm text-gray-500">
            Estimated Time: {totalTime} minutes
          </p>
        </div>

        <div className={`text-sm font-semibold ${getFatigueColor(totalFatigue)}`}>
          Fatigue: {totalFatigue}
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {workout.map(ex => (
          <div key={ex.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 transition duration-300 hover:shadow-md hover:-translate-y-1"
>

            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">
                {ex.name}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(ex.movement_pattern)}`}
              >
                {ex.movement_pattern}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              {ex.recommended_sets} sets · {ex.recommended_reps_range}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Rest: {ex.rest_seconds}s
            </p>

            <div className="mt-3">
              <button
                className="text-xs bg-black text-white px-3 py-1 rounded-md hover:opacity-90 transition"
              >
                Mark Complete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
