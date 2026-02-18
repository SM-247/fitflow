export function calculateTotalFatigue(workout) {
  return workout.reduce((sum, ex) => sum + ex.fatigue_score, 0);
}

export function getFatigueCap(energy) {
  const fatigueCaps = {
    5: 14,
    4: 12,
    3: 10,
    2: 7,
    1: 5
  };

  return fatigueCaps[energy] || 5;
}

export function applyFatigueCap(workout, energy) {
  const cap = getFatigueCap(energy);

  let total = calculateTotalFatigue(workout);
  let adjusted = [...workout];

  while (total > cap && adjusted.length > 1) {
    const removable = adjusted.slice(1);
    const highest = removable.reduce((max, ex) =>
      ex.fatigue_score > max.fatigue_score ? ex : max
    );

    adjusted.splice(adjusted.indexOf(highest), 1);
    total = calculateTotalFatigue(adjusted);
  }

  return adjusted;
}

export function calculateRollingFatigue(history, days = 3) {
  const recent = history.slice(-days);
  return recent.reduce((sum, day) => sum + day.totalFatigue, 0);
}
export function shouldDeload(history) {
  const rolling = calculateRollingFatigue(history, 3);
  return rolling > 30;
}
