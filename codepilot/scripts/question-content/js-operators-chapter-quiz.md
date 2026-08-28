# Quiz: JavaScript Operators

---

## Topic 1: Arithmetic Operators

### Easy

1. What does `5 + 3` evaluate to?
   A) `53`
   B) `8`
   C) `2`
   D) `15`
   **Hint:** This is basic addition between two numbers.
   **Answer:** B
   **Explanation:** `5 + 3` is straightforward numeric addition, giving `8`.

2. What does `10 - 4` evaluate to?
   A) `6`
   B) `14`
   C) `-6`
   D) `40`
   **Hint:** This is basic subtraction.
   **Answer:** A
   **Explanation:** `10 - 4` is basic subtraction, giving `6`.

3. What does `6 * 3` evaluate to?
   A) `9`
   B) `2`
   C) `18`
   D) `63`
   **Hint:** The `*` symbol represents multiplication in JavaScript.
   **Answer:** C
   **Explanation:** `6 * 3` multiplies to `18`.

4. What does `10 / 2` evaluate to?
   A) `5`
   B) `20`
   C) `8`
   D) `12`
   **Hint:** The `/` symbol represents division.
   **Answer:** A
   **Explanation:** `10 / 2` divides evenly to `5`.

5. What does `7 % 2` evaluate to?
   A) `3.5`
   B) `1`
   C) `0`
   D) `14`
   **Hint:** `%` gives the remainder left over after division.
   **Answer:** B
   **Explanation:** `7 % 2` divides 3 times with a remainder of `1`.

6. What does `2 ** 3` evaluate to?
   A) `5`
   B) `6`
   C) `8`
   D) `9`
   **Hint:** `**` represents exponentiation — 2 raised to the power of 3.
   **Answer:** C
   **Explanation:** `2 ** 3` means 2 × 2 × 2, which is `8`.

7. What does the `++` operator do to a variable?
   A) Doubles it
   B) Increases it by 1
   C) Decreases it by 1
   D) Squares it
   **Hint:** Think of it as a shorthand for `x = x + 1`.
   **Answer:** B
   **Explanation:** `++` is the increment operator, adding exactly 1 to the variable.

8. What does the `--` operator do to a variable?
   A) Doubles it
   B) Increases it by 1
   C) Decreases it by 1
   D) Squares it
   **Hint:** Think of it as a shorthand for `x = x - 1`.
   **Answer:** C
   **Explanation:** `--` is the decrement operator, subtracting exactly 1 from the variable.

9. What is the result of `let x = 5; x++;` — what is `x` afterward?
   A) `4`
   B) `5`
   C) `6`
   D) `55`
   **Hint:** `x++` increases `x` by exactly one.
   **Answer:** C
   **Explanation:** Incrementing `5` by one gives `6`, regardless of whether `x++` is used as prefix or postfix here.

10. What does `4 + 4 * 2` evaluate to?
    A) `16`
    B) `12`
    C) `10`
    D) `20`
    **Hint:** Multiplication happens before addition, following standard order of operations.
    **Answer:** B
    **Explanation:** `4 * 2` evaluates first (`8`) due to operator precedence, then `4 + 8` gives `12`.

### Medium

11. What is the difference between `x++` and `++x`?
    A) There is no difference
    B) `x++` returns the original value then increments; `++x` increments first then returns the new value
    C) `x++` only works on strings
    D) `++x` decreases the value
    **Hint:** Think about whether the "old" or "new" value gets used in an expression like `y = x++`.
    **Answer:** B
    **Explanation:** Postfix `x++` yields the pre-increment value while still incrementing `x`, whereas prefix `++x` increments first and yields the updated value.

12. What does `console.log(5 + "5")` print?
    A) `10`
    B) `"55"`
    C) `55` as a number
    D) An error
    **Hint:** When one operand is a string, `+` tends to concatenate rather than add numerically.
    **Answer:** B
    **Explanation:** Since one operand is a string, `+` concatenates instead of adding numerically, producing `"55"`.

13. What does `console.log(5 - "2")` print?
    A) `"52"`
    B) `3`
    C) `NaN`
    D) An error
    **Hint:** Unlike `+`, the `-` operator always attempts numeric conversion first.
    **Answer:** B
    **Explanation:** `-` always coerces both operands to numbers first, so `"2"` becomes `2` and `5 - 2` is `3`.

14. What does `10 % 3` evaluate to?
    A) `3`
    B) `1`
    C) `3.33`
    D) `0`
    **Hint:** 3 goes into 10 three times, with some amount left over — that leftover is the answer.
    **Answer:** B
    **Explanation:** `3` divides into `10` three times (`9`), leaving a remainder of `1`.

15. What is the result of `-5 % 3` in JavaScript?
    A) `-2`
    B) `2`
    C) `1`
    D) `-1`
    **Hint:** JavaScript's modulo result takes the sign of the dividend (the first number), not the divisor.
    **Answer:** A
    **Explanation:** JavaScript's `%` returns a remainder with the same sign as the dividend, so `-5 % 3` is `-2`.

16. What does `2 ** 0` evaluate to?
    A) `0`
    B) `1`
    C) `2`
    D) `NaN`
    **Hint:** Any non-zero number raised to the power of 0 follows a specific mathematical rule.
    **Answer:** B
    **Explanation:** Any non-zero number raised to the power of `0` equals `1`.

17. What is the output of `console.log(3 + 4 + "5")`?
    A) `"345"`
    B) `"75"`
    C) `12`
    D) `"12"`
    **Hint:** Evaluate left to right — the first `+` happens between two numbers before the string ever gets involved.
    **Answer:** B
    **Explanation:** `3 + 4` evaluates numerically first to `7`, then `7 + "5"` concatenates to `"75"`.

18. What does `let x = 10; console.log(x--);` print?
    A) `9`
    B) `10`
    C) `-10`
    D) `0`
    **Hint:** The postfix `--` returns the value *before* decrementing.
    **Answer:** B
    **Explanation:** Postfix `x--` logs the original value (`10`) before decrementing `x`.

19. What is the value of `x` after `let x = 10; console.log(x--);` finishes?
    A) `9`
    B) `10`
    C) `11`
    D) `0`
    **Hint:** Even though the logged value was the original, the decrement still happens to the variable itself.
    **Answer:** A
    **Explanation:** Even though `10` was logged, `x--` still decrements `x` to `9` afterward.

20. What does `5 / 0` evaluate to in JavaScript?
    A) An error
    B) `Infinity`
    C) `NaN`
    D) `0`
    **Hint:** Unlike some languages that throw an error, JavaScript has a specific numeric value representing "division by zero."
    **Answer:** B
    **Explanation:** Dividing a positive number by `0` produces `Infinity` rather than throwing an error.

### Hard

21. Why does `1 + 2 + "3"` result in `"33"`, but `"1" + 2 + 3` results in `"123"`?
    A) Both should produce the same result — this is a bug
    B) Evaluation happens left to right — the first expression sums two numbers first (`3`) before concatenating with the string, while the second immediately concatenates a string, forcing every subsequent `+` to also concatenate
    C) JavaScript always evaluates addition before concatenation, regardless of order
    D) String position doesn't affect operator behavior
    **Hint:** Track the type of the running result after each individual `+`, strictly left to right.
    **Answer:** B
    **Explanation:** Left-to-right evaluation means `1 + 2` becomes `3` before it ever meets the string, while `"1" + 2` becomes a string immediately, forcing every later `+` to concatenate.

22. Why can chained increment operators like `x++ + ++x` produce results that seem confusing at first glance?
    A) They always throw a syntax error
    B) Postfix (`x++`) returns the value before incrementing, while prefix (`++x`) returns the value after — mixing both in one expression requires carefully tracking each individual side-effect and read order
    C) `++` cannot be used more than once per line
    D) This expression is functionally identical to `x + x`
    **Hint:** Work through each operator's effect step by step, noting exactly when the increment happens relative to when the value is "read" for the expression.
    **Answer:** B
    **Explanation:** Postfix and prefix increment read and mutate `x` at different points, so mixing them in one expression requires tracking each side effect's exact timing.

23. Why does `0.1 + 0.2` not exactly equal `0.3` in JavaScript's arithmetic?
    A) JavaScript has a bug in its addition operator
    B) Floating-point numbers are stored in binary, and many decimal fractions (like 0.1) can't be represented exactly, leading to tiny rounding errors
    C) `0.1` and `0.2` are treated as strings
    D) This only happens with negative numbers
    **Hint:** This is a well-known consequence of binary floating-point representation, common to virtually all programming languages, not unique to JavaScript.
    **Answer:** B
    **Explanation:** Binary floating-point can't represent decimals like `0.1` exactly, so the addition carries a tiny rounding error.

24. Why does `-5 % 3` return `-2` rather than `1`, unlike some mathematical definitions of modulo?
    A) It's simply a bug with no explanation
    B) JavaScript's `%` operator is a "remainder" operator that follows the sign of the dividend, differing from a true mathematical modulo which would always return a non-negative result
    C) `%` only works with positive numbers
    D) `-5 % 3` should actually return `2`
    **Hint:** JavaScript specifically calls this the "remainder" operator, not "modulo" — that naming distinction reflects a deliberate behavioral difference from pure math modulo.
    **Answer:** B
    **Explanation:** JavaScript's `%` is technically a remainder operator, so its sign follows the dividend (`-5`) rather than always being non-negative like true mathematical modulo.

25. What's the significance of `Infinity` as a return value for `5 / 0`, rather than throwing a runtime error?
    A) It has no practical significance
    B) It allows arithmetic operations to continue without halting execution, following the IEEE 754 floating-point standard, which many languages (not just JavaScript) implement this way
    C) `Infinity` is actually a string in disguise
    D) It only happens when both operands are `0`
    **Hint:** Consider what would happen to a long chain of calculations if a single divide-by-zero immediately crashed the entire program, versus propagating a special value through.
    **Answer:** B
    **Explanation:** Returning `Infinity` (per the IEEE 754 standard) lets computation continue instead of halting the program with an error.

26. Why does `"10" - "4" + "2"` result in `"62"`, while `"10" + "4" - "2"` results in `102`?
    A) They should both produce identical results — one is a bug
    B) `-` forces numeric conversion, so the first expression becomes the number `6` before `+` concatenates it with the string `"2"`; the second expression's leading `+` between two strings concatenates first, and the trailing `-` then forces numeric conversion on the result
    C) JavaScript evaluates `-` before `+` regardless of order
    D) Only single-digit strings can be used with these operators
    **Hint:** Walk through each expression left to right, tracking whether each operator forces string concatenation or numeric conversion based on what it encounters.
    **Answer:** B
    **Explanation:** `"10" - "4"` evaluates numerically to `6`, but `+` between a number and the string `"2"` concatenates rather than adds, giving `"62"`; the second expression's leading `+` concatenates the two strings into `"104"` first, and the trailing `-` then forces numeric conversion, giving `102`.

27. Why might using `Number.EPSILON` be a recommended technique when comparing the results of floating-point arithmetic for equality?
    A) `Number.EPSILON` converts floats to integers automatically
    B) Since floating-point arithmetic can introduce tiny rounding errors, comparing with a small tolerance (`Math.abs(a - b) < Number.EPSILON`) avoids false negatives from direct `===` comparison
    C) `Number.EPSILON` has no practical use in comparisons
    D) It's only relevant for very large numbers, not small decimals
    **Hint:** Recall the `0.1 + 0.2 !== 0.3` issue — how would you write a comparison that accounts for that tiny margin of error, rather than expecting exact equality?
    **Answer:** B
    **Explanation:** Comparing with a small tolerance like `Number.EPSILON` absorbs tiny floating-point rounding errors that would otherwise make an exact `===` comparison fail unexpectedly.

28. Why does `2 ** 3 ** 2` evaluate to `512` rather than `64`?
    A) It's a bug and should be `64`
    B) The exponentiation operator `**` is right-associative, so it evaluates as `2 ** (3 ** 2)` = `2 ** 9` = `512`, not `(2 ** 3) ** 2`
    C) JavaScript always evaluates exponents left to right like other operators
    D) `**` cannot be chained more than once
    **Hint:** Most arithmetic operators are left-associative, but exponentiation is a deliberate, documented exception — it groups from the right.
    **Answer:** B
    **Explanation:** `**` is right-associative, so it groups as `2 ** (3 ** 2)`, which is `2 ** 9 = 512`.

29. Why does `NaN + 5` result in `NaN`, and what does this "contagious" property imply for larger calculations?
    A) `NaN` gets silently converted to `0` first
    B) Any arithmetic operation involving `NaN` propagates `NaN` as the result, meaning a single invalid value early in a long calculation chain can silently invalidate the entire final result
    C) `NaN + 5` actually throws a runtime error
    D) `NaN` only affects subtraction, not addition
    **Hint:** Think of `NaN` as a kind of "poison" that spreads through any arithmetic it touches — this has real implications for debugging unexpected `NaN` results deep in a calculation.
    **Answer:** B
    **Explanation:** Any arithmetic touching `NaN` produces `NaN`, so one bad value early in a chain of calculations silently spoils the entire result.

30. Why is understanding operator precedence and associativity critical when refactoring complex arithmetic expressions without adding explicit parentheses?
    A) Precedence and associativity have no real impact on refactoring
    B) Reordering or restructuring an expression without understanding which operators bind tighter, or in which direction they associate, risks silently changing the calculated result
    C) JavaScript automatically preserves the original evaluation order regardless of how code is rewritten
    D) This concern only applies to comparison operators, not arithmetic
    **Hint:** Consider the exponentiation right-associativity example — refactoring that expression carelessly, assuming standard left-to-right grouping, would silently produce a very different numeric result.
    **Answer:** B
    **Explanation:** Rewriting an expression without knowing which operators bind tighter or which way they associate (as with `**`) can silently change what the expression actually computes.

---

## Topic 2: Assignment Operators

### Easy

1. What does `=` do in JavaScript?
   A) Compares two values
   B) Assigns a value to a variable
   C) Checks equality
   D) Declares a constant
   **Hint:** This is the most basic assignment symbol, distinct from equality checks.
   **Answer:** B
   **Explanation:** `=` is the basic assignment operator, storing a value in a variable.

2. What does `x += 5` do, assuming `x` starts at `10`?
   A) Sets `x` to `5`
   B) Sets `x` to `15`
   C) Sets `x` to `50`
   D) Sets `x` to `2`
   **Hint:** `+=` is shorthand for adding a value to the existing variable and reassigning it.
   **Answer:** B
   **Explanation:** `x += 5` is shorthand for `x = x + 5`, so `10 + 5` gives `15`.

3. What does `x -= 3` do, assuming `x` starts at `10`?
   A) Sets `x` to `13`
   B) Sets `x` to `7`
   C) Sets `x` to `-3`
   D) Sets `x` to `30`
   **Hint:** `-=` subtracts the given value from the current value of `x`.
   **Answer:** B
   **Explanation:** `x -= 3` is shorthand for `x = x - 3`, so `10 - 3` gives `7`.

4. What does `x *= 2` do, assuming `x` starts at `5`?
   A) Sets `x` to `10`
   B) Sets `x` to `7`
   C) Sets `x` to `2.5`
   D) Sets `x` to `25`
   **Hint:** `*=` multiplies the current value by the given number.
   **Answer:** A
   **Explanation:** `x *= 2` is shorthand for `x = x * 2`, so `5 * 2` gives `10`.

5. What does `x /= 2` do, assuming `x` starts at `10`?
   A) Sets `x` to `20`
   B) Sets `x` to `5`
   C) Sets `x` to `8`
   D) Sets `x` to `12`
   **Hint:** `/=` divides the current value by the given number.
   **Answer:** B
   **Explanation:** `x /= 2` is shorthand for `x = x / 2`, so `10 / 2` gives `5`.

6. Is `x = 5` the same as `x == 5`?
   A) Yes, identical
   B) No — `=` assigns, `==` compares
   C) No — `=` compares, `==` assigns
   D) They're only different for strings
   **Hint:** One of these symbols changes a variable's value; the other checks it.
   **Answer:** B
   **Explanation:** `=` assigns a value while `==` performs an equality comparison — they serve entirely different purposes.

7. What does `let x = 5;` do?
   A) Compares `x` to `5`
   B) Declares `x` and assigns it the value `5`
   C) Deletes `x`
   D) Converts `5` to a string
   **Hint:** `let` combined with `=` is a full variable declaration with an initial value.
   **Answer:** B
   **Explanation:** `let x = 5` both declares the variable `x` and initializes it with the value `5`.

8. What is the shorthand operator for `x = x + 1`?
   A) `x += 1`
   B) `x -= 1`
   C) `x *= 1`
   D) `x == 1`
   **Hint:** This shorthand combines addition with assignment into one symbol.
   **Answer:** A
   **Explanation:** `x += 1` is the compound assignment shorthand for `x = x + 1`.

9. What does `x %= 3` do, assuming `x` starts at `10`?
   A) Sets `x` to `3.33`
   B) Sets `x` to `1`
   C) Sets `x` to `30`
   D) Sets `x` to `13`
   **Hint:** `%=` assigns `x` the remainder of `x` divided by the given number.
   **Answer:** B
   **Explanation:** `x %= 3` is shorthand for `x = x % 3`, and `10 % 3` leaves a remainder of `1`.

10. Can you chain multiple assignments, like `let a = b = 5;`?
    A) No, this is invalid syntax
    B) Yes, this assigns `5` to both `a` and `b`
    C) Only with `const`
    D) Only inside functions
    **Hint:** Assignment expressions themselves return a value, which can feed into another assignment.
    **Answer:** B
    **Explanation:** An assignment expression evaluates to the assigned value, so `b = 5` evaluates to `5`, which is then assigned to `a` as well.

### Medium

11. What does `x **= 2` do, assuming `x` starts at `3`?
    A) Sets `x` to `6`
    B) Sets `x` to `9`
    C) Sets `x` to `5`
    D) Sets `x` to `1.5`
    **Hint:** `**=` raises `x` to the given power and reassigns the result.
    **Answer:** B
    **Explanation:** `x **= 2` is shorthand for `x = x ** 2`, so `3 ** 2` gives `9`.

12. What is the result of `let x = 5; x += "5";`?
    A) `10`
    B) `"55"`
    C) `55` as a number
    D) An error
    **Hint:** Since one side becomes a string, `+=` follows the same coercion rules as regular `+`.
    **Answer:** B
    **Explanation:** `+=` follows regular `+` coercion rules, so with a string operand present, `5 + "5"` concatenates to `"55"`.

13. What does the logical assignment operator `||=` do?
    A) Always overwrites the variable
    B) Assigns a value only if the variable is currently falsy
    C) Always sets the variable to `false`
    D) Compares two variables without assigning
    **Hint:** Think of it as "assign this default only if the current value doesn't already count as something."
    **Answer:** B
    **Explanation:** `||=` only performs the assignment when the current value is falsy, leaving a truthy value untouched.

14. What does `x ??= 10` do if `x` is currently `null`?
    A) Leaves `x` as `null`
    B) Sets `x` to `10`
    C) Throws an error
    D) Sets `x` to `undefined`
    **Hint:** `??=` specifically checks for `null`/`undefined`, not general falsiness like `||=`.
    **Answer:** B
    **Explanation:** `??=` assigns when the current value is `null` or `undefined`, so `x` becomes `10`.

15. What does `x ??= 10` do if `x` is currently `0`?
    A) Sets `x` to `10`
    B) Leaves `x` as `0`
    C) Throws an error
    D) Sets `x` to `NaN`
    **Hint:** `0` is not `null` or `undefined` — does `??=` treat it as "already has a real value"?
    **Answer:** B
    **Explanation:** `??=` only checks for `null`/`undefined`, and `0` is neither, so it's left unchanged.

16. What's the key difference between `x ||= value` and `x ??= value`?
    A) They are functionally identical
    B) `||=` assigns if `x` is any falsy value (`0`, `""`, `false`, `null`, `undefined`); `??=` assigns only if `x` is `null` or `undefined`
    C) `??=` is deprecated in favor of `||=`
    D) `||=` only works with numbers
    **Hint:** Consider what happens differently between the two when `x` is currently `0` or an empty string.
    **Answer:** B
    **Explanation:** `||=` triggers on any falsy value while `??=` triggers only on `null`/`undefined`, making `??=` the narrower, more precise check.

17. What does `x &&= value` do?
    A) Assigns `value` to `x` only if `x` is currently truthy
    B) Always assigns `value`
    C) Assigns `value` only if `x` is falsy
    D) Deletes `x`
    **Hint:** This mirrors `||=`, but flips the condition — it only proceeds when the current value is already truthy.
    **Answer:** A
    **Explanation:** `&&=` only assigns when the current value is already truthy, unlike `||=` which assigns on falsy.

18. What is the output of `let x = 5; console.log(x += 3);`?
    A) `5`
    B) `3`
    C) `8`
    D) `"53"`
    **Hint:** `x += 3` both updates `x` and evaluates to the new value, which then gets logged.
    **Answer:** C
    **Explanation:** `x += 3` updates `x` to `8` and the assignment expression itself evaluates to `8`, which gets logged.

19. Can compound assignment operators like `+=` be used on `const` variables?
    A) Yes, always
    B) No — since `+=` reassigns the variable, it violates `const`'s restriction
    C) Only with numbers
    D) Only inside loops
    **Hint:** Remember that `+=` is really shorthand for `x = x + value` — does that involve reassignment?
    **Answer:** B
    **Explanation:** `+=` is shorthand for reassigning the variable, which `const` explicitly disallows after its initial assignment.

20. What does `x |= y` (bitwise OR assignment) do, conceptually?
    A) Logical OR comparison only, no assignment
    B) Performs a bitwise OR between `x` and `y`, then assigns the result back to `x`
    C) It's identical to `x ||= y`
    D) It deletes both variables
    **Hint:** Note the single `|` here — this is a bitwise operator working at the binary digit level, distinct from the logical `||=`.
    **Answer:** B
    **Explanation:** The single `|` performs a bitwise OR on the binary representations of `x` and `y`, and the result is assigned back to `x`.

### Hard

21. Why does `x ??= getDefaultValue()` avoid unnecessarily calling `getDefaultValue()` when `x` already holds a valid value?
    A) It always calls the function regardless
    B) Logical assignment operators short-circuit — the right-hand side is only evaluated if the assignment condition is actually met, avoiding unnecessary function calls
    C) `??=` caches the function's result permanently
    D) This behavior only applies to `||=`, not `??=`
    **Hint:** Think about whether the right-hand expression even needs to run if `x` is already `5` and won't be reassigned.
    **Answer:** B
    **Explanation:** Logical assignment operators short-circuit, so the right-hand side only runs when the assignment would actually happen.

22. Why might `x ||= defaultValue` introduce a subtle bug if `x` is intentionally set to `0` as a valid, meaningful value (like a starting score)?
    A) There's no possible bug here
    B) `||=` treats `0` as falsy, so it would incorrectly overwrite a deliberately-set `0` with `defaultValue`, whereas `??=` would correctly leave `0` untouched
    C) `||=` cannot be used with numbers at all
    D) `0` is not a valid value for any assignment operator
    **Hint:** This is exactly the kind of scenario `??=` was introduced to solve — distinguishing "genuinely absent" from "falsy but intentional."
    **Answer:** B
    **Explanation:** `||=` can't distinguish "intentionally 0" from "missing," so it overwrites a meaningful `0`, while `??=` correctly leaves it alone.

23. Why does chaining `let a = b = c = 5;` work correctly to assign `5` to all three variables, but can create confusing bugs if `b` and `c` weren't previously declared?
    A) Chained assignment always throws an error
    B) In non-strict mode, assigning to an undeclared variable (like a bare `b = 5` inside this chain) can silently create an implicit global variable, which is a well-known source of hard-to-trace bugs
    C) Chained assignments are limited to exactly two variables
    D) This syntax only works with `const`
    **Hint:** Consider what happens if only `a` was declared with `let`, but `b` and `c` were never declared anywhere beforehand — where do they end up living?
    **Answer:** B
    **Explanation:** In non-strict mode, assigning to an undeclared identifier inside the chain silently creates an implicit global, which can be a hard-to-trace bug source.

24. Why is `x = x || defaultValue` considered a common pre-ES2021 pattern that `x ||= defaultValue` was designed to replace?
    A) They behave completely differently
    B) They're functionally equivalent, but `||=` is more concise and communicates the "assign-if-falsy" intent more directly, without repeating the variable name
    C) `x = x || defaultValue` no longer works in modern JavaScript
    D) `||=` performs a completely different operation
    **Hint:** Compare both expressions' actual behavior side by side — do they produce the same result in every case?
    **Answer:** B
    **Explanation:** Both produce the same result, but `||=` is a more concise, self-documenting way to express "assign only if falsy" without repeating the variable name.

25. Why does using compound assignment (`x += y`) sometimes obscure intent compared to writing out `x = x + y` explicitly, particularly in complex expressions?
    A) There's never any readability tradeoff
    B) In simple cases compound assignment is clearer and more concise, but in more complex expressions (especially with side effects in `y`), the implicit "read-modify-write" can be less obvious than the explicit long form
    C) Compound assignment operators are always faster to execute
    D) `x += y` is disallowed in strict mode
    **Hint:** Consider a case where `y` itself is a function call with side effects — does the shorthand form make it as clear when and how many times that function actually runs?
    **Answer:** B
    **Explanation:** When `y` has side effects, the implicit read-modify-write of `x += y` can hide exactly when and how many times those side effects occur, unlike the explicit long form.

26. Why can bitwise assignment operators like `&=`, `|=`, and `^=` produce results that seem unrelated to a variable's original numeric value at first glance?
    A) They don't actually operate on numbers at all
    B) These operators work on the binary representation of numbers bit by bit, so their effect depends on each individual bit's value, not the number's overall magnitude
    C) They're purely cosmetic and don't change the value
    D) They only work on boolean values, never numbers
    **Hint:** Picture the numbers converted to binary first — these operators compare and combine individual 0s and 1s, not the decimal value as a whole.
    **Answer:** B
    **Explanation:** These operators act bit by bit on the binary representation, so their result depends on individual bit patterns rather than the decimal magnitude.

27. Why might relying on the return value of an assignment expression (e.g., `while ((line = getNextLine()) !== null)`) be considered both powerful and risky?
    A) Assignment expressions never return a usable value
    B) It allows concise "assign-and-test" patterns in one line, but can reduce readability and lead to bugs if a developer mistakenly writes `==` or `=` when they meant a different operator
    C) This pattern is invalid JavaScript syntax
    D) It always causes an infinite loop
    **Hint:** This pattern relies on the fact that `(line = getNextLine())` both assigns and evaluates to the assigned value — powerful, but easy to typo into an unrelated comparison.
    **Answer:** B
    **Explanation:** Assignment expressions return the assigned value, enabling concise assign-and-test patterns, but a stray typo between `=` and `==` in such code is easy to introduce and hard to spot.

28. Why does the order of evaluation matter when using `??=` versus manually writing `x = (x === null || x === undefined) ? defaultValue : x`?
    A) They can never produce different behavior
    B) They're functionally equivalent, but `??=` is guaranteed by the language spec to short-circuit correctly and avoid redundant reads/writes of `x`, while a manual implementation might introduce subtle bugs depending on how it's written
    C) The manual version is always faster
    D) `??=` doesn't actually check for `undefined`
    **Hint:** Consider how many separate places `x` is referenced in the "manual" version — could a poorly written manual version accidentally trigger side effects (like a getter) more than once?
    **Answer:** B
    **Explanation:** `??=` is spec-guaranteed to short-circuit and touch `x` minimally, while a hand-written manual equivalent risks redundant reads/writes if `x` has side effects (like a getter).

29. Why is it generally discouraged to mix multiple different compound assignment operators within a single, dense expression (e.g., `x += y -= z *= 2`)?
    A) This syntax is illegal and won't run
    B) While technically valid, the mixed right-to-left evaluation and multiple simultaneous mutations make the code extremely difficult to read and reason about correctly
    C) JavaScript automatically reorders these operators alphabetically
    D) Each operator would execute in a separate, isolated scope
    **Hint:** Even if you correctly work out what this technically evaluates to, would a teammate reviewing your code be able to quickly understand it at a glance?
    **Answer:** B
    **Explanation:** Though valid, chaining several different compound assignments in one expression buries multiple simultaneous mutations in a form that's hard for a reader to trace correctly.

30. Why do modern JavaScript style guides often recommend `??=` over `||=` as the safer default for "assign a fallback value" logic?
    A) `??=` is always identical in behavior to `||=`, so it doesn't matter
    B) `??=` only triggers on `null`/`undefined`, avoiding accidental overwrites of legitimately falsy values like `0`, `""`, or `false` — a narrower, more precise check than `||=`'s broad falsy check
    C) `||=` was deprecated and no longer works
    D) `??=` executes faster in all JavaScript engines
    **Hint:** Think back to the `0` starting-score example — which operator more accurately captures "only replace this if it's truly missing," rather than "replace this if it's falsy in any sense"?
    **Answer:** B
    **Explanation:** `??=`'s narrower null/undefined-only check avoids accidentally overwriting legitimately falsy values that `||=`'s broad falsy check would incorrectly replace.

---

## Topic 3: Comparison Operators

### Easy

1. What does `5 == 5` evaluate to?
   A) `true`
   B) `false`
   C) `5`
   D) An error
   **Hint:** Both sides are the exact same number.
   **Answer:** A
   **Explanation:** Both operands are the identical number `5`, so the comparison is `true`.

2. What does `5 != 3` evaluate to?
   A) `true`
   B) `false`
   C) `5`
   D) `3`
   **Hint:** `!=` checks whether two values are NOT equal.
   **Answer:** A
   **Explanation:** `5` and `3` are not equal, so `!=` returns `true`.

3. What does `10 > 5` evaluate to?
   A) `true`
   B) `false`
   C) `10`
   D) `5`
   **Hint:** Is ten actually greater than five?
   **Answer:** A
   **Explanation:** `10` is indeed greater than `5`, so this evaluates to `true`.

4. What does `3 < 3` evaluate to?
   A) `true`
   B) `false`
   C) `3`
   D) `0`
   **Hint:** Is a number ever considered "less than" itself?
   **Answer:** B
   **Explanation:** A number is never less than itself, so `3 < 3` is `false`.

5. What does `5 >= 5` evaluate to?
   A) `true`
   B) `false`
   C) `10`
   D) `0`
   **Hint:** `>=` includes both "greater than" and "equal to" as passing conditions.
   **Answer:** A
   **Explanation:** `>=` passes when values are equal, and `5` equals `5`, so this is `true`.

6. What does `4 <= 3` evaluate to?
   A) `true`
   B) `false`
   C) `4`
   D) `3`
   **Hint:** Is four actually less than or equal to three?
   **Answer:** B
   **Explanation:** `4` is neither less than nor equal to `3`, so this is `false`.

7. What type of value do comparison operators always return?
   A) A number
   B) A string
   C) A boolean (`true` or `false`)
   D) `undefined`
   **Hint:** These operators are designed specifically to answer yes/no questions.
   **Answer:** C
   **Explanation:** Comparison operators always evaluate to a boolean, `true` or `false`.

8. What does `"5" == 5` evaluate to?
   A) `true`
   B) `false`
   C) `"5"`
   D) An error
   **Hint:** `==` performs type coercion before comparing, converting one side to match the other.
   **Answer:** A
   **Explanation:** `==` coerces the string `"5"` to the number `5` before comparing, so it's `true`.

9. What does `"5" === 5` evaluate to?
   A) `true`
   B) `false`
   C) `"5"`
   D) An error
   **Hint:** `===` checks both value AND type — does a string ever equal a number under this stricter rule?
   **Answer:** B
   **Explanation:** `===` requires matching types with no coercion, and a string never strictly equals a number.

10. What does `null == undefined` evaluate to?
    A) `true`
    B) `false`
    C) An error
    D) `null`
    **Hint:** `==` treats these two specific "empty" values as loosely equal to each other, unlike most other comparisons.
    **Answer:** A
    **Explanation:** `==` specifically treats `null` and `undefined` as loosely equal to each other.

### Medium

11. What does `null === undefined` evaluate to?
    A) `true`
    B) `false`
    C) An error
    D) `null`
    **Hint:** Unlike `==`, the strict version also checks type — and `null` and `undefined` are actually different types.
    **Answer:** B
    **Explanation:** `===` checks type as well as value, and `null` and `undefined` are distinct types, so this is `false`.

12. What does `0 == false` evaluate to?
    A) `true`
    B) `false`
    C) `0`
    D) An error
    **Hint:** `==` converts `false` to a number before comparing — what number does `false` become?
    **Answer:** A
    **Explanation:** `==` coerces `false` to the number `0` before comparing, so `0 == false` is `true`.

13. What does `0 === false` evaluate to?
    A) `true`
    B) `false`
    C) `0`
    D) An error
    **Hint:** `===` requires matching types — is a number ever the same type as a boolean?
    **Answer:** B
    **Explanation:** `===` requires matching types with no coercion, and a number is never the same type as a boolean.

14. What does `"" == 0` evaluate to?
    A) `true`
    B) `false`
    C) `""`
    D) An error
    **Hint:** An empty string converts to a specific number when compared with `==` against a number.
    **Answer:** A
    **Explanation:** `==` coerces the empty string to the number `0` before comparing, so this is `true`.

15. What does `NaN == NaN` evaluate to?
    A) `true`
    B) `false`
    C) `NaN`
    D) An error
    **Hint:** `NaN` is famously never considered equal to anything — including itself.
    **Answer:** B
    **Explanation:** By definition, `NaN` is never equal to anything, including another `NaN`.

16. What does `[1, 2] == [1, 2]` (two separately created arrays with identical values) evaluate to?
    A) `true`
    B) `false`
    C) `[1, 2]`
    D) An error
    **Hint:** Arrays are objects — comparing two different objects checks whether they're the exact same object in memory, not whether their contents match.
    **Answer:** B
    **Explanation:** Arrays are objects, and comparing two distinct object references checks identity, not content, so two separately created arrays are never equal this way.

17. What does `"abc" < "abd"` evaluate to?
    A) `true`
    B) `false`
    C) An error
    D) `undefined`
    **Hint:** Strings are compared character by character, similar to alphabetical/dictionary order.
    **Answer:** A
    **Explanation:** Comparing character by character, `"c"` comes before `"d"` at the differing position, so `"abc" < "abd"` is `true`.

18. What does `"10" < "9"` evaluate to, and why might this surprise someone expecting numeric comparison?
    A) `false`, since 10 is not less than 9 numerically
    B) `true`, because string comparison happens character by character, and `"1"` comes before `"9"` alphabetically/lexicographically
    C) It throws an error since strings can't be compared with `<`
    D) `true`, because JavaScript converts both to numbers first
    **Hint:** With `<` and two strings, JavaScript doesn't convert to numbers — it compares character codes, starting from the very first character.
    **Answer:** B
    **Explanation:** Two string operands are compared lexicographically by character code, and `"1"` sorts before `"9"`, so `"10" < "9"` is `true` despite the numeric values suggesting otherwise.

19. Why is `===` generally recommended over `==` in modern JavaScript code?
    A) `===` is deprecated, so `==` should be preferred instead
    B) `===` avoids unpredictable type coercion, making comparisons more predictable and reducing subtle bugs
    C) `==` doesn't actually work in modern browsers
    D) `===` is faster in every single case, which is the only reason
    **Hint:** Think back to how many surprising `true` results `==` can produce between different types, like `0 == false` or `"" == 0`.
    **Answer:** B
    **Explanation:** `===` skips type coercion entirely, avoiding the surprising cross-type `true` results `==` can produce.

20. What does `undefined == null` evaluate to, but `undefined === null` evaluate to?
    A) Both are `true`
    B) `==` gives `true` (loosely equal), while `===` gives `false` (different types)
    C) Both are `false`
    D) `==` gives `false`, while `===` gives `true`
    **Hint:** This pair is one of the few loosely-equal-but-strictly-different comparisons specifically built into JavaScript's coercion rules.
    **Answer:** B
    **Explanation:** `==` special-cases `undefined` and `null` as loosely equal, but `===` treats them as different types and returns `false`.

### Hard

21. Why does `[] == ![]` evaluate to `true`, despite looking like it compares an array to its own negation?
    A) It's a JavaScript bug with no real explanation
    B) `![]` first evaluates to `false` (since arrays are truthy, negating one gives `false`), then `[] == false` triggers coercion — the array converts to `""`, then to `0`, matching `false`'s `0`
    C) Arrays are always equal to their own negation
    D) This expression actually throws a TypeError
    **Hint:** Break this into two separate steps: first resolve `![]` completely on its own, then apply the `==` coercion rules to whatever that produced.
    **Answer:** B
    **Explanation:** `![]` resolves to `false` first (arrays are truthy), then `[] == false` coerces the array down to `0` via `""`, matching `false`'s numeric `0`.

22. Why does comparing two objects with identical structure and values using `===` always return `false`, unless they're literally the same reference?
    A) `===` is broken for objects and should not be used
    B) `===` for objects/arrays compares memory reference (identity), not structural content — two independently created objects are never `===` equal regardless of matching properties
    C) Objects require a special comparison operator that doesn't exist yet
    D) `===` converts objects to strings before comparing
    **Hint:** Consider two separate boxes containing identical items — are they the same box, even if their contents match exactly?
    **Answer:** B
    **Explanation:** For objects, `===` compares reference identity rather than structural content, so two separately created objects never compare equal even with identical properties.

23. Why might using `Object.is()` be preferred over `===` in rare cases involving `NaN` or signed zero (`+0`/`-0`)?
    A) `Object.is()` and `===` are always fully interchangeable with no differences
    B) `Object.is()` treats `NaN` as equal to itself (unlike `===`) and distinguishes `+0` from `-0` (unlike `===`, which treats them as equal) — edge cases that occasionally matter
    C) `Object.is()` performs type coercion, while `===` does not
    D) `Object.is()` only works with primitive strings
    **Hint:** These are two very specific IEEE 754 floating-point edge cases where `===`'s behavior technically diverges from a stricter "are these truly identical" check.
    **Answer:** B
    **Explanation:** `Object.is()` treats `NaN` as equal to itself and distinguishes `+0` from `-0`, two edge cases where `===` behaves differently.

24. Why does `"2" > "10"` evaluate to `true`, which could surprise someone expecting numeric comparison?
    A) It should be `false`, and this is a bug
    B) String comparison operates character by character using character codes — `"2"` has a higher character code than `"1"` (the first character of `"10"`), so the comparison resolves before ever reaching the second character
    C) JavaScript automatically converts both operands to numbers before this comparison
    D) This only happens with single-digit strings
    **Hint:** Comparison stops as soon as a difference is found in the very first differing character — it never needs to consider the string's full numeric "meaning."
    **Answer:** B
    **Explanation:** Comparing lexicographically, `"2"`'s character code exceeds `"1"` (the first character of `"10"`), so the comparison resolves as `true` without ever considering the full numeric value.

25. Why does the loose equality algorithm (`==`) specifically avoid converting `null` or `undefined` to numbers when compared against other primitive types, unlike its behavior with booleans or strings?
    A) There's no such special case — `null` and `undefined` follow identical coercion rules to everything else
    B) The specification deliberately carves out `null`/`undefined` as loosely equal only to each other (and nothing else, except via `==`), preventing surprising results like `null == 0` from being `true`
    C) `null` always converts to `0` for every comparison
    D) `undefined` cannot be compared with `==` at all
    **Hint:** If `null == 0` were `true`, that would create even more confusing coercion chains — the spec specifically prevents this by special-casing `null`/`undefined` comparisons.
    **Answer:** B
    **Explanation:** The spec deliberately special-cases `null`/`undefined` as loosely equal only to each other, specifically to prevent surprising results like `null == 0` being `true`.

26. Why can relying on `<`/`>` for comparing numeric strings (like sorting an array of numbers stored as strings) introduce subtle bugs?
    A) `<`/`>` cannot be used on strings at all
    B) String comparison is lexicographic (character-by-character), so `"9" < "10"` evaluates to `false` even though `9` is numerically less than `10` — a mismatch with intended numeric ordering
    C) This only happens with negative numbers
    D) JavaScript throws an error whenever this comparison is attempted
    **Hint:** Revisit the earlier "10" vs "9" comparison — now apply that same logic to a real-world scenario like sorting user-submitted form data.
    **Answer:** B
    **Explanation:** Because string comparison is lexicographic, `"9" < "10"` is `false` even though `9` is numerically smaller, which can silently break intended numeric sorting.

27. Why does `new Boolean(false) == false` return `true`, but `new Boolean(false)` alone is truthy when used directly in an `if` statement?
    A) This is a contradiction and one of the two behaviors must be wrong
    B) `new Boolean(false)` creates a Boolean *object* (not a primitive), which is always truthy on its own — but `==` unwraps the object to its primitive value (`false`) before comparing, producing `true` for the comparison specifically
    C) `new Boolean()` never actually creates a valid object
    D) `==` ignores object wrapping entirely and always returns `false` for wrapped values
    **Hint:** Separate these into two distinct questions: "is this object truthy on its own?" versus "what happens when `==` unwraps it during a comparison?" — they're governed by different rules.
    **Answer:** B
    **Explanation:** As an object, `new Boolean(false)` is truthy on its own, but `==` unwraps it to its primitive `false` value specifically for the comparison, making the comparison `true`.

28. Why is it considered a best practice to avoid comparing floating-point calculation results directly with `===`, even when using strict equality?
    A) `===` doesn't work with numbers at all
    B) Floating-point arithmetic can introduce tiny rounding errors (as with `0.1 + 0.2`), so even a "correct" calculation might not exactly equal the expected literal value under strict equality
    C) This concern only applies to `==`, never `===`
    D) `===` automatically rounds floating-point numbers before comparing
    **Hint:** Strictness (`===`) only guarantees matching type — it says nothing about whether tiny binary rounding errors from arithmetic will still produce an exact match.
    **Answer:** B
    **Explanation:** `===` only guarantees matching type and exact value, so tiny floating-point rounding errors can still make a mathematically "correct" result fail an exact comparison.

29. Why does the comparison algorithm for `<`/`>` between two objects (non-primitives) first attempt to convert both to primitives, and what determines the resulting comparison?
    A) Objects can never be compared with `<`/`>` under any circumstances
    B) JavaScript calls each object's internal conversion methods (like `valueOf()` or `toString()`) to obtain primitive values first, then compares those resulting primitives using the normal rules
    C) Object comparisons with `<`/`>` always throw a TypeError
    D) `<`/`>` between objects always returns `false` without any conversion attempt
    **Hint:** This is the same underlying mechanism that makes `[] + []` produce `""` — objects get converted to primitives before most operators can meaningfully act on them.
    **Answer:** B
    **Explanation:** `<`/`>` first convert each object to a primitive via `valueOf()`/`toString()`, then compare the resulting primitives using the normal comparison rules.

30. Why might a team's linting configuration specifically forbid `==` entirely (enforcing `===` everywhere), even in cases where a developer intends to rely on `null`/`undefined` loose equality?
    A) `==` is completely removed from modern JavaScript
    B) Forbidding `==` entirely removes any risk of accidental, unintended coercion bugs, trading a small amount of flexibility (the deliberate `null == undefined` shorthand) for overall codebase safety and consistency
    C) `===` and `==` have identical behavior, so the rule has no actual effect
    D) This rule only applies to comparisons involving numbers
    **Hint:** Consider the tradeoff: banning `==` entirely means occasionally writing `x === null || x === undefined` instead of the shorter `x == null` — is that tradeoff generally worth it for a whole team's codebase?
    **Answer:** B
    **Explanation:** Banning `==` trades away the convenient `null == undefined` shorthand in exchange for eliminating accidental coercion bugs across the whole codebase.

---

## Topic 4: Logical Operators

### Easy

1. What does `true && true` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** `&&` requires both sides to be true for the whole expression to be true.
   **Answer:** A
   **Explanation:** Both operands are `true`, so `&&` returns `true`.

2. What does `true && false` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** If even one side is false, `&&` can't return true.
   **Answer:** B
   **Explanation:** Since one operand is `false`, `&&` short-circuits to `false`.

3. What does `true || false` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** `||` only needs at least one side to be true.
   **Answer:** A
   **Explanation:** Since one operand is `true`, `||` returns `true`.

4. What does `false || false` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** With `||`, if neither side is true, the result can't be true either.
   **Answer:** B
   **Explanation:** Neither operand is truthy, so `||` returns `false`.

5. What does `!true` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** `!` flips a boolean to its opposite.
   **Answer:** B
   **Explanation:** `!` negates `true`, producing `false`.

6. What does `!false` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** Negating `false` produces the opposite boolean.
   **Answer:** A
   **Explanation:** `!` negates `false`, producing `true`.

7. Which operator represents logical "AND" in JavaScript?
   A) `||`
   B) `&&`
   C) `!`
   D) `==`
   **Hint:** This symbol is written twice in a row, matching how "AND" requires both conditions.
   **Answer:** B
   **Explanation:** `&&` is JavaScript's logical AND operator.

8. Which operator represents logical "OR" in JavaScript?
   A) `||`
   B) `&&`
   C) `!`
   D) `==`
   **Hint:** This symbol is written twice in a row, and is often found above the Enter/Return key on a keyboard.
   **Answer:** A
   **Explanation:** `||` is JavaScript's logical OR operator.

9. What does `!!true` evaluate to?
   A) `true`
   B) `false`
   C) `undefined`
   D) An error
   **Hint:** Two negations in a row cancel each other out.
   **Answer:** A
   **Explanation:** Negating `true` gives `false`, and negating that again gives back `true`.

10. What does the `?? ` (nullish coalescing) operator check for specifically?
    A) Whether a value is falsy in general
    B) Whether a value is `null` or `undefined`
    C) Whether two values are strictly equal
    D) Whether a number is negative
    **Hint:** "Nullish" specifically refers to just these two particular values, not all falsy values.
    **Answer:** B
    **Explanation:** `??` specifically checks whether its left operand is `null` or `undefined`, not general falsiness.

### Medium

11. What does `5 && 10` evaluate to?
    A) `true`
    B) `5`
    C) `10`
    D) `false`
    **Hint:** `&&` with two truthy values returns the *second* value, not just `true`.
    **Answer:** C
    **Explanation:** Since `5` is truthy, `&&` moves on and returns the second operand, `10`.

12. What does `0 && 10` evaluate to?
    A) `0`
    B) `10`
    C) `true`
    D) `false`
    **Hint:** `&&` short-circuits and returns the *first* value the moment it hits a falsy one.
    **Answer:** A
    **Explanation:** `0` is falsy, so `&&` short-circuits immediately and returns `0` without evaluating the second operand.

13. What does `0 || 10` evaluate to?
    A) `0`
    B) `10`
    C) `true`
    D) `false`
    **Hint:** `||` returns the first truthy value it finds — does `0` count as truthy?
    **Answer:** B
    **Explanation:** `0` is falsy, so `||` moves on and returns the next operand, `10`.

14. What does `null ?? "default"` evaluate to?
    A) `null`
    B) `"default"`
    C) `undefined`
    D) `false`
    **Hint:** `??` specifically treats `null` as "missing," falling through to the right-hand value.
    **Answer:** B
    **Explanation:** `null` is nullish, so `??` falls through and returns `"default"`.

15. What does `0 ?? "default"` evaluate to?
    A) `0`
    B) `"default"`
    C) `undefined`
    D) `false`
    **Hint:** `??` only checks for `null`/`undefined` — is `0` considered one of those?
    **Answer:** A
    **Explanation:** `0` is not `null` or `undefined`, so `??` leaves it as-is and returns `0`.

16. What is the key difference between `0 || "default"` and `0 ?? "default"`?
    A) They behave identically
    B) `||` treats `0` as falsy and returns `"default"`; `??` treats `0` as a valid value and returns `0`
    C) `??` doesn't exist in JavaScript
    D) `||` only works with strings
    **Hint:** Recall which values `||` considers "empty enough to skip" versus which narrower set `??` considers empty.
    **Answer:** B
    **Explanation:** `||` treats `0` as falsy and skips to the fallback, while `??` only checks for nullish values and preserves `0`.

17. What does `"" || "fallback"` evaluate to?
    A) `""`
    B) `"fallback"`
    C) `true`
    D) `false`
    **Hint:** An empty string is falsy, so `||` moves on to check the next value.
    **Answer:** B
    **Explanation:** An empty string is falsy, so `||` skips it and returns `"fallback"`.

18. What does `false && someFunction()` do, if `someFunction()` has side effects like logging?
    A) `someFunction()` still runs, then the result is `false`
    B) `someFunction()` never runs at all, due to short-circuiting — the result is simply `false`
    C) It throws an error
    D) `someFunction()` runs twice
    **Hint:** `&&` stops evaluating as soon as it hits a falsy value, since the overall result is already determined.
    **Answer:** B
    **Explanation:** `&&` short-circuits on the falsy left operand, so `someFunction()` is never called at all.

19. What does `true || someFunction()` do, if `someFunction()` has side effects?
    A) `someFunction()` still runs, then the result is `true`
    B) `someFunction()` never runs at all, due to short-circuiting — the result is simply `true`
    C) It throws an error
    D) `someFunction()` runs, but its result is ignored
    **Hint:** `||` stops evaluating as soon as it hits a truthy value, since the overall result is already determined.
    **Answer:** B
    **Explanation:** `||` short-circuits on the truthy left operand, so `someFunction()` is never called at all.

20. What does `!(5 > 3)` evaluate to?
    A) `true`
    B) `false`
    C) `5`
    D) `3`
    **Hint:** First resolve the comparison inside the parentheses, then apply the negation to that boolean result.
    **Answer:** B
    **Explanation:** `5 > 3` is `true`, and negating `true` gives `false`.

### Hard

21. Why is the pattern `isLoggedIn && renderDashboard()` a common shorthand in JavaScript UI code?
    A) It always runs `renderDashboard()` regardless of `isLoggedIn`
    B) `&&`'s short-circuit behavior means `renderDashboard()` only executes if `isLoggedIn` is truthy, acting as a compact conditional without a full `if` statement
    C) This pattern always throws an error if `isLoggedIn` is `false`
    D) `&&` cannot be used with function calls
    **Hint:** Think of `&&` here as saying "only proceed to the right side if the left side gives permission."
    **Answer:** B
    **Explanation:** `&&`'s short-circuiting means the right side only runs when the left side is truthy, giving a compact one-line conditional call.

22. Why might `value || defaultValue` fail to provide the intended fallback when `value` is legitimately `0`, `""`, or `false`?
    A) `||` never provides fallback behavior at all
    B) `||` treats any falsy value (not just `null`/`undefined`) as "missing," so a deliberately falsy `value` gets incorrectly replaced by `defaultValue`
    C) `||` only works with boolean operands
    D) This is not actually possible — `||` always preserves `value`
    **Hint:** This is the exact scenario the newer `??` operator was introduced specifically to solve.
    **Answer:** B
    **Explanation:** `||` can't distinguish "genuinely absent" from "deliberately falsy," so a meaningful `0`, `""`, or `false` gets incorrectly replaced.

23. Why does chaining multiple `??` operators, like `a ?? b ?? c`, require parentheses when mixed directly with `||` or `&&` in the same expression (e.g., `a ?? b || c` throws a SyntaxError)?
    A) There's no such restriction — they can always be freely mixed
    B) JavaScript's spec disallows mixing `??` directly with `||`/`&&` without explicit parentheses, since their intended precedence relationship is ambiguous and error-prone if implicit
    C) `??` can only be used once per expression, ever
    D) `||` and `&&` are deprecated in favor of `??`
    **Hint:** This was a deliberate spec decision — since `??` and `||`/`&&` serve different logical purposes, the language forces you to be explicit rather than guess at intended grouping.
    **Answer:** B
    **Explanation:** The spec deliberately forbids mixing `??` with `||`/`&&` without parentheses, since their intended grouping would otherwise be ambiguous.

24. Why does `!obj` (negating an object directly) always evaluate to `false`, regardless of the object's contents?
    A) Objects are always falsy, so `!obj` should be `true`
    B) All objects (including empty ones, empty arrays, etc.) are truthy in JavaScript, so negating a truthy value with `!` always produces `false`
    C) `!` cannot be applied to objects and throws an error
    D) `!obj` actually checks whether the object has any properties
    **Hint:** Recall JavaScript's short, specific list of falsy primitive values — does it include any kind of object, even an "empty-looking" one?
    **Answer:** B
    **Explanation:** Every object, even an empty one, is truthy in JavaScript, so negating it with `!` always yields `false`.

25. Why can relying on `&&` for a conditional render pattern (`count && <List items={count} />`) accidentally render the literal text `0` in a UI framework like React?
    A) This scenario is impossible — `&&` never returns a rendered value
    B) When `count` is `0` (falsy), `&&` short-circuits and returns `0` itself (not `false`), and some UI frameworks render primitive falsy-but-non-boolean values like `0` directly as text
    C) React specifically disallows the `&&` operator in JSX
    D) `0 && anything` always evaluates to `undefined`, not `0`
    **Hint:** Remember that `&&` returns the *actual falsy value* it encountered, not a generic `false` — and `0` is a value some frameworks will still try to render.
    **Answer:** B
    **Explanation:** `&&` short-circuits by returning the actual falsy value it hit, so `count` being `0` returns the number `0` itself, which some UI frameworks render as literal text.

26. Why does `a ?? b ?? c` evaluate left to right, stopping at the first non-nullish value, rather than requiring all three to be non-nullish?
    A) It requires all three values to be non-nullish, or it fails
    B) `??`, like `||` and `&&`, short-circuits — it returns the first operand that isn't `null`/`undefined`, moving to the next operand only if the current one is nullish
    C) This expression is invalid syntax without parentheses around each pair
    D) `??` always evaluates every operand regardless of nullish status
    **Hint:** Think of it as a chain of fallbacks — try `a` first, and only move on to `b`, then `c`, if the prior one turns out to be genuinely missing.
    **Answer:** B
    **Explanation:** `??` short-circuits just like `||`/`&&`, returning the first non-nullish operand and only advancing when the current one is nullish.

27. Why might double-negation (`!!value`) be a common idiom for explicitly converting any value to a strict boolean, and how does it differ from `Boolean(value)`?
    A) `!!value` and `Boolean(value)` are functionally different operations
    B) Both approaches produce an identical strict boolean result — `!!value` is simply a more compact, operator-based idiom achieving the same coercion that the `Boolean()` function performs explicitly
    C) `!!value` only works on numbers, not other types
    D) `Boolean(value)` always throws an error on falsy inputs
    **Hint:** The first `!` converts `value` to its negated boolean; the second `!` flips it back — the net result is the same as `Boolean(value)`, just written more tersely.
    **Answer:** B
    **Explanation:** Both produce the identical strict boolean coercion — `!!value` is just a terser operator-based idiom for what `Boolean(value)` does explicitly.

28. Why does `undefined && someFunction()` never call `someFunction()`, but the overall expression's returned value is `undefined`, not `false`?
    A) `&&` always converts its result to a strict boolean
    B) `&&` returns the actual falsy operand it stopped on (here, `undefined` itself), rather than the generic boolean `false` — short-circuiting preserves the original falsy value, not a coerced version of it
    C) This expression always throws a ReferenceError
    D) `someFunction()` still runs but its result is discarded
    **Hint:** `&&`/`||` don't convert their operands to `true`/`false` — they simply return whichever original operand determined the outcome.
    **Answer:** B
    **Explanation:** `&&` returns the original falsy operand it stopped on, `undefined` in this case, rather than coercing it to the boolean `false`.

29. Why is understanding operator precedence between `&&` and `||` important when writing `a || b && c` without parentheses?
    A) Precedence doesn't matter here — both operators are evaluated strictly left to right regardless of type
    B) `&&` has higher precedence than `||`, so this expression is actually evaluated as `a || (b && c)`, which can produce a different result than a naive left-to-right reading might suggest
    C) `||` always has higher precedence than `&&` in JavaScript
    D) This expression is a syntax error without explicit parentheses
    **Hint:** This mirrors how multiplication binds tighter than addition in arithmetic — one logical operator here binds tighter than the other, regardless of their left-to-right position in the line.
    **Answer:** B
    **Explanation:** `&&` binds tighter than `||`, so the expression groups as `a || (b && c)`, not a naive strict left-to-right reading.

30. Why might a code reviewer flag `value !== null && value !== undefined && value.property` as a candidate for simplification using optional chaining (`value?.property`)?
    A) They behave completely differently and shouldn't be compared
    B) Optional chaining (`?.`) achieves the same null/undefined-safe property access far more concisely, reducing repetitive boilerplate while producing an equivalent result (`undefined` if `value` is nullish)
    C) The long form is actually required for correctness in strict mode
    D) `?.` only works with arrays, not objects
    **Hint:** Both approaches are guarding against the same risk — trying to access a property on something that might not exist — but one requires far less repetition to express that guard.
    **Answer:** B
    **Explanation:** `?.` achieves the same nullish-safe property access far more concisely than manually checking for `null` and `undefined` first.

---

## Topic 5: The Ternary Operator

### Easy

1. What is the basic syntax structure of the ternary operator?
   A) `condition ? ifTrue : ifFalse`
   B) `condition : ifTrue ? ifFalse`
   C) `if condition then ifTrue else ifFalse`
   D) `condition => ifTrue, ifFalse`
   **Hint:** It uses a question mark and a colon to separate its three parts.
   **Answer:** A
   **Explanation:** The ternary operator's syntax is `condition ? ifTrue : ifFalse`.

2. What does `5 > 3 ? "yes" : "no"` evaluate to?
   A) `"yes"`
   B) `"no"`
   C) `true`
   D) `5`
   **Hint:** Since `5 > 3` is true, which branch of the ternary gets chosen?
   **Answer:** A
   **Explanation:** Since `5 > 3` is `true`, the ternary evaluates to its first branch, `"yes"`.

3. How many total operands does the ternary operator use?
   A) 1
   B) 2
   C) 3
   D) 4
   **Hint:** It's called "ternary" specifically because of this exact count.
   **Answer:** C
   **Explanation:** "Ternary" means three, matching its condition, true-branch, and false-branch operands.

4. What does `false ? "yes" : "no"` evaluate to?
   A) `"yes"`
   B) `"no"`
   C) `false`
   D) `undefined`
   **Hint:** The condition here is already the literal boolean value itself.
   **Answer:** B
   **Explanation:** The condition is `false`, so the ternary evaluates to its second branch, `"no"`.

5. Can the ternary operator be assigned directly to a variable?
   A) No, it must be used inside an `if` statement
   B) Yes, e.g. `let result = condition ? "a" : "b";`
   C) Only inside functions
   D) Only with `const`
   **Hint:** The ternary operator, unlike `if`/`else`, is itself an expression that produces a value.
   **Answer:** B
   **Explanation:** The ternary is an expression that produces a value, so it can be assigned directly to a variable.

6. What is another common name for the ternary operator?
   A) The binary operator
   B) The conditional operator
   C) The logical operator
   D) The spread operator
   **Hint:** This name reflects that it's essentially a compact if/else condition.
   **Answer:** B
   **Explanation:** It's also called the "conditional operator" since it evaluates a condition to choose between two values.

7. In `age >= 18 ? "adult" : "minor"`, what determines which string is chosen?
   A) The value of `age`
   B) A random selection
   C) Alphabetical order
   D) The length of each string
   **Hint:** The comparison before the `?` decides everything.
   **Answer:** A
   **Explanation:** The condition `age >= 18` (which depends on `age`'s value) determines which branch is chosen.

8. Can you nest one ternary operator inside another?
   A) No, this is invalid syntax
   B) Yes, though it can quickly reduce readability
   C) Only up to two levels
   D) Only inside loops
   **Hint:** Since a ternary produces a value, that value can itself be another ternary expression.
   **Answer:** B
   **Explanation:** Since a ternary is just an expression, one can be nested inside another branch, though it can hurt readability.

9. What is `true ? 1 : 2` equivalent to, in `if`/`else` form?
   A) `if (true) { return 2; } else { return 1; }`
   B) `if (true) { return 1; } else { return 2; }`
   C) `if (false) { return 1; }`
   D) `if (1) { return true; }`
   **Hint:** The condition comes first, then the "true" branch, then the "false" branch, matching an `if`/`else`'s structure.
   **Answer:** B
   **Explanation:** The ternary's condition, true-branch, and false-branch map directly onto `if (true) { return 1; } else { return 2; }`.

10. What does `10 === 10 ? "equal" : "not equal"` evaluate to?
    A) `"equal"`
    B) `"not equal"`
    C) `true`
    D) `10`
    **Hint:** Are these two numbers strictly identical?
    **Answer:** A
    **Explanation:** `10 === 10` is `true`, so the ternary evaluates to `"equal"`.

### Medium

11. Why might `age >= 18 ? "adult" : "minor"` be preferred over a full `if`/`else` block in some cases?
    A) It's always faster to execute
    B) It's more concise for simple conditional value assignment, especially when used directly in an expression like a variable assignment
    C) `if`/`else` cannot return values at all
    D) The ternary operator supports more than two outcomes
    **Hint:** Consider how many lines a full `if`/`else` block would take just to assign one of two values to a variable.
    **Answer:** B
    **Explanation:** For simple two-outcome value assignment, the ternary is far more concise than a multi-line `if`/`else` block.

12. What does `let message = score > 90 ? "A" : score > 80 ? "B" : "C";` demonstrate?
    A) A syntax error — ternaries cannot be chained
    B) A nested (chained) ternary, evaluating multiple conditions in sequence, similar to an `if`/`else if`/`else` chain
    C) Three completely independent expressions
    D) An infinite loop
    **Hint:** Notice the second `?`/`:` pair nested inside what would otherwise be the "false" branch of the first ternary.
    **Answer:** B
    **Explanation:** Nesting a ternary inside the false branch of another creates a chain that behaves like `if`/`else if`/`else`.

13. In `let message = score > 90 ? "A" : score > 80 ? "B" : "C";`, what does `message` become if `score` is `85`?
    A) `"A"`
    B) `"B"`
    C) `"C"`
    D) `undefined`
    **Hint:** `85` fails the first check (`> 90`) but passes the second (`> 80`).
    **Answer:** B
    **Explanation:** `85` fails `score > 90` but passes `score > 80`, so the nested ternary resolves to `"B"`.

14. Can side-effect-producing expressions (like function calls) be used within a ternary's branches?
    A) No, only literal values are allowed
    B) Yes, e.g. `condition ? doThis() : doThat();`
    C) Only inside `if` statements
    D) Only with arrow functions
    **Hint:** Since each branch is just an expression, anything that evaluates to a value (including a function call) is valid there.
    **Answer:** B
    **Explanation:** Each ternary branch is just an expression, and a function call is a valid expression, so it's allowed there.

15. What does `null ?? "default"` compare to, conceptually, when contrasted with a ternary like `value !== null && value !== undefined ? value : "default"`?
    A) They are unrelated concepts
    B) They achieve a similar fallback result, but `??` is a much more concise way to express that same specific "if nullish, use default" logic
    C) The ternary version is always more efficient
    D) `??` cannot be used with strings
    **Hint:** Both approaches ultimately produce the same "use this value, or fall back if it's missing" outcome — just with very different amounts of code.
    **Answer:** B
    **Explanation:** Both express the same "use this unless it's nullish" fallback logic, but `??` does it far more concisely than the equivalent ternary.

16. Why does `let x = condition ? a : b;` avoid the need for a `let x;` declared separately beforehand, unlike a typical `if`/`else` assignment pattern?
    A) It doesn't — you still need to declare `x` separately first
    B) Since the ternary is itself a single expression producing one value, it can be directly assigned during declaration, unlike `if`/`else` which requires the variable to already exist before being conditionally reassigned inside each branch
    C) `if`/`else` can also be assigned directly during declaration
    D) Ternary expressions cannot be assigned to variables at all
    **Hint:** Compare `let x = condition ? a : b;` against the equivalent `let x; if (condition) { x = a; } else { x = b; }` — which one needs an extra declaration step?
    **Answer:** B
    **Explanation:** The ternary is a single expression yielding one value, so it can be assigned right in the declaration, unlike `if`/`else`, which needs the variable declared first.

17. What would `5 > 3 ? console.log("yes") : console.log("no")` print?
    A) `"yes"`
    B) `"no"`
    C) Both `"yes"` and `"no"`
    D) Nothing
    **Hint:** Only one branch of the ternary actually executes, based on the condition's result.
    **Answer:** A
    **Explanation:** Only one branch executes based on the condition, and since `5 > 3` is `true`, only `"yes"` gets logged.

18. Is it valid to use a ternary operator without ever storing or using its resulting value (just for its side effects), like `isReady ? start() : stop();`?
    A) No, this always causes a syntax error
    B) Yes, though many linters discourage this style in favor of a regular `if`/`else` when the value itself isn't actually needed
    C) Only inside loops
    D) Only if both branches return the same type
    **Hint:** The ternary is technically valid as a standalone statement, but its whole purpose is normally to produce a value — using it purely for side effects can be considered a style mismatch.
    **Answer:** B
    **Explanation:** It's syntactically valid, but since the ternary's value goes unused, many linters recommend a regular `if`/`else` instead.

19. What does `let label = isPremium ? "Premium User" : isActive ? "Active User" : "Inactive User";` evaluate to if `isPremium` is `false` and `isActive` is `true`?
    A) `"Premium User"`
    B) `"Active User"`
    C) `"Inactive User"`
    D) `undefined`
    **Hint:** Since the first condition fails, control moves to the nested ternary — check its condition next.
    **Answer:** B
    **Explanation:** `isPremium` is `false`, so control moves to the nested ternary, and since `isActive` is `true`, it resolves to `"Active User"`.

20. Why might overusing deeply nested ternaries (three or more levels) be discouraged, even though they're syntactically valid?
    A) JavaScript enforces a hard limit of two nested ternaries
    B) Deeply nested ternaries can become significantly harder to read and mentally trace compared to an equivalent `if`/`else if`/`else` chain or `switch` statement
    C) Nested ternaries always run slower than `if`/`else`
    D) They cannot be used with string values
    **Hint:** Think about how quickly a long chain of `?`/`:` pairs becomes visually dense compared to clearly labeled `if`/`else if` blocks.
    **Answer:** B
    **Explanation:** Though valid, deep ternary nesting is much harder to visually trace than an equivalent, clearly labeled `if`/`else if`/`else` chain.

### Hard

21. Why does `condition ? a : b = c` behave differently than a developer might expect, compared to `condition ? (a = c) : (b = c)`?
    A) They are always identical
    B) Due to operator precedence, `=` binds more loosely than the ternary, so `condition ? a : b = c` actually parses as `condition ? a : (b = c)` — only the false branch gets an assignment, not both
    C) This expression is invalid syntax
    D) `=` always applies to the entire ternary result regardless of grouping
    **Hint:** Work out exactly which parts of the expression the `=` operator "sees" as its left-hand side, given how the ternary itself groups.
    **Answer:** B
    **Explanation:** Because `=` binds more loosely than the ternary, the expression actually parses as `condition ? a : (b = c)`, applying the assignment only in the false branch.

22. Why can deeply nested ternaries used for multi-branch logic (like a grading system) become a genuine source of production bugs, beyond just readability concerns?
    A) There's no real correctness risk, only a stylistic one
    B) Misplaced or miscounted `?`/`:` pairs in deep nesting can silently associate branches with the wrong condition, producing logically incorrect results that are hard to spot through casual code review
    C) JavaScript automatically limits nesting depth, preventing this issue entirely
    D) Nested ternaries always throw a runtime error after three levels
    **Hint:** Unlike an `if`/`else if` chain with clear indentation per condition, a long nested ternary can visually blur exactly which `:` pairs with which `?`.
    **Answer:** B
    **Explanation:** A miscounted `?`/`:` pair in deep nesting can silently attach a branch to the wrong condition, producing an incorrect result that's easy to miss in review.

23. Why does using a ternary purely for its side effects (e.g., `condition ? doA() : doB();`) provide no meaningful advantage over a standard `if`/`else`, and why might it actually be considered worse style?
    A) It provides significant performance benefits over `if`/`else`
    B) Since no value is captured or used, the ternary's key advantage (being an expression that yields a value) is entirely wasted — an `if`/`else` block communicates "this is for side effects" more clearly to a reader
    C) This usage pattern is actually forbidden by the JavaScript specification
    D) `if`/`else` cannot call functions inside its branches
    **Hint:** The ternary's whole reason for existing is to produce a usable value — if you're not using that value at all, what's actually being gained over `if`/`else`?
    **Answer:** B
    **Explanation:** With no resulting value being used, the ternary's main advantage is wasted, and an `if`/`else` communicates "this is for side effects" more clearly.

24. Why might chaining `??` and the ternary operator together (e.g., `(value ?? defaultValue) > 10 ? "big" : "small"`) sometimes require careful parenthesization to avoid ambiguity?
    A) `??` and the ternary can never be combined under any circumstances
    B) Since `??` has lower precedence than comparison operators like `>`, explicit parentheses ensure the nullish coalescing resolves fully before the comparison and ternary evaluate, avoiding unintended grouping
    C) The ternary operator automatically wraps every sub-expression in implicit parentheses
    D) `>` always binds more loosely than `??`
    **Hint:** Precedence rules determine which operator "grabs" its operands first — without explicit parentheses here, would `>` or `??` actually resolve first?
    **Answer:** B
    **Explanation:** Since `??` has lower precedence than `>`, explicit parentheses ensure the nullish coalescing resolves fully before the comparison is made.

25. Why does returning different types from each branch of a ternary (e.g., `condition ? "text" : 42`) sometimes indicate a deeper design smell, even though it's syntactically legal?
    A) JavaScript disallows this outright as a syntax error
    B) While legal, inconsistent return types from a conditional expression can make downstream code harder to reason about and type-check, since the calling code must handle multiple possible types from what looks like a single value
    C) Both branches are always silently coerced to the same type automatically
    D) This pattern always throws a runtime TypeError
    **Hint:** Think about what a function calling this ternary would now need to account for — does it need to handle both a string and a number as possible results?
    **Answer:** B
    **Explanation:** Although legal, mismatched branch types force downstream code to handle multiple possible result types, making the code harder to reason about and type-check.

26. Why is it sometimes argued that a `switch` statement is a better fit than a long chain of ternaries when checking one variable against several discrete, known values?
    A) `switch` statements are always shorter than ternary chains
    B) A `switch` explicitly lists each discrete case being checked, generally making multi-branch logic against a single variable easier to scan and maintain than a visually dense chain of `?`/`:` pairs
    C) Ternaries cannot check more than two possible outcomes total
    D) `switch` is required whenever more than one condition is being tested
    **Hint:** Compare the visual structure of several `case` blocks, each clearly labeled, against a long single-line (or deeply nested) ternary expression checking the same values.
    **Answer:** B
    **Explanation:** A `switch`'s explicitly labeled `case` blocks are generally easier to scan and maintain than a dense chain of nested ternaries checking the same variable.

27. Why does a ternary expression like `isValid ? processData() : null` sometimes get refactored to use `isValid && processData()` instead, and what subtle difference exists between them?
    A) They are functionally and semantically identical in every case
    B) Both produce equivalent behavior when the "false" branch's value is genuinely irrelevant, but `&&` more directly communicates "only run this if valid" without an unused `null` fallback branch cluttering the expression
    C) `&&` cannot be used to conditionally call a function
    D) The ternary version always executes faster
    **Hint:** Ask whether that explicit `: null` branch is actually doing anything meaningful here, or if it's just filling a syntactically required slot.
    **Answer:** B
    **Explanation:** When the false-branch value is irrelevant, `&&` communicates "only run this if valid" more directly, without a throwaway `: null` branch just filling a required slot.

28. Why might TypeScript (or JSDoc type annotations) surface a type error on `condition ? getUser() : getError()` that plain JavaScript would never catch on its own?
    A) TypeScript and JavaScript always handle ternaries identically
    B) TypeScript performs static type-checking and can flag that the ternary's two branches return incompatible types (e.g., a `User` object vs. an `Error` object), a mismatch plain JavaScript's dynamic typing would silently allow through
    C) TypeScript disallows ternary operators entirely
    D) This error only occurs with the loose equality operator, not ternaries
    **Hint:** Recall that JavaScript's dynamic typing lets each ternary branch independently return whatever type it wants — a type-checking tool built on top can add a stricter layer of oversight that catches inconsistencies.
    **Answer:** B
    **Explanation:** TypeScript's static type-checking can flag the branches' incompatible return types, a mismatch that plain JavaScript's dynamic typing silently allows.

29. Why does the associativity of the ternary operator (right-associative) matter specifically for how `a ? b : c ? d : e` gets grouped?
    A) Associativity doesn't affect ternary expressions
    B) Right-associativity means this parses as `a ? b : (c ? d : e)`, not `(a ? b : c) ? d : e` — a distinction that changes which condition ultimately controls the final result
    C) The ternary operator is actually left-associative, not right
    D) This expression is a syntax error regardless of associativity
    **Hint:** "Right-associative" means that when multiple ternaries chain together without parentheses, grouping starts from the rightmost operator outward, not the leftmost.
    **Answer:** B
    **Explanation:** Because the ternary is right-associative, `a ? b : c ? d : e` groups as `a ? b : (c ? d : e)`, not from the leftmost operator.

30. Why do some style guides recommend limiting ternary usage strictly to simple, single-condition cases, and delegating anything more complex to a named helper function instead?
    A) Complex conditions are impossible to express with a ternary
    B) A named function (e.g., `getGradeLabel(score)`) can encapsulate multi-branch logic with clear, readable structure (like `if`/`else if` or `switch`), improving testability and readability compared to cramming that same logic into a dense nested ternary expression
    C) Functions always execute faster than ternary expressions
    D) Ternaries are deprecated in favor of functions in modern JavaScript
    **Hint:** Consider the benefits of giving multi-branch logic an actual name and a testable, isolated unit — versus embedding that same logic inline as an increasingly dense expression.
    **Answer:** B
    **Explanation:** A named helper function can encapsulate complex multi-branch logic in clear, testable structure, rather than cramming it into a dense nested ternary.

---

*End of Quiz: JavaScript Operators — all 5 topics complete, 150 questions total.*
</content>
