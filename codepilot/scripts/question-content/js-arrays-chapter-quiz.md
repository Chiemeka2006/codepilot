# Quiz: JavaScript Arrays

---

## Topic 1: Creating Arrays

### Easy

1. Which symbols are used to create an array literal?
   A) `{ }`
   B) `[ ]`
   C) `( )`
   D) `< >`
   **Hint:** These are the same symbols used for indexing into an array.
   **Answer:** B
   **Explanation:** Square brackets `[ ]` are used to create an array literal in JavaScript.

2. Which of these correctly creates an array of three numbers?
   A) `let nums = (1, 2, 3);`
   B) `let nums = [1, 2, 3];`
   C) `let nums = {1, 2, 3};`
   D) `let nums = 1, 2, 3;`
   **Hint:** Square brackets with comma-separated values define an array literal.
   **Answer:** B
   **Explanation:** Array literals use square brackets containing comma-separated values, exactly as shown in option B.

3. Can an array hold different types of values at once, like a number and a string together?
   A) No, all elements must share the same type
   B) Yes, JavaScript arrays can hold mixed types
   C) Only with special syntax
   D) Only in Node.js
   **Hint:** Recall JavaScript's dynamic typing — does that restriction apply within arrays too?
   **Answer:** B
   **Explanation:** JavaScript's dynamic typing extends to arrays, so a single array can freely mix numbers, strings, and other types.

4. What does `let empty = [];` create?
   A) An error
   B) An empty array
   C) `undefined`
   D) An array with one `null` element
   **Hint:** Empty square brackets represent a valid array with zero elements.
   **Answer:** B
   **Explanation:** Empty square brackets are perfectly valid syntax for an array containing zero elements.

5. What does `new Array(3)` create?
   A) An array containing the number `3`
   B) An array with a length of 3 empty slots
   C) An error
   D) A string `"3"`
   **Hint:** When called with a single number, `Array()` interprets it as the desired length, not as content.
   **Answer:** B
   **Explanation:** A single numeric argument to `Array()` is treated as the desired length, producing empty slots rather than an element holding that number.

6. Is `let arr = [1, 2, 3];` the same as `let arr = new Array(1, 2, 3);`?
   A) No, they behave completely differently
   B) Yes, both produce an array containing `1`, `2`, `3`
   C) Only the literal syntax is valid JavaScript
   D) The `Array()` version throws an error
   **Hint:** When `Array()` is called with more than one argument, it treats each as an individual element.
   **Answer:** B
   **Explanation:** With more than one argument, `Array()` treats each as an element, making it equivalent to the array literal here.

7. What is the array literal syntax generally preferred for, compared to `new Array()`?
   A) It's always slower
   B) It's more concise and avoids ambiguity around the single-number-argument case
   C) `new Array()` doesn't actually exist in JavaScript
   D) Array literals cannot hold more than 3 elements
   **Hint:** Recall the confusing behavior difference between `Array(3)` and `Array(1, 2, 3)` — literal syntax sidesteps that ambiguity entirely.
   **Answer:** B
   **Explanation:** Array literals avoid the confusing single-numeric-argument-means-length behavior of `new Array()` while being shorter to write.

8. Can you create an array with elements of different lengths, like some strings and some numbers, in a single literal?
   A) No
   B) Yes, e.g. `["hello", 42, true]`
   C) Only with `new Array()`
   D) Only if converted to strings first
   **Hint:** Arrays don't enforce that all elements share the same length or even the same type.
   **Answer:** B
   **Explanation:** Arrays place no restriction on element type or size, so strings, numbers, and booleans can freely coexist in one literal.

9. What does `Array.isArray([1, 2, 3])` return?
   A) `"array"`
   B) `true`
   C) `false`
   D) `3`
   **Hint:** This method specifically checks whether a given value is an array.
   **Answer:** B
   **Explanation:** `Array.isArray()` returns `true` because `[1, 2, 3]` genuinely is an array.

10. What does `Array.isArray({})` (a plain object) return?
    A) `true`
    B) `false`
    C) `"object"`
    D) An error
    **Hint:** A plain object is not the same thing as an array, even though `typeof` can't tell them apart.
    **Answer:** B
    **Explanation:** A plain object is not an array, so `Array.isArray()` correctly returns `false` even though `typeof {}` and `typeof []` both report `"object"`.

### Medium

11. What does `Array(5).fill(0)` produce?
    A) `[5]`
    B) `[0, 0, 0, 0, 0]`
    C) `[5, 0]`
    D) An error
    **Hint:** `Array(5)` creates 5 empty slots, and `.fill(0)` populates every one of them with `0`.
    **Answer:** B
    **Explanation:** `Array(5)` produces 5 empty slots, and `.fill(0)` sets each one to `0`, yielding `[0, 0, 0, 0, 0]`.

12. What does `Array.from("abc")` produce?
    A) `"abc"`
    B) `["a", "b", "c"]`
    C) `{0: "a", 1: "b", 2: "c"}`
    D) An error
    **Hint:** `Array.from()` converts iterable values (like strings) into a true array.
    **Answer:** B
    **Explanation:** `Array.from()` converts an iterable, such as a string, into an actual array of its individual characters.

13. What does `Array.from({ length: 3 }, (_, i) => i * 2)` produce?
    A) `[0, 2, 4]`
    B) `[1, 2, 3]`
    C) `{ length: 3 }`
    D) An error
    **Hint:** The second argument acts as a mapping function applied to each generated index.
    **Answer:** A
    **Explanation:** The mapping function runs once per index (0, 1, 2), doubling each to produce `[0, 2, 4]`.

14. What is a key difference between `new Array(3)` and `[undefined, undefined, undefined]`?
    A) They are functionally and structurally identical in every way
    B) `new Array(3)` creates "empty slots" (sparse array) which some array methods treat differently than actual `undefined` values explicitly present at each index
    C) `new Array(3)` throws an error
    D) `[undefined, undefined, undefined]` has a length of `0`
    **Hint:** This is a subtle but real distinction — "empty" and "explicitly holding `undefined`" aren't always treated identically by every array method.
    **Answer:** B
    **Explanation:** `new Array(3)` creates genuinely empty sparse slots, which methods like `.map()` skip, unlike an array with real `undefined` values at each index.

15. What does the spread operator do when used to copy an array, like `let copy = [...original];`?
    A) It creates a reference to the same array
    B) It creates a new, shallow copy of the array's top-level elements
    C) It deletes the original array
    D) It converts the array into an object
    **Hint:** This is a common, modern technique for duplicating an array without mutating the original.
    **Answer:** B
    **Explanation:** Spreading into a new array literal produces a new array with the same top-level elements, without mutating the original.

16. Can you combine two arrays into one using the spread operator, like `[...arr1, ...arr2]`?
    A) No, spread only works on a single array at a time
    B) Yes, this concatenates both arrays' elements into a single new array
    C) Only if both arrays are the same length
    D) Only using `new Array()`
    **Hint:** Spread "unpacks" each array's elements — placing two spreads side by side effectively merges them.
    **Answer:** B
    **Explanation:** Spreading both arrays' elements into a single literal effectively concatenates them into one new array.

17. What does `Array.of(7)` produce, in contrast to `Array(7)`?
    A) They behave identically
    B) `Array.of(7)` creates `[7]` (an array containing the number 7), while `Array(7)` creates an array with a length of 7 empty slots
    C) `Array.of(7)` throws an error
    D) `Array.of(7)` creates 7 elements, each holding the value `7`
    **Hint:** `Array.of()` was specifically introduced to avoid the single-number ambiguity that `Array()` has.
    **Answer:** B
    **Explanation:** `Array.of()` always treats its arguments as elements, so `Array.of(7)` makes `[7]`, unlike `Array(7)`'s length-based behavior.

18. What does `let arr = Array(3).fill().map((_, i) => i);` produce?
    A) `[undefined, undefined, undefined]`
    B) `[0, 1, 2]`
    C) `[3]`
    D) An error, since `.map()` can't be chained after `.fill()`
    **Hint:** `.fill()` with no argument fills with `undefined`, making the array "dense" so `.map()` can properly iterate and assign each index.
    **Answer:** B
    **Explanation:** `.fill()` turns the sparse slots into real `undefined`-holding elements, letting `.map()` visit each index and produce `[0, 1, 2]`.

19. Why might `new Array(-1)` throw a RangeError?
    A) Negative array lengths are impossible, and JavaScript enforces this restriction
    B) `Array()` never throws errors under any input
    C) `-1` is automatically converted to `1`
    D) This is only a problem when using array literals
    **Hint:** An array's length represents a count of elements — does a negative count make logical sense?
    **Answer:** A
    **Explanation:** Array lengths must be non-negative, so passing `-1` as the requested length triggers a RangeError.

20. What does `Array.from({ length: 5 })` produce, without a mapping function?
    A) `[5]`
    B) An array of 5 `undefined` elements
    C) An error
    D) `{ length: 5 }` unchanged
    **Hint:** `Array.from()` can accept any "array-like" object with a `length` property, even without real indexed content.
    **Answer:** B
    **Explanation:** `Array.from()` treats any object with a `length` property as array-like, producing that many `undefined` elements when no indexed values are present.

### Hard

21. Why does `new Array(3)` create "empty" (sparse) slots rather than slots explicitly containing `undefined`, and what practical difference does this cause with `.map()`?
    A) There's no actual difference — `.map()` treats both identically
    B) `.map()` specifically skips genuinely empty slots in a sparse array, so `new Array(3).map(x => 0)` still results in an array with 3 empty slots (not `[0, 0, 0]`), unlike explicitly `undefined`-filled elements which `.map()` would process normally
    C) `.map()` throws an error whenever it encounters a sparse array
    D) Sparse arrays cannot be created using `new Array()`
    **Hint:** This exact gotcha is why the earlier "fill-then-map" pattern (`Array(3).fill().map(...)`) is necessary — try to reason through why plain `Array(3).map(...)` alone doesn't achieve the intended result.
    **Answer:** B
    **Explanation:** `.map()` skips genuinely empty slots entirely, so it leaves a sparse array's holes untouched rather than filling them with the callback's result.

22. Why is the spread operator's array-copying behavior described as a "shallow" copy, and what implication does this have for arrays containing nested objects?
    A) Spread performs a full, deep copy of every nested structure automatically
    B) Spread only copies the top-level array structure and its direct element references — if an element is itself an object or nested array, both the original and the copy share a reference to that same inner object, so mutating it affects both
    C) Spread cannot be used on arrays containing objects at all
    D) "Shallow" refers to the array's length being limited to a small number of elements
    **Hint:** Picture an array like `[{ id: 1 }]` — after spreading it into a "copy," are the two arrays' inner objects actually separate, independent objects, or the exact same shared object?
    **Answer:** B
    **Explanation:** Spread only duplicates the array's own slots; any nested objects or arrays inside remain shared by reference between the original and the copy.

23. Why might `Array.from()` be preferred over the spread operator specifically when converting an array-like object (such as `arguments` or a DOM `NodeList`) into a true array?
    A) There's no meaningful difference — both approaches are always interchangeable
    B) `Array.from()` explicitly supports any array-like object (anything with a `length` property and indexed elements), while the spread operator specifically requires the source to be *iterable* — some array-like objects (in specific edge cases) may not implement the iterable protocol, making `Array.from()` the more universally compatible choice
    C) The spread operator can only be used on strings, never on array-like objects
    D) `Array.from()` is deprecated in favor of the spread operator
    **Hint:** Consider the distinction between "has numbered indices and a length" (array-like) versus "implements the iterator protocol" (iterable) — these are related but technically distinct concepts in JavaScript.
    **Answer:** B
    **Explanation:** `Array.from()` works on anything with a `length` property, while spread strictly requires the source to implement the iterable protocol, which not every array-like object does.

24. Why does `Array.isArray()` provide a more reliable type check for arrays than `instanceof Array`, particularly in contexts involving multiple execution environments (like iframes)?
    A) There's no meaningful difference between the two approaches
    B) `instanceof Array` checks against a specific `Array` constructor tied to one particular JavaScript realm (e.g., one iframe's global context) — an array created in a different realm/iframe would fail this check despite genuinely being an array, whereas `Array.isArray()` correctly identifies arrays regardless of which realm created them
    C) `Array.isArray()` only works on empty arrays
    D) `instanceof Array` was removed from modern JavaScript entirely
    **Hint:** This is a genuinely advanced edge case involving how each iframe/window in a browser has its own separate set of built-in constructors — `Array.isArray()` was specifically designed to sidestep this issue.
    **Answer:** B
    **Explanation:** `instanceof Array` is tied to one realm's specific `Array` constructor, while `Array.isArray()` reliably recognizes arrays created in any realm, including a different iframe.

25. Why does `Array.from(arrayLike, mapFn)`'s combined "convert and map in one step" design offer a meaningful advantage over separately calling `Array.from(arrayLike).map(mapFn)`?
    A) There's no meaningful advantage — both produce identical final results with identical performance
    B) While both produce the same final array, the combined approach avoids creating an unnecessary intermediate array before mapping, which can matter for memory efficiency with very large array-like sources, and is also more concise
    C) The separate two-step approach is actually invalid syntax
    D) `Array.from()` cannot accept a mapping function under any circumstances
    **Hint:** Think about how many separate array allocations happen in each approach — one combined operation, versus one conversion followed by a second, separate transformation.
    **Answer:** B
    **Explanation:** Passing the mapping function directly avoids materializing an intermediate array before transforming it, saving an allocation for large sources.

26. Why can relying on `new Array(n)` to quickly generate a fixed-size placeholder array become a source of confusing bugs for developers unfamiliar with sparse arrays, especially when combined with array destructuring or `for...of`?
    A) Sparse arrays behave completely identically to dense arrays in every context
    B) Certain iteration methods and syntaxes (like `for...of` or spread) DO visit sparse "empty" slots as `undefined`, while others (like `.map()`, `.forEach()`) skip them entirely — this inconsistency across different array operations can produce confusing, seemingly contradictory results depending on which method or syntax is used
    C) `for...of` always throws an error on sparse arrays
    D) Destructuring cannot be used with sparse arrays under any circumstances
    **Hint:** The core confusion here is that JavaScript's various array-processing tools don't all treat "empty slots" identically — some skip them, others don't, and knowing which is which matters.
    **Answer:** B
    **Explanation:** Some tools like `for...of` and spread visit empty slots as `undefined` while others like `.map()`/`.forEach()` skip them, so the same sparse array behaves inconsistently depending on which is used.

27. Why might explicitly preferring `[]` (array literal) over `new Array()` be considered not just a stylistic preference, but a defensive coding practice against a specific class of bugs?
    A) `new Array()` is always slower to execute than the literal form
    B) `new Array()`'s single-argument-as-length behavior means a seemingly innocuous refactor (e.g., changing `new Array(a, b)` to `new Array(singleVariable)` when a variable happens to hold a number) can silently and unexpectedly change from creating a small array of values to creating a large sparse array of empty slots
    C) Array literals support more elements than `new Array()` can hold
    D) `new Array()` cannot be assigned to a `let` or `const` variable
    **Hint:** Imagine a function parameter that's sometimes called with two numbers and sometimes with just one — if that parameter list were passed directly into `new Array(...)`, how would the single-argument case behave differently from the two-argument case?
    **Answer:** B
    **Explanation:** A refactor that collapses `new Array()`'s arguments down to a single number can silently switch its meaning from "elements" to "length," which a literal never risks.

28. Why does spreading a `Set` or other non-array iterable directly into an array literal (e.g., `[...mySet]`) work seamlessly, while spreading a plain object (`[...myPlainObject]`) throws a TypeError?
    A) Both scenarios behave identically and neither throws an error
    B) The spread operator, when used inside an array literal, specifically requires its source to implement the iterable protocol — `Set`, arrays, strings, and Maps all implement this protocol natively, but plain objects do not by default, causing the spread to fail
    C) Plain objects are always automatically converted to arrays first
    D) `Set` objects cannot be spread under any circumstances
    **Hint:** This connects to the same iterable-protocol distinction discussed earlier regarding `Array.from()` — the spread operator inside `[ ]` has this same fundamental requirement.
    **Answer:** B
    **Explanation:** Spread inside an array literal requires an iterable source, and `Set`s implement that protocol natively while plain objects do not.

29. Why might using `Array.from({ length: n }, (_, i) => someLogic(i))` be considered a more functional-programming-idiomatic approach to generating a sequence of computed values, compared to a manual `for` loop with `.push()`?
    A) There's no meaningful stylistic or idiomatic difference between the two approaches
    B) The `Array.from()` approach expresses the entire generation logic as a single declarative expression (describing "what" the result should be), while a `for` loop with `.push()` is imperative (describing step-by-step "how" to build it) — the former is often considered more concise and aligned with functional programming style, though both achieve the same result
    C) `for` loops with `.push()` cannot generate arrays of a specific predetermined length
    D) `Array.from()` executes asynchronously, unlike a `for` loop
    **Hint:** Compare the mental model of each: one describes the shape and content of the final array directly as an expression, the other builds it up procedurally, one push at a time.
    **Answer:** B
    **Explanation:** `Array.from()` declares the result's shape directly as one expression, whereas a `for`/`.push()` loop describes step-by-step how to build it up.

30. Why does understanding the distinction between "array-like," "iterable," and "true array" matter when designing a utility function meant to accept multiple different kinds of collection inputs (like both a real array and a `NodeList`)?
    A) These three categories are actually all functionally identical, so the distinction is irrelevant
    B) A function designed to handle only true arrays might fail or behave unexpectedly when passed an array-like or iterable that isn't technically an `Array` instance — using `Array.from()` internally to normalize any of these input types into a real array first ensures consistent, predictable behavior regardless of what specific kind of collection was originally passed in
    C) JavaScript automatically converts every collection type into a true array before any function call
    D) Only `Array.isArray()` needs to be considered; iterability and array-likeness are irrelevant distinctions
    **Hint:** Think about writing a reusable helper function meant to work with a real array, a `NodeList` from `document.querySelectorAll()`, and the `arguments` object — would relying purely on array-specific methods work reliably across all three without first normalizing them?
    **Answer:** B
    **Explanation:** Normalizing any input with `Array.from()` first guarantees the function can safely rely on real array methods no matter which kind of collection it was actually handed.

---

## Topic 2: Accessing & Modifying Arrays

### Easy

1. What does `let arr = [10, 20, 30]; arr[0]` return?
   A) `10`
   B) `20`
   C) `30`
   D) `undefined`
   **Hint:** Array indexes start counting from `0`, not `1`.
   **Answer:** A
   **Explanation:** Index `0` refers to the first element, `10`.

2. What does `let arr = [10, 20, 30]; arr[2]` return?
   A) `10`
   B) `20`
   C) `30`
   D) `undefined`
   **Hint:** Index `2` refers to the third element, since counting starts at `0`.
   **Answer:** C
   **Explanation:** Since indexing starts at `0`, index `2` refers to the third element, `30`.

3. What does `let arr = [10, 20, 30]; arr.length` return?
   A) `2`
   B) `3`
   C) `30`
   D) `10`
   **Hint:** `.length` reports the total count of elements in the array.
   **Answer:** B
   **Explanation:** The array has three elements, so `.length` reports `3`.

4. How would you access the last element of an array without knowing its exact length in advance?
   A) `arr[-1]`
   B) `arr[arr.length - 1]`
   C) `arr[arr.length]`
   D) `arr.last()`
   **Hint:** Subtract `1` from the total length, since indexing starts at `0`.
   **Answer:** B
   **Explanation:** Subtracting `1` from `.length` correctly accounts for zero-based indexing to reach the final element.

5. What does `let arr = [10, 20, 30]; arr[1] = 99;` do?
   A) Adds a new element `99` to the end
   B) Replaces the element at index `1` with `99`
   C) Throws an error
   D) Deletes the array
   **Hint:** Assigning directly to a specific index overwrites whatever was there.
   **Answer:** B
   **Explanation:** Assigning to an existing index directly overwrites the value already stored there.

6. What does `arr[10]` return, if `arr` only has 3 elements?
   A) `0`
   B) `undefined`
   C) An error
   D) `null`
   **Hint:** Accessing an index beyond the array's actual content doesn't throw — it just returns a familiar placeholder.
   **Answer:** B
   **Explanation:** Reading an index beyond the array's actual content simply returns `undefined` rather than throwing.

7. Does accessing an out-of-bounds index (like `arr[10]` on a 3-element array) throw an error in JavaScript?
   A) Yes, always
   B) No, it simply returns `undefined`
   C) Only in strict mode
   D) Only for negative indexes
   **Hint:** Unlike some languages, JavaScript arrays don't perform bounds-checking that throws errors on read access.
   **Answer:** B
   **Explanation:** JavaScript array reads never throw for out-of-range indexes; they simply yield `undefined`.

8. What does `let arr = [1, 2, 3]; arr[1]` return?
   A) `1`
   B) `2`
   C) `3`
   D) `undefined`
   **Hint:** Index `1` is the second element.
   **Answer:** B
   **Explanation:** Index `1` refers to the second element, `2`.

9. Can array elements be reassigned after the array is created?
   A) No, arrays are always immutable once created
   B) Yes, individual elements can be reassigned by index
   C) Only if declared with `let`, never `const`
   D) Only the first element can be changed
   **Hint:** Recall that even `const` arrays allow their *contents* to change, just not the variable's reference itself.
   **Answer:** B
   **Explanation:** Individual elements can always be reassigned by index, even on a `const`-declared array, since only the variable binding is fixed.

10. What is the index of the first element in any JavaScript array?
    A) `1`
    B) `0`
    C) `-1`
    D) It depends on the array
    **Hint:** JavaScript arrays are zero-indexed.
    **Answer:** B
    **Explanation:** JavaScript arrays are zero-indexed, so the first element always sits at index `0`.

### Medium

11. What does `let arr = [1, 2, 3]; arr[5] = 6; console.log(arr.length);` print?
    A) `3`
    B) `4`
    C) `5`
    D) `6`
    **Hint:** Assigning to an index beyond the current length automatically extends the array, filling the gap with empty slots.
    **Answer:** D
    **Explanation:** Assigning to index `5` extends the array so its length becomes one greater than that index, giving `6`.

12. What does the array look like after `let arr = [1, 2, 3]; arr[5] = 6;`?
    A) `[1, 2, 3, 6]`
    B) `[1, 2, 3, <2 empty items>, 6]`
    C) An error is thrown
    D) `[1, 2, 3]` unchanged
    **Hint:** The gap between the original length and the new index creates empty (sparse) slots.
    **Answer:** B
    **Explanation:** The gap between the previous end of the array and the newly assigned index becomes empty (sparse) slots rather than filled values.

13. What does `let arr = [1, 2, 3]; arr.length = 1; console.log(arr);` print?
    A) `[1, 2, 3]`
    B) `[1]`
    C) `[]`
    D) An error
    **Hint:** Setting `.length` directly can actually truncate an array, discarding elements beyond the new length.
    **Answer:** B
    **Explanation:** Setting `.length` to `1` truncates the array, discarding everything beyond the first element.

14. Does modifying `arr.length` to a value smaller than the current length permanently discard the removed elements?
    A) No, they can be recovered by increasing `.length` again
    B) Yes, truncating an array this way permanently deletes those elements
    C) Only if using `const`
    D) Only for the last element
    **Hint:** This isn't a "hide" operation — it genuinely shortens and discards data from the array.
    **Answer:** B
    **Explanation:** Truncating via `.length` permanently deletes those elements; growing `.length` back afterward doesn't restore them.

15. What does `let arr = ["a", "b", "c"]; arr.length = 5;` do to the array?
    A) Throws an error
    B) Extends the array to length 5, adding 2 new empty slots at the end
    C) Duplicates existing elements to fill the new slots
    D) Has no effect since arrays can't grow this way
    **Hint:** Setting `.length` larger than the current size grows the array, similarly to assigning a far-out-of-bounds index.
    **Answer:** B
    **Explanation:** Setting `.length` larger than the current size grows the array, adding empty slots at the end to reach the new length.

16. What is the result of `let arr = [1, [2, 3], 4]; arr[1][0];`?
    A) `1`
    B) `2`
    C) `3`
    D) `4`
    **Hint:** `arr[1]` first gets the nested array `[2, 3]`, then `[0]` indexes into that.
    **Answer:** B
    **Explanation:** `arr[1]` retrieves the nested array `[2, 3]`, and `[0]` of that is `2`.

17. Can you use a negative number to access an array's elements directly, like `arr[-1]`, to get the last element (similar to Python)?
    A) Yes, this works identically to Python
    B) No — `arr[-1]` in JavaScript returns `undefined` since arrays don't support negative indexing this way
    C) Only with `const` arrays
    D) Only for arrays with fewer than 10 elements
    **Hint:** JavaScript array indexing doesn't support the same negative-index shortcut Python offers.
    **Answer:** B
    **Explanation:** JavaScript treats `-1` as an ordinary property name rather than a "from the end" index, so `arr[-1]` is simply `undefined` unless explicitly set.

18. What does `let arr = [1, 2, 3]; delete arr[1]; console.log(arr);` produce?
    A) `[1, 3]`
    B) `[1, <empty>, 3]`
    C) `[1, undefined, 3]` with length still 3, but as a genuinely different kind of empty
    D) An error
    **Hint:** `delete` removes the value at that index but doesn't shift later elements down or change the array's length.
    **Answer:** B
    **Explanation:** `delete` removes the value at that index but leaves an empty slot behind, without shifting later elements or changing the length.

19. What is a key difference between `delete arr[1]` and `arr.splice(1, 1)` for removing an element?
    A) They are functionally identical
    B) `delete` leaves an empty slot in place (array length unchanged); `.splice()` actually removes the element and shifts subsequent elements to close the gap (array length decreases)
    C) `delete` is the more commonly recommended approach for removing array elements
    D) `.splice()` only works on strings, not arrays
    **Hint:** Think about whether the array's overall length and element positions change after each operation.
    **Answer:** B
    **Explanation:** `delete` leaves a gap with the length unchanged, while `.splice()` actually removes the element and shifts later ones down, shrinking the length.

20. What does `Object.freeze(arr)` do to prevent modification of an array?
    A) Nothing — arrays cannot be frozen
    B) Prevents adding, removing, or reassigning elements (and changing `.length`) after being called
    C) Only prevents adding new elements, not modifying existing ones
    D) Converts the array into a string permanently
    **Hint:** `Object.freeze()` locks down an object (which arrays technically are) entirely, blocking further structural changes.
    **Answer:** B
    **Explanation:** Freezing an array locks its structure entirely, blocking additions, removals, index reassignment, and length changes.

### Hard

21. Why does assigning to an out-of-bounds index (like `arr[10] = "x"` on a 3-element array) create a "sparse" array, and how does this differ practically from an array explicitly filled with `undefined` at each gap index?
    A) There's no practical difference between the two scenarios
    B) The gap indices genuinely don't exist as keys on the sparse array (they're not enumerable, and iteration methods like `.forEach()` skip them entirely), while an explicitly `undefined`-filled array has real, enumerable keys at every index that iteration methods will process normally
    C) Sparse arrays automatically get filled with `0` at every gap index
    D) This behavior only occurs when using `new Array()`, never with array literals
    **Hint:** Revisit the earlier discussion of `.map()` skipping sparse slots — the same underlying "these keys don't actually exist" mechanism is at play here too.
    **Answer:** B
    **Explanation:** The gap indices aren't real, enumerable keys, so methods like `.forEach()` skip them, unlike an array with genuine `undefined` values at every index.

22. Why can truncating an array by setting `.length` to a smaller value be considered a genuinely destructive, irreversible operation, unlike merely hiding elements from view?
    A) It's not actually destructive — the removed elements remain accessible via a hidden backup
    B) Setting `.length` smaller permanently deletes the actual element values beyond the new length; there is no built-in mechanism to "undo" this and recover the discarded elements afterward, unlike, say, commenting out code
    C) This operation only affects how the array displays in `console.log`, not its actual data
    D) JavaScript automatically creates a backup array before any truncation
    **Hint:** Contrast this with something reversible like temporarily hiding UI elements — once `.length` shrinks an array, is there any built-in way to retrieve what was cut off?
    **Answer:** B
    **Explanation:** Shrinking `.length` permanently deletes the discarded values, with no built-in mechanism to recover them afterward.

23. Why does `Object.freeze()` on an array prevent adding/removing elements and changing `.length`, but NOT necessarily prevent deep mutation of nested objects contained within that array?
    A) `Object.freeze()` always performs a full, deep freeze of everything nested inside automatically
    B) `Object.freeze()` only freezes the immediate, top-level structure it's called on — an array containing object elements still allows those individual nested objects to be mutated internally, since freezing the array itself doesn't recursively freeze everything it contains
    C) `Object.freeze()` cannot be applied to arrays at all, only plain objects
    D) Frozen arrays automatically deep-freeze all contained objects after a short delay
    **Hint:** This mirrors the earlier "shallow copy" discussion about spread — freezing, like copying, generally only affects the immediate top level unless you deliberately apply it recursively.
    **Answer:** B
    **Explanation:** `Object.freeze()` only locks the array's own top-level structure; any objects nested inside remain mutable unless separately frozen.

24. Why might directly mutating an array via index assignment (`arr[0] = newValue`) inside a function that received the array as a parameter create unexpected consequences for the caller's original array, even without using explicit "mutating methods" like `.push()`?
    A) Index assignment never actually affects the original array outside the function
    B) Since arrays are passed by reference, directly assigning to an index inside the function modifies the same underlying array object the caller is also referencing — this is a mutation just as significant as calling `.push()` or `.splice()`, even though it looks like "just" a variable assignment
    C) This only happens if the array was declared with `let`, never `const`
    D) JavaScript automatically creates a local copy of any array parameter
    **Hint:** Recall the earlier distinction between mutating an object's properties/contents (which affects the shared reference) versus reassigning the entire local variable to something new (which doesn't) — index assignment falls squarely into the first category.
    **Answer:** B
    **Explanation:** Because arrays are passed by reference, assigning to an index inside the function mutates the same array object the caller holds, just as a `.push()` or `.splice()` call would.

25. Why does `for...in` iteration over an array with sparse (empty) slots behave differently from `for...of` iteration regarding those gaps?
    A) Both loop types treat sparse gaps identically
    B) `for...in` iterates only over the array's actual existing enumerable keys, correctly skipping genuinely empty sparse slots, while `for...of` (using the array's default iterator) iterates by numeric position regardless of sparseness, visiting each index (including empty ones) as `undefined`
    C) `for...in` cannot be used on arrays under any circumstances
    D) `for...of` skips sparse slots while `for...in` visits them as `undefined`
    **Hint:** `for...in` is fundamentally a "loop over the object's actual keys" mechanism, while `for...of` follows the array's iterator protocol, which is defined by numeric position count, not by which keys genuinely exist.
    **Answer:** B
    **Explanation:** `for...in` only visits keys that actually exist, skipping empty slots, while `for...of` iterates by numeric position and visits every index, including empty ones, as `undefined`.

26. Why might extending an array far beyond its current length via a single out-of-bounds assignment (e.g., `arr[1000000] = "x"` on a 3-element array) be a performance concern, despite being syntactically valid and immediately "working"?
    A) There is no performance concern whatsoever with this operation
    B) This creates a sparse array with a length of over a million, and even though the intermediate slots are empty, some engine optimizations for dense arrays no longer apply as efficiently, and subsequent array operations may behave less predictably in terms of performance
    C) JavaScript automatically rejects any index assignment beyond 1000
    D) This operation always throws a RangeError before completing
    **Hint:** Think about how a JavaScript engine might internally optimize a small, dense array differently from a massive, mostly-empty sparse one — even though both are technically valid "arrays."
    **Answer:** B
    **Explanation:** The resulting huge sparse array can prevent the engine's usual dense-array optimizations from applying, making later operations on it perform less predictably.

27. Why does comparing `arr.length` immediately after a sparse assignment (like `arr[10] = "x"` on an empty array) report `11`, even though the array visually appears to contain only one meaningful value?
    A) This is a bug, and `.length` should report `1` instead
    B) `.length` in JavaScript arrays is defined as one greater than the highest existing numeric index, not as a count of "meaningfully filled" elements — so a single assignment at index `10` mathematically produces a length of `11`, regardless of how many of those positions are actually populated
    C) `.length` only counts elements assigned using array literal syntax
    D) `.length` recalculates based on actual assigned values only, ignoring index position entirely
    **Hint:** This directly follows from the definition of `.length` as tracking the highest index used, not a simple count of "how many values did I explicitly put in here."
    **Answer:** B
    **Explanation:** `.length` is defined as one more than the highest assigned numeric index, not a count of populated values, so assigning at index `10` makes it `11`.

28. Why can freezing an array with `Object.freeze()` still allow certain non-mutating array methods (like `.map()` or `.filter()`) to be called on it successfully, while mutating methods (like `.push()`) throw a TypeError in strict mode?
    A) `Object.freeze()` actually prevents every single method call on the array, mutating or not
    B) Non-mutating methods create and return an entirely new array without modifying the original frozen array's structure at all, so they don't violate the freeze — mutating methods, by definition, attempt to change the original array's contents/length directly, which the freeze explicitly disallows
    C) `.push()` always works fine on frozen arrays, contrary to popular belief
    D) `.map()` and `.filter()` are disabled specifically for frozen arrays
    **Hint:** The key distinction is what each method actually does to the *original* array object — does it change that specific object's internal state, or does it simply compute and return something new?
    **Answer:** B
    **Explanation:** Non-mutating methods return an entirely new array without touching the frozen original, while `.push()` tries to change the original directly, which the freeze blocks.

29. Why does understanding `.length`'s writable nature (as both a readable property AND a settable one that can truncate the array) matter for defensive programming when accepting array-like configuration objects from external sources?
    A) `.length` can only ever be read, never assigned to, so this concern doesn't apply
    B) If external, untrusted code (or a library) is given direct access to an internally-used array, that code could inadvertently or maliciously truncate the array by setting `.length` to an unexpectedly small value, silently discarding data the internal code still expected to be present
    C) `.length` assignments are always validated and rejected automatically by JavaScript for safety
    D) This concern only applies to arrays created with `new Array()`, never array literals
    **Hint:** Consider the implications of handing a mutable, unprotected array reference to code you don't fully control or trust — what's the worst thing that code could silently do to it via a single `.length =` assignment?
    **Answer:** B
    **Explanation:** Because `.length` can be assigned directly, code with access to a shared array could silently truncate it, discarding data the rest of the program still expects.

30. Why might immutable data patterns (using `Object.freeze()` combined with spread-based "copy and modify" operations, rather than direct index/`.length` mutation) be increasingly favored in modern JavaScript application architectures, particularly in state-management-heavy contexts?
    A) There's no meaningful architectural benefit to this pattern over direct mutation
    B) Immutable patterns make state changes explicit, predictable, and traceable (each "change" produces a distinctly new array/object rather than silently mutating shared references), which significantly simplifies reasoning about application state, especially in contexts like UI frameworks that rely on detecting distinct object references to trigger re-renders efficiently
    C) Direct array mutation is always faster and therefore always preferable
    D) `Object.freeze()` is required by the JavaScript specification for all array usage
    **Hint:** Think about how a UI framework might efficiently detect "did this data actually change?" — comparing whether two array references are identical is much simpler and faster than deeply inspecting whether their contents happen to differ.
    **Answer:** B
    **Explanation:** Producing new arrays instead of mutating in place makes state changes explicit and lets frameworks detect updates via a cheap reference comparison rather than deep inspection.

---

## Topic 3: Adding & Removing Elements

### Easy

1. What does `.push()` do to an array?
   A) Removes the first element
   B) Adds one or more elements to the end
   C) Removes the last element
   D) Adds elements to the beginning
   **Hint:** Think of "pushing" something onto the back of a line.
   **Answer:** B
   **Explanation:** `.push()` appends one or more new elements onto the end of the array.

2. What does `let arr = [1, 2]; arr.push(3); console.log(arr);` print?
   A) `[1, 2]`
   B) `[3, 1, 2]`
   C) `[1, 2, 3]`
   D) `3`
   **Hint:** `.push()` adds the new element at the very end of the array.
   **Answer:** C
   **Explanation:** `.push(3)` appends `3` after the existing elements, producing `[1, 2, 3]`.

3. What does `.pop()` do to an array?
   A) Adds an element to the end
   B) Removes and returns the last element
   C) Removes and returns the first element
   D) Removes all elements
   **Hint:** Think of "popping" the top item off a stack.
   **Answer:** B
   **Explanation:** `.pop()` removes the array's final element and returns it to the caller.

4. What does `let arr = [1, 2, 3]; let last = arr.pop(); console.log(last);` print?
   A) `1`
   B) `2`
   C) `3`
   D) `undefined`
   **Hint:** `.pop()` returns the element it removes — the very last one.
   **Answer:** C
   **Explanation:** `.pop()` removes and returns the last element, which is `3`.

5. What does `.shift()` do to an array?
   A) Removes and returns the last element
   B) Removes and returns the first element
   C) Adds an element to the beginning
   D) Reverses the array
   **Hint:** This "shifts" every remaining element one position earlier, after removing the front one.
   **Answer:** B
   **Explanation:** `.shift()` removes the array's first element and returns it, shifting the rest down.

6. What does `.unshift()` do to an array?
   A) Removes the first element
   B) Adds one or more elements to the beginning
   C) Adds one or more elements to the end
   D) Removes the last element
   **Hint:** This is the counterpart to `.shift()`, but for adding rather than removing.
   **Answer:** B
   **Explanation:** `.unshift()` inserts one or more new elements at the very start of the array.

7. What does `let arr = [2, 3]; arr.unshift(1); console.log(arr);` print?
   A) `[2, 3, 1]`
   B) `[1, 2, 3]`
   C) `[3, 2, 1]`
   D) `[2, 3]`
   **Hint:** The new element `1` gets placed at the very front.
   **Answer:** B
   **Explanation:** `.unshift(1)` places `1` at the front, ahead of the existing `2, 3`.

8. Does `.push()` modify the original array, or return a new one?
   A) It returns a new array, leaving the original untouched
   B) It mutates the original array directly
   C) It does neither — it only logs to the console
   D) It throws an error if the array already has elements
   **Hint:** `.push()`, `.pop()`, `.shift()`, and `.unshift()` are all known as "mutating" array methods.
   **Answer:** B
   **Explanation:** `.push()` is a mutating method that changes the original array directly rather than returning a copy.

9. What does `.push()` return?
   A) The newly added element
   B) The array's new length
   C) The entire modified array
   D) `undefined`
   **Hint:** This return value tells you how many elements the array now contains, not the element itself.
   **Answer:** B
   **Explanation:** `.push()` returns the array's new length after the addition, not the added element or the array itself.

10. What does `let arr = [1, 2, 3]; arr.shift(); console.log(arr);` print?
    A) `[1, 2, 3]`
    B) `[2, 3]`
    C) `[1, 2]`
    D) `[3]`
    **Hint:** `.shift()` removes specifically the first element, leaving the rest.
    **Answer:** B
    **Explanation:** `.shift()` removes the first element (`1`), leaving `[2, 3]`.

### Medium

11. What does `.splice(1, 2)` do to `let arr = [1, 2, 3, 4, 5];`?
    A) Removes 2 elements starting at index 1, resulting in `[1, 4, 5]`
    B) Inserts 2 elements at index 1
    C) Removes elements from index 1 to the end
    D) Has no effect on the array
    **Hint:** The first argument is the starting index, and the second is how many elements to remove from there.
    **Answer:** A
    **Explanation:** Starting at index `1`, two elements (`2` and `3`) are removed, leaving `[1, 4, 5]`.

12. What does `.splice(2, 0, "new")` do to `let arr = [1, 2, 3, 4];`?
    A) Removes 2 elements at index 0
    B) Inserts `"new"` at index 2 without removing anything, since the removal count is 0
    C) Replaces the element at index 2 with `"new"`
    D) Throws an error
    **Hint:** A removal count of `0` means "don't delete anything" — but additional arguments after that are still inserted.
    **Answer:** B
    **Explanation:** A removal count of `0` deletes nothing, so `"new"` is simply inserted at index `2` without removing existing elements.

13. What does `.splice()` return?
   A) The modified original array
   B) An array containing the removed elements
   C) `undefined` always
   D) The new length of the array
   **Hint:** This return value is useful specifically when you want to know exactly what was taken out.
   **Answer:** B
   **Explanation:** `.splice()` returns an array containing whichever elements were removed.

14. What is a key difference between `.slice()` and `.splice()`?
    A) They are identical, just spelled differently
    B) `.slice()` returns a new array without modifying the original; `.splice()` mutates the original array directly
    C) `.slice()` only works on strings
    D) `.splice()` never removes any elements
    **Hint:** One of these methods leaves the source array completely untouched; the other doesn't.
    **Answer:** B
    **Explanation:** `.slice()` returns a new array leaving the original untouched, while `.splice()` mutates the original array in place.

15. What does `let arr = [1, 2, 3, 4, 5]; arr.slice(1, 3);` return?
    A) `[1, 2]`
    B) `[2, 3]`
    C) `[2, 3, 4]`
    D) `[1, 2, 3]`
    **Hint:** `.slice(start, end)` extracts elements starting at `start`, stopping *before* `end`.
    **Answer:** B
    **Explanation:** `.slice(1, 3)` extracts the elements from index `1` up to, but not including, index `3`, giving `[2, 3]`.

16. What does the original array `arr` look like after calling `arr.slice(1, 3)` on `let arr = [1, 2, 3, 4, 5];`?
    A) `[2, 3]`
    B) `[1, 4, 5]`
    C) `[1, 2, 3, 4, 5]` — unchanged
    D) An error occurs
    **Hint:** `.slice()` is a non-mutating method — the original array remains exactly as it was.
    **Answer:** C
    **Explanation:** `.slice()` never mutates its source array, so `arr` remains exactly `[1, 2, 3, 4, 5]`.

17. Can `.splice()` be used to both remove elements AND insert new ones in the same call?
    A) No, only one operation is allowed per call
    B) Yes, e.g. `arr.splice(1, 2, "a", "b")` removes 2 elements at index 1 and inserts `"a"`, `"b"` in their place
    C) Only with exactly one new element
    D) Only if removing zero elements
    **Hint:** Any arguments after the removal count are treated as new elements to insert at that same position.
    **Answer:** B
    **Explanation:** Arguments after the removal count are inserted at that position, so `.splice()` can remove and insert elements in one call.

18. What does `arr.push(...anotherArr)` accomplish, compared to `arr.push(anotherArr)`?
    A) They behave identically
    B) `arr.push(...anotherArr)` spreads each element of `anotherArr` individually onto the end of `arr`; `arr.push(anotherArr)` adds `anotherArr` itself as a single nested array element
    C) `arr.push(anotherArr)` throws an error
    D) `arr.push(...anotherArr)` always fails if the arrays are different lengths
    **Hint:** The spread operator "unpacks" the array's individual elements before they're passed as separate arguments.
    **Answer:** B
    **Explanation:** Spreading unpacks `anotherArr`'s elements individually onto `arr`, while passing it directly adds the whole array as one nested element.

19. What does `let arr = [1, 2, 3]; arr.length = 0;` do to the array?
    A) Throws an error
    B) Empties the array entirely, resulting in `[]`
    C) Has no effect
    D) Removes only the first element
    **Hint:** Recall that setting `.length` directly can truncate — setting it all the way to `0` removes everything.
    **Answer:** B
    **Explanation:** Setting `.length` to `0` truncates the array all the way down to nothing, leaving `[]`.

20. Why might `arr.splice(0, arr.length)` be used as an alternative way to empty an array, compared to `arr.length = 0`?
    A) They produce fundamentally different results
    B) Both fully empty the array, but `.splice()` additionally returns an array of everything that was removed, which can be useful if you need to keep a reference to the discarded elements
    C) `.splice()` cannot be used to remove every element at once
    D) `arr.length = 0` is invalid syntax
    **Hint:** Think about what each approach hands back to you afterward — one gives you nothing useful in return, the other gives you exactly what was taken out.
    **Answer:** B
    **Explanation:** Both fully empty the array, but `.splice()` additionally hands back an array of everything that was removed, which `.length = 0` does not.

### Hard

21. Why is `.push()`/`.pop()` generally considered more performant than `.shift()`/`.unshift()` for large arrays, particularly in performance-sensitive code?
    A) There's no meaningful performance difference between them
    B) `.push()`/`.pop()` operate at the array's end, requiring no reindexing of other elements; `.shift()`/`.unshift()` operate at the beginning, requiring every other element in the array to be reindexed (shifted) to a new position, which becomes increasingly costly as array size grows
    C) `.shift()`/`.unshift()` are deprecated methods no longer recommended for any use
    D) `.push()`/`.pop()` only work correctly on arrays under 1000 elements
    **Hint:** Picture a very long line of people — is it easier to add/remove someone from the very back, or to add/remove someone from the very front (requiring everyone else to shuffle forward or backward by one spot)?
    **Answer:** B
    **Explanation:** End-of-array operations require no reindexing, while beginning-of-array operations must shift every other element's position, which grows costlier as the array grows.

22. Why does `.splice()`'s ability to both remove and insert elements simultaneously make it particularly well-suited for "replace an item at a specific position" operations, compared to achieving the same result with `.slice()` and array reconstruction?
    A) Both approaches require identical amounts of code and complexity
    B) `.splice()` can perform the removal and insertion as a single, direct, in-place mutation in one method call, while achieving the same "replace" effect with `.slice()` would require manually reconstructing a new array from multiple slices plus the new element, typically via concatenation or spread — more verbose and requiring more intermediate array creation
    C) `.slice()` cannot be used for replacement operations under any circumstances
    D) `.splice()` is purely a removal method and cannot insert anything
    **Hint:** Compare `arr.splice(2, 1, "new")` directly against manually reconstructing the equivalent result using `[...arr.slice(0, 2), "new", ...arr.slice(3)]` — both work, but consider the relative complexity.
    **Answer:** B
    **Explanation:** `.splice()` performs the replacement as one in-place mutation, while the `.slice()`-based equivalent requires manually reconstructing a new array from multiple pieces.

23. Why might a functional programming style deliberately avoid `.splice()`, `.push()`, `.pop()`, `.shift()`, and `.unshift()` entirely, favoring `.slice()`, spread syntax, and `.concat()` instead?
    A) The mutating methods don't actually work correctly in JavaScript
    B) Functional programming emphasizes immutability — avoiding methods that mutate the original array in place helps prevent unintended side effects on shared array references elsewhere in a program, favoring methods that always return new arrays and leave inputs untouched
    C) Non-mutating methods always execute faster than mutating ones
    D) Mutating array methods are being deprecated in future JavaScript versions
    **Hint:** Recall the earlier discussion about immutability's benefits for reasoning about state changes predictably — this preference directly extends that same philosophy to array manipulation specifically.
    **Answer:** B
    **Explanation:** Avoiding mutating methods prevents unintended side effects on array references shared elsewhere, consistent with functional programming's emphasis on immutability.

24. Why does calling `.splice()` on an array while simultaneously iterating over that same array with a standard `for` loop risk producing incorrect or skipped results?
    A) `.splice()` cannot be called during any kind of loop
    B) `.splice()` mutates the array's length and shifts element positions in place — if a `for` loop is tracking a numeric index while this happens, subsequent iterations may skip elements (since everything shifted down) or process the same element twice, since the loop's index no longer aligns correctly with the array's actual current contents
    C) This scenario always throws a runtime error immediately
    D) `for` loops automatically pause and resume correctly around any array mutation
    **Hint:** Picture removing an element at index 2 mid-loop — does the *next* iteration's index 3 now point to what you'd expect, or has everything shifted down by one, causing you to accidentally skip over an element?
    **Answer:** B
    **Explanation:** `.splice()` shifts element positions as it mutates the array, so a loop's fixed numeric index no longer aligns with the array's actual current contents, causing skipped or reprocessed elements.

25. Why can chaining `.push()` calls in a loop to build up a large array sometimes be preferred over repeatedly using the spread operator (`arr = [...arr, newItem]`) inside that same loop, despite spread's appeal for immutability?
    A) There's no meaningful performance difference between these two approaches, regardless of scale
    B) Each spread-based reassignment (`[...arr, newItem]`) creates an entirely new array copy on every single iteration, which becomes increasingly expensive as the array grows larger — `.push()` mutates the existing array in place without this repeated full-copy overhead, making it significantly more efficient for building up large arrays incrementally within a tight loop
    C) The spread operator cannot be used inside loops under any circumstances
    D) `.push()` always produces a completely new array reference on every call, identical to spread
    **Hint:** Consider what work actually happens on each individual loop iteration for each approach — does one require copying the entire array's existing contents every single time, while the other simply appends without that repeated overhead?
    **Answer:** B
    **Explanation:** Each spread-based reassignment recopies the entire array on every iteration, while `.push()` mutates in place without that repeated copying cost.

26. Why might `.unshift()` used repeatedly inside a large loop be a particularly severe performance anti-pattern, combining two separate costly behaviors?
    A) `.unshift()` has no meaningful performance characteristics worth discussing
    B) Each `.unshift()` call must reindex every existing element in the array (shifting them all one position later) — repeating this operation many times inside a loop compounds this reindexing cost on every single iteration, making the overall operation scale poorly compared to `.push()`'s constant-time end-of-array insertion
    C) `.unshift()` is actually faster than `.push()` in every scenario
    D) This pattern is impossible to construct, since `.unshift()` cannot be called inside loops
    **Hint:** Combine the earlier "reindexing cost" insight about `.unshift()` with the general principle that repeating any costly operation many times inside a loop multiplies that cost — what happens when you do that specifically with an operation that's already comparatively expensive per call?
    **Answer:** B
    **Explanation:** Each `.unshift()` call reindexes the entire array, and repeating that many times in a loop compounds this cost, unlike `.push()`'s constant-time insertion at the end.

27. Why does `.splice()`'s in-place mutation, combined with its ability to simultaneously remove AND return the removed elements, make it a common building block for implementing custom data structures like a queue or stack directly on top of a plain array?
    A) `.splice()` cannot be used for this purpose, since it always creates a new array
    B) `.splice()`'s single-call ability to both extract specific elements (by position) and modify the original array's structure in place mirrors exactly what operations like "dequeue" (remove and return the front item) require, making it a natural, low-boilerplate implementation choice for such structures
    C) Custom data structures cannot be built on top of native arrays in JavaScript
    D) `.splice()` is only usable for removing exactly one element at a time
    **Hint:** Think about what a "dequeue" operation on a queue conceptually needs to do — remove the front item AND give it back to the caller — and compare that directly to what a single, well-parameterized `.splice()` call already accomplishes.
    **Answer:** B
    **Explanation:** `.splice()`'s ability to remove a specific element and return it in one call directly matches what an operation like "dequeue" needs.

28. Why might relying on `.pop()`'s return value directly inside a complex expression (e.g., `processItem(stack.pop())`) sometimes be considered less readable than first assigning it to a clearly-named variable, despite being functionally equivalent?
    A) There's no readability difference whatsoever between the two approaches
    B) Assigning to a clearly-named intermediate variable (e.g., `const lastItem = stack.pop(); processItem(lastItem);`) makes the code's intent more explicit and easier to debug (via breakpoints or logging), while inlining the call obscures exactly what value is being extracted and mutated at a glance, especially in more complex expressions
    C) `.pop()`'s return value cannot be used directly inside another function call
    D) Inline `.pop()` calls always execute in a different order than expected
    **Hint:** Consider debugging a bug in production — would it be easier to set a breakpoint and inspect a clearly-named `lastItem` variable, or to unwind a deeply nested inline expression to figure out exactly what `.pop()` actually returned in that moment?
    **Answer:** B
    **Explanation:** Assigning the popped value to a clearly-named variable first makes the code's intent and debugging easier than burying the call inline inside a larger expression.

29. Why does understanding that `.splice()` returns an array (even when removing just one element, e.g., `[removedItem]` rather than `removedItem` directly) matter when working with its return value?
    A) `.splice()` actually returns the removed element directly, not wrapped in an array
    B) Since `.splice()` is designed to potentially remove multiple elements at once, it consistently wraps its result in an array regardless of how many elements were actually removed — code expecting a single raw value must remember to destructure or index into that returned array (e.g., `const [removed] = arr.splice(1, 1);`) rather than treating the return value as the element itself
    C) This distinction only matters when removing zero elements
    D) `.splice()`'s return type changes dynamically based on how many elements were removed
    **Hint:** Contrast this consistent "always an array" return behavior with `.pop()`, which returns the single removed element directly, not wrapped in anything — these two mutating removal methods have genuinely different return value shapes.
    **Answer:** B
    **Explanation:** `.splice()` always wraps its result in an array regardless of how many elements were removed, so a single removed value must be destructured or indexed out.

30. Why might a code review flag heavy, repeated direct array mutation (`.push()`, `.splice()`, etc.) scattered across many different functions that all share access to the same array, even if each individual mutation is technically correct?
    A) Individually correct mutations can never combine to create any larger issue
    B) When many different parts of a codebase can each independently mutate a shared array reference, it becomes significantly harder to trace and reason about the array's state at any given point in time, increasing the risk of race conditions, unexpected side effects, and bugs that are difficult to reproduce — centralizing mutation logic or favoring immutable patterns reduces this class of risk
    C) JavaScript automatically prevents more than one function from mutating the same array
    D) This concern only applies to arrays with more than 1000 elements
    **Hint:** Think about debugging a large application where the same shared array is being mutated from a dozen different, seemingly unrelated places in the codebase — how confident could you be about predicting its exact state at any given moment?
    **Answer:** B
    **Explanation:** When many independent functions can mutate a shared array, it becomes much harder to reason about its state at any given moment, even if each individual mutation is correct in isolation.

---

## Topic 4: Iterating Arrays

### Easy

1. Which method calls a given function once for each array element?
   A) `.map()`
   B) `.forEach()`
   C) `.filter()`
   D) `.find()`
   **Hint:** This method's name directly describes its behavior — "for each" element, do something.
   **Answer:** B
   **Explanation:** `.forEach()` invokes the given callback once for every element in the array.

2. What does `[1, 2, 3].forEach(n => console.log(n))` print?
   A) `[1, 2, 3]`
   B) `1`, then `2`, then `3` on separate lines
   C) `6`
   D) `undefined`
   **Hint:** The callback function runs once per element, printing that element's value each time.
   **Answer:** B
   **Explanation:** The callback logs each element as `.forEach()` visits it in turn, printing `1`, `2`, and `3` on separate lines.

3. What does `.forEach()` return?
   A) A new array
   B) `undefined`
   C) The original array, unchanged
   D) The total number of elements
   **Hint:** Unlike `.map()`, this method doesn't build and hand back a new array.
   **Answer:** B
   **Explanation:** `.forEach()` always returns `undefined`; it doesn't build and return a new array the way `.map()` does.

4. Can a standard `for` loop be used to iterate over an array?
   A) No, only `.forEach()` can iterate arrays
   B) Yes, e.g. `for (let i = 0; i < arr.length; i++) { }`
   C) Only for arrays of numbers
   D) Only in Node.js
   **Hint:** A `for` loop combined with `.length` and index access is a classic, general-purpose way to iterate.
   **Answer:** B
   **Explanation:** A classic indexed `for` loop combined with `.length` and index access works perfectly well for iterating any array.

5. What does `for (const item of [1, 2, 3]) { console.log(item); }` print?
   A) `[1, 2, 3]`
   B) `1`, `2`, `3` on separate lines
   C) `0`, `1`, `2` on separate lines
   D) `3`
   **Hint:** `for...of` iterates directly over each element's value, not its index.
   **Answer:** B
   **Explanation:** `for...of` yields each element's actual value in turn, printing `1`, `2`, and `3`.

6. Does `for...of` give you the element's value or its index?
   A) The index
   B) The value
   C) Both simultaneously by default
   D) Neither
   **Hint:** If you need the index too, you'd typically pair this with `.entries()`.
   **Answer:** B
   **Explanation:** `for...of` gives the element's actual value directly, not its position.

7. What does `for (const index in [10, 20, 30]) { console.log(index); }` print?
   A) `10`, `20`, `30`
   B) `"0"`, `"1"`, `"2"`
   C) `[10, 20, 30]`
   D) `0`, `1`, `2` as numbers
   **Hint:** `for...in` iterates over an object's keys — for arrays, those keys are the (string) indexes.
   **Answer:** B
   **Explanation:** `for...in` iterates over an array's enumerable keys, which are the string-typed indexes `"0"`, `"1"`, `"2"`.

8. Which loop type is generally recommended for iterating arrays: `for...of` or `for...in`?
   A) `for...in` is always preferred
   B) `for...of` is generally preferred for arrays, since it gives values directly and avoids iterating inherited properties
   C) Neither should ever be used for arrays
   D) They are functionally identical for arrays
   **Hint:** One of these was specifically designed with iterables (like arrays) in mind; the other is more general-purpose for any object's keys.
   **Answer:** B
   **Explanation:** `for...of` yields values directly and avoids the risk of also iterating extra enumerable properties that `for...in` can pick up.

9. Can you break out of a `.forEach()` loop early using `break`?
   A) Yes, just like a regular `for` loop
   B) No — `break` doesn't work inside `.forEach()`'s callback function
   C) Only if the array has fewer than 5 elements
   D) Only in strict mode
   **Hint:** Since `.forEach()`'s callback is a separate function, does a `break` statement written inside it actually have any effect on the loop's control flow?
   **Answer:** B
   **Explanation:** Because the callback is a separate function rather than a loop body, `break` has no meaning there and can't be used to stop `.forEach()`'s iteration.

10. What does the callback passed to `.forEach()` receive as its parameters?
    A) Only the current element
    B) The current element, its index, and the entire array (in that order)
    C) Only the array's length
    D) Nothing at all
    **Hint:** `.forEach()` provides more context than just the bare value, if you choose to use it.
    **Answer:** B
    **Explanation:** `.forEach()`'s callback receives the current element, its index, and the whole array, in that order.

### Medium

11. Why can't `break` be used to exit a `.forEach()` loop early, unlike a standard `for` loop?
    A) This limitation doesn't actually exist
    B) `.forEach()`'s callback is a completely separate function invoked repeatedly by `.forEach()` internally — `break` is a loop control statement that only works within an actual loop construct (`for`, `while`, etc.), not inside an arbitrary function being called
    C) `break` is a deprecated keyword no longer usable anywhere
    D) `.forEach()` automatically stops after processing 3 elements regardless of `break`
    **Hint:** Since `.forEach()`'s callback function is technically just a regular function call happening under the hood, does the concept of "breaking a loop" even apply within that separate function's own execution?
    **Answer:** B
    **Explanation:** The callback is an independently invoked function, and `break` only has meaning inside an actual loop construct, not inside a called function.

12. What technique would you use if you need to stop iterating early, given that `.forEach()` doesn't support `break`?
    A) It's genuinely impossible to stop iteration early in JavaScript
    B) Use a different construct that does support `break`/early exit, such as a standard `for` loop, `for...of` with `break`, or methods like `.some()`/`.find()` which stop as soon as a matching condition is found
    C) Always throw an error to forcibly halt execution
    D) `.forEach()` must always be used, with no alternatives
    **Hint:** Recall which array methods and loop constructs are specifically designed to support early termination based on a condition.
    **Answer:** B
    **Explanation:** Constructs like a standard `for` loop, `for...of` with `break`, or short-circuiting methods like `.some()`/`.find()` all support stopping iteration early.

13. What does `[1, 2, 3].entries()` return, and how might you use it in a `for...of` loop?
    A) A plain array of just the values
    B) An iterator of `[index, value]` pairs, usable with `for (const [index, value] of arr.entries())`
    C) A plain object mapping indexes to values
    D) `undefined`
    **Hint:** This method specifically pairs each element with its position, useful when `for...of` alone wouldn't give you the index.
    **Answer:** B
    **Explanation:** `.entries()` returns an iterator of `[index, value]` pairs, which destructures naturally inside a `for...of` loop.

14. What does `for (const [index, value] of ["a", "b", "c"].entries()) { console.log(index, value); }` print?
    A) `"a" 0`, `"b" 1`, `"c" 2`
    B) `0 "a"`, `1 "b"`, `2 "c"`
    C) `["a", "b", "c"]` once
    D) An error
    **Hint:** Destructuring pulls out the index first, then the value, matching the order `.entries()` provides them in.
    **Answer:** B
    **Explanation:** Each `[index, value]` pair from `.entries()` destructures with the index first and the value second, in that order.

15. Can you use `continue` inside a standard `for` loop to skip to the next iteration?
    A) No, `continue` only works inside `.forEach()`
    B) Yes, `continue` skips the rest of the current iteration's code and moves to the next one
    C) `continue` and `break` behave identically
    D) `continue` immediately ends the entire loop
    **Hint:** Unlike `break` (which exits entirely), `continue` just jumps ahead to the next round.
    **Answer:** B
    **Explanation:** `continue` skips the remaining code in the current iteration and proceeds directly to the next one.

16. Why might a `for...of` loop with `break` be chosen over `.forEach()` specifically when searching for something and wanting to stop as soon as it's found?
    A) There's no meaningful difference — both handle early termination identically
    B) `for...of` supports `break`, letting iteration genuinely halt the moment the target is found, avoiding unnecessary further iterations; `.forEach()` will always process every single element regardless of whether the target was already found partway through
    C) `.forEach()` executes significantly faster in every scenario
    D) `for...of` cannot be used with arrays, only other iterables
    **Hint:** Think about the wasted work `.forEach()` performs if you find what you're looking for on the 2nd element out of 1,000 — does it stop there, or keep going anyway?
    **Answer:** B
    **Explanation:** `for...of` supports `break`, letting iteration stop immediately once the target is found, whereas `.forEach()` always processes every element regardless.

17. What does `Array.prototype.keys()` return when called on an array?
    A) The array's values
    B) An iterator over the array's numeric indexes
    C) The array's length
    D) An error
    **Hint:** This is the counterpart to `.values()`, but focused specifically on index positions rather than content.
    **Answer:** B
    **Explanation:** `.keys()` yields the array's numeric index positions, as opposed to `.values()`, which yields the actual elements.

18. Does modifying an array's length while actively iterating it with `for...of` cause unpredictable behavior?
    A) No, `for...of` always safely handles any mid-iteration array changes
    B) Yes, mutating the array's length during iteration can cause skipped or repeated elements, since the iterator is working against the array's live, changing state
    C) This only happens with `.forEach()`, never `for...of`
    D) `for...of` automatically pauses and restarts safely after any mutation
    **Hint:** Recall the earlier discussion about mutating an array (like via `.splice()`) mid-loop — does switching to `for...of` actually eliminate that same underlying risk?
    **Answer:** B
    **Explanation:** Mutating the array's length mid-iteration can cause the iterator to skip or repeat elements, since it's tracking the array's live, changing state.

19. What is the primary structural difference between a standard `for` loop's iteration and `.forEach()`'s iteration, in terms of code style?
    A) There is no structural difference
    B) A `for` loop is an imperative, general-purpose looping construct giving full manual control (including `break`/`continue`); `.forEach()` is a higher-level array method that abstracts the looping mechanics but sacrifices that same fine-grained control
    C) `.forEach()` always runs asynchronously, unlike `for` loops
    D) `for` loops cannot access individual array elements by index
    **Hint:** Consider what level of control and flexibility each style trades off against conciseness and readability.
    **Answer:** B
    **Explanation:** A `for` loop offers full manual control including `break`/`continue`, while `.forEach()` abstracts the looping mechanics away at the cost of that control.

20. Can `.forEach()`'s callback be an `async` function, and if so, does `.forEach()` wait for each async callback to finish before moving to the next element?
    A) No, `.forEach()` cannot accept async callbacks at all
    B) Yes, an async callback can be passed, but `.forEach()` does NOT wait for each one to resolve before starting the next — it fires all the async operations essentially "in parallel," without built-in sequencing
    C) `.forEach()` automatically awaits each async callback in strict sequence
    D) Using async callbacks with `.forEach()` always throws a runtime error
    **Hint:** This is a common and important gotcha — `.forEach()` has no awareness of Promises or `async`/`await` semantics, since it wasn't designed with asynchronous iteration in mind.
    **Answer:** B
    **Explanation:** `.forEach()` happily accepts an async callback but has no awareness of the returned Promise, so it fires every call without waiting for any to resolve.

### Hard

21. Why does attempting to use `await` inside a `.forEach()` callback to sequentially process array elements one at a time (waiting for each before starting the next) fail to achieve that intended sequencing?
    A) This pattern actually works exactly as intended, sequentially
    B) `.forEach()` invokes its callback for every element essentially synchronously, immediately moving to the next call without waiting for any returned Promise to resolve — the `await` inside each individual callback only pauses that specific callback's own internal execution, not `.forEach()`'s overall iteration process
    C) `.forEach()` throws a SyntaxError if `await` appears anywhere inside its callback
    D) `.forEach()` automatically converts into a `for...of` loop when async callbacks are detected
    **Hint:** Separate two distinct things happening here: `.forEach()`'s own iteration loop (which has no concept of awaiting anything) versus what happens *inside* each individual invoked callback function — the `await` only affects the latter, in isolation.
    **Answer:** B
    **Explanation:** `.forEach()` calls its callback for every element without waiting on any returned Promise, so `await` only pauses that one callback's own execution, not the overall iteration.

22. Why is a standard `for...of` loop (rather than `.forEach()`) the correct choice when you need to sequentially `await` an async operation for each array element, one at a time?
    A) There's no meaningful difference — both handle this scenario identically
    B) A `for...of` loop, combined with an `async` function and `await` directly inside the loop body, genuinely pauses the loop's own execution at each `await`, correctly waiting for each async operation to resolve before the loop proceeds to its next iteration — behavior `.forEach()` fundamentally cannot provide
    C) `for...of` loops execute all iterations in parallel, just like `.forEach()`
    D) `for...of` cannot be combined with `async`/`await` under any circumstances
    **Hint:** Unlike `.forEach()`'s separate-callback-function structure, a `for...of` loop's body is directly part of the enclosing function's own execution flow — which matters enormously for how `await` behaves within it.
    **Answer:** B
    **Explanation:** A `for...of` loop's body runs directly within the enclosing async function, so `await` genuinely pauses the loop between iterations, something `.forEach()` cannot do.

23. Why does iterating with `for...in` over an array carry a subtle risk that `for...of` doesn't, specifically regarding inherited or manually added non-index properties?
    A) Both loop types behave identically regarding non-index properties
    B) `for...in` iterates over ALL enumerable properties, including any custom, non-numeric properties someone might have added directly onto the array object (like `arr.customProp = "x"`) or inherited via the prototype chain — `for...of` strictly follows the array's iterator protocol, which only ever yields the actual indexed elements, regardless of any extra properties present
    C) `for...of` also iterates over inherited properties, identically to `for...in`
    D) Arrays can never have custom properties added to them
    **Hint:** Recall that arrays are technically a specialized kind of object — does that mean they could theoretically have arbitrary extra properties attached, beyond just their numeric indexes, that a "loop over every property" approach might inadvertently pick up?
    **Answer:** B
    **Explanation:** `for...in` visits all enumerable properties, including any custom or inherited non-index ones, while `for...of` strictly follows the array's iterator protocol and only yields the indexed elements.

24. Why might combining `Promise.all()` with `.map()` be the idiomatic solution for running multiple async operations concurrently across an array, in contrast to `.forEach()`'s inability to properly sequence or even reliably signal async completion?
    A) `Promise.all()` and `.map()` cannot be meaningfully combined for this purpose
    B) `.map()` naturally returns a new array of the Promises produced by each async callback call, and `Promise.all()` then explicitly waits for every one of those Promises to resolve concurrently, providing a clean, correctly-sequenced way to know when ALL the async operations have genuinely finished — something `.forEach()` offers no built-in mechanism for at all
    C) `.forEach()` already handles this exact scenario correctly and efficiently on its own
    D) `Promise.all()` only works with a single Promise, never multiple
    **Hint:** Think about what `.map()` naturally produces when its callback itself returns a Promise — a whole array *of* Promises — and then consider what tool exists specifically to wait for an entire collection of Promises to settle.
    **Answer:** B
    **Explanation:** `.map()` naturally produces an array of Promises from an async callback, and `Promise.all()` waits for all of them to resolve concurrently, which `.forEach()` has no mechanism for.

25. Why does a `for` loop caching `arr.length` in a separate variable before the loop begins (e.g., `for (let i = 0, len = arr.length; i < len; i++)`) sometimes matter for correctness, not just performance, when the loop body might modify the array?
    A) Caching `.length` has no meaningful effect on correctness in any scenario
    B) If the loop body mutates the array (e.g., pushing new elements), re-evaluating `arr.length` fresh on every iteration (rather than using a cached value) means the loop's exit condition changes dynamically, potentially causing the loop to process the newly-added elements too, or even loop indefinitely if elements keep getting added — caching `.length` upfront locks in a fixed, predictable iteration boundary instead
    C) `.length` is always a constant value that JavaScript automatically caches internally
    D) This concern only applies to `for...of` loops, never standard `for` loops
    **Hint:** Imagine a loop that pushes a new element onto the very array it's currently iterating — with a live, re-evaluated `.length` check each time, would that loop ever actually reach a natural end?
    **Answer:** B
    **Explanation:** If the loop body pushes new elements, re-reading `.length` live each time can make the loop process those new elements too, or never terminate, while caching it upfront fixes the boundary.

26. Why does `.forEach()`'s complete lack of a meaningful, chainable return value (`undefined`) discourage its use in functional-programming-style code compared to `.map()`/`.filter()`/`.reduce()`?
    A) `.forEach()` actually does return a new, transformed array, just like `.map()`
    B) Functional-style code favors chaining transformations together (e.g., `arr.filter(...).map(...).reduce(...)`), which fundamentally depends on each method returning a usable value that the next method in the chain can operate on — `.forEach()`'s `undefined` return value breaks any such chain, making it suitable only as a final, side-effect-only step, never as an intermediate link
    C) `.forEach()` cannot be called on the result of `.map()` or `.filter()`
    D) `.forEach()` always throws an error when used within a method chain
    **Hint:** Try to imagine writing `arr.filter(x => x > 0).forEach(x => x * 2).map(...)` — does that middle `.forEach()` step actually hand anything usable to the `.map()` that follows it?
    **Answer:** B
    **Explanation:** Functional-style chains depend on each step returning a usable value for the next, and `.forEach()`'s `undefined` return value breaks any such chain.

27. Why might a `for...of` loop combined with `.entries()` sometimes be preferred over a traditional indexed `for` loop, even when both the index and value are needed?
    A) There's no meaningful readability or safety benefit to either approach
    B) `for...of` with `.entries()` provides both index and value directly through destructuring (`for (const [i, val] of arr.entries())`), avoiding manual index-based array access (`arr[i]`) entirely — this can reduce the risk of off-by-one errors or typos in manual indexing, while still preserving full access to both pieces of information
    C) `.entries()` executes measurably faster than manual index-based access
    D) Traditional indexed `for` loops cannot access an array's values at all
    **Hint:** Compare the number of opportunities for a typo or off-by-one mistake in `arr[i]` repeated throughout a loop body, versus values already destructured cleanly at the top of each iteration.
    **Answer:** B
    **Explanation:** Destructuring both index and value directly avoids repeated manual `arr[i]` access, reducing the chance of off-by-one errors or typos.

28. Why does understanding that `.forEach()`'s callback receives the array itself as its third parameter (`(element, index, array)`) enable certain patterns, like comparing an element against its neighbors, that would otherwise require capturing the array separately via closure?
    A) `.forEach()`'s callback only ever receives the element, nothing more
    B) Having direct access to the full array (and current index) inside the callback allows patterns like `array[index + 1]` to inspect neighboring elements, without needing to separately reference an outer variable via closure — though closures work too, this built-in parameter offers a self-contained alternative
    C) This third parameter only exists for arrays of numbers
    D) The array parameter is always a copy, not the original array
    **Hint:** Consider a scenario checking "is this element greater than the next one?" — the third parameter gives you a self-contained way to access that neighboring value without needing to separately reach for an outer-scope variable.
    **Answer:** B
    **Explanation:** Having direct access to the array and index inside the callback lets code inspect neighboring elements without needing a separate closure reference to an outer variable.

29. Why can relying on `for...in` to iterate an array that has been extended with `Array.prototype` modifications (a discouraged but historically-seen practice) produce genuinely broken, unexpected iteration results?
    A) Modifying `Array.prototype` has no effect on `for...in` iteration behavior
    B) `for...in` iterates over ALL enumerable properties, including ones inherited through the prototype chain — if `Array.prototype` itself has been extended with additional enumerable properties or methods (an old anti-pattern), those inherited properties would also be visited by `for...in`, alongside the array's actual legitimate indexed elements, producing unexpected extra iterations
    C) This scenario is purely theoretical and has never caused real issues
    D) `for...in` only ever considers an array's own properties, never inherited ones
    **Hint:** This connects the earlier "for...in also considers inherited properties" concern to a specific, historically real-world scenario — modifying built-in prototypes was once common enough that this exact bug pattern was well-documented as a cautionary tale.
    **Answer:** B
    **Explanation:** `for...in` also visits inherited enumerable properties, so extra properties added to `Array.prototype` get iterated over alongside the array's real indexed elements.

30. Why might a code review specifically flag nested `.forEach()` calls used to build up a complex, transformed result (via external mutation of an outer variable) as a candidate for refactoring into a chain of `.map()`/`.flatMap()`/`.reduce()` instead?
    A) Nested `.forEach()` calls are always the clearest and most maintainable approach for this
    B) `.forEach()`-based external mutation obscures the actual data transformation being performed behind imperative, step-by-step side effects on an outer variable, making the code's true purpose ("transform this data into that shape") less immediately clear than an equivalent declarative chain of `.map()`/`.flatMap()`/`.reduce()`, which more directly expresses "how the input data becomes the output data" as a clear pipeline
    C) `.reduce()` cannot handle nested or multi-step transformations
    D) This refactor would always introduce new bugs and should be avoided
    **Hint:** Compare "loop through this, and for each item, mutate this outside variable in this specific way, then loop again and mutate it further" against "this input transforms into this output through this clear pipeline of steps" — which style more directly communicates intent to a future reader?
    **Answer:** B
    **Explanation:** External mutation via nested `.forEach()` calls hides the actual data transformation behind imperative side effects, while a declarative chain more directly expresses the transformation pipeline.

---

## Topic 5: Searching & Transforming Arrays

### Easy

1. What does `.map()` do to an array?
   A) Removes elements that don't match a condition
   B) Creates a new array by transforming every element
   C) Combines all elements into a single value
   D) Sorts the array
   **Hint:** This method applies a transformation function to each element, building a new result array.
   **Answer:** B
   **Explanation:** `.map()` applies a transformation function to every element and returns a new array of the results.

2. What does `[1, 2, 3].map(n => n * 2)` return?
   A) `[1, 2, 3]`
   B) `[2, 4, 6]`
   C) `6`
   D) `[1, 4, 9]`
   **Hint:** Each element gets individually multiplied by 2.
   **Answer:** B
   **Explanation:** Each element is individually doubled, producing `[2, 4, 6]`.

3. What does `.filter()` do to an array?
   A) Doubles every element
   B) Creates a new array containing only elements that pass a given test
   C) Removes all elements
   D) Combines elements into a string
   **Hint:** Think of it like a sieve — only elements meeting a condition make it through.
   **Answer:** B
   **Explanation:** `.filter()` builds a new array containing only the elements for which the test function returns true.

4. What does `[1, 2, 3, 4].filter(n => n > 2)` return?
   A) `[1, 2]`
   B) `[3, 4]`
   C) `[1, 2, 3, 4]`
   D) `2`
   **Hint:** Only the elements greater than `2` survive the filter.
   **Answer:** B
   **Explanation:** Only `3` and `4` satisfy the condition `n > 2`.

5. What does `.find()` return?
   A) An array of all matching elements
   B) The first element that satisfies a given condition, or `undefined` if none match
   C) The total number of matching elements
   D) A boolean indicating whether any element matches
   **Hint:** Unlike `.filter()`, this method stops as soon as it finds one match and returns just that element.
   **Answer:** B
   **Explanation:** `.find()` returns the first element satisfying the given test, or `undefined` if nothing matches.

6. What does `[5, 12, 8, 20].find(n => n > 10)` return?
   A) `5`
   B) `12`
   C) `8`
   D) `20`
   **Hint:** `.find()` returns the very first element satisfying the condition, scanning left to right.
   **Answer:** B
   **Explanation:** Scanning left to right, `12` is the first element greater than `10`.

7. What does `.includes()` check for?
   A) Whether an array is empty
   B) Whether an array contains a specific value
   C) Whether an array has a specific length
   D) Whether two arrays are identical
   **Hint:** This method answers a simple yes/no question about membership.
   **Answer:** B
   **Explanation:** `.includes()` checks whether a specific value exists somewhere in the array.

8. What does `[1, 2, 3].includes(2)` return?
   A) `true`
   B) `false`
   C) `2`
   D) `1`
   **Hint:** Does the array actually contain the value `2` somewhere within it?
   **Answer:** A
   **Explanation:** The array does contain the value `2`, so `.includes(2)` returns `true`.

9. What does `.reduce()` do to an array?
   A) Doubles every element
   B) Combines all elements into a single accumulated value
   C) Sorts the array in ascending order
   D) Removes duplicate elements
   **Hint:** This method "reduces" an entire array down to one final result, like a running total.
   **Answer:** B
   **Explanation:** `.reduce()` processes the array and folds it down into a single accumulated result.

10. What does `[1, 2, 3, 4].reduce((sum, n) => sum + n, 0)` return?
    A) `4`
    B) `10`
    C) `[1, 2, 3, 4]`
    D) `0`
    **Hint:** Starting from `0`, each element is added on, accumulating a running total.
    **Answer:** B
    **Explanation:** Starting from `0`, the elements sum to `1 + 2 + 3 + 4 = 10`.

### Medium

11. What is the second argument to `.reduce()` (in `arr.reduce(callback, initialValue)`) used for?
    A) It's ignored entirely
    B) It sets the starting value for the accumulator, before any elements are processed
    C) It specifies how many elements to process
    D) It determines the sort order
    **Hint:** Without this, `.reduce()` would default to using the array's first element as its starting point instead.
    **Answer:** B
    **Explanation:** The second argument initializes the accumulator before any elements are processed.

12. What does `.indexOf()` return if the searched value isn't found in the array?
    A) `0`
    B) `-1`
    C) `undefined`
    D) `null`
    **Hint:** This is a classic "not found" sentinel value used by several array/string search methods.
    **Answer:** B
    **Explanation:** `.indexOf()` returns `-1` as its standard "not found" sentinel value.

13. What is the key difference between `.find()` and `.filter()`?
    A) They are functionally identical
    B) `.find()` returns the first single matching element (or `undefined`); `.filter()` returns an array of every matching element
    C) `.filter()` only works on numbers
    D) `.find()` always returns an array
    **Hint:** One gives you a single item; the other gives you an entire collection of matches.
    **Answer:** B
    **Explanation:** `.find()` returns just the first matching element (or `undefined`), while `.filter()` returns an array of every match.

14. What does `[1, 2, 3].some(n => n > 2)` return?
    A) `true`
    B) `false`
    C) `[3]`
    D) `3`
    **Hint:** `.some()` checks whether AT LEAST ONE element satisfies the condition.
    **Answer:** A
    **Explanation:** `3` satisfies `n > 2`, so at least one element matches, making `.some()` return `true`.

15. What does `[1, 2, 3].every(n => n > 2)` return?
    A) `true`
    B) `false`
    C) `[3]`
    D) `1`
    **Hint:** `.every()` requires ALL elements to satisfy the condition, not just one.
    **Answer:** B
    **Explanation:** Not every element is greater than `2` (`1` and `2` aren't), so `.every()` returns `false`.

16. What does `.sort()` do to an array by default, without a comparator function, and why might this surprise someone sorting numbers?
    A) It always sorts numbers correctly in ascending numeric order
    B) By default, `.sort()` converts elements to strings and sorts them lexicographically (alphabetically), meaning `[10, 2, 1].sort()` produces `[1, 10, 2]`, not `[1, 2, 10]`
    C) It sorts numerically only, ignoring all other types
    D) It reverses the array instead of sorting it
    **Hint:** Recall the earlier lesson about string comparison being character-by-character — that same rule applies here without an explicit numeric comparator.
    **Answer:** B
    **Explanation:** Without a comparator, `.sort()` converts elements to strings and compares them character by character, so `[10, 2, 1]` becomes `[1, 10, 2]` rather than true numeric order.

17. What does `[10, 2, 1].sort((a, b) => a - b)` correctly produce?
    A) `[1, 10, 2]`
    B) `[1, 2, 10]`
    C) `[10, 2, 1]`
    D) `[2, 1, 10]`
    **Hint:** The comparator `(a, b) => a - b` explicitly forces true numeric ascending order.
    **Answer:** B
    **Explanation:** The `(a, b) => a - b` comparator forces genuine ascending numeric order, giving `[1, 2, 10]`.

18. Does `.sort()` mutate the original array, or return a new one?
    A) It always returns a new array, leaving the original untouched
    B) It mutates the original array in place (and also returns it)
    C) It throws an error if called on a non-empty array
    D) It only works on arrays of strings
    **Hint:** `.sort()` belongs to the same category of "mutating" methods as `.push()` and `.splice()`.
    **Answer:** B
    **Explanation:** `.sort()` reorders the original array's elements in place, and also returns that same mutated array.

19. What does `.reverse()` do to an array?
    A) Sorts it alphabetically
    B) Reverses the order of elements in place
    C) Returns a new array without modifying the original
    D) Removes duplicate values
    **Hint:** This simply flips the existing order, without any sorting logic involved.
    **Answer:** B
    **Explanation:** `.reverse()` flips the existing element order in place, without applying any sorting logic.

20. What does `[1, [2, [3, 4]], 5].flat(2)` return?
    A) `[1, 2, 3, 4, 5]`
    B) `[1, [2, [3, 4]], 5]`
    C) `[1, 2, [3, 4], 5]`
    D) An error
    **Hint:** The argument `2` tells `.flat()` how many levels of nesting to flatten.
    **Answer:** A
    **Explanation:** A depth of `2` is sufficient to flatten both levels of nesting present in this array, giving `[1, 2, 3, 4, 5]`.

### Hard

21. Why does `.map()`'s design (always returning a new array of the same length as the original) make it fundamentally unsuitable for filtering out elements, unlike `.filter()`?
    A) `.map()` can actually remove elements just as effectively as `.filter()`
    B) `.map()` is specifically designed to transform each element 1-to-1, always producing exactly as many output elements as input elements — using it to try to "skip" certain elements (e.g., returning `undefined` conditionally) still leaves a slot in the resulting array for every original element, unlike `.filter()`, which is specifically designed to genuinely omit non-matching elements from the result entirely
    C) `.filter()` and `.map()` produce identical results in every case
    D) `.map()` requires exactly the same number of elements to be removed as kept
    **Hint:** Consider what `[1, 2, 3].map(n => n > 1 ? n : undefined)` actually produces — does it genuinely have fewer elements, or the same count with some now holding `undefined`?
    **Answer:** B
    **Explanation:** `.map()` always produces one output slot per input element, so attempting to "skip" elements still leaves a slot (often holding `undefined`), unlike `.filter()`, which genuinely omits non-matching elements.

22. Why might chaining `.filter().map()` sometimes be less efficient than a single `.reduce()` call achieving the same combined "filter and transform" result, particularly for very large arrays?
    A) There's no meaningful efficiency difference between the two approaches
    B) `.filter().map()` iterates over the array twice (once for filtering, once for transforming) and creates an intermediate array in between, while a single `.reduce()` call can perform both the filtering condition and the transformation logic within one single pass over the array, avoiding the intermediate array allocation
    C) `.reduce()` is always slower than any other array method
    D) `.filter()` and `.map()` cannot be chained together under any circumstances
    **Hint:** Count how many full passes over the array, and how many total array allocations, each approach actually requires to reach the same final result.
    **Answer:** B
    **Explanation:** `.filter().map()` makes two passes and builds an intermediate array, while a single `.reduce()` call can filter and transform in one pass without that extra allocation.

23. Why does `.sort()`'s default lexicographic (string-based) comparison behavior specifically fail for negative numbers in a way that's even more surprising than its behavior with positive numbers alone?
    A) Negative numbers behave identically to positive numbers under default `.sort()`
    B) When converted to strings, a negative sign (`-`) is itself just another character being compared — this can produce especially unintuitive orderings (e.g., `[-5, -20, 3].sort()` doesn't simply place all negative numbers correctly relative to each other or to positive numbers) because the string comparison has no actual understanding of numeric sign or magnitude
    C) `.sort()` automatically throws an error when negative numbers are present
    D) `.sort()` always converts negative numbers to their absolute value before comparing
    **Hint:** Think through exactly how the strings `"-5"`, `"-20"`, and `"3"` would compare character by character, completely divorced from what those strings actually represent numerically.
    **Answer:** B
    **Explanation:** The default lexicographic comparison treats the minus sign as just another character, so it produces orderings that ignore actual numeric sign and magnitude.

24. Why can `.reduce()`'s flexibility (able to build not just numbers, but entirely new objects, arrays, or other complex structures as its accumulated result) make it simultaneously one of the most powerful and one of the most misused/over-complicated array methods?
    A) `.reduce()` can only ever produce a single number as its final result
    B) `.reduce()`'s generality allows it to replace `.map()`, `.filter()`, and even more complex transformations all within a single call by manipulating an arbitrary accumulator — but this same flexibility means overly clever, deeply nested `.reduce()` logic can become significantly harder to read and debug than simply chaining more specific, purpose-built methods like `.filter().map()` for the equivalent result
    C) `.reduce()` is always the most readable choice for every kind of array transformation
    D) `.reduce()` cannot accept an object or array as its initial value
    **Hint:** Consider the tradeoff between "one method that can theoretically do almost anything" versus "several specialized methods, each clearly communicating one specific kind of operation" — power and clarity aren't always aligned.
    **Answer:** B
    **Explanation:** `.reduce()`'s generality lets it replace several other methods via an arbitrary accumulator, but overly clever logic inside it can become harder to read than simply chaining specialized methods.

25. Why does `.find()`'s short-circuiting behavior (stopping at the first match) make it meaningfully more efficient than `.filter()[0]` for locating just one specific element in a large array?
    A) `.filter()[0]` and `.find()` have identical performance characteristics in every case
    B) `.filter()` unconditionally processes every single element in the entire array (building a complete array of all matches) before `[0]` ever selects just the first one, while `.find()` stops iterating immediately the moment it locates a single matching element — for a large array with an early match, this represents substantial wasted work avoided by `.find()`
    C) `.filter()[0]` is actually the more efficient approach for large arrays
    D) `.find()` always processes the entire array regardless of when a match is found
    **Hint:** If the array has 10,000 elements and the desired match happens to be the 3rd one, compare how much total work `.filter()` still performs versus how much work `.find()` performs before stopping.
    **Answer:** B
    **Explanation:** `.filter()` scans the entire array before `[0]` picks the first match, while `.find()` stops as soon as it locates one, avoiding that wasted work.

26. Why might providing an explicit `initialValue` to `.reduce()` be considered a defensive best practice, even in cases where omitting it would technically still "work" for a non-empty array?
    A) Omitting the initial value never causes any practical issues
    B) Without an explicit initial value, `.reduce()` uses the array's first element as the starting accumulator and begins iterating from the second element — this behaves differently (and can produce subtly wrong results, or throw a TypeError on an empty array) compared to explicitly providing an initial value, making the omission a source of edge-case bugs that explicit initialization avoids entirely
    C) `.reduce()` always requires an initial value or it throws a SyntaxError immediately
    D) The initial value only matters for arrays containing strings, not numbers
    **Hint:** Specifically consider what `[].reduce((sum, n) => sum + n)` does — with no elements at all, and no explicit initial value provided, is there even a valid starting point for `.reduce()` to begin from?
    **Answer:** B
    **Explanation:** Without an explicit initial value, `.reduce()` uses the first element as the accumulator and skips it during iteration, which behaves differently and throws on an empty array.

27. Why does `.some()`'s and `.every()`'s shared short-circuiting behavior (both can stop iterating before reaching the end of the array under the right conditions) parallel the short-circuit evaluation seen in logical `&&`/`||` operators?
    A) `.some()` and `.every()` always process every single element regardless of intermediate results
    B) `.some()` stops immediately once it finds a single truthy match (its answer is already determined as `true`), mirroring `||`'s short-circuit; `.every()` stops immediately once it finds a single falsy non-match (its answer is already determined as `false`), mirroring `&&`'s short-circuit — both avoid unnecessary further evaluation once the final result can't possibly change
    C) These two methods have no conceptual relationship to logical operators whatsoever
    D) `.some()` and `.every()` are simply aliases for the exact same underlying method
    **Hint:** Recall precisely how `&&` and `||` avoid evaluating their right-hand side once the left-hand side already determines the outcome — `.some()`/`.every()` apply that exact same efficiency principle across an entire array's elements.
    **Answer:** B
    **Explanation:** `.some()` stops as soon as it finds a truthy match, mirroring `||`, while `.every()` stops as soon as it finds a falsy one, mirroring `&&`, both avoiding unnecessary further evaluation.

28. Why can `.flat(Infinity)` be a useful, deliberate choice for fully flattening a deeply and unpredictably nested array structure, compared to specifying a fixed numeric depth?
    A) `.flat(Infinity)` is invalid syntax and always throws an error
    B) When the nesting depth of an array structure is unknown or varies unpredictably (rather than being a fixed, known depth), passing `Infinity` guarantees every single level of nesting gets flattened completely, regardless of how deep it actually goes — a fixed numeric depth would only flatten up to that specific level, potentially leaving deeper nested arrays still intact
    C) `.flat(Infinity)` behaves identically to `.flat(1)` in every case
    D) `Infinity` as an argument is silently converted to `0` by `.flat()`
    **Hint:** Consider data of truly unknown, variable nesting depth — a fixed number like `.flat(3)` only guarantees flattening exactly 3 levels deep, which may or may not be sufficient depending on the actual data's structure.
    **Answer:** B
    **Explanation:** Passing `Infinity` guarantees complete flattening regardless of how deeply nested the structure actually is, unlike a fixed depth which may not reach far enough.

29. Why does combining `.map()` immediately followed by `.flat()` get its own dedicated, single-method equivalent (`.flatMap()`), and what specific efficiency benefit does this combined method offer over the two-step chain?
    A) `.flatMap()` behaves completely differently from `.map().flat()` and produces unrelated results
    B) `.flatMap()` performs the mapping transformation and the flattening (specifically one level deep) in a single combined pass, avoiding the creation of an unnecessary intermediate nested array that `.map().flat()` would otherwise produce as a separate, discarded intermediate step
    C) `.flatMap()` can flatten arbitrarily deep nesting, unlike `.map().flat()`
    D) `.flatMap()` is purely a stylistic alias with zero performance distinction from the two-step version
    **Hint:** This mirrors the earlier `Array.from()` combined convert-and-map efficiency discussion — `.flatMap()` similarly avoids materializing and then immediately discarding an intermediate array structure.
    **Answer:** B
    **Explanation:** `.flatMap()` maps and flattens one level in a single pass, avoiding the intermediate nested array that `.map().flat()` would otherwise create and discard.

30. Why might a code reviewer specifically question a long, deeply chained sequence of array methods (e.g., `.filter().map().sort().reduce().flat()`) even when each individual method call is used correctly, from a maintainability standpoint?
    A) Long chains of correctly-used array methods present no maintainability concerns whatsoever
    B) While each individual method may be used correctly, an excessively long chain can become difficult to debug (since intermediate results at each step aren't easily inspectable without breaking the chain apart), and can obscure the overall intent of the transformation behind a dense, single-expression pipeline that requires careful, sequential mental tracing to fully understand
    C) JavaScript technically limits how many array methods can be chained together
    D) Chained array methods always execute in a non-deterministic order
    **Hint:** Consider trying to set a debugger breakpoint to inspect the array's state specifically between the `.sort()` and `.reduce()` steps in that chain — how straightforward is that, compared to if each step were instead assigned to its own clearly-named intermediate variable?
    **Answer:** B
    **Explanation:** Even correctly-used chains make intermediate results hard to inspect while debugging and can obscure the transformation's overall intent behind one dense expression.

---

*End of Quiz: JavaScript Arrays — all 5 topics complete, 150 questions total.*
