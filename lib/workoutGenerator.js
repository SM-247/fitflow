import exerciseList from '../data/exercise_list.json';
import { calculateRollingFatigue } from './fatigueEngine';

export function generateWorkout({
  location,
  energy,
  soreness,
  timeAvailable,
  recentWorkouts = []
}) {
  // 1. Filter by location
  let available = exerciseList.filter(
    ex => ex.location === location || ex.location === 'both'
  );

  // 2. Energy filter (remove very high fatigue if low energy)
  if (energy <= 2) {
    available = available.filter(ex => ex.fatigue_score < 4);
  }
  const rollingFatigue = calculateRollingFatigue(recentWorkouts, 3);

if (rollingFatigue > 30) {
  available = available.filter(ex => ex.fatigue_score <= 2);
}

  // 3. Avoid repeating last movement pattern
  const recentPattern = recentWorkouts[0]?.movement_pattern;

  // 4. Separate exercises properly
  const compounds = available.filter(
    ex =>
      ex.is_compound &&
      ex.category === 'strength' &&
      ex.movement_pattern !== recentPattern
  );

  const accessories = available.filter(
    ex =>
      !ex.is_compound &&
      ex.category === 'strength'
  );

  const finishers = available.filter(
    ex =>
      ex.category === 'core' ||
      ex.category === 'mobility'
  );

  const selected = [];

  // 5. Select main compound (randomized)
  if (compounds.length > 0) {
    const main =
      compounds[Math.floor(Math.random() * compounds.length)];
    selected.push(main);
  }

  // 6. Select up to 2 accessories
  const shuffledAccessories = [...accessories].sort(
    () => 0.5 - Math.random()
  );

  selected.push(...shuffledAccessories.slice(0, 2));

  // 7. Add finisher
  if (finishers.length > 0) {
    const finisher =
      finishers[Math.floor(Math.random() * finishers.length)];
    selected.push(finisher);
  }

  // 8. Apply fatigue cap
    // 8. Apply fatigue cap
  const fatigueCaps = { 5: 14, 4: 12, 3: 10, 2: 7, 1: 5 };
  const fatigueCap = fatigueCaps[energy] || 5;

  let totalFatigue = selected.reduce(
    (sum, ex) => sum + ex.fatigue_score,
    0
  );

  // If soreness high → remove highest fatigue accessory
  if (soreness >= 4 && selected.length > 1) {
    const removable = selected.slice(1);
    const highest = removable.reduce((max, ex) =>
      ex.fatigue_score > max.fatigue_score ? ex : max
    );
    selected.splice(selected.indexOf(highest), 1);
  }

  totalFatigue = selected.reduce(
    (sum, ex) => sum + ex.fatigue_score,
    0
  );

  while (totalFatigue > fatigueCap && selected.length > 2) {
    const last = selected[selected.length - 1];
    totalFatigue -= last.fatigue_score;
    selected.pop();
  }

  // 9. Fill remaining time intelligently

  let totalTime = selected.reduce(
    (sum, ex) => sum + ex.estimated_time_minutes,
    0
  );

  const remaining = available.filter(
    ex => !selected.some(sel => sel.id === ex.id)
  );

  const sortedRemaining = remaining.sort((a, b) => {
    if (a.is_compound && !b.is_compound) return -1;
    if (!a.is_compound && b.is_compound) return 1;
    return a.fatigue_score - b.fatigue_score;
  });
  let addedCount = 0;
const MAX_ADDITIONS = 10;
  for (const ex of sortedRemaining) {
    if (
      totalTime + ex.estimated_time_minutes <= timeAvailable &&
      totalFatigue + ex.fatigue_score <= fatigueCap
    ) {
      selected.push(ex);
      totalTime += ex.estimated_time_minutes;
      totalFatigue += ex.fatigue_score;
    }
  }

  return selected;
}