## Live Demo

https://fitflow-sm.vercel.app

# FitFlow

FitFlow is a constraint-based adaptive workout generator that dynamically builds daily training sessions based on user energy, soreness, time availability, and training history.

Instead of static workout templates, FitFlow models workout generation as a lightweight constraint optimization problem, balancing fatigue, movement patterns, and recovery.

## Features

- Adaptive workout generation based on:
  - Energy level (1–5)
  - Soreness level (1–5)
  - Available time
  - Location (home / gym)

- Fatigue modeling system:
  - Per-exercise fatigue scoring
  - Energy-based fatigue caps
  - Rolling 3-day fatigue calculation

- Movement balancing:
  - Avoids repeating recent movement patterns
  - Separates compound and accessory exercises
  - Respects recovery constraints

- Progression engine:
  - Suggests load or rep increases
  - Detects repeated completion patterns
  - Basic deload protection via fatigue monitoring

- Clean UI:
  - Tailwind CSS styling
  - Animated workout cards
  - Dashboard summary

## How It Works

Workout generation follows these steps:

1. Filter exercises by location.
2. Apply fatigue constraints based on energy level.
3. Avoid recently used movement patterns.
4. Select a compound lift.
5. Add accessories and mobility work.
6. Enforce total fatigue cap.
7. Fit session within available time.
8. Update workout history.
9. Compute rolling fatigue.
10. Generate progression suggestions.

This makes each session adaptive rather than template-based.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Modular fitness engine (custom logic)

Core logic is implemented inside:

- `lib/workoutGenerator.js`
- `lib/fatigueEngine.js`
- `lib/progressionEngine.js`
- `lib/movementBalancer.js`

## Future Improvements

- Persistent workout history (database)
- Smarter progression heuristics
- Visual fatigue charts
- Periodization modeling
- Mobile-first optimization

## Why This Project?

Unlike other beginner fitness apps which use static templates,FitFlow explores a more systems-oriented approach:
- Constraint modeling
- Adaptive planning
- Recovery-aware generation
- Lightweight optimization logic

It demonstrates applying algorithmic thinking to real-world planning problems.
