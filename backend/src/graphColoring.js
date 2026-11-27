/**
 * Graph Coloring with Backtracking Algorithm
 * 
 * Subjects are vertices, conflicts are edges, exam slots are colors.
 * The algorithm finds the minimum number of colors (slots) needed such
 * that no two adjacent vertices (conflicting subjects) share the same color.
 */

/**
 * Build adjacency list from subject list.
 * Two subjects conflict if they share at least one common student.
 */
function buildConflictGraph(subjects) {
  const n = subjects.length;
  const adjacency = {}; // subjectId -> Set of conflicting subjectIds
  const conflictPairs = [];

  for (let i = 0; i < n; i++) {
    adjacency[subjects[i].id] = new Set();
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const studentsA = new Set(subjects[i].students);
      const commonStudents = subjects[j].students.filter(s => studentsA.has(s));

      if (commonStudents.length > 0) {
        adjacency[subjects[i].id].add(subjects[j].id);
        adjacency[subjects[j].id].add(subjects[i].id);
        conflictPairs.push({
          subjectA: subjects[i].id,
          subjectB: subjects[j].id,
          commonStudents,
        });
      }
    }
  }

  return { adjacency, conflictPairs };
}

/**
 * Check whether assigning `color` to vertex at index `idx` is safe.
 * A color is safe if none of the already-colored neighbors use it.
 */
function isSafe(idx, color, subjects, adjacency, assignment) {
  const subjectId = subjects[idx].id;
  const neighbors = adjacency[subjectId];
  for (const neighborId of neighbors) {
    if (assignment[neighborId] === color) {
      return false;
    }
  }
  return true;
}

/**
 * Core backtracking function.
 * Returns true when all vertices are colored, mutates `assignment` in place.
 * `maxColors` caps the number of colors tried at each step.
 */
function backtrack(idx, subjects, adjacency, assignment, maxColors, stats) {
  if (idx === subjects.length) return true; // all subjects colored

  const subjectId = subjects[idx].id;

  for (let color = 1; color <= maxColors; color++) {
    stats.iterations++;
    if (isSafe(idx, color, subjects, adjacency, assignment)) {
      assignment[subjectId] = color;
      if (backtrack(idx + 1, subjects, adjacency, assignment, maxColors, stats)) {
        return true;
      }
      // Backtrack
      stats.backtracks++;
      delete assignment[subjectId];
    }
  }

  return false; // no valid color found — trigger backtrack up the call stack
}

/**
 * Main entry point.
 * Uses iterative deepening on the number of colors (slots) to find
 * the chromatic number of the conflict graph.
 *
 * Returns:
 *   {
 *     success: boolean,
 *     assignment: { subjectId: slotNumber },
 *     colorsUsed: number,
 *     executionTimeMs: number,
 *     stats: { iterations, backtracks },
 *     conflictPairs,
 *     adjacency (as plain object of arrays),
 *   }
 */
function graphColoringWithBacktracking(subjects) {
  const start = performance.now();

  if (!subjects || subjects.length === 0) {
    return { success: false, error: 'No subjects provided.' };
  }

  const { adjacency, conflictPairs } = buildConflictGraph(subjects);

  // Heuristic: order subjects by descending degree (Welsh-Powell ordering)
  // This greatly reduces backtracking in practice.
  const sortedSubjects = [...subjects].sort((a, b) => {
    return adjacency[b.id].size - adjacency[a.id].size;
  });

  const stats = { iterations: 0, backtracks: 0 };

  // Iterative deepening: try 1 color, then 2, … up to n colors
  for (let numColors = 1; numColors <= subjects.length; numColors++) {
    const assignment = {};
    stats.iterations = 0;
    stats.backtracks = 0;

    const solved = backtrack(0, sortedSubjects, adjacency, assignment, numColors, stats);

    if (solved) {
      const end = performance.now();

      // Convert adjacency sets to arrays for JSON serialization
      const adjacencyObj = {};
      for (const [id, set] of Object.entries(adjacency)) {
        adjacencyObj[id] = Array.from(set);
      }

      return {
        success: true,
        assignment,          // { subjectId: slotNumber (1-based) }
        colorsUsed: numColors,
        executionTimeMs: parseFloat((end - start).toFixed(3)),
        stats,
        conflictPairs,
        adjacency: adjacencyObj,
      };
    }
  }

  const end = performance.now();
  return {
    success: false,
    error: 'Could not color the graph — this should never happen for a finite graph.',
    executionTimeMs: parseFloat((end - start).toFixed(3)),
    stats,
  };
}

module.exports = { graphColoringWithBacktracking, buildConflictGraph };
