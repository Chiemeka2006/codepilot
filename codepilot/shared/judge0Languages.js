// Maps our own language names (see shared/languages.js) to Judge0's numeric
// language_id. HTML & CSS is deliberately excluded — it has no "run and
// print output" execution model the way the others do, so it isn't a
// candidate for the Playground's Run button.
export const JUDGE0_LANGUAGE_IDS = {
  JavaScript: 63, // Node.js
  Python: 71, // Python 3
  Java: 62, // OpenJDK
  'C++': 54, // GCC
  SQL: 82, // SQLite3
  Go: 60,
  Rust: 73,
}
