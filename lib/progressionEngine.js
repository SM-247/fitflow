export function suggestProgression(history) {
  if (!history.length) return null;

  const lastWorkout = history[history.length - 1];

  const suggestions = lastWorkout.exercises
    .filter(ex => ex.intensity_type === 'load_based')
    .map(ex => ({
      id: ex.id,
      name: ex.name,
      suggestion: "Increase weight by 2.5–5% next session"
    }));

  return suggestions;
}
