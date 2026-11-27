import React from 'react';

export default function Analysis({ timetableResult }) {
  const algo = timetableResult?.algorithm;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Algorithm Analysis</h1>
          <p>Deep-dive into the Graph Coloring with Backtracking algorithm — complexity, execution, and design.</p>
        </div>
      </div>

      {/* Execution stat cards */}
      {algo ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Colors / Slots Used', value: algo.colorsUsed,              icon: '🎨' },
            { label: 'Execution Time',       value: `${algo.executionTimeMs} ms`, icon: '⏱️' },
            { label: 'Total Conflicts',      value: algo.totalConflicts,          icon: '⚡' },
            { label: 'Backtrack Steps',      value: algo.backtracks,              icon: '↩️' },
            { label: 'Color Checks',         value: algo.iterations,              icon: '🔁' },
          ].map(item => (
            <div className="stat-card" key={item.label}>
              <div className="stat-icon">{item.icon}</div>
              <div>
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" style={{ marginBottom: 24 }}>
          ℹ️ Generate a timetable first to see live execution statistics.
        </div>
      )}

      {/* How Backtracking works */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">🧠 How Backtracking Works</div>
        </div>
        <div className="card-body">
          <div className="algo-box" style={{ marginBottom: 20 }}>
            <h4>Algorithm: Graph Coloring via Backtracking</h4>
            <p>
              The algorithm models examination scheduling as a graph coloring problem:
              each subject is a vertex, two subjects share an edge if they have common students,
              and each exam slot is a color. The goal is to assign colors such that no two
              adjacent vertices share the same color, using the minimum number of colors.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                step: 1,
                title: 'Build Conflict Graph',
                detail: 'Compare every pair of subjects. If they share at least one student, add an undirected edge between them. This produces the conflict graph G = (V, E).',
                code: 'O(n² × s)  — n subjects, s avg. students per subject',
              },
              {
                step: 2,
                title: 'Welsh–Powell Ordering (Heuristic)',
                detail: 'Sort subjects in descending order of their degree (number of conflicts). Coloring high-degree vertices first dramatically reduces the search space.',
                code: 'O(n log n)',
              },
              {
                step: 3,
                title: 'Iterative Deepening on k (number of colors)',
                detail: 'Start with k = 1 and increment until a valid coloring is found. This ensures the chromatic number χ(G) is returned — the true minimum number of slots.',
                code: 'k ranges from 1 to n',
              },
              {
                step: 4,
                title: 'Backtracking Core',
                detail: 'Assign colors 1…k to each vertex in order. Before assigning, check that no neighbor already uses that color (isSafe). If no color works, backtrack to the previous vertex and try the next color.',
                code: 'function backtrack(idx, assignment, maxColors)',
              },
              {
                step: 5,
                title: 'Validity Check (isSafe)',
                detail: 'For vertex v being assigned color c, iterate over all neighbors. If any neighbor already holds color c the assignment is unsafe and rejected immediately.',
                code: 'O(degree(v)) per check',
              },
            ].map(item => (
              <div key={item.step} style={{
                display: 'flex',
                gap: 16,
                padding: '14px 18px',
                background: 'var(--bg-main)',
                borderRadius: 8,
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--navy)',
                  color: 'var(--text-white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '.9rem', flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: '.83rem', color: 'var(--text-body)', marginBottom: 6 }}>
                    {item.detail}
                  </p>
                  <code style={{
                    fontSize: '.78rem',
                    background: 'var(--blue-light)',
                    color: 'var(--blue-hover)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontFamily: "'Cascadia Code', 'Consolas', monospace",
                  }}>
                    {item.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complexity table */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">📐 Algorithm Complexity</div>
        </div>
        <div className="card-body">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Complexity</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Time (worst case)',         'O(k × k^n)',    'k colors, n vertices — exponential in the worst case due to backtracking, but practically much faster with heuristic ordering.'],
                  ['Time (with Welsh-Powell)',   'O(n² × s)',     'Conflict graph construction dominates for dense graphs. The backtracking rarely explores deeply in practice.'],
                  ['Space',                     'O(n + E)',      'Adjacency list storage and the assignment array — O(n) for assignment, O(E) for the graph edges.'],
                  ['Chromatic Number',          'Optimal (χ(G))','Iterative deepening on k guarantees the minimum number of exam slots is found.'],
                  ['NP-Completeness',           'NP-Complete (k ≥ 3)', 'Graph k-coloring for k ≥ 3 is NP-complete. Backtracking is exact but exponential. For realistic n (≤ 50 subjects) it runs in milliseconds.'],
                ].map(([aspect, complexity, explanation]) => (
                  <tr key={aspect}>
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{aspect}</td>
                    <td>
                      <code style={{
                        background: 'var(--blue-light)',
                        color: 'var(--blue-hover)',
                        padding: '2px 7px',
                        borderRadius: 4,
                        fontSize: '.82rem',
                        fontFamily: "'Cascadia Code', 'Consolas', monospace",
                      }}>
                        {complexity}
                      </code>
                    </td>
                    <td style={{ fontSize: '.82rem', color: 'var(--text-body)' }}>{explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pseudocode */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💻 Pseudocode</div>
        </div>
        <div className="card-body">
          <pre style={{
            background: 'var(--navy)',
            color: 'rgba(255,255,255,0.88)',
            padding: '20px 24px',
            borderRadius: 10,
            fontSize: '.82rem',
            fontFamily: "'Cascadia Code', 'Consolas', monospace",
            overflowX: 'auto',
            lineHeight: 1.8,
          }}>
{`FUNCTION graphColoring(subjects):
  graph ← buildConflictGraph(subjects)
  sortedSubjects ← sortByDegreeDescending(subjects, graph)

  FOR k = 1 TO |subjects|:
    assignment ← {}
    IF backtrack(0, sortedSubjects, graph, assignment, k):
      RETURN assignment          // minimum k found
    END IF
  END FOR

FUNCTION backtrack(idx, subjects, graph, assignment, maxColors):
  IF idx == |subjects|:
    RETURN true                  // all subjects colored

  subject ← subjects[idx]

  FOR color = 1 TO maxColors:
    IF isSafe(subject, color, graph, assignment):
      assignment[subject] ← color
      IF backtrack(idx+1, subjects, graph, assignment, maxColors):
        RETURN true
      DELETE assignment[subject]  // ← Backtrack
    END IF
  END FOR

  RETURN false                   // trigger backtrack up

FUNCTION isSafe(subject, color, graph, assignment):
  FOR EACH neighbor IN graph[subject]:
    IF assignment[neighbor] == color:
      RETURN false
  END FOR
  RETURN true`}
          </pre>
        </div>
      </div>
    </div>
  );
}
