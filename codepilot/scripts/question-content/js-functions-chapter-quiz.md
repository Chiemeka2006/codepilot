# Quiz: JavaScript Functions

---

## Topic 1: Function Declarations

### Easy

1. Which keyword starts a standard function declaration?
   A) `func`
   B) `function`
   C) `def`
   D) `method`
   **Hint:** This keyword is written out in full, unlike some other languages' abbreviations.
   **Answer:** B
   **Explanation:** The `function` keyword is required to start a standard function declaration.

2. What does `function greet() { console.log("Hi"); }` define?
   A) A variable
   B) A named function
   C) An array
   D) A comment
   **Hint:** `greet` becomes the callable name for this block of code.
   **Answer:** B
   **Explanation:** This defines a named function called `greet` that can be invoked later by name.

3. How do you call (invoke) a function named `greet`?
   A) `greet;`
   B) `greet()`
   C) `call greet`
   D) `run(greet)`
   **Hint:** Parentheses after the function name trigger its execution.
   **Answer:** B
   **Explanation:** Parentheses after a function's name invoke it; `greet` alone just references the function without calling it.

4. What happens if a function has no `return` statement?
   A) It throws an error
   B) It returns `undefined` by default
   C) It returns `null`
   D) It returns an empty string
   **Hint:** JavaScript still gives back a value even when you don't explicitly provide one.
   **Answer:** B
   **Explanation:** A function without an explicit `return` statement implicitly returns `undefined`.

5. Can a function be called before its declaration appears later in the file?
   A) Never, under any circumstances
   B) Yes, for regular function declarations, due to hoisting
   C) Only for arrow functions
   D) Only inside loops
   **Hint:** Function declarations (not expressions) are fully hoisted, body and all, to the top of their scope.
   **Answer:** B
   **Explanation:** Function declarations are hoisted with their full body, so they can be called before their line of code appears in the file.

6. What is inside the parentheses of a function declaration, like `function add(a, b) { }`?
   A) The function's return value
   B) The function's parameters
   C) The function's body
   D) A comment
   **Hint:** These placeholders represent the inputs the function expects to receive.
   **Answer:** B
   **Explanation:** The parentheses in a function declaration hold its parameter list.

7. What is inside the curly braces `{ }` of a function declaration?
   A) The function's parameters
   B) The function's body (the code it runs)
   C) The function's name
   D) A comment only
   **Hint:** This is where the actual logic/statements of the function live.
   **Answer:** B
   **Explanation:** The curly braces contain the function's body — the statements that run when it's called.

8. Which of these is a valid function declaration?
   A) `function() { }`
   B) `function myFunc() { }`
   C) `myFunc function() { }`
   D) `def myFunc() { }`
   **Hint:** A standard function declaration requires a name directly after the `function` keyword.
   **Answer:** B
   **Explanation:** A function declaration needs the `function` keyword followed by a name and parentheses, which only option B provides correctly.

9. What does the `return` keyword do inside a function?
   A) Ends the function and sends a value back to the caller
   B) Deletes the function
   C) Restarts the function
   D) Pauses the function indefinitely
   **Hint:** This keyword both stops further execution and hands back a result.
   **Answer:** A
   **Explanation:** `return` immediately exits the function and passes a value back to whatever called it.

10. Can code after a `return` statement (within the same function) still execute?
    A) Yes, always
    B) No — `return` immediately exits the function
    C) Only if wrapped in a loop
    D) Only in arrow functions
    **Hint:** Once a function "returns," is there any more of that function left to run?
    **Answer:** B
    **Explanation:** Once `return` executes, the function exits immediately, so any code written after it in that function never runs.

### Medium

11. What is "function hoisting"?
    A) A performance optimization only
    B) The behavior where function declarations are moved to the top of their scope during compilation, making them callable before their literal line of code
    C) Deleting unused functions automatically
    D) Converting functions into variables
    **Hint:** This explains why calling a function above its declaration in the file still works, for this specific function style.
    **Answer:** B
    **Explanation:** Function hoisting moves the entire function declaration, including its body, to the top of its scope, making it callable before its written position.

12. What's the difference between a function's "parameters" and its "arguments"?
    A) They are exactly the same thing
    B) Parameters are the named placeholders in the function definition; arguments are the actual values passed in when calling it
    C) Parameters only apply to arrow functions
    D) Arguments are always optional; parameters are required
    **Hint:** One term describes the definition-time placeholders; the other describes the call-time actual values.
    **Answer:** B
    **Explanation:** Parameters are the placeholder names in the function definition, while arguments are the actual values supplied at the call site.

13. What happens if you call a function with fewer arguments than it has parameters?
    A) It throws an error immediately
    B) The missing parameters become `undefined` inside the function
    C) The function refuses to run
    D) JavaScript automatically fills them with `0`
    **Hint:** JavaScript doesn't enforce argument counts strictly — unfilled parameters just don't get a value.
    **Answer:** B
    **Explanation:** JavaScript doesn't require every parameter to receive a value, so any parameter without a matching argument simply becomes `undefined`.

14. What happens if you call a function with more arguments than it has parameters?
    A) It throws an error
    B) The extra arguments are simply ignored by the named parameters (though still accessible via `arguments`)
    C) It automatically creates new parameters
    D) The function call fails silently and does nothing
    **Hint:** JavaScript doesn't strictly enforce matching argument counts in either direction.
    **Answer:** B
    **Explanation:** Extra arguments beyond the named parameters are ignored by those parameters, though they remain accessible through the `arguments` object.

15. Can a function declaration exist inside another function?
    A) No, functions cannot be nested
    B) Yes, this creates a nested (inner) function with access to the outer function's scope
    C) Only arrow functions can be nested
    D) Only if both are named identically
    **Hint:** JavaScript allows functions to be defined anywhere a statement is valid, including inside another function's body.
    **Answer:** B
    **Explanation:** JavaScript allows nested function declarations, and the inner function has access to the outer function's scope through closures.

16. What is the `arguments` object available inside a regular (non-arrow) function?
    A) An array-like object containing all arguments passed to the function
    B) A single number representing the parameter count
    C) It doesn't exist in JavaScript
    D) A special variable only usable in arrow functions
    **Hint:** This is an older, automatically-provided way to access every value passed into a function call, regardless of named parameters.
    **Answer:** A
    **Explanation:** The `arguments` object is an array-like structure automatically available in regular functions, containing every argument passed to the call.

17. Does the `arguments` object exist inside arrow functions?
    A) Yes, identically to regular functions
    B) No — arrow functions don't have their own `arguments` object
    C) Only in Node.js
    D) Only if explicitly declared
    **Hint:** This is one of several behavioral differences between arrow functions and traditional function declarations.
    **Answer:** B
    **Explanation:** Arrow functions do not have their own `arguments` object; they inherit it, if any, from the nearest enclosing regular function.

18. What is a common reason to give a function a well-chosen name?
    A) Function names have no effect on anything
    B) It documents intent, making code more readable and stack traces more useful for debugging
    C) It changes the function's performance
    D) It's required for the code to run at all
    **Hint:** Think about what appears in an error's stack trace when something goes wrong deep inside a function call.
    **Answer:** B
    **Explanation:** A descriptive function name documents its intent and makes stack traces far more useful when debugging.

19. What does calling a function that doesn't exist yet (before its declaration) return, for a hoisted function declaration?
    A) `undefined`
    B) The correct result, since the full function is hoisted with its body intact
    C) A `ReferenceError`
    D) `null`
    **Hint:** Unlike variable hoisting, function declaration hoisting brings the entire function body along, not just the name.
    **Answer:** B
    **Explanation:** Because the entire function declaration, not just its name, is hoisted, calling it before its line in the file still executes correctly.

20. Can a function return another function?
    A) No, functions can only return primitive values
    B) Yes, functions are values in JavaScript and can be returned like any other value
    C) Only arrow functions can do this
    D) Only if the returned function has no parameters
    **Hint:** JavaScript treats functions as "first-class citizens" — they can be passed around and returned just like numbers or strings.
    **Answer:** B
    **Explanation:** Functions are first-class values in JavaScript, so a function can create and return another function just like any other value.

### Hard

21. Why does calling a function declaration before its line of code work correctly, but doing the same with a function expression assigned to a `let`/`const` variable throws an error?
    A) There's no actual difference between the two
    B) Function declarations are fully hoisted (name and body); function expressions are hoisted only as their variable declaration (via `let`/`const`'s rules), leaving them in the temporal dead zone until their actual assignment line runs
    C) Function expressions can never be hoisted under any interpretation
    D) This only differs in strict mode
    **Hint:** Separate the two hoisting mechanisms at play — one hoists an entire callable function, the other hoists only an uninitialized variable binding.
    **Answer:** B
    **Explanation:** Function declarations hoist their complete body, while `let`/`const` function expressions only hoist an uninitialized binding that stays in the temporal dead zone until the assignment line actually runs.

22. Why might relying on the `arguments` object instead of rest parameters (`...args`) be considered outdated practice in modern JavaScript?
    A) `arguments` was completely removed from the language
    B) `arguments` is array-like but not a true array (lacking methods like `.map()` directly), doesn't exist in arrow functions, and rest parameters offer a cleaner, more explicit, array-based alternative
    C) Rest parameters only work with numbers
    D) `arguments` is faster in every case, so this concern is misguided
    **Hint:** Consider trying to call `.map()` directly on `arguments` without first converting it — does that work out of the box?
    **Answer:** B
    **Explanation:** `arguments` is only array-like, lacking real array methods, is absent in arrow functions, and rest parameters give a cleaner, genuinely array-based alternative.

23. Why does a function declaration nested inside a conditional block (`if (condition) { function foo() {} }`) behave inconsistently across different JavaScript environments/versions?
    A) This pattern always behaves identically everywhere
    B) Historically, function declarations inside blocks had non-standardized, browser-specific hoisting behavior; modern strict-mode environments now standardize it as block-scoped, but this inconsistency across older engines makes the pattern risky
    C) Conditional blocks cannot contain any function declarations, ever
    D) This only affects arrow functions
    **Hint:** This is a well-documented historical quirk where different JavaScript engines disagreed on whether such a function should be accessible outside its `if` block.
    **Answer:** B
    **Explanation:** Function declarations nested in blocks historically had inconsistent, engine-specific hoisting behavior, which is why the pattern remains risky even after modern engines standardized it.

24. Why can two different calls to the same function, using its `arguments` object, potentially observe different behavior between "sloppy mode" and "strict mode" regarding parameter mutation?
    A) `arguments` behaves identically in both modes
    B) In sloppy mode, `arguments[i]` stays linked to its corresponding named parameter (mutating one affects the other); in strict mode, this link is severed, and they're fully independent
    C) Strict mode disables the `arguments` object entirely
    D) This distinction only applies to arrow functions
    **Hint:** This is one of several deliberate behavioral changes strict mode introduced specifically to make code more predictable and less "magical."
    **Answer:** B
    **Explanation:** In sloppy mode, `arguments` entries stay linked to their named parameters so mutating one changes the other, but strict mode severs that link so they behave independently.

25. Why does recursion (a function calling itself) rely fundamentally on the function having a stable, accessible name — and what problem can arise with anonymous function expressions attempting recursion?
    A) Recursion is impossible in JavaScript
    B) An anonymous function expression assigned to a variable can still reference itself via that variable name inside its body, but this breaks if the variable is later reassigned — a named function expression avoids this fragility by having an internal, immutable name reference
    C) Only function declarations can ever be recursive
    D) Recursion requires the `arguments` object specifically
    **Hint:** Consider what happens to a recursive call if the outer variable holding the function gets reassigned to something else mid-execution — does the internal recursive call still find the original function?
    **Answer:** B
    **Explanation:** A named function expression keeps a stable internal name it can call recursively, unlike an anonymous function that relies on an outer variable which could be reassigned before the recursive call runs.

26. Why might excessive nesting of function declarations within other functions create challenges for testability, even though it's a fully valid pattern?
    A) Nested functions cannot be defined at all
    B) Deeply nested inner functions are tied to their enclosing function's scope and can't easily be tested or reused in isolation without first extracting and exposing them separately
    C) JavaScript enforces a strict nesting limit
    D) Nested functions always run asynchronously
    **Hint:** Think about how you'd write a unit test targeting only the inner function, without also having to invoke and account for the entire outer function around it.
    **Answer:** B
    **Explanation:** Deeply nested inner functions are bound to their enclosing function's scope, making them hard to test or reuse in isolation without first extracting them.

27. Why does the phrase "functions are first-class citizens" carry particular significance for JavaScript's overall design and idioms (like callbacks and higher-order functions)?
    A) It's a purely academic term with no practical implications
    B) It means functions can be assigned to variables, passed as arguments, and returned from other functions just like any other value, which is the foundation for patterns like callbacks, closures, and functional-style array methods
    C) It only applies to arrow functions specifically
    D) It means functions execute with elevated system privileges
    **Hint:** Consider how array methods like `.map()` or `.filter()` fundamentally depend on being able to pass a function in as a regular argument.
    **Answer:** B
    **Explanation:** "First-class citizen" means functions can be stored in variables, passed as arguments, and returned from other functions, which underlies patterns like callbacks and higher-order functions.

28. Why can naming a function parameter the same as an outer-scope variable create confusing shadowing behavior inside that function's body?
    A) JavaScript disallows this naming collision entirely
    B) The parameter name takes precedence within the function's own scope, "shadowing" the outer variable — any reference to that name inside the function refers to the parameter, not the outer variable, which can be surprising if not intentional
    C) Both the parameter and the outer variable are merged into one shared value
    D) This always throws a runtime error
    **Hint:** Think of it like two people in a family sharing a first name — inside a specific room (the function), context determines which one you actually mean.
    **Answer:** B
    **Explanation:** A parameter with the same name as an outer variable shadows it within the function, so any reference to that name inside the function resolves to the parameter.

29. Why does a function declaration's hoisted availability throughout its entire enclosing scope (not just after its line) sometimes get exploited deliberately for organizing code (e.g., writing helper functions below the main logic that uses them)?
    A) This exploitation is actually impossible due to strict hoisting restrictions
    B) Since the full function (not just its name) is hoisted, developers can call a helper function before its definition appears textually, allowing "main logic first, helper details below" file organization as a deliberate readability choice
    C) This pattern only works with arrow functions
    D) Function declarations lose their hoisting benefit once the file exceeds a certain length
    **Hint:** Consider the readability benefit of seeing your primary logic first, with supporting helper function definitions placed afterward — hoisting is precisely what makes that ordering choice possible.
    **Answer:** B
    **Explanation:** Since the whole function is hoisted, developers can write their main logic first and place helper function declarations below it, relying on hoisting to make them callable earlier in the file.

30. Why might the choice between a function declaration and a function expression matter for conditional function definition (e.g., defining different implementations of the same function name based on a runtime condition)?
    A) There's no meaningful difference between the two approaches here
    B) Function expressions assigned to a `let`/`const` variable can be conditionally reassigned at runtime based on logic, while function declarations are hoisted and fixed at parse time, making expressions the more flexible (and often only correct) choice for this specific pattern
    C) Function declarations are always the better choice for any conditional logic
    D) Conditional function definition is entirely impossible in JavaScript
    **Hint:** Recall the historical inconsistency around function declarations nested inside `if` blocks — which approach (declaration or expression assigned to a variable) gives you more predictable, standardized control over which implementation actually gets used?
    **Answer:** B
    **Explanation:** A function expression assigned to `let`/`const` can be reassigned conditionally at runtime, whereas a function declaration is fixed at parse time, making expressions the more reliable choice for conditional definitions.

---

## Topic 2: Parameters & Arguments

### Easy

1. In `function greet(name) { }`, what is `name`?
   A) An argument
   B) A parameter
   C) A return value
   D) A comment
   **Hint:** This is the placeholder defined in the function itself, before any actual value is supplied.
   **Answer:** B
   **Explanation:** `name` is the named placeholder declared in the function definition, which makes it a parameter.

2. In `greet("Ada")`, what is `"Ada"`?
   A) A parameter
   B) An argument
   C) A return value
   D) A variable declaration
   **Hint:** This is the actual value being handed to the function at the moment it's called.
   **Answer:** B
   **Explanation:** `"Ada"` is the actual value supplied at the call site, which makes it an argument.

3. Can a function have more than one parameter?
   A) No, only one is allowed
   B) Yes, separated by commas
   C) Only up to three
   D) Only if they're all numbers
   **Hint:** Think of `function add(a, b) { }` — how many parameters does that have?
   **Answer:** B
   **Explanation:** A function can declare any number of parameters, separated by commas.

4. What happens to a parameter's value if no matching argument is provided during the function call?
   A) It becomes `0`
   B) It becomes `undefined`
   C) It throws an error
   D) It becomes an empty string
   **Hint:** JavaScript doesn't require every parameter to be filled — what's the default state for a missing one?
   **Answer:** B
   **Explanation:** A parameter with no corresponding argument simply defaults to `undefined`.

5. In `function add(a, b) { return a + b; }`, calling `add(2, 3)` returns what?
   A) `2`
   B) `3`
   C) `5`
   D) `"23"`
   **Hint:** `a` becomes `2` and `b` becomes `3` — then they're added together.
   **Answer:** C
   **Explanation:** `a` is `2` and `b` is `3`, so `a + b` evaluates to `5`.

6. Can you pass a string as an argument even if the parameter isn't explicitly typed as one?
   A) No, JavaScript enforces types on parameters
   B) Yes, JavaScript parameters accept any type of value
   C) Only inside arrow functions
   D) Only with `const` parameters
   **Hint:** Recall that JavaScript is dynamically typed — does that extend to function parameters too?
   **Answer:** B
   **Explanation:** JavaScript is dynamically typed, so parameters accept any type of value regardless of how the function uses them.

7. What does `function multiply(x, y) { return x * y; }` return when called as `multiply(4, 5)`?
   A) `9`
   B) `1`
   C) `20`
   D) `45`
   **Hint:** `x` is `4`, `y` is `5` — multiply them together.
   **Answer:** C
   **Explanation:** `x` is `4` and `y` is `5`, so `x * y` evaluates to `20`.

8. Are parameter names required to match the argument variable names used when calling the function?
   A) Yes, always
   B) No, parameter names are entirely independent of whatever variable names (if any) are used at the call site
   C) Only for arrow functions
   D) Only if using `const`
   **Hint:** Consider `add(x, y)` called as `add(myNum1, myNum2)` — do the names need to line up exactly?
   **Answer:** B
   **Explanation:** Parameter names are entirely local to the function and don't need to match whatever variable names are used at the call site.

9. What happens if you call `function greet(name) { }` with zero arguments, like `greet()`?
   A) It throws a syntax error
   B) `name` becomes `undefined` inside the function
   C) The function doesn't run
   D) `name` becomes an empty string automatically
   **Hint:** JavaScript is lenient about argument count — a missing one just results in a familiar special value.
   **Answer:** B
   **Explanation:** Since no argument was supplied, the `name` parameter defaults to `undefined`.

10. Which of these correctly calls a function `greet` with the argument `"Zara"`?
    A) `greet["Zara"]`
    B) `greet("Zara")`
    C) `greet: "Zara"`
    D) `greet = "Zara"`
    **Hint:** Function calls always use parentheses around their arguments.
    **Answer:** B
    **Explanation:** Function calls pass arguments inside parentheses, so `greet("Zara")` is the correct syntax.

### Medium

11. What does "parameter shadowing" refer to?
    A) Parameters cannot conflict with any other variable ever
    B) A parameter name that matches an outer-scope variable name takes precedence within the function, hiding ("shadowing") the outer variable for the duration of that function
    C) Parameters are always hidden from `console.log`
    D) It's a synonym for hoisting
    **Hint:** Think about what happens when a function's own local parameter shares a name with something declared outside of it.
    **Answer:** B
    **Explanation:** Parameter shadowing occurs when a parameter's name matches an outer-scope variable, causing the parameter to take precedence inside the function.

12. What does `function sum(...numbers) { }` represent?
    A) A syntax error
    B) A rest parameter, collecting any number of arguments into a single array called `numbers`
    C) A way to require exactly three arguments
    D) A shorthand for default parameters
    **Hint:** The `...` prefix signals "gather everything remaining" into one array-like structure.
    **Answer:** B
    **Explanation:** The `...numbers` syntax is a rest parameter that gathers all remaining arguments into a single array named `numbers`.

13. What does `sum(1, 2, 3, 4)` return, given `function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }`?
    A) `1`
    B) `10`
    C) `[1, 2, 3, 4]`
    D) `NaN`
    **Hint:** The rest parameter collects all four arguments into an array, then `.reduce()` adds them all together.
    **Answer:** B
    **Explanation:** The rest parameter collects `[1, 2, 3, 4]`, and reducing them with addition starting from `0` yields `10`.

14. Can rest parameters be combined with regular named parameters, like `function greet(greeting, ...names) { }`?
    A) No, rest parameters must be the only parameter
    B) Yes, but the rest parameter must be the last parameter listed
    C) Yes, and it can be placed anywhere in the list
    D) Only if there's exactly one regular parameter
    **Hint:** Since a rest parameter collects "everything else remaining," where would it logically need to sit in the parameter list?
    **Answer:** B
    **Explanation:** Rest parameters can be combined with named parameters, but the rest parameter must always come last in the list.

15. What does passing an object as an argument, then modifying one of its properties inside the function, do to the original object outside the function?
    A) Nothing — objects are always copied when passed as arguments
    B) The original object's property is also modified, since objects are passed by reference
    C) It throws an error
    D) It creates a completely new, unrelated object
    **Hint:** Unlike primitives, objects passed to functions share the same underlying memory reference as the original.
    **Answer:** B
    **Explanation:** Objects are passed by reference, so modifying a property on the parameter inside the function also modifies the original object outside it.

16. What happens if you reassign a parameter itself (not one of its properties) to a brand-new object inside a function?
    A) It changes the original object outside the function too
    B) It only changes the local parameter variable inside the function; the original outer variable/object reference remains untouched
    C) It throws a TypeError
    D) It deletes the original object entirely
    **Hint:** Distinguish between changing *what an object contains* versus changing *what the local variable itself points to*.
    **Answer:** B
    **Explanation:** Reassigning the parameter itself only changes what the local variable points to; it doesn't affect the original reference held outside the function.

17. What is "destructuring" a parameter, as in `function greet({ name, age }) { }`?
    A) A syntax error
    B) Extracting specific properties directly from an object argument into individually named local variables
    C) A way to delete object properties
    D) Only usable with arrays, never objects
    **Hint:** This lets you skip writing `person.name` and `person.age` repeatedly inside the function body.
    **Answer:** B
    **Explanation:** Destructuring a parameter extracts specific properties from an object argument directly into individually named local variables.

18. Given `function greet({ name, age }) { console.log(name); }`, what does calling `greet({ name: "Femi", age: 30 })` print?
    A) `{ name: "Femi", age: 30 }`
    B) `"Femi"`
    C) `30`
    D) `undefined`
    **Hint:** Destructuring pulls the `name` property out directly, making it usable as its own variable.
    **Answer:** B
    **Explanation:** The destructured `name` parameter pulls out the `"Femi"` property, which is exactly what `console.log(name)` prints.

19. Can array destructuring also be used for parameters, like `function getFirst([first]) { }`?
    A) No, destructuring only works with objects
    B) Yes, array destructuring in parameters extracts specific elements by position
    C) Only inside arrow functions
    D) Only for arrays of exactly two elements
    **Hint:** Just as `{ }` destructures object properties, `[ ]` can destructure array elements by their position.
    **Answer:** B
    **Explanation:** Array destructuring can also be used in parameter lists to extract elements by their position.

20. Why might destructured parameters with default values, like `function greet({ name = "Guest" } = {}) { }`, be used together?
    A) This combination is invalid syntax
    B) It handles both a missing property within a passed object, and a completely missing object argument altogether, each falling back to a sensible default
    C) It only guards against a missing object, not a missing property
    D) It only guards against a missing property, not a missing object
    **Hint:** Notice there are two separate default fallbacks here — one for `name` if that specific property is missing, and one for the entire argument object if nothing at all is passed.
    **Answer:** B
    **Explanation:** Combining a property default with an object default handles both a missing property inside a passed object and a completely missing argument object.

### Hard

21. Why does modifying a parameter that holds a primitive value (like a number) inside a function never affect the original variable outside, while modifying a parameter holding an object's *properties* does?
    A) There's no actual distinction — both behave identically
    B) Primitives are passed by value (a full independent copy), so changes to the parameter don't touch the original; objects are passed by reference (a copy of the reference/pointer), so modifying the object's contents through that reference does affect the original object
    C) Objects are always passed by value too, just like primitives
    D) This distinction only applies to arrow functions
    **Hint:** Distinguish between "copying the actual value" (primitives) versus "copying a pointer to the same underlying data" (objects) — this is the core pass-by-value vs. pass-by-reference distinction.
    **Answer:** B
    **Explanation:** Primitives are passed by value, an independent copy, so changing the parameter doesn't affect the original, while objects are passed by reference, so mutating their properties through that reference does affect the original.

22. Why can rest parameters (`...args`) combined with destructuring, like `function process({ id, ...rest }) { }`, be a powerful pattern for handling flexible object shapes?
    A) This syntax combination is actually invalid
    B) It extracts specific known properties (`id`) individually while collecting all remaining, unknown properties into a single `rest` object — useful for functions that need to handle a "known subset plus everything else" pattern
    C) `...rest` here behaves identically to the array rest parameter, collecting indexed elements
    D) This pattern only works with exactly two properties
    **Hint:** Think of a scenario where you want to pull out one specific field, but still preserve access to whatever other fields might be present, without hardcoding all their names.
    **Answer:** B
    **Explanation:** This pattern extracts the known `id` property individually while collecting every other remaining property into a single `rest` object.

23. Why might the deliberate choice between destructured object parameters (`function create({ name, age })`) versus multiple positional parameters (`function create(name, age)`) matter for a function with many optional configuration options?
    A) There's no practical difference between the two approaches
    B) Destructured object parameters let callers specify only the options they care about, in any order, using named properties — positional parameters force callers to remember exact argument order and often require passing `undefined` placeholders to skip earlier optional parameters
    C) Positional parameters always support more arguments than destructured ones
    D) Destructured parameters cannot have default values
    **Hint:** Consider a function with 5 optional settings — if you only want to override the 4th one using positional parameters, what do you have to do about the first three?
    **Answer:** B
    **Explanation:** Destructured object parameters let callers pass only the named options they need in any order, while positional parameters force callers to remember exact ordering and often pass `undefined` placeholders to skip earlier options.

24. Why does attempting to destructure a parameter with `function greet({ name }) { }`, then calling `greet()` with no arguments at all, throw a TypeError rather than simply leaving `name` as `undefined`?
    A) This scenario doesn't actually throw an error
    B) Destructuring attempts to read a property (`name`) from the argument — since no argument was passed at all, the argument itself is `undefined`, and JavaScript cannot destructure properties from `undefined`, causing the error
    C) TypeErrors only occur with array destructuring, never object destructuring
    D) This only happens in strict mode
    **Hint:** Distinguish between "the object exists but this specific property is missing" (fine, just `undefined`) versus "there's no object at all to even look inside of" (a genuine error).
    **Answer:** B
    **Explanation:** With no argument at all, the argument itself is `undefined`, and JavaScript cannot destructure a property from `undefined`, which causes a TypeError.

25. Why does providing a default empty object (`= {}`) alongside destructured parameters, like `function greet({ name } = {})`, specifically solve the TypeError scenario from calling with no arguments?
    A) It doesn't solve anything — the error still occurs
    B) The `= {}` default only kicks in when the argument itself is `undefined` (i.e., nothing was passed), providing a fallback empty object to destructure from instead of attempting to destructure `undefined` directly
    C) `= {}` prevents destructuring from ever running at all
    D) This default only works for array destructuring, not objects
    **Hint:** Default parameter values only activate when the argument is `undefined` — pair that fact with what destructuring actually needs to have something to work with.
    **Answer:** B
    **Explanation:** The `= {}` default only activates when the argument is `undefined`, supplying a fallback empty object so destructuring has something to read from instead of failing.

26. Why can excessive use of rest parameters combined with complex destructuring patterns sometimes reduce, rather than improve, a function signature's readability?
    A) This combination is always the clearest possible approach
    B) Deeply nested or heavily destructured parameter signatures can obscure exactly what shape of data the function expects, making it harder for a reader to quickly understand the function's contract compared to simpler, well-documented parameters
    C) JavaScript technically limits how many properties can be destructured at once
    D) Rest parameters cannot be used inside destructured objects at all
    **Hint:** Consider a function signature with three levels of nested destructuring and a rest parameter — how quickly could a new team member understand what to actually pass in, just by glancing at the signature?
    **Answer:** B
    **Explanation:** Deeply nested or heavily destructured parameter signatures can obscure what shape of data a function actually expects, hurting readability compared to simpler parameters.

27. Why does the order of rest parameters relative to other parameters (`function f(a, ...rest)` valid, but `function f(...rest, a)` invalid) reflect a fundamental constraint of how rest parameters work?
    A) There's no such ordering constraint — both are equally valid
    B) A rest parameter collects "all remaining arguments," which is only a coherent concept if it's positioned last — placing it earlier would create ambiguity about which arguments belong to it versus subsequent named parameters
    C) This constraint only applies when there are more than two parameters total
    D) JavaScript automatically reorders parameters to fix this issue silently
    **Hint:** If `...rest` came first, how would the engine know how many of the incoming arguments to include in `rest` versus save for the parameters after it?
    **Answer:** B
    **Explanation:** A rest parameter collects "everything remaining," which only makes sense if it's the last parameter — placing it earlier would create ambiguity about which arguments belong to it.

28. Why might mutating a destructured object property inside a function (e.g., `function update({ user }) { user.name = "New"; }`) have unexpected consequences for code calling this function elsewhere?
    A) Destructuring always creates a fully independent copy, so this is perfectly safe
    B) Destructuring extracts a reference to the nested object, not a copy — mutating `user.name` inside the function still modifies the original object that was passed in, exactly like any other reference-type mutation
    C) This mutation only affects the function's local scope
    D) Destructured properties are always read-only
    **Hint:** Destructuring is just a convenient way of accessing a property — it doesn't change whether that property, if itself an object, is passed by reference.
    **Answer:** B
    **Explanation:** Destructuring only extracts a reference to the nested object, so mutating one of its properties inside the function still changes the original object passed in.

29. Why is understanding the evaluation order of default parameter expressions important when one default parameter's value depends on an earlier parameter, like `function calc(a, b = a * 2) { }`?
    A) Default parameters cannot reference other parameters at all
    B) Parameters are evaluated left to right, so `b`'s default expression can safely reference `a` (since `a` has already been assigned by the time `b`'s default is evaluated) — but the reverse (`a` referencing a later `b`) would fail
    C) Both parameters are always evaluated simultaneously
    D) This pattern always throws a ReferenceError regardless of order
    **Hint:** Since parameters are processed in the order they're listed, only earlier parameters are guaranteed to already have a value when a later parameter's default expression runs.
    **Answer:** B
    **Explanation:** Parameters are evaluated left to right, so a later parameter's default can safely reference an earlier one that's already been assigned.

30. Why does the interaction between rest parameters and the `arguments` object (in a non-arrow function using both) sometimes lead to subtle confusion for developers transitioning from older JavaScript codebases?
    A) Rest parameters and `arguments` always contain identical values in every situation
    B) `arguments` reflects every argument passed to the function call (array-like, including all values), while a rest parameter only captures arguments from its own position onward — mixing both in the same function can lead to mismatched expectations about which one reflects the "full" argument list
    C) Using both together always throws a SyntaxError
    D) `arguments` is completely removed whenever a rest parameter is present
    **Hint:** If a function has `function f(a, ...rest)` called as `f(1, 2, 3)`, compare exactly what `arguments` contains versus what `rest` contains — they're capturing overlapping but not identical information.
    **Answer:** B
    **Explanation:** `arguments` reflects every argument passed to the call, while a rest parameter only captures arguments from its own position onward, so the two can hold different, overlapping sets of values.

---

## Topic 3: Return Values

### Easy

1. What keyword is used to send a value back from a function?
   A) `send`
   B) `return`
   C) `output`
   D) `give`
   **Hint:** This is the standard keyword shared across many programming languages for this purpose.
   **Answer:** B
   **Explanation:** The `return` keyword sends a value back to the function's caller.

2. What does `function double(x) { return x * 2; }` return when called as `double(5)`?
   A) `5`
   B) `10`
   C) `25`
   D) `52`
   **Hint:** `x` becomes `5`, then gets multiplied by `2`.
   **Answer:** B
   **Explanation:** `x` is `5`, and `x * 2` evaluates to `10`.

3. If a function has no `return` statement, what value does calling it produce?
   A) `null`
   B) `0`
   C) `undefined`
   D) An empty string
   **Hint:** JavaScript still gives back a specific default value even when nothing is explicitly returned.
   **Answer:** C
   **Explanation:** A function without a `return` statement produces `undefined` when called.

4. Can a function return more than one value directly?
   A) Yes, by listing multiple values after `return`
   B) No, but it can return a single array or object containing multiple values
   C) No, functions can never return more than `undefined`
   D) Only arrow functions can do this
   **Hint:** While `return` itself only accepts one expression, that one expression could itself be a collection.
   **Answer:** B
   **Explanation:** `return` only accepts a single expression, but that expression can be an array or object bundling multiple values.

5. What does `function isEven(n) { return n % 2 === 0; }` return when called as `isEven(4)`?
   A) `4`
   B) `0`
   C) `true`
   D) `false`
   **Hint:** `4 % 2` gives `0`, and `0 === 0` is a comparison that resolves to a boolean.
   **Answer:** C
   **Explanation:** `4 % 2` is `0`, and `0 === 0` evaluates to the boolean `true`.

6. Where must a `return` statement be located?
   A) Anywhere in the file
   B) Inside a function's body
   C) Only at the very top of a function
   D) Only inside `if` statements
   **Hint:** `return` only makes sense in the context of exiting some enclosing function.
   **Answer:** B
   **Explanation:** `return` only makes sense within a function, since it exits that function and sends a value back to its caller.

7. Can you use `return` outside of a function?
   A) Yes, it works anywhere
   B) No, this causes a SyntaxError
   C) Only in the global scope
   D) Only inside loops
   **Hint:** `return` fundamentally means "hand this value back to whoever called this function" — what does that require existing?
   **Answer:** B
   **Explanation:** Using `return` outside any function has no enclosing function to exit, which causes a SyntaxError.

8. What happens to code written after a `return` statement, still inside the same function?
   A) It runs normally
   B) It is never executed ("unreachable code")
   C) It causes a syntax error at that point
   D) It runs only if the function is called twice
   **Hint:** `return` immediately exits the function the moment it executes.
   **Answer:** B
   **Explanation:** Since `return` immediately exits the function, any code written after it in the same function never executes.

9. What does calling `function sayHi() { console.log("Hi"); }` (with no `return`) actually return?
   A) `"Hi"`
   B) `undefined`
   C) `null`
   D) An error
   **Hint:** `console.log` prints to the console, but that's a separate action from what the function itself sends back to its caller.
   **Answer:** B
   **Explanation:** `console.log` only prints text; without an explicit `return`, the function itself still returns `undefined`.

10. Which of these correctly captures a function's returned value into a variable?
    A) `let result -> myFunction();`
    B) `let result = myFunction();`
    C) `let result <- myFunction();`
    D) `let result == myFunction();`
    **Hint:** This uses the standard assignment operator, same as any other variable assignment.
    **Answer:** B
    **Explanation:** The standard assignment operator `=` is used to store a function's returned value in a variable.

### Medium

11. Can a function return the result of calling another function directly, like `return anotherFunction();`?
    A) No, this is invalid syntax
    B) Yes, whatever `anotherFunction()` returns becomes the outer function's return value too
    C) Only if both functions have identical names
    D) Only for arrow functions
    **Hint:** `return` accepts any expression, and a function call is itself just an expression that evaluates to a value.
    **Answer:** B
    **Explanation:** `return` accepts any expression, including a function call, so the outer function returns whatever the inner call returns.

12. What happens if a function has multiple `return` statements inside different branches of an `if`/`else`?
    A) It's a syntax error to have more than one `return`
    B) Only the `return` statement in whichever branch actually executes will run, immediately exiting the function
    C) Both `return` statements always execute
    D) Only the last `return` statement in the file matters
    **Hint:** Since `if`/`else` only runs one branch at a time, only that branch's `return` (if reached) will actually fire.
    **Answer:** B
    **Explanation:** Only the branch that actually executes reaches its `return` statement, which then immediately exits the function.

13. What does the following function return when called with `checkAge(15)`? `function checkAge(age) { if (age >= 18) { return "adult"; } return "minor"; }`
    A) `"adult"`
    B) `"minor"`
    C) `undefined`
    D) `15`
    **Hint:** Since `15 >= 18` is false, the `if` block's `return` never executes — control falls through to the line after it.
    **Answer:** B
    **Explanation:** Since `15 >= 18` is false, the `if` block's `return "adult"` is skipped, and execution falls through to `return "minor"`.

14. Can `return;` (with no value at all) be used inside a function?
    A) No, `return` always requires a value
    B) Yes, this exits the function early and returns `undefined`
    C) Only inside `if` statements
    D) This causes a runtime error
    **Hint:** `return` alone still performs its core job of exiting the function — it just doesn't hand back anything meaningful.
    **Answer:** B
    **Explanation:** `return` alone still exits the function immediately; it simply hands back `undefined` since no value follows it.

15. Why might a function use `return` early inside a validation check, like `if (!isValid) { return; }` at the top of the function?
    A) This pattern is invalid and always throws
    B) It's a common "guard clause" pattern — exiting immediately if a precondition fails, avoiding deeply nested `if`/`else` blocks for the rest of the function's logic
    C) It has no practical purpose and is purely decorative
    D) It converts the entire function into an arrow function
    **Hint:** Think about how this avoids wrapping the function's entire remaining logic inside one large `else` block.
    **Answer:** B
    **Explanation:** Returning early on a failed validation check is the "guard clause" pattern, which avoids nesting the rest of the function's logic inside an `else` block.

16. What does `return [a, b, c];` allow a function to effectively achieve?
    A) Returning exactly one value only
    B) Simulating "returning multiple values" by bundling them into a single array, which the caller can then destructure
    C) This syntax is invalid
    D) Automatically converting `a`, `b`, and `c` into separate global variables
    **Hint:** Since `[a, b, c]` is itself one single array value, `return` is technically only handling one thing — but that one thing can carry several pieces of data.
    **Answer:** B
    **Explanation:** Bundling multiple values into a single returned array simulates "returning multiple values," which the caller can then destructure.

17. What does the following code log? `function getStats() { return { min: 1, max: 10 }; } const { min, max } = getStats(); console.log(min, max);`
    A) `{ min: 1, max: 10 } { min: 1, max: 10 }`
    B) `1 10`
    C) `undefined undefined`
    D) An error
    **Hint:** The function returns an object, and destructuring immediately pulls out its two named properties into separate variables.
    **Answer:** B
    **Explanation:** The returned object's `min` and `max` properties are destructured directly into those variables, so logging them prints `1 10`.

18. Can a function's return value be immediately used without storing it in a variable, like `console.log(add(2, 3));`?
    A) No, the return value must always be stored first
    B) Yes, a function call's returned value can be used directly anywhere an expression is expected
    C) Only for functions with no parameters
    D) Only inside `if` statements
    **Hint:** Since a function call resolves to its returned value, that value can be plugged in anywhere a value would normally go.
    **Answer:** B
    **Explanation:** A function call resolves to its returned value, so that value can be used directly anywhere an expression is valid, such as inside another function call.

19. What is the returned value of an arrow function using implicit return, like `const double = x => x * 2;`, when called as `double(4)`?
    A) `undefined`
    B) `8`
    C) `4`
    D) `x * 2` as a literal string
    **Hint:** A single-expression arrow function without curly braces automatically returns that expression's result.
    **Answer:** B
    **Explanation:** A single-expression arrow function without braces implicitly returns `x * 2`, which is `8` when `x` is `4`.

20. What's the difference in return behavior between `const double = x => x * 2;` and `const double = x => { x * 2; };`?
    A) They behave identically
    B) The first implicitly returns `x * 2`; the second, having curly braces without an explicit `return`, actually returns `undefined`
    C) The second version throws a syntax error
    D) The first version returns `undefined`, the second returns `x * 2`
    **Hint:** Adding curly braces switches to a full function body, which requires an explicit `return` — it no longer auto-returns the expression.
    **Answer:** B
    **Explanation:** The first implicitly returns `x * 2`; the second uses a block body without an explicit `return`, so it actually returns `undefined`.

### Hard

21. Why does `return` followed by a value on the next line (e.g., `return \n { value: 5 };`) sometimes silently return `undefined` instead of the intended object?
    A) This scenario always correctly returns the object
    B) Automatic Semicolon Insertion (ASI) inserts a semicolon immediately after `return` when it's followed by a newline, effectively parsing it as `return;` followed by an unreachable, disconnected object literal statement
    C) Objects can never be returned across multiple lines
    D) This only happens with arrow functions
    **Hint:** This is one of the most classic and well-documented JavaScript pitfalls tied to Automatic Semicolon Insertion specifically involving `return`.
    **Answer:** B
    **Explanation:** Automatic Semicolon Insertion inserts a semicolon right after `return` when it's followed by a newline, turning it into `return;` followed by unreachable code.

22. Why might a function returning an object, versus returning `undefined` when using implicit-return arrow function syntax with curly braces around an object literal (e.g., `x => { value: x }` vs. `x => ({ value: x })`), require special parenthesization?
    A) There's no actual difference, and both forms work identically
    B) Curly braces immediately after `=>` are ambiguously interpreted as the start of a function body block (not an object literal), so parentheses `({ })` are required to disambiguate and correctly signal "this is an object being returned"
    C) Object literals can never be returned from arrow functions
    D) This ambiguity only exists in Node.js, never in browsers
    **Hint:** Recall the earlier discussion about `{ }` being ambiguous between a code block and an object literal — this ambiguity resurfaces specifically in implicit-return arrow function syntax.
    **Answer:** B
    **Explanation:** Curly braces right after `=>` are parsed as a function body block rather than an object literal, so parentheses are needed to disambiguate and return the object correctly.

23. Why does returning a reference type (like an array or object) versus a primitive type create fundamentally different implications for how a caller might accidentally mutate a function's "output" after receiving it?
    A) There's no meaningful difference between the two cases
    B) If a function returns a reference to an internal object/array (rather than a fresh copy), a caller mutating that returned value could inadvertently corrupt the function's internal state if that same object is reused or referenced elsewhere internally
    C) Returned values are always deeply copied automatically by JavaScript
    D) Primitives can also be mutated after being returned, just like objects
    **Hint:** Think about a function that returns its own internal cache array directly — if the caller pushes new items onto that returned array, does the function's internal cache get modified too?
    **Answer:** B
    **Explanation:** Returning a reference to an internal object lets a caller's mutation of that returned value corrupt the function's own internal state if the same object is reused internally.

24. Why can a function that conditionally returns different types (e.g., sometimes a `number`, sometimes `null`) create downstream complexity for code consuming that function's result?
    A) JavaScript disallows conditionally returning different types
    B) Every call site consuming the function's result must handle multiple possible types, adding conditional logic (like type checks) at every usage point rather than centralizing that complexity, which can compound significantly across a large codebase
    C) This pattern always throws a runtime TypeError
    D) Both types are automatically merged into a single unified type
    **Hint:** Consider how many places in a codebase call this function — does each one now need its own logic to handle "what if this came back as `null` instead of a number?"
    **Answer:** B
    **Explanation:** Every call site must handle both possible return types, adding repeated conditional or type-check logic instead of centralizing that concern in one place.

25. Why does the presence (or absence) of an explicit `return` in every code path of a function matter for consistent behavior, especially in functions with complex branching logic?
    A) JavaScript enforces that every code path must have an explicit `return`, or it throws a compile error
    B) A code path lacking an explicit `return` implicitly returns `undefined`, which can silently differ from a developer's intent if they assumed every branch consistently returned a meaningful value
    C) Missing `return` statements always cause a runtime crash
    D) JavaScript automatically infers and inserts the "correct" return value for any missing path
    **Hint:** Trace through a function with several `if`/`else if` branches — is there possibly a final, uncovered case that falls through without hitting any explicit `return` at all?
    **Answer:** B
    **Explanation:** Any code path lacking an explicit `return` implicitly returns `undefined`, which can silently violate the assumption that every branch returns a meaningful value.

26. Why might returning early with multiple guard clauses (several `if (...) return ...;` statements stacked at the top of a function) be considered preferable to a single deeply nested `if`/`else if`/`else` structure for the same logic?
    A) There's no meaningful readability difference between the two approaches
    B) Guard clauses handle edge cases and exits immediately and independently, keeping the main "happy path" logic unindented and easier to follow, rather than nesting the core logic several levels deep inside compounding conditional blocks
    C) Guard clauses always execute faster than nested conditionals
    D) Nested `if`/`else if` structures are deprecated in modern JavaScript
    **Hint:** Compare the maximum indentation depth of the "main" logic in each style — which one keeps the primary code path visually flatter and easier to scan?
    **Answer:** B
    **Explanation:** Guard clauses handle edge cases immediately at the top, keeping the main logic flat and easy to follow instead of nested several levels deep.

27. Why does destructuring a function's returned array (e.g., `const [a, b] = getPair();`) require the caller to know the exact order of returned values, unlike destructuring a returned object?
    A) Both approaches are equally order-independent
    B) Array destructuring assigns based on position, so the caller must match the exact order the function returns values in; object destructuring assigns based on named keys, letting the caller extract needed values regardless of their original property order
    C) Array destructuring is always safer than object destructuring
    D) This distinction doesn't actually exist — arrays also support named extraction
    **Hint:** Consider what happens if a function's internal implementation later swaps the order of two returned array elements — does an array-destructuring caller versus an object-destructuring caller each notice, or silently break?
    **Answer:** B
    **Explanation:** Array destructuring assigns by position, so callers must match the exact return order, while object destructuring assigns by name, so property order doesn't matter.

28. Why is a function returning a Promise (covered more in the Async chapter) fundamentally different from a function directly returning a value, in terms of how callers must consume the result?
    A) There's no practical difference — both are consumed identically
    B) A returned Promise represents a value that will be available *eventually*, requiring the caller to use `.then()` or `await` to actually access the resolved value, rather than using the returned value immediately and synchronously
    C) Promises are always resolved instantly, making this distinction meaningless
    D) Returning a Promise is functionally identical to returning `undefined`
    **Hint:** This preview connects directly to asynchronous programming — a returned Promise is a placeholder for a future value, not the value itself, right at the moment `return` executes.
    **Answer:** B
    **Explanation:** A returned Promise represents a value available only in the future, so callers must use `.then()` or `await` rather than using the result synchronously and immediately.

29. Why might unit tests specifically targeting a function's return value be considered more reliable than tests relying on that function's side effects (like console output or DOM changes)?
    A) Return values and side effects are equally reliable to test
    B) A return value provides a direct, deterministic, and easily assertable output the test can check against an expected result, while side effects often require more complex, indirect verification (mocking, spying, or inspecting external state) that's more fragile to changes elsewhere
    C) Side effects are always faster to test than return values
    D) Functions with side effects cannot have return values at all
    **Hint:** Consider testing `expect(add(2, 3)).toBe(5)` directly, versus needing to somehow intercept and verify a `console.log` call or a DOM mutation as proof the function "worked correctly."
    **Answer:** B
    **Explanation:** A return value gives a direct, deterministic result to assert against, while verifying side effects like console output or DOM changes requires more indirect, fragile techniques.

30. Why does a function that both mutates an object passed as an argument AND returns that same (now-mutated) object create ambiguity about the function's true "contract" with callers?
    A) There's no ambiguity — this pattern is always crystal clear
    B) It blurs the distinction between a "pure" function (which returns a new result without side effects) and one that mutates its input in place — callers might mistakenly assume the original argument is untouched since a new-looking value was returned, when in fact the original was modified too
    C) JavaScript automatically prevents functions from doing both simultaneously
    D) This pattern only applies to arrow functions
    **Hint:** If a function both changes the object you passed in AND hands back a value, which of those two facts might a careless caller easily overlook — potentially causing a bug elsewhere in their code that still holds a reference to that original, now-unexpectedly-mutated object?
    **Answer:** B
    **Explanation:** Doing both blurs the line between a pure function and one with side effects, so a caller might wrongly assume the original argument was left untouched when it was actually mutated too.

---

## Topic 4: Function Expressions & Arrow Functions

### Easy

1. What is a "function expression"?
   A) A function assigned to a variable, like `const greet = function() { };`
   B) The exact same thing as a function declaration, with no differences
   C) A function that always returns `true`
   D) A comment describing a function
   **Hint:** Unlike a declaration, this style treats the function as a value being assigned, much like assigning a number or string.
   **Answer:** A
   **Explanation:** A function expression is a function assigned to a variable, treating the function itself as a value.

2. What symbol combination defines an arrow function?
   A) `->`
   B) `=>`
   C) `<-`
   D) `::`
   **Hint:** It's made of an equals sign followed by a greater-than sign.
   **Answer:** B
   **Explanation:** An arrow function is defined using the `=>` symbol placed after its parameter list.

3. Which of these is a valid arrow function?
   A) `const add = (a, b) => a + b;`
   B) `const add = (a, b) -> a + b;`
   C) `const add => (a, b) { a + b };`
   D) `function => add(a, b) { a + b }`
   **Hint:** Look for the correct `=>` symbol placed directly after the parameter list.
   **Answer:** A
   **Explanation:** This correctly places `=>` directly after the parameter list, matching valid arrow function syntax.

4. Can arrow functions be assigned to a variable?
   A) No, only regular functions can
   B) Yes, this is a very common way to use them
   C) Only inside objects
   D) Only if they have zero parameters
   **Hint:** Just like a function expression, an arrow function is itself a value that can be stored.
   **Answer:** B
   **Explanation:** Arrow functions are values just like function expressions, so they're commonly assigned to variables.

5. Is `function() { }` (with no name) valid syntax when assigned to a variable?
   A) No, functions always require a name
   B) Yes — this is an "anonymous" function expression
   C) Only for arrow functions
   D) Only inside loops
   **Hint:** Since the variable itself provides a way to reference it, the function doesn't strictly need its own internal name.
   **Answer:** B
   **Explanation:** A function assigned to a variable doesn't need its own name, since the variable itself provides a way to reference it.

6. What does `const square = x => x * x;` do when called as `square(4)`?
   A) `4`
   B) `8`
   C) `16`
   D) `44`
   **Hint:** `x` becomes `4`, and the implicit return multiplies it by itself.
   **Answer:** C
   **Explanation:** `x` is `4`, and the implicit return of `x * x` gives `16`.

7. Do arrow functions require parentheses around a single parameter?
   A) Yes, always required
   B) No, parentheses are optional for exactly one parameter (though still commonly used for clarity)
   C) Only if there are zero parameters
   D) Only if there are two or more parameters
   **Hint:** Compare `x => x * 2` and `(x) => x * 2` — are both considered valid?
   **Answer:** B
   **Explanation:** Arrow functions allow omitting parentheses around exactly one parameter, though many style guides still include them for clarity.

8. Do arrow functions require parentheses around zero or multiple parameters?
   A) No, parentheses are never required
   B) Yes, parentheses are required for zero parameters or two-plus parameters
   C) Only for zero parameters, never for multiple
   D) Only for exactly two parameters
   **Hint:** Try to imagine `() => "hi"` or `(a, b) => a + b` without their parentheses — would that still be valid?
   **Answer:** B
   **Explanation:** Parentheses are mandatory for arrow functions with zero parameters or with two or more parameters.

9. What does `const greet = () => "Hello!";` return when called?
   A) `undefined`
   B) `"Hello!"`
   C) An error, since there are no parameters
   D) `() => "Hello!"` as a literal string
   **Hint:** This arrow function takes no input but still implicitly returns its single expression.
   **Answer:** B
   **Explanation:** This arrow function takes no parameters but still implicitly returns the string `"Hello!"`.

10. Which style typically requires curly braces `{ }` around its body for multi-statement logic?
    A) Only regular function expressions
    B) Both regular functions and arrow functions, when the body contains more than a single implicit-return expression
    C) Only arrow functions
    D) Neither ever requires curly braces
    **Hint:** Multiple statements need to be grouped together somehow, regardless of which function style is being used.
    **Answer:** B
    **Explanation:** Both regular functions and arrow functions need curly braces to hold a body with more than one statement.

### Medium

11. What is a key behavioral difference between arrow functions and regular functions regarding `this`?
    A) There is no difference at all
    B) Arrow functions don't have their own `this` — they inherit `this` from their surrounding (lexical) scope, while regular functions get their own `this` determined by how they're called
    C) Regular functions never have access to `this`
    D) Arrow functions always set `this` to the global object
    **Hint:** This is one of the most significant and commonly discussed distinctions between the two function styles.
    **Answer:** B
    **Explanation:** Arrow functions don't have their own `this` and instead inherit it lexically from the surrounding scope, while regular functions get their own `this` based on how they're called.

12. Why might arrow functions be commonly used for callbacks inside methods, like `array.map(item => item * 2)`?
    A) Arrow functions execute faster in all cases
    B) Their concise syntax reduces boilerplate for simple, single-expression operations, and their lexical `this` binding avoids common `this`-related bugs when the callback needs to reference the surrounding context
    C) Regular functions cannot be used as callbacks at all
    D) `.map()` specifically requires arrow function syntax
    **Hint:** Think about both the brevity benefit and the `this`-binding benefit together — arrow functions offer advantages on two separate fronts here.
    **Answer:** B
    **Explanation:** Arrow functions' concise syntax reduces boilerplate for simple operations, and their lexical `this` avoids common `this`-related bugs in callbacks.

13. Can arrow functions be used as object methods that need to access the object's own properties via `this`?
    A) Yes, this works perfectly and is recommended
    B) Generally no — since arrow functions don't bind their own `this`, using one as a method typically results in `this` referring to the outer scope instead of the object itself
    C) Only if the object has exactly one property
    D) Arrow functions cannot be placed inside objects at all
    **Hint:** Since arrow functions inherit `this` from wherever they were *defined*, not from how they're *called*, does that match what a typical object method needs?
    **Answer:** B
    **Explanation:** Because arrow functions don't bind their own `this`, using one as an object method usually makes `this` refer to the outer scope instead of the object itself.

14. What is a "named function expression"?
    A) A function expression that includes an internal name, like `const greet = function sayHi() { };`
    B) Any function declared with the `function` keyword
    C) A synonym for arrow functions
    D) A function stored only in an array
    **Hint:** Notice this hybrid form still uses the "assign to a variable" pattern, but also gives the function its own internal name.
    **Answer:** A
    **Explanation:** A named function expression is a function expression that also carries its own internal name, unlike a plain anonymous one.

15. Why might a named function expression be useful for recursion, compared to an anonymous one?
    A) There's no difference for recursive use cases
    B) The internal name provides a stable way to reference the function from within itself, even if the outer variable it's assigned to gets reassigned later
    C) Anonymous functions cannot call themselves under any circumstances
    D) Named function expressions run measurably faster
    **Hint:** Recall the earlier discussion about what happens to a recursive call if the outer variable holding an anonymous function gets reassigned mid-execution.
    **Answer:** B
    **Explanation:** The internal name gives the function a stable way to call itself recursively, even if the outer variable it's assigned to is later reassigned.

16. Is `const greet = function() { };` hoisted the same way as `function greet() { }`?
    A) Yes, identically
    B) No — the function expression is only hoisted as an uninitialized `let`/`const`/`var` variable (depending on which is used), not with its full function body available beforehand
    C) Function expressions are never hoisted in any form
    D) This depends entirely on the function's name
    **Hint:** Separate the hoisting of the variable declaration itself from the hoisting of the actual function value being assigned to it.
    **Answer:** B
    **Explanation:** A function expression is only hoisted as an uninitialized variable binding, not with its function body available before the assignment line runs.

17. What does `const numbers = [1, 2, 3].map(n => n * n);` produce?
    A) `[1, 2, 3]`
    B) `[1, 4, 9]`
    C) `9`
    D) `undefined`
    **Hint:** Each number in the array gets individually squared by the arrow function.
    **Answer:** B
    **Explanation:** Each element is individually squared, producing `[1, 4, 9]`.

18. Can an arrow function have a multi-line body using curly braces, like regular functions?
    A) No, arrow functions are always restricted to a single expression
    B) Yes, `(a, b) => { const sum = a + b; return sum; }` is valid, requiring an explicit `return`
    C) Only if there are zero parameters
    D) Only inside object literals
    **Hint:** Curly braces switch an arrow function into "full body" mode, just like they do for regular functions.
    **Answer:** B
    **Explanation:** Curly braces switch an arrow function into a full body, which requires an explicit `return` statement just like a regular function.

19. What happens if you forget the explicit `return` inside a curly-braced, multi-statement arrow function body?
    A) It automatically returns the last statement's value
    B) It returns `undefined`, since curly-braced bodies require an explicit `return` (no automatic implicit return)
    C) It throws a syntax error
    D) It returns `null`
    **Hint:** The moment curly braces appear, the implicit single-expression return behavior no longer applies.
    **Answer:** B
    **Explanation:** Curly-braced arrow function bodies require an explicit `return`; without one, the function returns `undefined`.

20. Why might a team's style guide prefer arrow functions for short, simple callbacks, but regular function declarations for top-level, reusable utility functions?
    A) There's no meaningful reasoning behind such a preference
    B) Arrow functions' concise syntax suits small inline callbacks well, while named function declarations offer clearer stack traces, hoisting benefits, and more explicit naming for larger, reusable, standalone logic
    C) Arrow functions cannot be used for anything beyond callbacks
    D) Regular functions cannot be reused more than once
    **Hint:** Consider the specific strengths each style brings — brevity and lexical `this` for one, hoisting and named stack traces for the other — and where each strength matters most.
    **Answer:** B
    **Explanation:** Arrow functions' brevity suits small inline callbacks, while named function declarations offer clearer stack traces, hoisting, and explicit naming for reusable top-level logic.

### Hard

21. Why does using an arrow function as an event handler inside a class (accessing `this.someProperty`) often behave more predictably than a regular function method, when both are used as callbacks (e.g., `button.addEventListener("click", this.handleClick)`)?
    A) There's no meaningful behavioral difference between the two
    B) A regular function's `this` is determined by how it's called (often becoming the button element itself in an event listener, not the class instance), while an arrow function inherits `this` lexically from where it was defined (typically the class instance), avoiding the need for manual `.bind(this)`
    C) Arrow functions cannot be used as event handlers at all
    D) Regular functions always correctly bind to the class instance automatically
    **Hint:** This is one of the most common practical reasons developers reach for arrow functions specifically inside class methods intended to be used as callbacks.
    **Answer:** B
    **Explanation:** A regular function's `this` depends on how it's called, often the button element itself in an event listener, while an arrow function inherits `this` lexically from the class instance, avoiding manual `.bind(this)`.

22. Why can't arrow functions be used as constructor functions with the `new` keyword (e.g., `new MyArrowFunction()` throws a TypeError)?
    A) This restriction doesn't actually exist
    B) Arrow functions lack their own `[[Construct]]` internal method and their own `this` binding, both of which are required for the `new` operator's object-construction process to work
    C) `new` only works with functions that have zero parameters
    D) This restriction only applies in strict mode
    **Hint:** Since arrow functions deliberately don't create their own `this`, and constructing a new object with `new` fundamentally depends on setting up a fresh `this`, these two concepts are fundamentally incompatible.
    **Answer:** B
    **Explanation:** Arrow functions lack their own `[[Construct]]` internal method and their own `this` binding, both of which the `new` operator's object-construction process requires.

23. Why does an arrow function defined inside a regular function's method (like inside a `setTimeout` callback within an object method) correctly access the *outer* method's `this`, while a nested regular function would not?
    A) There's no actual difference in this scenario
    B) The arrow function doesn't create its own `this` binding, so it "looks outward" to the enclosing method's `this` at the time it was defined; a nested regular function creates its own separate `this`, which in a callback context like `setTimeout` typically defaults to the global object or `undefined` (in strict mode)
    C) Regular functions inherit `this` identically to arrow functions inside `setTimeout` specifically
    D) `setTimeout` always overrides `this` regardless of function type
    **Hint:** This exact scenario — a nested callback inside a method losing access to the outer method's `this` — is one of the most classic and frequently cited reasons developers switched to arrow functions for this specific use case.
    **Answer:** B
    **Explanation:** An arrow function has no `this` of its own, so it looks outward to the enclosing method's `this`, while a nested regular function creates its own `this` that typically defaults to the global object or `undefined`.

24. Why might a named function expression's internal name (e.g., `const fib = function fibonacci(n) { ... fibonacci(n-1) ... };`) not be accessible from outside the function, even though the outer variable `fib` is?
    A) This is inaccurate — the internal name `fibonacci` is fully accessible everywhere
    B) The internal name of a named function expression is scoped only to the function's own body, intentionally providing a stable self-reference for recursion without polluting the outer/enclosing scope with an additional, redundant identifier
    C) Named function expressions cannot actually reference their own internal name
    D) The internal name always overwrites the outer variable name
    **Hint:** Try calling `fibonacci(5)` from outside the function entirely, after only `fib` was declared in the outer scope — does that name exist out there at all?
    **Answer:** B
    **Explanation:** The internal name of a named function expression is scoped only to the function's own body, giving it a stable self-reference without leaking a new identifier into the enclosing scope.

25. Why does `Function.prototype.bind()`, `.call()`, and `.apply()` have no meaningful effect when used on an arrow function, unlike on a regular function?
    A) These methods work identically on both function types
    B) Since arrow functions don't have their own `this` binding to begin with, these methods (which exist specifically to explicitly set or override a function's `this`) have nothing to actually override — the arrow function's lexically inherited `this` remains unchanged regardless
    C) `.bind()`, `.call()`, and `.apply()` don't exist for any function type
    D) This restriction only applies to named arrow functions
    **Hint:** These three methods all exist specifically to manipulate a function's `this` binding — trace what happens when there's no independent `this` binding present to manipulate in the first place.
    **Answer:** B
    **Explanation:** Since arrow functions never had their own `this` binding to begin with, these methods, which exist to override `this`, have nothing to actually change.

26. Why might a deeply nested chain of arrow function callbacks (e.g., several `.then()` calls each using an arrow function) still eventually benefit from being refactored into `async`/`await` syntax, despite arrow functions already being fairly concise?
    A) Arrow function chains are always the most readable option for asynchronous code
    B) Even with concise arrow function syntax, long chains of nested `.then()` callbacks can still become visually complex to trace through, while `async`/`await` allows asynchronous logic to be written and read in a more linear, synchronous-looking style
    C) `.then()` cannot accept arrow functions as callbacks
    D) `async`/`await` and Promise chains are functionally unrelated concepts
    **Hint:** This connects forward to the Async chapter — conciseness of an individual callback function doesn't necessarily solve the readability challenge of many callbacks chained together in sequence.
    **Answer:** B
    **Explanation:** Even with concise arrow syntax, long chains of nested `.then()` callbacks remain visually complex, while `async`/`await` reads more like linear, synchronous code.

27. Why does converting a regular function method that uses `this` into an arrow function (as a class property) sometimes fix one bug but simultaneously make that method impossible to override correctly via prototypal inheritance?
    A) This is a false tradeoff, since there's no actual difference
    B) An arrow function assigned as a class property is created fresh per instance (not on the shared prototype), so subclasses cannot use standard method-overriding techniques (like calling `super.methodName()`) the same way they could with a regular prototype method
    C) Arrow functions as class properties always execute significantly slower
    D) Regular prototype methods cannot be overridden in JavaScript classes either
    **Hint:** Consider where a regular class method "lives" (shared on the prototype, one copy for all instances) versus where an arrow-function class property "lives" (a fresh, individual copy created for every single instance) — and how inheritance mechanisms specifically depend on that shared prototype structure.
    **Answer:** B
    **Explanation:** An arrow function class property is created fresh per instance rather than shared on the prototype, so subclasses can't override it the normal way, such as calling `super.methodName()`.

28. Why might using an arrow function for `array.sort((a, b) => a - b)` be considered idiomatic, while defining a separate, reusable named comparator function elsewhere might be preferred for a more complex, reused sorting rule?
    A) There's no meaningful distinction — arrow functions should always be used regardless of complexity
    B) A simple, one-off comparator benefits from arrow functions' inline brevity, while a complex or frequently reused comparator benefits from a named function's improved readability, testability, and reusability across multiple `.sort()` calls
    C) `.sort()` technically requires an arrow function and rejects regular functions
    D) Named comparator functions cannot be passed to `.sort()` at all
    **Hint:** Weigh the tradeoff between "concise and inline, used exactly once" versus "explicitly named, tested independently, and reused in several places" — which one wins depends heavily on the comparator's actual complexity and reuse.
    **Answer:** B
    **Explanation:** A simple, one-off comparator benefits from an arrow function's inline brevity, while a complex or reused comparator benefits from a named function's readability and testability.

29. Why does the lack of a `prototype` property on arrow functions (unlike regular functions) reinforce the fact that arrow functions were never intended to serve as constructors?
    A) Arrow functions actually do have a `prototype` property, identical to regular functions
    B) The `prototype` property is specifically what regular functions use to set up the prototype chain for objects created via `new` — its absence on arrow functions is a direct, intentional design signal reinforcing that they cannot and should not be used as constructors
    C) The `prototype` property is unrelated to constructor behavior entirely
    D) This omission is an unintentional bug that will eventually be fixed
    **Hint:** Recall that object creation via `new` fundamentally relies on a function's `prototype` property to set up inheritance — arrow functions were deliberately designed without this piece specifically because they were never meant to fill that role.
    **Answer:** B
    **Explanation:** The `prototype` property is what regular functions use to set up the prototype chain for objects made with `new`; its absence on arrow functions signals they were never meant to be constructors.

30. Why might refactoring a large regular function into an arrow function without carefully considering its usage context (e.g., converting an object method into an arrow function property) introduce a subtle, hard-to-diagnose bug?
    A) This kind of refactor is always perfectly safe with no possible consequences
    B) If the original function relied on dynamic `this` binding based on how it was called (a common pattern for object methods), converting it to an arrow function silently changes that behavior to lexical `this` instead — a change that might not surface as an obvious error, but instead produces quietly incorrect behavior (like `this` unexpectedly referring to the wrong object)
    C) Arrow functions and regular functions are fully interchangeable in every context without exception
    D) This only becomes a problem when the function has more than three parameters
    **Hint:** Since this change in `this` behavior doesn't throw an error — it just silently resolves to a *different* value than before — this is exactly the kind of bug that can slip past casual testing and only surface later in production.
    **Answer:** B
    **Explanation:** If the original function relied on dynamic, call-site-determined `this`, as object methods often do, converting it to an arrow function silently switches to lexical `this`, producing a quiet, hard-to-diagnose bug.

---

## Topic 5: Default Parameters

### Easy

1. What does `function greet(name = "Guest") { }` demonstrate?
   A) A required parameter
   B) A default parameter value
   C) A rest parameter
   D) A destructured parameter
   **Hint:** The `= "Guest"` part provides a fallback value.
   **Answer:** B
   **Explanation:** The `= "Guest"` syntax provides a fallback default value for the `name` parameter.

2. What does `greet()` return, given `function greet(name = "Guest") { return name; }`?
   A) `undefined`
   B) `"Guest"`
   C) An error
   D) `null`
   **Hint:** Since no argument was passed, the default value kicks in.
   **Answer:** B
   **Explanation:** Since no argument was passed, `name` falls back to its default value, `"Guest"`.

3. What does `greet("Ada")` return, given `function greet(name = "Guest") { return name; }`?
   A) `"Guest"`
   B) `"Ada"`
   C) `undefined`
   D) An error
   **Hint:** When an argument IS provided, does the default value still apply?
   **Answer:** B
   **Explanation:** Since an explicit argument was passed, it overrides the default, so `name` becomes `"Ada"`.

4. Can multiple parameters each have their own default value?
   A) No, only one default parameter is allowed per function
   B) Yes, e.g. `function greet(name = "Guest", age = 18) { }`
   C) Only the last parameter can have a default
   D) Only the first parameter can have a default
   **Hint:** Each parameter in the list can independently be given its own `=` fallback.
   **Answer:** B
   **Explanation:** Each parameter can independently be given its own default value using `=`.

5. What triggers a default parameter value to be used?
   A) Passing `null` explicitly
   B) Passing `undefined` explicitly, or omitting the argument entirely
   C) Passing any falsy value
   D) Passing `0` specifically
   **Hint:** Consider what an "empty" or "missing" argument slot actually equals by default.
   **Answer:** B
   **Explanation:** Default values activate specifically when the corresponding argument is `undefined`, whether by omission or explicit passing.

6. Does passing `0` as an argument trigger a default parameter's fallback value?
   A) Yes, since `0` is falsy
   B) No, `0` is a valid, explicit value and won't trigger the default
   C) Only for number parameters
   D) Only in strict mode
   **Hint:** Default parameters check specifically for `undefined`, not general falsiness.
   **Answer:** B
   **Explanation:** `0` is an explicit, valid value rather than `undefined`, so it does not trigger the default parameter.

7. Is it valid to write default parameter expressions using a function call, like `function greet(name = getDefaultName()) { }`?
   A) No, defaults must be literal values only
   B) Yes, a default value can be any valid expression, including a function call
   C) Only if `getDefaultName` has no parameters itself
   D) Only inside arrow functions
   **Hint:** Default parameter values aren't limited to simple literals — anything evaluable is allowed.
   **Answer:** B
   **Explanation:** A default value can be any valid expression, including a function call, not just a literal.

8. Before default parameters existed (older JavaScript), what was a common manual technique for achieving the same effect?
   A) `name = name || "Guest";` inside the function body
   B) There was no way to achieve this at all previously
   C) Using `try`/`catch`
   D) Using a `switch` statement
   **Hint:** This older pattern uses the `||` operator to fall back to a default when the parameter is falsy.
   **Answer:** A
   **Explanation:** Before default parameters existed, developers commonly used the `||` operator inside the function body to fall back to a default value.

9. What does `function multiply(a, b = 2) { return a * b; }` return when called as `multiply(5)`?
   A) `5`
   B) `2`
   C) `10`
   D) `25`
   **Hint:** Since `b` isn't provided, it falls back to its default of `2`.
   **Answer:** C
   **Explanation:** Since `b` isn't provided, it defaults to `2`, so `5 * 2` is `10`.

10. Can a default parameter be `undefined` explicitly (as a literal, deliberately)?
    A) No, this is invalid syntax
    B) Yes, `function f(x = undefined) { }` is valid, though it has the same effect as no default at all
    C) Only for the last parameter
    D) Only inside arrow functions
    **Hint:** Since `undefined` is what triggers falling back to a default in the first place, setting the default itself to `undefined` doesn't really change anything meaningful.
    **Answer:** B
    **Explanation:** Explicitly writing `= undefined` as a default is valid syntax, though it has the same effect as having no default at all.

### Medium

11. Why does `function greet(name = "Guest") { }` provide a cleaner solution than the older `name = name || "Guest";` technique?
    A) There's no actual improvement — they're functionally identical in every case
    B) The default parameter syntax specifically checks for `undefined` only, correctly preserving intentionally falsy arguments (like `0` or `""`), while the `||` technique incorrectly overrides any falsy value, not just missing ones
    C) The older technique is actually faster to execute
    D) `||` cannot be used inside function bodies at all
    **Hint:** Recall the earlier distinction between `||`'s broad falsy check and `??`'s (and default parameters') narrower `undefined`/`null`-specific check.
    **Answer:** B
    **Explanation:** Default parameters check specifically for `undefined`, correctly preserving intentionally falsy arguments like `0` or `""`, while `||` incorrectly overrides any falsy value.

12. Can a default parameter's value reference an earlier parameter in the same function's parameter list, like `function calc(a, b = a * 2) { }`?
    A) No, parameters can never reference each other
    B) Yes, since parameters are evaluated left to right, `b`'s default can safely reference `a`, provided `a` comes before it in the list
    C) Only if both parameters have the same name
    D) This always throws a ReferenceError
    **Hint:** Recall the general rule about parameter evaluation order and what's already available by the time each subsequent default expression runs.
    **Answer:** B
    **Explanation:** Parameters are evaluated left to right, so `b`'s default can safely reference `a` since it comes first in the list.

13. What happens if a default parameter's expression references a LATER parameter that hasn't been assigned yet, like `function calc(a = b, b = 2) { }`?
    A) This works fine due to hoisting
    B) This throws a ReferenceError, since `b` isn't yet initialized when `a`'s default is being evaluated
    C) `a` simply becomes `undefined` silently
    D) JavaScript automatically reorders the parameters
    **Hint:** Unlike function declarations, parameter defaults are evaluated strictly in order — a later parameter genuinely doesn't exist yet when an earlier one's default runs.
    **Answer:** B
    **Explanation:** Since parameter defaults are evaluated strictly in order, referencing a later parameter that hasn't been initialized yet throws a ReferenceError.

14. Does providing a default value affect the function's `.length` property (which reflects the expected number of parameters)?
    A) No, `.length` always counts every declared parameter regardless of defaults
    B) Yes — `.length` only counts parameters BEFORE the first one with a default value, since defaulted parameters are considered optional
    C) `.length` is always `0` for functions with any default parameters
    D) `.length` counts only the parameters that received arguments in the most recent call
    **Hint:** This is a subtle quirk — try to imagine `function f(a, b = 1, c) {}`'s `.length` property and what it would report.
    **Answer:** B
    **Explanation:** The `.length` property only counts parameters before the first one with a default value, since defaulted, and any later, parameters are considered optional.

15. Can default parameters be combined with destructuring, like `function greet({ name = "Guest" } = {}) { }`?
    A) No, this combination is invalid
    B) Yes, this combines a default for a destructured property AND a default for the entire argument object being missing altogether
    C) Only one of the two defaults can be used, never both together
    D) This only works with array destructuring, not objects
    **Hint:** Recall the earlier discussion of this exact pattern in the Parameters & Arguments topic — two separate fallback layers working together.
    **Answer:** B
    **Explanation:** This combines a default for the destructured `name` property with a separate default for the entire argument object being missing altogether.

16. What does `function greet(name = "Guest") { }` do if called explicitly as `greet(undefined)`?
    A) `name` becomes `undefined`
    B) `name` becomes `"Guest"`, since explicitly passing `undefined` still triggers the default
    C) It throws an error
    D) `name` becomes `null`
    **Hint:** Default parameters specifically check for the value `undefined`, regardless of whether it arrived by omission or was passed explicitly.
    **Answer:** B
    **Explanation:** Explicitly passing `undefined` still matches the condition that triggers the default, so `name` becomes `"Guest"`.

17. What does `function greet(name = "Guest") { }` do if called explicitly as `greet(null)`?
    A) `name` becomes `"Guest"`
    B) `name` becomes `null`, since `null` is a distinct, explicit value that does NOT trigger the default
    C) It throws an error
    D) `name` becomes `undefined`
    **Hint:** Default parameters only activate for `undefined` specifically — is `null` the same value as `undefined`?
    **Answer:** B
    **Explanation:** `null` is a distinct, explicit value different from `undefined`, so it does not trigger the default and `name` becomes `null`.

18. Can default parameter expressions have side effects, like incrementing an outer counter variable each time the function is called without that argument?
    A) No, default expressions cannot have side effects
    B) Yes, since default values are arbitrary expressions evaluated at call time, they can include side effects, though this is generally discouraged for clarity
    C) Side effects only work with arrow function defaults
    D) This always throws a TypeError
    **Hint:** Since default expressions are genuinely re-evaluated on each call where they're needed, anything a normal expression can do (including side effects) is technically possible here too.
    **Answer:** B
    **Explanation:** Default values are ordinary expressions evaluated at call time, so they can include side effects, though doing so is generally discouraged.

19. Why might a default parameter value be re-evaluated on every single call that needs it, rather than being calculated once and reused?
    A) This claim is false — default expressions are only ever evaluated once, at function definition time
    B) Default parameter expressions are evaluated fresh each time the function is called and that particular default is actually needed, ensuring the value reflects the current state at call time (useful for things like `Date.now()` as a default)
    C) Re-evaluation only happens in strict mode
    D) Default expressions are cached permanently after the first call
    **Hint:** Consider a default parameter like `timestamp = Date.now()` — would you want that value fixed forever at function-definition time, or freshly calculated for each individual call?
    **Answer:** B
    **Explanation:** Default expressions are evaluated fresh each time the function is called and that default is actually needed, which is essential for something like `Date.now()`.

20. Why does mixing default parameters with rest parameters, like `function f(a = 1, ...rest) { }`, work correctly, while `function f(...rest, a = 1) { }` is invalid?
    A) There's no such restriction — both are equally valid
    B) Rest parameters must always be the last parameter (as established earlier), and this rule holds regardless of whether other parameters have defaults — a rest parameter can't be followed by anything else, defaulted or not
    C) Default parameters are incompatible with rest parameters under any ordering
    D) This restriction only applies to arrow functions
    **Hint:** This connects back to the earlier rule about rest parameters needing to be positioned last — that constraint doesn't change just because a default value is also involved.
    **Answer:** B
    **Explanation:** A rest parameter must always be the last parameter regardless of whether other parameters have defaults, so it can never be followed by anything else.

### Hard

21. Why does a default parameter expression that references `this` behave differently (or unpredictably) depending on whether the function is a regular function versus an arrow function?
    A) `this` behaves identically in default parameter expressions for both function types
    B) Since arrow functions inherit `this` lexically from their surrounding scope while regular functions determine `this` based on call-site, a default parameter expression referencing `this` will resolve differently for each function type, following each type's respective `this`-binding rules
    C) `this` cannot be used inside default parameter expressions under any circumstances
    D) Default parameters override and disable `this` entirely within the function
    **Hint:** This directly extends the earlier `this`-binding distinction from the Arrow Functions topic into a more specific, less commonly considered context — the default parameter expressions themselves.
    **Answer:** B
    **Explanation:** Since arrow functions inherit `this` lexically while regular functions determine it by call site, a default expression referencing `this` resolves differently depending on which function type it's in.

22. Why can having a default parameter value with a side effect (like `function log(msg, count = incrementCounter())`) create subtle bugs when the function is called with an explicit second argument versus without one?
    A) `incrementCounter()` always runs regardless of whether an explicit argument was passed
    B) The default expression, including any side effect, only executes when that specific parameter is actually left undefined — meaning `incrementCounter()` runs inconsistently depending on caller behavior, which can silently desynchronize a counter's expected value from the number of actual function calls
    C) Side effects in default parameters are statically evaluated once at parse time, never at call time
    D) This scenario is impossible since default parameters cannot contain function calls
    **Hint:** Trace through calling this function 10 times, where only 5 of those calls omit the second argument — how many times does `incrementCounter()` actually fire, and does that match what someone might naively expect?
    **Answer:** B
    **Explanation:** The default expression's side effect only runs when that parameter is actually left `undefined`, so the counter fires inconsistently depending on whether callers supply the argument.

23. Why does the temporal dead zone concept (typically discussed with `let`/`const`) also apply to default parameter expressions referencing later, not-yet-initialized parameters?
    A) The temporal dead zone has no relevance to function parameters whatsoever
    B) Parameters are conceptually processed similarly to sequential `let` declarations within their own mini-scope — referencing a parameter before its own initialization (i.e., a later parameter from an earlier default) triggers the same "not yet initialized" ReferenceError behavior as accessing a `let` variable in its TDZ
    C) This only applies to arrow function parameters, not regular functions
    D) Default parameters are fully hoisted like `var`, making TDZ irrelevant here
    **Hint:** This directly connects the parameter-ordering ReferenceError discussed earlier in this topic to the deeper `let`/`const` temporal dead zone concept from the Variables & Constants chapter.
    **Answer:** B
    **Explanation:** Parameters behave like sequential `let` declarations in their own scope, so referencing a later, not-yet-initialized parameter from an earlier default triggers the same TDZ-style ReferenceError.

24. Why might the quirky `.length` property behavior (only counting parameters before the first default) create unexpected results for generic utility code that relies on `.length` to determine a function's "arity" (expected parameter count)?
    A) `.length` always accurately reflects the full parameter count regardless of defaults, so no such issue exists
    B) Generic utilities (like certain functional programming helpers that inspect `.length` to decide how to apply arguments) might incorrectly assume a function expects fewer parameters than it actually accepts, since defaulted and rest parameters are excluded from this count
    C) `.length` only applies to arrow functions, never regular functions
    D) This property was completely removed in modern JavaScript
    **Hint:** Imagine a curry/partial-application utility function that decides how many arguments to collect based purely on `.length` — would it correctly account for parameters after the first default?
    **Answer:** B
    **Explanation:** Utilities that inspect `.length` to infer a function's arity may undercount its parameters, since defaulted and rest parameters are excluded from that count.

25. Why does explicitly passing `undefined` as an argument (`greet(undefined)`) versus passing no argument at all (`greet()`) produce identical behavior for a defaulted parameter, despite looking different at the call site?
    A) These two calls actually behave differently — one triggers the default and one doesn't
    B) JavaScript's default parameter mechanism specifically checks whether the corresponding argument slot's value is `undefined` — both an omitted argument and an explicitly passed `undefined` produce that exact same value in that slot, so both trigger the default identically
    C) Only omitting the argument entirely can trigger a default value
    D) Explicitly passing `undefined` always throws a TypeError
    **Hint:** Consider what actually occupies that parameter slot in both scenarios — is there any way for the function to distinguish "caller explicitly wrote `undefined`" from "caller simply didn't provide anything"?
    **Answer:** B
    **Explanation:** Both an omitted argument and an explicitly passed `undefined` produce the same `undefined` value in that parameter slot, so both trigger the default identically.

26. Why might combining default parameters with destructured array parameters (`function f([a = 1, b = 2] = []) { }`) create a particularly complex, layered fallback system worth understanding carefully?
    A) This combination is actually invalid syntax
    B) This pattern layers THREE separate fallback levels: a default for the entire argument (`= []` if no array is passed at all), plus individual defaults for each destructured element (`a = 1`, `b = 2` if those specific positions are missing from the array), each resolving independently
    C) Only one of these three defaults can ever actually apply in a single function call
    D) This pattern is functionally identical to a single top-level default parameter
    **Hint:** Carefully trace through several different call scenarios — `f()`, `f([5])`, `f([5, 10])`, `f([undefined, 10])` — and determine which specific default(s), if any, activate in each case.
    **Answer:** B
    **Explanation:** This pattern layers three independent fallbacks — one for a missing array argument, and one each for missing individual array elements — that each resolve on their own.

27. Why does a default parameter expression that calls an external, mutable function (like `Math.random()` or `Date.now()`) make a function's behavior effectively non-deterministic for that specific call, complicating unit testing?
    A) Default expressions are always evaluated at function-definition time, making them inherently deterministic
    B) Since the default expression re-evaluates fresh on each qualifying call, using a source of non-determinism (like `Math.random()`) as a default means the function's output can genuinely differ between otherwise-identical calls, requiring test mocking/stubbing strategies to test reliably
    C) `Math.random()` cannot be used as a default parameter value at all
    D) This non-determinism only affects the function's return value, never its parameters
    **Hint:** Consider writing a unit test asserting an exact expected output for a function whose default parameter secretly depends on the current timestamp or a random number — what would that test actually need to account for?
    **Answer:** B
    **Explanation:** Because the default re-evaluates on each qualifying call, using a non-deterministic source like `Math.random()` means the function's output can genuinely vary between identical calls, complicating testing.

28. Why can a default parameter expression that itself calls another function with side effects (e.g., logging, API calls) make a function's overall behavior harder to reason about purely from its signature alone?
    A) Default parameter expressions cannot have side effects, so this concern is unfounded
    B) A function's signature typically communicates its inputs/outputs cleanly, but a default expression hiding a side-effecting function call embeds potentially significant behavior (network requests, logging, mutation) inside what looks like simple parameter setup, obscuring it from a reader skimming just the function's call sites
    C) Side effects in default parameters are always flagged with a compiler warning
    D) This concern only applies to arrow function defaults, not regular function defaults
    **Hint:** Imagine reviewing a pull request and seeing `function process(data, config = fetchConfigFromServer())` — how obvious is it, from the call sites alone, that calling this function might trigger a network request under certain conditions?
    **Answer:** B
    **Explanation:** A default expression that quietly calls a side-effecting function embeds significant behavior inside what looks like simple parameter setup, hiding it from anyone reading just the call sites.

29. Why might teams enforce a linting rule discouraging default parameter values that are themselves complex object or array literals (e.g., `function f(options = { retries: 3, timeout: 1000, headers: {...} }) { }`), preferring a simpler pattern instead?
    A) Complex default object literals are always the clearest and most maintainable approach
    B) A large inline default object can clutter the function signature and obscure the function's actual logic; extracting it into a named constant (like `const DEFAULT_OPTIONS = {...}`) elsewhere improves readability, makes the default reusable, and separates configuration from the function's core structure
    C) JavaScript technically limits how many properties a default object literal can contain
    D) This pattern is syntactically invalid and won't parse
    **Hint:** Compare the readability of a function signature spanning multiple lines just to define its default object, versus a signature referencing a single, clearly-named constant defined elsewhere.
    **Answer:** B
    **Explanation:** A large inline default object clutters the function signature, while extracting it into a named constant improves readability and makes the default reusable.

30. Why does understanding that default parameters are evaluated in the function's own parameter scope (a distinct scope from the function body) matter for edge cases involving variable shadowing between defaults and body-level declarations?
    A) Default parameters and the function body always share one single, identical scope
    B) Parameters (including their default expressions) exist in an intermediate scope that sits between the outer enclosing scope and the function's own body scope — this affects subtle edge cases around variable shadowing and which specific variable a default expression actually resolves to, particularly with `var` declarations inside the function body sharing names with parameters
    C) This scoping detail has no practical implications whatsoever
    D) Default parameter expressions execute in the global scope exclusively
    **Hint:** This is a genuinely advanced, spec-level detail — the key takeaway is that default parameter expressions don't simply share the exact same scope as arbitrary code written inside the function's body, which can matter in rare shadowing edge cases.
    **Answer:** B
    **Explanation:** Parameters occupy an intermediate scope between the outer scope and the function body, which affects subtle shadowing edge cases involving `var` declarations that share names with parameters.

---

*End of Quiz: JavaScript Functions — all 5 topics complete, 150 questions total.*
