# Quiz: JavaScript Basics

---

## Topic 1: Introduction to JavaScript

### Easy

1. What does JavaScript primarily run in, besides a browser?
   A) A spreadsheet
   B) A server (via Node.js)
   C) A PDF reader
   D) An image editor
   **Hint:** Think about what environment lets JavaScript run outside a web page entirely.
   **Answer:** B
   **Explanation:** Node.js provides a runtime that lets JavaScript execute outside the browser, such as on a server.

2. Is JavaScript a compiled or interpreted language?
   A) Compiled
   B) Interpreted
   C) Neither
   D) Assembled
   **Hint:** Does JavaScript need a separate build step before you can run it, like C++ does?
   **Answer:** B
   **Explanation:** JavaScript code runs directly without a separate compile step, which is the defining trait of an interpreted language.

3. Which tag is used to include JavaScript in an HTML file?
   A) `<js>`
   B) `<script>`
   C) `<javascript>`
   D) `<code>`
   **Hint:** This tag's name describes a "script" being run, not the language itself.
   **Answer:** B
   **Explanation:** The `<script>` tag is the standard HTML element for embedding or linking JavaScript code.

4. What was JavaScript originally created to do?
   A) Build mobile apps
   B) Make web pages interactive
   C) Manage databases
   D) Compile C++ code
   **Hint:** Think about what static HTML alone can't do — respond to clicks, update content live, etc.
   **Answer:** B
   **Explanation:** JavaScript was designed to add interactivity to otherwise static HTML pages.

5. Which company originally created JavaScript?
   A) Microsoft
   B) Netscape
   C) Google
   D) Apple
   **Hint:** This company also made one of the earliest popular web browsers, in the 1990s.
   **Answer:** B
   **Explanation:** Netscape (via Brendan Eich) created JavaScript in 1995 for its Navigator browser.

6. What is the file extension for a JavaScript file?
   A) `.java`
   B) `.js`
   C) `.jsx`
   D) `.script`
   **Hint:** It's a short abbreviation of the language's name.
   **Answer:** B
   **Explanation:** JavaScript source files conventionally use the `.js` extension.

7. Which of these can JavaScript directly manipulate in a browser?
   A) The HTML DOM
   B) The computer's BIOS
   C) The operating system kernel
   D) The router's firmware
   **Hint:** Only one of these options is actually part of a web page.
   **Answer:** A
   **Explanation:** The DOM (Document Object Model) represents the page's structure, which JavaScript can read and modify directly.

8. True or False: JavaScript and Java are the same language.
   A) True
   B) False
   C) Only in browsers
   D) Only in Node.js
   **Hint:** A similar name doesn't necessarily mean a shared origin or syntax.
   **Answer:** B
   **Explanation:** Despite the similar name, JavaScript and Java are unrelated languages with different syntax and design.

9. Where can a `<script>` tag be placed in an HTML document?
   A) Only in `<head>`
   B) Only in `<body>`
   C) In either `<head>` or `<body>`
   D) Only outside the `<html>` tag
   **Hint:** Consider whether you've seen it placed in more than one location in example code.
   **Answer:** C
   **Explanation:** A `<script>` tag can be placed in either `<head>` or `<body>`, depending on when you want it to load and run.

10. What does "client-side" mean in the context of JavaScript?
    A) Code that runs on the user's browser
    B) Code that only runs on a server
    C) Code that never executes
    D) Code stored only in a database
    **Hint:** "Client" refers to the person using the app — where is their code actually executing?
    **Answer:** A
    **Explanation:** Client-side code executes in the user's own browser, as opposed to on a remote server.

### Medium

11. Which statement best describes JavaScript's typing system?
    A) Statically typed
    B) Dynamically typed
    C) No typing system exists
    D) Strictly typed only in Node.js
    **Hint:** Can the same variable hold a number, then later a string, without any special declaration?
    **Answer:** B
    **Explanation:** JavaScript variables aren't bound to a fixed type — the same variable can hold a string, then a number, without any type declaration.

12. What is the `defer` attribute used for on a `<script>` tag?
    A) Deletes the script after running
    B) Delays script execution until the HTML is fully parsed
    C) Runs the script before the page loads
    D) Disables the script entirely
    **Hint:** The word itself suggests "postponing" something.
    **Answer:** B
    **Explanation:** The `defer` attribute tells the browser to wait until HTML parsing is complete before running the script.

13. What is the primary difference between JavaScript running in a browser vs. in Node.js?
    A) There is no difference at all
    B) Browser JavaScript can access the DOM; Node.js can access the file system
    C) Node.js cannot run any JavaScript syntax
    D) Browsers cannot run loops
    **Hint:** Think about what each environment was actually built to interact with.
    **Answer:** B
    **Explanation:** Browser JavaScript is built to interact with the page's DOM, while Node.js exposes APIs for the file system and other server-side resources instead.

14. Which of the following is true about JavaScript engines like V8?
    A) They only run in Node.js
    B) They compile JavaScript to machine code for fast execution
    C) They convert JavaScript into Java
    D) They only interpret, never compile
    **Hint:** "Interpreted" doesn't necessarily mean "never compiled at all" under the hood.
    **Answer:** B
    **Explanation:** Modern engines like V8 use JIT (just-in-time) compilation to turn JavaScript into machine code for performance, even though it's still commonly called "interpreted."

15. What does ECMAScript refer to?
    A) A rival language to JavaScript
    B) The standardized specification JavaScript is based on
    C) A JavaScript framework
    D) A type of browser
    **Hint:** Think of it as the official "rulebook" that JavaScript implementations follow.
    **Answer:** B
    **Explanation:** ECMAScript is the official specification that defines the language, and JavaScript is its most well-known implementation.

16. If a `<script src="app.js">` tag fails to load the file, what typically happens?
    A) The whole HTML page fails to render
    B) The browser throws a console error and continues rendering the page
    C) The page automatically retries indefinitely
    D) JavaScript silently rewrites the HTML
    **Hint:** Browsers are generally resilient to a single failed resource — think about broken images, for comparison.
    **Answer:** B
    **Explanation:** A failed script load just produces a console error — the rest of the HTML page still renders normally.

17. Which of these is NOT a valid place JavaScript code can originate from?
    A) An inline `<script>` block
    B) An external `.js` file
    C) An inline HTML attribute like `onclick`
    D) A `.css` file
    **Hint:** One of these file types is exclusively for visual styling, never behavior.
    **Answer:** D
    **Explanation:** CSS files are exclusively for styling and have no mechanism for containing executable JavaScript.

18. What is a key reason JavaScript became essential for modern web development?
    A) It replaced HTML entirely
    B) It enables dynamic, interactive behavior without full page reloads
    C) It only works with Internet Explorer
    D) It removed the need for CSS
    **Hint:** Think about what happens on a modern site when you click a button — does the whole page usually reload?
    **Answer:** B
    **Explanation:** JavaScript lets pages update content and respond to user actions without needing to reload the entire page.

19. What does "single-threaded" mean regarding JavaScript's core execution model?
    A) It can only run on single-core CPUs
    B) It executes one operation at a time on the main thread
    C) It cannot handle any asynchronous behavior
    D) It requires multiple browser tabs to run
    **Hint:** This is about how many things JavaScript's main thread can literally do at once, not about hardware.
    **Answer:** B
    **Explanation:** Single-threaded means JavaScript's main thread processes one operation at a time, in sequence.

20. Which best describes the relationship between HTML, CSS, and JavaScript?
    A) HTML is structure, CSS is style, JavaScript is behavior
    B) They are all identical in purpose
    C) JavaScript replaces the need for HTML
    D) CSS controls JavaScript's logic
    **Hint:** Think of building a house: the frame, the paint, and the electrical wiring are three separate jobs.
    **Answer:** A
    **Explanation:** HTML defines the page's structure, CSS controls its appearance, and JavaScript adds behavior — three distinct, complementary roles.

### Hard

21. Why might placing a `<script>` tag at the end of `<body>` (without `defer`) be preferred over the `<head>`?
    A) It has no effect on load behavior
    B) It ensures the DOM elements exist before the script tries to access them
    C) It makes the script run faster than JIT compilation
    D) It disables caching
    **Hint:** Think about what order the browser reads the HTML file, top to bottom.
    **Answer:** B
    **Explanation:** Placing the script at the end of `<body>` means the browser has already parsed all the preceding HTML elements, so the script can safely find and manipulate them.

22. What distinguishes `async` from `defer` on a `<script>` tag?
    A) They are functionally identical
    B) `async` scripts run as soon as they're downloaded, potentially before HTML parsing finishes; `defer` waits until parsing completes
    C) `defer` blocks the entire page from rendering
    D) `async` only works with inline scripts
    **Hint:** One attribute prioritizes speed of execution; the other prioritizes waiting for a complete, parsed page.
    **Answer:** B
    **Explanation:** `async` scripts execute the moment they finish downloading (possibly interrupting HTML parsing), while `defer` scripts always wait until parsing is done.

23. Why is JavaScript considered "multi-paradigm"?
    A) It only supports procedural programming
    B) It supports procedural, object-oriented, and functional programming styles
    C) It cannot support object-oriented code
    D) It requires a separate compiler per paradigm
    **Hint:** "Multi-paradigm" implies more than one valid style of writing code is supported, not just one.
    **Answer:** B
    **Explanation:** JavaScript supports writing code in procedural, object-oriented, and functional styles, which is what "multi-paradigm" means.

24. What role does the "event loop" play in JavaScript's execution model?
    A) It has no functional role
    B) It allows asynchronous operations to be handled without blocking the single main thread
    C) It compiles JavaScript to bytecode
    D) It only matters in Node.js, never in browsers
    **Hint:** How does a single-threaded language avoid freezing entirely while waiting on something slow, like a network request?
    **Answer:** B
    **Explanation:** The event loop lets JavaScript hand off slow operations (like network requests) and keep running other code, instead of blocking the single main thread while waiting.

25. Why can the same JavaScript syntax sometimes behave differently across browsers?
    A) JavaScript syntax is undefined by any standard
    B) Different browsers use different JavaScript engines with varying levels of spec compliance and feature support
    C) HTML overrides JavaScript behavior
    D) It never happens in modern browsers
    **Hint:** Chrome, Firefox, and Safari each run their own separate piece of software to interpret JavaScript.
    **Answer:** B
    **Explanation:** Each browser (Chrome, Firefox, Safari, etc.) ships its own JavaScript engine, and small differences in spec compliance or feature support can cause behavior to vary.

26. What is a "polyfill" in the context of JavaScript development?
    A) A CSS-only technique
    B) Code that implements a feature not natively supported by a given browser/engine
    C) A tool that deletes unused code
    D) A type of syntax error
    **Hint:** Think of it as "filling a gap" left by an older browser missing a newer feature.
    **Answer:** B
    **Explanation:** A polyfill is code that reimplements a modern feature so it still works in browsers/engines that don't natively support it.

27. Why might a developer choose Node.js specifically over browser-based JavaScript for a task?
    A) Node.js has no practical differences from the browser
    B) Node.js provides access to the file system, networking, and OS-level APIs unavailable in browsers
    C) Node.js cannot run JavaScript at all
    D) Browsers are always faster than Node.js
    **Hint:** Security restrictions in browsers block certain kinds of direct system access — what environment doesn't have that restriction?
    **Answer:** B
    **Explanation:** Node.js exposes system-level capabilities — file system access, networking, OS APIs — that browser JavaScript is deliberately sandboxed away from.

28. What does it mean that JavaScript is "loosely coupled" to the DOM?
    A) JavaScript cannot interact with the DOM at all
    B) JavaScript is a separate language that interacts with the DOM through APIs, rather than being built directly into HTML's core
    C) The DOM only exists in Node.js
    D) JavaScript and the DOM are the exact same technology
    **Hint:** Node.js runs JavaScript perfectly well without any DOM present at all — what does that tell you about their relationship?
    **Answer:** B
    **Explanation:** JavaScript isn't part of the DOM itself; it manipulates the DOM through separate APIs, which is why Node.js can run JavaScript with no DOM present at all.

29. Historically, why did JavaScript need to be backward-compatible for so long?
    A) Backward compatibility was never a concern
    B) Websites and browsers needed old code to keep working as the web platform evolved over decades
    C) JavaScript is recompiled for every browser version
    D) Only Node.js required backward compatibility
    **Hint:** Think about millions of old websites still online — what happens if a browser update suddenly breaks them all?
    **Answer:** B
    **Explanation:** Countless existing websites depend on old JavaScript behavior continuing to work, so browser vendors avoid breaking changes that would break those pages.

30. Why is understanding JavaScript's execution context important for advanced debugging?
    A) It isn't important
    B) It explains how variables, `this`, and scope are resolved at any given point in code execution
    C) It only applies to CSS debugging
    D) It has no relationship to variable scope
    **Hint:** Many confusing bugs come down to "what does `this` refer to right here?" — that question is answered by this concept.
    **Answer:** B
    **Explanation:** Execution context determines what `this`, variable scope, and hoisting resolve to at a given point in the code, which is central to diagnosing many tricky bugs.

---

## Topic 2: Syntax & Statements

### Easy

1. What character typically ends a JavaScript statement?
   A) A colon `:`
   B) A semicolon `;`
   C) A period `.`
   D) A hyphen `-`
   **Hint:** This same character is used to separate items in languages like Java and C++.
   **Answer:** B
   **Explanation:** A semicolon conventionally marks the end of a JavaScript statement, similar to Java or C++.

2. Is JavaScript case-sensitive?
   A) Yes
   B) No
   C) Only for variable names
   D) Only for function names
   **Hint:** Would `myVar` and `MyVar` be treated as the exact same identifier?
   **Answer:** A
   **Explanation:** JavaScript treats `myVar` and `MyVar` as two completely different identifiers, since it is case-sensitive.

3. Which symbols are used to group a block of code?
   A) Parentheses `()`
   B) Curly braces `{}`
   C) Square brackets `[]`
   D) Angle brackets `<>`
   **Hint:** These are the same symbols used to define an `if` statement's body.
   **Answer:** B
   **Explanation:** Curly braces `{}` group a block of statements, such as the body of an `if` or function.

4. What does `//` start in JavaScript?
   A) A multi-line comment
   B) A single-line comment
   C) A string
   D) A function call
   **Hint:** Everything after these two characters, on that same line, gets ignored by the engine.
   **Answer:** B
   **Explanation:** `//` begins a single-line comment — everything after it on that line is ignored.

5. Which of these is a valid JavaScript variable name?
   A) `2ndValue`
   B) `my-value`
   C) `myValue`
   D) `my value`
   **Hint:** Check each option for a leading digit, a hyphen, or a space — all three are disallowed.
   **Answer:** C
   **Explanation:** `myValue` follows the rules for identifiers: no leading digit, no hyphens, and no spaces.

6. What does whitespace generally do to JavaScript code execution?
   A) It's required for correct execution
   B) It's mostly ignored between tokens
   C) It causes syntax errors
   D) It comments out the line
   **Hint:** Could you compress a multi-line function onto one line and still have it technically run?
   **Answer:** B
   **Explanation:** JavaScript's parser mostly ignores whitespace between tokens, which is why code can be compressed onto fewer lines and still run.

7. Which keyword declares a variable that can be reassigned?
   A) `const`
   B) `let`
   C) `final`
   D) `fixed`
   **Hint:** One of these keywords is specifically Java's, not JavaScript's.
   **Answer:** B
   **Explanation:** `let` declares a variable that can be reassigned later; `final` and `fixed` aren't JavaScript keywords at all.

8. What does `console.log()` do?
   A) Deletes a variable
   B) Prints output to the browser or terminal console
   C) Declares a new function
   D) Creates an HTML element
   **Hint:** This is the very first debugging tool most JavaScript beginners learn.
   **Answer:** B
   **Explanation:** `console.log()` outputs a value to the browser's or terminal's console, mainly for debugging.

9. Which of the following correctly opens a multi-line comment?
   A) `//`
   B) `/*`
   C) `<!--`
   D) `#`
   **Hint:** One of these options is actually HTML's comment syntax, not JavaScript's.
   **Answer:** B
   **Explanation:** `/*` opens a multi-line comment, which continues until a matching `*/` is found.

10. What happens if you forget a closing curly brace `}`?
    A) Nothing, it's optional
    B) JavaScript throws a syntax error
    C) The code runs twice
    D) It auto-corrects silently
    **Hint:** Every opening brace needs a partner — what happens when something is left unbalanced?
    **Answer:** B
    **Explanation:** An unbalanced/missing closing brace leaves a block incomplete, which JavaScript reports as a syntax error.

### Medium

11. What is "Automatic Semicolon Insertion" (ASI)?
    A) A build tool
    B) JavaScript's behavior of inferring missing semicolons in certain situations
    C) A linter rule that's always disabled
    D) A CSS feature
    **Hint:** This explains why code sometimes still runs fine even when you forget semicolons.
    **Answer:** B
    **Explanation:** ASI is the engine's behavior of automatically inserting a semicolon where one appears to be missing, based on specific rules.

12. Which of these variable names is invalid in JavaScript?
    A) `_value`
    B) `$total`
    C) `1stPlace`
    D) `firstPlace`
    **Hint:** Look closely at what character each name starts with.
    **Answer:** C
    **Explanation:** Identifiers can't start with a digit, which rules out `1stPlace`.

13. What's the effect of nesting curly braces `{}` incorrectly (mismatched count)?
    A) JavaScript ignores it
    B) It causes a syntax error, since block structure must be balanced
    C) It only affects performance, not correctness
    D) It converts the code to a string
    **Hint:** Think about parentheses in math — what happens if you open one but never close it?
    **Answer:** B
    **Explanation:** Curly braces must be balanced — an unmatched count breaks the block structure and produces a syntax error.

14. Why might relying on Automatic Semicolon Insertion be risky?
    A) It never causes any issues
    B) It can misinterpret code across line breaks, leading to unexpected behavior
    C) It always throws an error
    D) It disables all functions
    **Hint:** ASI makes a guess about your intent — guesses aren't always right, especially with `return` statements.
    **Answer:** B
    **Explanation:** Because ASI applies rules based on line breaks, it can sometimes guess wrong and insert a semicolon somewhere the developer didn't intend.

15. What is the purpose of using consistent indentation, even though JavaScript ignores whitespace?
    A) It changes how the code executes
    B) It improves human readability and helps spot structural errors
    C) It's required for the code to run
    D) It converts tabs to semicolons
    **Hint:** If the engine doesn't care about indentation, who does it actually benefit?
    **Answer:** B
    **Explanation:** Indentation doesn't affect execution, but it makes nested structure and logic much easier for humans to follow.

16. Which statement about JavaScript keywords is true?
    A) Keywords can be used freely as variable names
    B) Reserved keywords like `let`, `if`, and `function` cannot be used as variable names
    C) Keywords only apply inside functions
    D) There are no reserved keywords in JavaScript
    **Hint:** Try naming a variable `let` or `if` — would the engine even be able to tell what you meant?
    **Answer:** B
    **Explanation:** Reserved words like `let`, `if`, and `function` are part of the language's grammar and can't double as identifier names.

17. What does an empty statement (just a semicolon `;`) do?
    A) Causes a syntax error
    B) Does nothing — it's valid but has no effect
    C) Deletes the previous statement
    D) Only works inside loops
    **Hint:** Is a semicolon on its own line actually forbidden, or just pointless?
    **Answer:** B
    **Explanation:** A lone semicolon is a legal, no-op empty statement — it just doesn't do anything.

18. Which best describes a JavaScript "expression" vs. a "statement"?
    A) They are exactly the same thing
    B) An expression produces a value; a statement performs an action
    C) Statements always return a value; expressions never do
    D) Expressions can't be nested in statements
    **Hint:** Ask yourself: does `2 + 2` hand back a value the way an `if` block does?
    **Answer:** B
    **Explanation:** An expression evaluates to a value (like `2 + 2`), while a statement performs an action (like an `if` block) without itself being a value.

19. Why does JavaScript allow both single and double quotes for strings?
    A) It doesn't — only double quotes work
    B) Both are valid ways to delimit string literals, offering flexibility (e.g., quoting within a string)
    C) Single quotes are deprecated
    D) Double quotes only work in Node.js
    **Hint:** Think about how you'd write a string that itself needs to contain a quotation mark.
    **Answer:** B
    **Explanation:** Single and double quotes both create valid string literals, which lets you pick whichever one avoids needing to escape a quote inside the string.

20. What's a syntax implication of JavaScript being "free-form"?
    A) Code layout (line breaks, spacing) is largely up to the developer's style
    B) Every statement must be on its own line
    C) Curly braces are never required
    D) Code must be written in all lowercase
    **Hint:** Could you technically write an entire small script all on one single line?
    **Answer:** A
    **Explanation:** JavaScript doesn't enforce a specific line layout, so spacing and line breaks are largely a matter of style.

### Hard

21. In what specific case can Automatic Semicolon Insertion cause a `return` statement to fail unexpectedly?
    A) It never causes issues with `return`
    B) When a newline follows `return` before the intended returned value, ASI inserts a semicolon immediately after `return`
    C) `return` is not affected by ASI at all
    D) Only `return null` is affected
    **Hint:** Consider what ASI assumes when it sees `return` sitting alone at the end of a line.
    **Answer:** B
    **Explanation:** When `return` is immediately followed by a line break before the actual value, ASI inserts a semicolon right after `return`, silently turning it into `return;` and returning `undefined`.

22. Why might strict mode (`"use strict"`) change how certain syntax errors are handled?
    A) It has no effect on error handling
    B) It converts previously silent mistakes (like undeclared variables) into thrown errors
    C) It disables all error reporting
    D) It only works in comments
    **Hint:** Strict mode is designed to make JavaScript less forgiving, not more.
    **Answer:** B
    **Explanation:** Strict mode turns previously silent problems — like assigning to an undeclared variable — into thrown errors instead.

23. What's a subtle syntax risk of omitting semicolons and starting a new line with `(` or `[`?
    A) There is no risk at all
    B) ASI may not insert a semicolon, causing the new line to be parsed as a continuation of the previous statement (e.g., a function call)
    C) It always causes an immediate syntax error
    D) It only affects comments
    **Hint:** ASI only inserts a semicolon when it's fairly sure a new statement is starting — a leading `(` looks like it could be a function call continuing the line above.
    **Answer:** B
    **Explanation:** Because a leading `(` or `[` on a new line looks like it could continue a call or index expression from the line above, ASI often doesn't insert a semicolon there, merging the two lines unexpectedly.

24. Why does the placement of `{ }` for object literals sometimes conflict with block statement syntax?
    A) It never conflicts
    B) At the start of a statement, `{` is ambiguous between an object literal and a block — JavaScript defaults to treating it as a block
    C) Object literals are never valid at the start of a line
    D) Block statements are deprecated
    **Hint:** `{ }` has two completely different jobs in JavaScript — one for objects, one for grouping code — and the parser has to guess which one you meant.
    **Answer:** B
    **Explanation:** At the start of a statement, JavaScript resolves the ambiguity of `{` by defaulting to interpreting it as a block rather than an object literal.

25. What is the significance of "hoisting" as it relates to statement order and syntax?
    A) Hoisting has no relationship to syntax rules
    B) Certain declarations are conceptually moved to the top of their scope during compilation, affecting what identifiers are available before their literal declaration line
    C) Hoisting only applies to CSS
    D) Hoisting reverses the order of all statements
    **Hint:** Have you ever seen a function get called successfully before its own declaration appears further down the file?
    **Answer:** B
    **Explanation:** Hoisting conceptually moves declarations to the top of their scope before code runs, which is why some identifiers are already available before their declaration line is reached.

26. Why is it considered best practice to avoid relying on implicit type coercion in conditional syntax (e.g., `if (value)`)?
    A) It's always the safest and clearest approach
    B) Implicit coercion (truthy/falsy checks) can silently mask type bugs, making explicit comparisons clearer
    C) It causes syntax errors
    D) JavaScript disallows implicit coercion entirely
    **Hint:** Consider what happens when `value` is the number `0` — is that condition actually testing what you think it's testing?
    **Answer:** B
    **Explanation:** Truthy/falsy checks like `if (value)` coerce implicitly, which can hide type-related bugs that an explicit comparison would catch.

27. What syntax distinction exists between a labeled statement and a regular block?
    A) There is no distinction
    B) A labeled statement (`label: statement`) allows `break`/`continue` to target it specifically, unlike a plain block
    C) Labels are only valid inside functions
    D) Labels replace the need for curly braces
    **Hint:** This feature is mainly useful for breaking out of a loop nested inside another loop, by name.
    **Answer:** B
    **Explanation:** A label lets `break`/`continue` jump to a specifically named statement (often useful for nested loops), which a plain unlabeled block can't do.

28. Why can deeply nested code (many levels of `{ }`) become a maintainability concern, even though it's syntactically valid?
    A) JavaScript has a hard nesting limit that's usually hit
    B) Deep nesting increases cognitive load and the chance of mismatched braces or logic errors, even without any syntax violation
    C) Nesting beyond 2 levels is illegal syntax
    D) It automatically causes performance issues
    **Hint:** This is a human-readability problem, not something the JavaScript engine itself objects to.
    **Answer:** B
    **Explanation:** Deeply nested braces are syntactically fine but make code harder for humans to track, increasing the chance of logic or brace-matching mistakes.

29. What's the practical effect of JavaScript's lack of significant whitespace (unlike Python)?
    A) It has no practical effect
    B) Code blocks must be explicitly delimited with `{ }` rather than relying on indentation
    C) It means indentation is mandatory for correctness
    D) It requires tabs instead of spaces
    **Hint:** In Python, indentation itself defines a block — does removing all the indentation from a JS file actually break it?
    **Answer:** B
    **Explanation:** Since JavaScript doesn't use indentation to define scope, blocks always need explicit `{ }` delimiters regardless of how the code is indented.

30. Why might a linter (like ESLint) enforce stricter syntax rules than the JavaScript engine itself requires?
    A) Linters and engines always enforce identical rules
    B) Linters catch stylistic and error-prone patterns (like missing semicolons or ambiguous coercion) that are syntactically legal but risky
    C) Linters change how the code executes at runtime
    D) Linters are only used for CSS
    **Hint:** A linter's job is to catch things that will technically run fine, but are still a bad idea.
    **Answer:** B
    **Explanation:** Linters flag risky-but-legal patterns (missing semicolons, ambiguous coercion, etc.) that the JavaScript engine itself has no problem executing.

---

## Topic 3: Variables & Constants

### Easy

1. Which keyword declares a variable whose value cannot be reassigned?
   A) `let`
   B) `const`
   C) `var`
   D) `static`
   **Hint:** This keyword's name is a hint about its behavior — it stays "constant."
   **Answer:** B
   **Explanation:** `const` creates a binding that cannot be reassigned after its initial value is set.

2. Which of these is the older, less recommended way to declare a variable?
   A) `let`
   B) `const`
   C) `var`
   D) `def`
   **Hint:** This keyword predates ES6 (2015) and has looser scoping rules.
   **Answer:** C
   **Explanation:** `var` is the original variable-declaration keyword, predating `let`/`const` and carrying looser scoping rules.

3. Can you declare a variable without assigning it a value?
   A) No, JavaScript requires an initial value
   B) Yes, e.g. `let age;`
   C) Only with `const`
   D) Only inside a function
   **Hint:** Try to recall whether `let score;` on its own line is valid syntax.
   **Answer:** B
   **Explanation:** A variable can be declared without an initial value, like `let age;`, and will simply hold `undefined` until assigned.

4. What is the default value of a declared but unassigned variable?
   A) `0`
   B) `null`
   C) `undefined`
   D) `""`
   **Hint:** This is a special value distinct from `null`, meaning "not yet assigned."
   **Answer:** C
   **Explanation:** An unassigned variable automatically holds the special value `undefined`.

5. Which naming convention is standard for JavaScript variables?
   A) snake_case
   B) camelCase
   C) PascalCase
   D) kebab-case
   **Hint:** Think of how `firstName` is capitalized — no underscores, no hyphens.
   **Answer:** B
   **Explanation:** camelCase (e.g. `firstName`) is the conventional style for JavaScript variable names.

6. Is `let myAge = 25;` a valid variable declaration?
   A) Yes
   B) No, missing a type
   C) No, missing quotes
   D) No, `let` is not a keyword
   **Hint:** JavaScript doesn't require you to declare a variable's type explicitly.
   **Answer:** A
   **Explanation:** `let myAge = 25;` is valid syntax — JavaScript doesn't require an explicit type.

7. What happens if you try to reassign a `const` variable?
   A) It works normally
   B) JavaScript throws a TypeError
   C) It becomes `undefined`
   D) Nothing happens
   **Hint:** The whole point of `const` is preventing exactly this action.
   **Answer:** B
   **Explanation:** Attempting to reassign a `const` variable throws a TypeError, since reassignment is exactly what `const` prevents.

8. Which of these variable declarations is scoped to the nearest enclosing block (like an `if` block)?
   A) `var`
   B) `let`
   C) Both equally
   D) Neither
   **Hint:** One of these two is famous for "leaking" outside of `if`/`for` blocks; the other isn't.
   **Answer:** B
   **Explanation:** `let` is block-scoped, so it's confined to the nearest enclosing `{ }`, unlike `var`.

9. Can you declare multiple variables in a single statement?
   A) No, one per line only
   B) Yes, e.g. `let a = 1, b = 2;`
   C) Only with `const`
   D) Only using arrays
   **Hint:** A comma can separate multiple declarations within one `let` or `var` statement.
   **Answer:** B
   **Explanation:** Multiple variables can be declared in one statement by separating them with commas, e.g. `let a = 1, b = 2;`.

10. Which keyword would you use for a variable that will be reassigned multiple times in a loop?
    A) `const`
    B) `let`
    C) `final`
    D) `static`
    **Hint:** Think about a loop counter that increases every iteration — can that use `const`?
    **Answer:** B
    **Explanation:** `let` suits a loop counter since it needs to be reassigned each iteration, which `const` wouldn't allow.

### Medium

11. What does "block scope" mean for `let` and `const`?
    A) They are accessible everywhere in the file
    B) They are only accessible within the nearest `{ }` block they're declared in
    C) They can never be accessed inside functions
    D) They are deleted after one use
    **Hint:** Consider a variable declared inside an `if (...) { }` — can code after the closing brace see it?
    **Answer:** B
    **Explanation:** Block scope means a `let`/`const` variable only exists within the nearest `{ }` block it was declared in.

12. Why is `var` considered risky in modern JavaScript?
    A) It doesn't exist in modern JavaScript
    B) It is function-scoped rather than block-scoped, which can cause variables to unexpectedly "leak" outside blocks
    C) It cannot store numbers
    D) It requires semicolons while `let` doesn't
    **Hint:** Think about a `var` declared inside an `if` block — is it still accessible right after the block ends?
    **Answer:** B
    **Explanation:** `var` is scoped to the enclosing function rather than the block, so it can unexpectedly remain accessible outside an `if` or `for` block.

13. What is variable "hoisting" specifically for `var`?
    A) `var` declarations are moved to the top of their scope and initialized as `undefined` before execution
    B) `var` variables are deleted at hoisting time
    C) Hoisting only applies to functions, never variables
    D) `var` cannot be hoisted
    **Hint:** This explains why referencing a `var` before its declaration line doesn't throw an error — it just returns something unexpected.
    **Answer:** A
    **Explanation:** `var` declarations are hoisted to the top of their scope and initialized to `undefined` before the code actually runs.

14. Does `const` mean an object's properties can never be changed?
    A) True — the entire object becomes frozen
    B) False — `const` only prevents reassigning the variable itself; object properties can still be modified
    C) True, but only for arrays
    D) `const` cannot be used with objects at all
    **Hint:** Think about the difference between changing what a variable points to, versus changing the contents of what it already points to.
    **Answer:** B
    **Explanation:** `const` only locks the variable binding itself — it doesn't freeze the object's contents, so properties can still be changed.

15. What happens if you try to access a `let` variable before its declaration line (within the same block)?
    A) It returns `undefined`, same as `var`
    B) It throws a ReferenceError due to the "temporal dead zone"
    C) It automatically initializes to `0`
    D) It silently skips the line
    **Hint:** Unlike `var`, `let` declarations exist but aren't "usable" yet in the space before their line — a distinct kind of error results.
    **Answer:** B
    **Explanation:** Accessing a `let` before its declaration line triggers the temporal dead zone, throwing a ReferenceError rather than returning `undefined`.

16. Which of these is true about redeclaring a variable with `let` in the same scope?
    A) It's allowed and simply overwrites the first
    B) It throws a SyntaxError for duplicate declaration
    C) It creates a second, separate variable
    D) It's only allowed with numbers
    **Hint:** Try running `let x = 1; let x = 2;` in the same scope — is that considered valid?
    **Answer:** B
    **Explanation:** Declaring the same `let` identifier twice in one scope is a SyntaxError, unlike the more permissive `var`.

17. Why might a developer choose `const` by default, only switching to `let` when reassignment is truly needed?
    A) `const` runs faster in every case
    B) It signals clear intent and prevents accidental reassignment bugs
    C) `let` is deprecated
    D) `const` uses less memory
    **Hint:** Think about what a `const` declaration communicates to someone reading your code later.
    **Answer:** B
    **Explanation:** Defaulting to `const` signals that a value isn't meant to change, making accidental reassignment easier to catch.

18. What's true about declaring the same variable name with `var` twice in the same scope?
    A) It throws an error, just like `let`
    B) It's allowed without error — the second declaration just overwrites the first
    C) It's completely disallowed by JavaScript
    D) It creates two independent variables
    **Hint:** `var`'s looser rules are part of why `let`/`const` are generally preferred today.
    **Answer:** B
    **Explanation:** `var` allows redeclaring the same name in the same scope without error — the second declaration simply overwrites the first.

19. In a `for` loop, why does using `let i` (instead of `var i`) matter for closures created inside the loop?
    A) It has no effect on closures
    B) `let` creates a new binding of `i` for each iteration, while `var` shares one binding across all iterations
    C) `var` is faster in loops
    D) `let` cannot be used in `for` loops at all
    **Hint:** Think about a classic bug where a loop-created function always logs the final loop value instead of the value at the time it was created.
    **Answer:** B
    **Explanation:** `let` creates a fresh binding of `i` for every loop iteration, so closures capture the value from their own iteration instead of one shared final value.

20. What is the "temporal dead zone" in relation to `let` and `const`?
    A) A period of time before a variable is declared where accessing it throws an error
    B) A performance optimization that runs once
    C) A special zone only in Node.js
    D) A synonym for `undefined`
    **Hint:** "Temporal" refers to timing — this is about the timing window before a variable's declaration is actually reached.
    **Answer:** A
    **Explanation:** The temporal dead zone is the span before a `let`/`const` declaration is reached, during which accessing the variable throws an error.

### Hard

21. Why does `var`'s function-scoping (rather than block-scoping) sometimes make debugging loop-based code harder?
    A) It doesn't — function-scoping has no effect on loops
    B) A `var` declared inside a loop's block is actually visible and shared across the entire enclosing function, causing unexpected access outside the loop
    C) `var` cannot be used inside loops
    D) Function-scoping only applies to `let`
    **Hint:** Consider what happens if you check a `var` loop counter's value immediately after the loop finishes, outside the loop's braces.
    **Answer:** B
    **Explanation:** Because `var` is function-scoped, a variable declared inside a loop's block remains accessible throughout the whole enclosing function, not just within the loop.

22. What subtle bug can arise from relying on `var` hoisting inside a conditionally executed block?
    A) No bugs can arise — hoisting is always safe
    B) The variable exists (as `undefined`) even if the condition is false, which can mask logic errors that would otherwise throw with `let`
    C) `var` cannot be declared inside conditionals
    D) It always throws a compile-time error
    **Hint:** With `let`, referencing a variable that was never actually declared (because its `if` block didn't run) would correctly throw — `var`'s hoisting can hide that same mistake.
    **Answer:** B
    **Explanation:** `var` hoisting means the variable exists (as `undefined`) even if its declaring `if` block never actually runs, which can hide a logic error that `let`'s stricter behavior would surface.

23. Why is `const` for object references sometimes described as "shallow immutability"?
    A) Because `const` fully deep-freezes every nested property automatically
    B) Because `const` only locks the variable's reference — nested objects/arrays inside it remain fully mutable unless separately frozen
    C) Because `const` objects cannot have any properties at all
    D) Because "shallow" means the object is deleted quickly
    **Hint:** `const` stops you from reassigning the *outer* variable — but what about changing the values *inside* the object it points to?
    **Answer:** B
    **Explanation:** `const` only prevents reassigning the variable itself — any object or array it points to is still fully mutable unless explicitly frozen, which is why it's called "shallow."

24. In what scenario would the temporal dead zone actually help catch a bug that `var` hoisting would silently hide?
    A) Never — TDZ and `var` hoisting behave identically
    B) Referencing a `let`/`const` variable before its declaration line throws a clear error, while the equivalent `var` reference silently returns `undefined`
    C) TDZ only applies to functions, not variables
    D) TDZ disables the variable permanently
    **Hint:** Think about which behavior is more helpful for catching a genuine logic mistake: a loud error, or a silent `undefined`.
    **Answer:** B
    **Explanation:** Referencing a `let`/`const` too early throws a clear, immediate error, whereas the equivalent mistake with `var` just silently returns `undefined`.

25. Why might two nested blocks each declaring `let x` with different values NOT conflict, even though they share the same name?
    A) JavaScript disallows this entirely
    B) Each block creates its own separate scope, so the inner `x` shadows the outer one without modifying it
    C) The values get merged into one variable
    D) Only the outer `x` is ever used
    **Hint:** This is called "shadowing" — think of it like two rooms each having their own separate lamp named "lamp1."
    **Answer:** B
    **Explanation:** Each block introduces its own scope, so an inner `let x` shadows an outer one locally without altering or conflicting with it.

26. What's a key reason `const` doesn't prevent all forms of "mutation" for an array declared with it?
    A) `const` arrays are actually always immutable
    B) `const` only fixes the variable's binding to that array in memory — methods like `.push()` modify the array's contents without reassigning the variable itself
    C) Arrays can never be declared with `const`
    D) `.push()` secretly creates a new `let` variable
    **Hint:** `myArr.push(4)` doesn't do `myArr = [...myArr, 4]` — it modifies the existing array object directly.
    **Answer:** B
    **Explanation:** `const` fixes the variable to a particular array in memory, but methods like `.push()` mutate that array's contents in place rather than reassigning the variable.

27. Why does redeclaring a `var` inside a function, using the exact same name as a `var` outer-scope parameter, not cause an error?
    A) It always causes a SyntaxError
    B) `var`'s function-scoping and loose redeclaration rules mean the "redeclaration" just refers to the same existing binding
    C) Functions cannot contain `var` at all
    D) It creates two independent copies
    **Hint:** Remember that `var` allows redeclaring the same name in the same scope without complaint — a function parameter and a `var` share that same function-level scope.
    **Answer:** B
    **Explanation:** Because `var` is function-scoped and allows redeclaration, a `var` with the same name as a parameter just refers to that same existing binding rather than creating a conflict.

28. What's the practical implication of `let`/`const` being scoped to `{ }` blocks, for code inside `if`, `for`, or `while` bodies?
    A) There's no practical implication
    B) Variables declared inside these blocks are inaccessible once you exit the block, encouraging more predictable, self-contained logic
    C) This scoping only applies to arrow functions
    D) It means loops cannot use `let` at all
    **Hint:** Think about the benefit of a temporary loop or conditional variable *not* accidentally leaking into and polluting the code that follows it.
    **Answer:** B
    **Explanation:** Once execution leaves an `if`/`for`/`while` block, any `let`/`const` declared inside it is gone, keeping that logic self-contained instead of leaking into surrounding code.

29. Why can heavy reliance on `var` in older JavaScript codebases make refactoring riskier today?
    A) `var` is impossible to refactor at all
    B) Its function-scoping and hoisting can create implicit dependencies between distant lines of code that aren't obvious from a quick read
    C) `var` variables cannot be renamed
    D) Modern JavaScript engines reject `var` entirely
    **Hint:** If a `var` declared deep inside one block is silently accessible far away in the same function, how confident can you be about what depends on it?
    **Answer:** B
    **Explanation:** `var`'s hoisting and function-level scoping can create hidden dependencies between distant lines, making it harder to safely predict the effect of changing or removing code.

30. Why does the design of `const` (as the default recommendation) reflect a broader trend in modern language design?
    A) It reflects no particular trend
    B) Many modern languages favor immutability by default, since it reduces a class of bugs from accidental, unexpected value changes
    C) `const` was added purely for performance reasons, unrelated to safety
    D) It was added only for backward compatibility with older code
    **Hint:** Consider why languages like Rust, Swift, and Kotlin also emphasize immutable-by-default variables.
    **Answer:** B
    **Explanation:** Languages like Rust, Swift, and Kotlin also default to immutable bindings, since immutability by default helps prevent a whole class of accidental-mutation bugs.

---

## Topic 4: Data Types

### Easy

1. Which of these is a primitive data type in JavaScript?
   A) Array
   B) Object
   C) String
   D) Function
   **Hint:** Three of these four are actually built on top of the "object" type under the hood.
   **Answer:** C
   **Explanation:** String is a true primitive type; arrays, objects, and functions are all built on top of JavaScript's object type.

2. What data type is the value `42`?
   A) String
   B) Number
   C) Boolean
   D) Undefined
   **Hint:** No quotes surround it, so it isn't text.
   **Answer:** B
   **Explanation:** A numeric literal like `42`, with no quotes, is of type Number.

3. What data type is `true`?
   A) String
   B) Number
   C) Boolean
   D) Null
   **Hint:** This value can only ever be one of two possible states.
   **Answer:** C
   **Explanation:** `true`/`false` are the two possible Boolean values.

4. What does `typeof "hello"` return?
   A) `"text"`
   B) `"string"`
   C) `"str"`
   D) `"char"`
   **Hint:** JavaScript's word for quoted text data is a common one shared with many other languages.
   **Answer:** B
   **Explanation:** `typeof` reports quoted text as `"string"`.

5. Which value represents "intentionally no value"?
   A) `undefined`
   B) `null`
   C) `0`
   D) `""`
   **Hint:** This is a value a developer would deliberately assign, unlike the other option which happens automatically.
   **Answer:** B
   **Explanation:** `null` is a value a developer deliberately assigns to represent "no value," unlike `undefined`, which happens automatically.

6. Which value represents "a variable has been declared but not yet assigned"?
   A) `null`
   B) `undefined`
   C) `NaN`
   D) `false`
   **Hint:** This is JavaScript's automatic default for anything not yet given a value.
   **Answer:** B
   **Explanation:** An unassigned but declared variable automatically defaults to `undefined`.

7. What does `typeof 3.14` return?
   A) `"float"`
   B) `"double"`
   C) `"number"`
   D) `"decimal"`
   **Hint:** Unlike Java or C++, JavaScript doesn't distinguish whole numbers from decimals with separate type names.
   **Answer:** C
   **Explanation:** JavaScript has a single `number` type for both integers and decimals, so `3.14` is still just `"number"`.

8. Which of these is NOT a JavaScript primitive type?
   A) `string`
   B) `boolean`
   C) `array`
   D) `number`
   **Hint:** One of these is actually a special kind of object, not a true primitive.
   **Answer:** C
   **Explanation:** Arrays are a specialized kind of object in JavaScript, not a distinct primitive type.

9. What does `typeof []` (an empty array) return?
   A) `"array"`
   B) `"object"`
   C) `"list"`
   D) `"undefined"`
   **Hint:** This is a well-known JavaScript quirk — arrays are technically a specialized kind of this other type.
   **Answer:** B
   **Explanation:** Arrays are technically objects under the hood, so `typeof` reports `"object"` for them.

10. What is `NaN` short for?
    A) "Not a Node"
    B) "Not a Number"
    C) "Null and Nothing"
    D) "New and Null"
    **Hint:** It appears as a result when a mathematical operation doesn't produce a valid numeric result.
    **Answer:** B
    **Explanation:** `NaN` stands for "Not a Number," returned when a math operation doesn't produce a valid numeric result.

### Medium

11. What does `typeof null` return, somewhat famously?
    A) `"null"`
    B) `"undefined"`
    C) `"object"`
    D) `"none"`
    **Hint:** This is widely considered a long-standing bug in the language that's been kept for backward compatibility.
    **Answer:** C
    **Explanation:** `typeof null` returns `"object"`, a widely-known historical quirk rather than a logically consistent result.

12. Which of these correctly identifies a "reference type" in JavaScript, as opposed to a primitive?
    A) `number`
    B) `boolean`
    C) `object`
    D) `string`
    **Hint:** This type is stored and copied by reference (pointer to memory), not by value.
    **Answer:** C
    **Explanation:** Objects are reference types — stored and copied by reference rather than by value, unlike primitives.

13. What is the data type of the result of `10 / "2"`?
    A) `"string"`
    B) `"number"`
    C) `"NaN"` as a distinct type
    D) It throws an error
    **Hint:** JavaScript tries to coerce the string into a number before dividing — does that succeed here?
    **Answer:** B
    **Explanation:** `"2"` is coerced to the number `2` before dividing, so `10 / "2"` evaluates to the number `5`.

14. What does `typeof undefined` return?
    A) `"null"`
    B) `"undefined"`
    C) `"object"`
    D) `"NaN"`
    **Hint:** Unlike `typeof null`, this one behaves exactly as you'd expect.
    **Answer:** B
    **Explanation:** `typeof undefined` straightforwardly returns `"undefined"`.

15. Which of the following is true about JavaScript's `Symbol` type?
    A) It's identical to a string
    B) It represents a unique, immutable identifier, often used as object property keys
    C) It's only used for CSS styling
    D) It doesn't exist in JavaScript
    **Hint:** This is one of JavaScript's more obscure primitive types, added to guarantee uniqueness.
    **Answer:** B
    **Explanation:** A `Symbol` is a unique, immutable value often used to create object property keys that won't collide with others.

16. What data type does `typeof function(){}` return?
    A) `"object"`
    B) `"function"`
    C) `"method"`
    D) `"undefined"`
    **Hint:** Even though functions are technically objects under the hood, `typeof` gives them a distinct answer.
    **Answer:** B
    **Explanation:** Functions get their own distinct `typeof` result, `"function"`, even though they're technically objects internally.

17. Is `BigInt` a separate primitive type from `number` in JavaScript?
    A) No, they're identical
    B) Yes, `BigInt` handles integers beyond the safe range that `number` can accurately represent
    C) `BigInt` only exists in TypeScript
    D) `BigInt` replaced `number` entirely
    **Hint:** Regular JavaScript numbers lose precision beyond a certain very large integer value — this type was added to solve that.
    **Answer:** B
    **Explanation:** `BigInt` is a separate primitive designed to represent integers beyond the range `number` can represent exactly.

18. Which comparison correctly distinguishes primitive types from reference types regarding equality checks?
    A) Both are always compared by value
    B) Primitives are compared by value; objects/arrays are compared by reference (memory location)
    C) Both are always compared by reference
    D) There is no difference in comparison behavior
    **Hint:** Two separate arrays with identical contents — are they considered `===` equal in JavaScript?
    **Answer:** B
    **Explanation:** Primitives are compared by their actual value, while objects/arrays are compared by whether they reference the same location in memory.

19. What is the result of `typeof NaN`?
    A) `"NaN"`
    B) `"number"`
    C) `"undefined"`
    D) `"object"`
    **Hint:** Despite its name meaning "not a number," it's still technically categorized within one specific type.
    **Answer:** B
    **Explanation:** Despite meaning "not a number," `NaN` is still categorized as type `"number"`.

20. Which of these best explains why arrays return `"object"` from `typeof`, despite having their own dedicated syntax?
    A) It's a mistake with no explanation
    B) Arrays are implemented as a specialized kind of object in JavaScript's type system, sharing the object category
    C) `typeof` doesn't work on arrays at all
    D) Arrays are actually primitives
    **Hint:** JavaScript's type system predates arrays getting their own array-specific literal syntax — they were layered on top of objects.
    **Answer:** B
    **Explanation:** Arrays were layered on top of JavaScript's existing object system, so `typeof` still classifies them as `"object"`.

### Hard

21. Why is `typeof null` returning `"object"` considered a legacy bug rather than intentional design?
    A) It was intentional and remains the correct behavior by design
    B) It stems from how types were represented internally in JavaScript's original 1995 implementation, and fixing it now would break existing code relying on it
    C) `null` was added after `typeof` and simply wasn't accounted for
    D) It only happens in Node.js, not browsers
    **Hint:** This is widely acknowledged by JavaScript's own creators as an early implementation quirk that became permanent due to backward compatibility.
    **Answer:** B
    **Explanation:** The `"object"` result for `typeof null` traces back to how types were encoded internally in JavaScript's original 1995 implementation, and it was never fixed because doing so would break code depending on it.

22. Why does `0.1 + 0.2 === 0.3` evaluate to `false` in JavaScript?
    A) JavaScript cannot add decimal numbers
    B) Floating-point numbers are stored in binary, and many decimal fractions can't be represented exactly, causing tiny rounding errors
    C) `+` only works for integers
    D) This is a syntax error, not a boolean result
    **Hint:** This isn't unique to JavaScript — it's a consequence of how virtually all languages represent decimal numbers in binary floating-point format.
    **Answer:** B
    **Explanation:** Floating-point numbers are stored in binary, and many decimal fractions (like 0.1 and 0.2) can't be represented exactly, producing tiny rounding errors.

23. What's the practical significance of JavaScript having only one `number` type, unlike Java's `int`/`double`/`long` distinction?
    A) There is no practical significance
    B) It simplifies type declarations but means all numbers (whole or decimal) share the same precision limitations and behavior
    C) JavaScript numbers are always integers internally
    D) It means JavaScript cannot perform math operations
    **Hint:** Consider both the simplicity this brings, and the precision tradeoffs it creates for very large or very precise values.
    **Answer:** B
    **Explanation:** A single `number` type simplifies declarations, but it means every JavaScript number shares the same precision limits, unlike Java's separate `int`/`double`/`long` types.

24. Why might comparing two structurally identical objects with `===` unexpectedly return `false`?
    A) It's a bug that never actually happens
    B) `===` for objects compares memory reference, not structural content — two separately created objects are never `===` equal even with identical properties
    C) Objects cannot be compared with `===` at all
    D) `===` always coerces objects to strings first
    **Hint:** Two houses that look identical are still two different physical buildings — object comparison works similarly.
    **Answer:** B
    **Explanation:** `===` compares objects by memory reference, so two independently created objects are never equal even if their properties look identical.

25. Why does JavaScript's dynamic typing make `typeof` checks alone sometimes insufficient for robust type-checking in larger applications?
    A) `typeof` is always fully sufficient
    B) `typeof` can't distinguish between different object types (arrays, dates, custom classes all return `"object"`), requiring additional checks like `Array.isArray()` or `instanceof`
    C) `typeof` doesn't work on variables, only literals
    D) Dynamic typing eliminates the need for any type checking
    **Hint:** If both an array and a plain object both return `"object"` from `typeof`, how would you tell them apart?
    **Answer:** B
    **Explanation:** `typeof` can't tell arrays, dates, and plain objects apart since they all report `"object"`, so more specific checks like `Array.isArray()` or `instanceof` are needed.

26. What's the significance of `Symbol` values never being equal to each other, even with identical descriptions?
    A) It's a bug
    B) Each `Symbol()` call generates a guaranteed-unique value, useful for creating object properties that won't collide with any other code's properties
    C) Symbols are secretly just strings underneath
    D) `Symbol` values are always equal by design
    **Hint:** The entire design goal of `Symbol` is guaranteed uniqueness — two calls with the same description are still meant to be different.
    **Answer:** B
    **Explanation:** Every call to `Symbol()` produces a guaranteed-unique value, even with an identical description, which is the whole point of the type.

27. Why can't `BigInt` values be mixed directly with regular `number` values in arithmetic (e.g., `1n + 1`)?
    A) There's no such restriction — they mix freely
    B) JavaScript throws a TypeError, since implicitly converting between the two could silently lose precision in one direction or the other
    C) `BigInt` doesn't support any arithmetic operations
    D) `number` values are automatically converted to `BigInt` silently
    **Hint:** Since these two types represent numbers very differently internally, JavaScript forces you to be explicit about converting one to match the other.
    **Answer:** B
    **Explanation:** Mixing `BigInt` and `number` directly would force JavaScript to silently choose a lossy conversion in one direction, so it throws a TypeError instead and requires an explicit conversion.

28. Why does JavaScript's type coercion system make understanding the distinction between `==` and data type important for real debugging?
    A) It doesn't matter, `==` and `===` are functionally identical
    B) `==` performs type coercion before comparing, so values of different types can appear "equal" in ways that mask underlying type mismatches
    C) `==` is only used for strings
    D) Type coercion doesn't affect comparison operators
    **Hint:** `"5" == 5` returns `true` — does that tell you these two values are actually the same type?
    **Answer:** B
    **Explanation:** `==` coerces operands to matching types before comparing, so values like `"5"` and `5` can compare equal despite being genuinely different types.

29. Why is checking `Array.isArray(value)` generally preferred over `typeof value === "object"` when specifically verifying something is an array?
    A) They behave identically, so it doesn't matter
    B) `typeof` cannot distinguish arrays from plain objects, dates, or `null`, all of which can also satisfy `typeof value === "object"`
    C) `Array.isArray()` doesn't actually work reliably
    D) `typeof` only works on strings
    **Hint:** Both a plain `{}` object and an array `[]` return `"object"` from `typeof` — so that check alone can't tell them apart.
    **Answer:** B
    **Explanation:** `typeof` alone can't tell an array apart from a plain object (or `null`), since all of them can report `"object"`, but `Array.isArray()` checks specifically for arrays.

30. What's the deeper reason JavaScript's type system is described as having "type coercion" rather than being purely dynamically typed like Python?
    A) There's no meaningful difference between the two languages' type systems
    B) JavaScript automatically converts between types in many operations (like `+` with mixed strings/numbers), whereas Python generally raises an error instead of silently coercing
    C) Python doesn't have any type system at all
    D) JavaScript never converts between types automatically
    **Hint:** Try adding a string and a number in Python versus in JavaScript — one throws an error, the other quietly produces a result.
    **Answer:** B
    **Explanation:** JavaScript silently converts between types in many operations (like `+`), while Python instead raises an error when mixing incompatible types.

---

## Topic 5: Type Conversion

### Easy

1. What does `String(42)` return?
   A) `42`
   B) `"42"`
   C) `undefined`
   D) An error
   **Hint:** This function's whole purpose is to explicitly convert a value into text.
   **Answer:** B
   **Explanation:** `String()` explicitly converts a value into its text representation, so `String(42)` returns `"42"`.

2. What does `Number("42")` return?
   A) `"42"`
   B) `42`
   C) `NaN`
   D) `undefined`
   **Hint:** This function converts a text value into an actual numeric value.
   **Answer:** B
   **Explanation:** `Number()` explicitly converts a numeric-looking string into an actual number, so `Number("42")` returns `42`.

3. What does `Number("hello")` return?
   A) `0`
   B) `"hello"`
   C) `NaN`
   D) `undefined`
   **Hint:** The word "hello" cannot meaningfully become a number — what special value represents that failure?
   **Answer:** C
   **Explanation:** `"hello"` has no valid numeric interpretation, so `Number()` returns `NaN`.

4. What does `Boolean(1)` return?
   A) `true`
   B) `false`
   C) `1`
   D) `"1"`
   **Hint:** Nearly every non-zero number is treated as this boolean value.
   **Answer:** A
   **Explanation:** Any non-zero number, including `1`, converts to `true`.

5. What does `Boolean(0)` return?
   A) `true`
   B) `false`
   C) `0`
   D) `undefined`
   **Hint:** Zero is one of JavaScript's known "falsy" values.
   **Answer:** B
   **Explanation:** `0` is one of JavaScript's falsy values, so `Boolean(0)` returns `false`.

6. What does `Boolean("")` (an empty string) return?
   A) `true`
   B) `false`
   C) `""`
   D) `undefined`
   **Hint:** An empty string is another of JavaScript's handful of falsy values.
   **Answer:** B
   **Explanation:** An empty string is falsy, so `Boolean("")` returns `false`.

7. What does `"5" + 3` evaluate to?
   A) `8`
   B) `"53"`
   C) `NaN`
   D) An error
   **Hint:** The `+` operator, when one side is a string, tends to combine text rather than do math.
   **Answer:** B
   **Explanation:** With a string on one side, `+` performs concatenation rather than addition, so `"5" + 3` becomes `"53"`.

8. What does `"5" - 3` evaluate to?
   A) `2`
   B) `"53"`
   C) `"2"`
   D) `NaN`
   **Hint:** Unlike `+`, the `-` operator has no "combine text" meaning, so it tries to convert to numbers instead.
   **Answer:** A
   **Explanation:** `-` has no string-concatenation meaning, so both operands are coerced to numbers first: `5 - 3 = 2`.

9. What is "implicit" type conversion also known as?
   A) Explicit conversion
   B) Type coercion
   C) Type casting only
   D) Serialization
   **Hint:** This term describes JavaScript automatically converting types behind the scenes, without you asking it to.
   **Answer:** B
   **Explanation:** Implicit type conversion — where JavaScript converts types automatically without being asked — is also called type coercion.

10. What does `parseInt("42px")` return?
    A) `NaN`
    B) `42`
    C) `"42px"`
    D) An error
    **Hint:** This function reads numeric characters from the start of a string and stops at the first non-numeric character.
    **Answer:** B
    **Explanation:** `parseInt` reads digits from the start of the string and stops at the first non-numeric character, so `"42px"` becomes `42`.

### Medium

11. What does `Number(true)` return?
    A) `1`
    B) `0`
    C) `"true"`
    D) `NaN`
    **Hint:** Boolean `true` converts to the smallest positive whole number.
    **Answer:** A
    **Explanation:** `Number(true)` converts the boolean to `1`.

12. What does `Number(false)` return?
    A) `1`
    B) `0`
    C) `"false"`
    D) `NaN`
    **Hint:** Boolean `false` converts to the number representing "nothing" or "zero."
    **Answer:** B
    **Explanation:** `Number(false)` converts the boolean to `0`.

13. What does `Number(null)` return?
    A) `null`
    B) `0`
    C) `NaN`
    D) `undefined`
    **Hint:** Despite `null` meaning "nothing," it actually converts to a specific numeric value, not `NaN`.
    **Answer:** B
    **Explanation:** `Number(null)` specifically converts to `0`, not `NaN`.

14. What does `Number(undefined)` return?
    A) `0`
    B) `undefined`
    C) `NaN`
    D) `null`
    **Hint:** Unlike `null`, converting this value to a number results in JavaScript's "invalid number" marker.
    **Answer:** C
    **Explanation:** `Number(undefined)` returns `NaN`, since `undefined` has no meaningful numeric equivalent.

15. What is the result of `"10" * "2"`?
    A) `"102"`
    B) `20`
    C) `NaN`
    D) `"20"`
    **Hint:** Unlike `+`, the `*` operator has no string-concatenation meaning at all, so both sides get converted to numbers.
    **Answer:** B
    **Explanation:** `*` has no concatenation meaning, so both strings are coerced to numbers first: `10 * 2 = 20`.

16. What does `[] + []` (two empty arrays) evaluate to?
    A) `[]`
    B) `""` (empty string)
    C) `0`
    D) `NaN`
    **Hint:** Arrays get converted to strings first when used with `+`, and an empty array becomes an empty string.
    **Answer:** B
    **Explanation:** Both empty arrays convert to `""` when stringified for `+`, so `"" + "" = ""`.

17. What does `[] + {}` evaluate to?
    A) `"[object Object]"`
    B) `NaN`
    C) An error
    D) `undefined`
    **Hint:** Both operands are converted to strings — an empty array becomes `""`, and a plain object becomes a specific default string.
    **Answer:** A
    **Explanation:** `[]` stringifies to `""` and `{}` stringifies to `"[object Object]"`, so concatenating them produces `"[object Object]"`.

18. Why does `Boolean([])` (an empty array) return `true`, unlike `Boolean(0)`?
    A) Arrays are always falsy
    B) All objects (including arrays, even empty ones) are truthy in JavaScript — only specific primitive values are falsy
    C) It's a bug
    D) Empty arrays are converted to `0` first
    **Hint:** JavaScript's list of falsy values is short and specific — does it include objects/arrays at all, empty or not?
    **Answer:** B
    **Explanation:** Only a specific short list of primitive values (like `0`, `""`, `null`) are falsy in JavaScript — objects and arrays, even empty ones, are always truthy.

19. What's the difference between `parseInt("42.9")` and `Number("42.9")`?
    A) They return identical results
    B) `parseInt` returns `42` (truncates to a whole number), while `Number` returns `42.9` (preserves the decimal)
    C) `parseInt` always returns `NaN` for decimals
    D) `Number` truncates decimals, `parseInt` doesn't
    **Hint:** One of these functions is specifically designed to parse "integer" values, hence the name.
    **Answer:** B
    **Explanation:** `parseInt` parses only up to the whole-number portion (`42`), while `Number` preserves the full decimal value (`42.9`).

20. What does `String(null)` return?
    A) `null`
    B) `"null"` (as an actual string)
    C) `""`
    D) `undefined`
    **Hint:** Converting `null` to a string doesn't produce an empty string — it produces the word itself, as text.
    **Answer:** B
    **Explanation:** Converting `null` to a string produces the literal text `"null"`, not an empty string.

### Hard

21. Why does `[] == false` evaluate to `true`, despite an empty array being a truthy value?
    A) It's inconsistent, and this contradicts JavaScript's rules
    B) `==` triggers type coercion rules distinct from `Boolean()` — both sides get converted toward numbers, and `[]` converts to `0`, matching `false`'s `0`
    C) Arrays are always equal to `false`
    D) This only happens in outdated browsers
    **Hint:** The `==` operator's coercion rules for objects vs. booleans follow a very specific (and famously confusing) algorithm — not the same rules as `Boolean()`.
    **Answer:** B
    **Explanation:** `==` coerces both sides toward numbers when comparing an object and a boolean — `false` becomes `0`, and `[]` also reduces to `0` (via its string form `""`), so the two end up equal.

22. Why is `"5" + 3 - 2` equal to `51`, not `6`?
    A) It's a syntax error
    B) `+` runs first (left to right) and concatenates since one operand is a string, producing `"53"` — then `-` converts that string to a number and subtracts, giving `51`
    C) JavaScript always processes `-` before `+`
    D) The result should actually be `6`, and this is a bug
    **Hint:** Operators run left to right when they share the same precedence — track exactly what type each intermediate result becomes.
    **Answer:** B
    **Explanation:** `+` and `-` run left to right: `"5" + 3` concatenates to `"53"` first, then `"53" - 2` coerces the string to a number and subtracts, giving `51`.

23. Why does `Number("")` (an empty string) return `0`, while `Number(" ")` (a string with just a space) also returns `0`?
    A) It's inconsistent behavior with no clear rule
    B) JavaScript's numeric string conversion treats empty or whitespace-only strings as equivalent to `0`
    C) It should return `NaN`, and this is a known bug
    D) Spaces are converted to the letter "O"
    **Hint:** JavaScript's number-parsing rules specifically special-case strings that contain no actual digits, treating "nothing meaningful" as zero rather than invalid.
    **Answer:** B
    **Explanation:** JavaScript's numeric string parsing treats empty and whitespace-only strings as `0`, rather than as invalid input.

24. Why does `parseInt("0x1F")` return `31`, while `Number("0x1F")` also returns `31`, yet `parseInt("1F")` returns just `1`?
    A) These are all bugs
    B) `parseInt` and `Number` both recognize the `0x` prefix as hexadecimal notation, but without that prefix, `parseInt` stops at the first character it can't parse in the assumed base-10 system
    C) `1F` is invalid syntax and should throw
    D) Hexadecimal parsing only works with `Number`, never `parseInt`
    **Hint:** The `0x` prefix explicitly signals "this is hexadecimal" — without it, `parseInt` defaults to reading digits as base 10, and `F` isn't a valid base-10 digit.
    **Answer:** B
    **Explanation:** The `0x` prefix explicitly signals hexadecimal, which both `parseInt` and `Number` recognize; without it, `parseInt` assumes base 10 and stops at the first character (`F`) that isn't a valid base-10 digit.

25. Why does `1 + "1" + 1` produce `"111"`, while `1 + 1 + "1"` produces `"21"`?
    A) Both should produce the same result, and this is a bug
    B) JavaScript evaluates left to right — the first expression starts with a numeric `+` producing `"11"` (a string) then concatenates the final `1`; the second starts with numeric `+` producing `2`, then concatenates the string `"1"`
    C) `+` always converts everything to a string immediately
    D) The order of operands never matters in JavaScript
    **Hint:** Track the type of the running result after each individual `+` operation, left to right, rather than assuming the whole expression evaluates at once.
    **Answer:** B
    **Explanation:** Evaluating strictly left to right: `1 + "1"` becomes `"11"` first, then `+ 1` appends to make `"111"`; whereas `1 + 1` becomes `2` first, then `+ "1"` appends to make `"21"`.

26. Why can relying on implicit coercion in comparisons like `if (userInput == 0)` be considered a code smell?
    A) It's always the clearest, safest way to write comparisons
    B) `==` coercion means strings like `"0"`, booleans like `false`, and even empty arrays can all satisfy this comparison in surprising ways, masking the actual intended check
    C) `==` cannot be used with the number `0`
    D) It causes a guaranteed runtime crash
    **Hint:** List out everything besides the literal number `0` that would also satisfy `something == 0` — is that really what the developer meant to check?
    **Answer:** B
    **Explanation:** `==` coercion means many different values (`"0"`, `false`, `[]`, etc.) can all satisfy `== 0`, obscuring what the check actually intends to test.

27. Why does `Number([5])` return `5`, but `Number([1, 2])` returns `NaN`?
    A) Both should return the same result — this is inconsistent
    B) Arrays are first converted to a string via `.join(",")` — a single-element array becomes just that element's string, which parses cleanly as a number, while multiple elements produce a comma, which isn't valid numeric syntax
    C) `Number()` never works on arrays at all
    D) `Number([5])` should actually throw an error
    **Hint:** Picture what `.toString()` produces for each array first — `[5]` becomes `"5"`, while `[1, 2]` becomes `"1,2"` — then ask whether that resulting string is a valid number.
    **Answer:** B
    **Explanation:** Arrays are stringified via `.join(",")` before numeric conversion — `[5]` becomes `"5"` (a valid number), while `[1, 2]` becomes `"1,2"` (not a valid number, hence `NaN`).

28. Why is explicit conversion (like `Number(value)`) generally preferred over relying on implicit coercion in production code?
    A) Explicit conversion is always slower and should be avoided
    B) It makes the developer's intent clear and predictable, reducing subtle bugs that arise from JavaScript's complex and sometimes surprising implicit coercion rules
    C) Implicit coercion doesn't actually exist in modern JavaScript
    D) Explicit conversion is required by the language and cannot be skipped
    **Hint:** Consider how much easier it is to reason about `Number(input) === 0` compared to `input == 0`, given everything implicit coercion could sneak in.
    **Answer:** B
    **Explanation:** Explicit conversion makes the intended type change obvious in the code, avoiding the subtle surprises that implicit coercion can introduce.

29. Why does `true + true` evaluate to `2`, and what does this reveal about boolean-to-number coercion?
    A) It should throw an error since booleans can't be added
    B) `+` between two booleans coerces both to numbers (`true` → `1`) before performing numeric addition, resulting in `1 + 1`
    C) `true + true` actually returns `"truetrue"`
    D) Booleans cannot be used with `+` under any circumstances
    **Hint:** Since neither operand is a string here, `+` defaults to its numeric-addition behavior rather than concatenation — apply the boolean-to-number rule from there.
    **Answer:** B
    **Explanation:** Booleans convert to numbers in numeric addition (`true` → `1`), so `true + true` becomes `1 + 1 = 2`.

30. Why might `Object.is(NaN, NaN)` return `true`, while `NaN === NaN` returns `false`?
    A) This is a contradiction and one of them must be a bug
    B) `Object.is()` uses a stricter equality algorithm ("SameValue") specifically designed to treat `NaN` as equal to itself, unlike the standard `===` comparison, which follows IEEE 754 float rules where `NaN` never equals anything, including itself
    C) `NaN` is randomly equal or unequal to itself depending on the browser
    D) `Object.is()` doesn't actually support `NaN` as an argument
    **Hint:** This is one of the most famous quirks in JavaScript — `NaN` failing to equal itself under `===` is actually part of the international floating-point standard, not a JavaScript-specific mistake, and `Object.is()` was added specifically to work around it in certain cases.
    **Answer:** B
    **Explanation:** `Object.is()` uses the stricter "SameValue" algorithm, which specifically treats `NaN` as equal to itself, while `===` follows IEEE 754 float rules where `NaN` never equals anything, even itself.

---

## Topic 6: Comments

### Easy

1. What does `// this is a comment` do when run?
   A) Throws an error
   B) Is ignored by the JavaScript engine
   C) Prints to the console
   D) Creates a variable
   **Hint:** Comments exist purely for human readers, not for the engine to execute.
   **Answer:** B
   **Explanation:** Comments exist purely for readers — the JavaScript engine skips over them entirely at runtime.

2. What symbol starts a single-line comment in JavaScript?
   A) `#`
   B) `//`
   C) `--`
   D) `<!--`
   **Hint:** This is the same style used in Java and C++.
   **Answer:** B
   **Explanation:** `//` begins a single-line comment in JavaScript, the same style used in Java and C++.

3. How do you start a multi-line comment in JavaScript?
   A) `//`
   B) `/*`
   C) `<!--`
   D) `"""`
   **Hint:** This opening symbol pairs with a `*/` to close it.
   **Answer:** B
   **Explanation:** `/*` opens a multi-line comment block.

4. How do you close a multi-line comment?
   A) `*/`
   B) `//`
   C) `-->`
   D) `"""`
   **Hint:** It's the mirror image of the symbol that opens it.
   **Answer:** A
   **Explanation:** `*/` closes a multi-line comment, mirroring the `/*` that opened it.

5. Can comments be placed at the end of a line of code?
   A) No, they must be on their own line
   B) Yes, e.g. `let x = 5; // set x`
   C) Only multi-line comments can do this
   D) Only in Node.js
   **Hint:** Everything after `//` on that same line gets ignored, regardless of what came before it.
   **Answer:** B
   **Explanation:** A `//` comment can follow code on the same line, and everything after it on that line is ignored.

6. Do comments affect how fast JavaScript code runs?
   A) Yes, significantly
   B) No, they are ignored during execution
   C) Only multi-line comments slow it down
   D) Only in older browsers
   **Hint:** Since comments are skipped entirely by the engine, do they actually get "processed" at runtime?
   **Answer:** B
   **Explanation:** Comments are stripped out during parsing and have no effect on runtime performance.

7. What is a common use for comments in code?
   A) To make variables private
   B) To explain what a piece of code does, for other developers (or your future self)
   C) To increase performance
   D) To define functions
   **Hint:** Think about who benefits from reading a well-placed comment.
   **Answer:** B
   **Explanation:** Comments typically explain what a piece of code does or why, for the benefit of other developers (or your future self).

8. Which of these is a valid single-line comment?
   A) `# This is a comment`
   B) `// This is a comment`
   C) `-- This is a comment`
   D) `' This is a comment`
   **Hint:** Only one of these symbols is actually recognized by JavaScript specifically.
   **Answer:** B
   **Explanation:** `//` is JavaScript's actual single-line comment syntax; the other symbols belong to other languages or aren't comment markers at all.

9. If you comment out a line of code, what happens to it?
   A) It's deleted permanently
   B) It's skipped during execution but remains in the file
   C) It runs twice
   D) It throws a warning every time
   **Hint:** "Commenting out" is a common technique for temporarily disabling code without deleting it.
   **Answer:** B
   **Explanation:** Commenting out code disables its execution while leaving the text itself in the file.

10. Can a multi-line comment span more than two lines?
    A) No, only exactly two lines
    B) Yes, everything between `/*` and `*/` is ignored, regardless of how many lines
    C) Only if each line starts with `//`
    D) No, multi-line comments are limited to 10 lines
    **Hint:** The comment continues until the engine finds the closing `*/`, no matter how far away that is.
    **Answer:** B
    **Explanation:** A `/* */` comment spans however many lines lie between its opening and closing markers, with no line limit.

### Medium

11. What happens if you forget to close a multi-line comment with `*/`?
    A) Nothing, JavaScript assumes the end of file closes it
    B) Everything after the `/*` (including actual code) gets treated as part of the comment, likely causing errors
    C) It automatically closes at the next line break
    D) It converts to a single-line comment
    **Hint:** Without the closing marker, where does the engine think the comment actually ends?
    **Answer:** B
    **Explanation:** Without a closing `*/`, everything that follows — including actual code — is swallowed into the comment, which usually breaks the script.

12. Can multi-line comment syntax (`/* */`) be used for a single line?
    A) No, it's exclusively for multiple lines
    B) Yes, `/* single line */` is valid
    C) Only inside functions
    D) Only for the first line of a file
    **Hint:** The name "multi-line" describes what it's capable of, not a strict requirement.
    **Answer:** B
    **Explanation:** `/* */` works fine on a single line, since "multi-line" just describes its capability, not a requirement.

13. Can you nest one `/* */` comment inside another?
    A) Yes, freely
    B) No — the first `*/` encountered closes the entire comment, so nested `/*` has no special effect
    C) Only with special syntax
    D) Only in strict mode
    **Hint:** Try to think about what happens the moment the parser sees the very first `*/`, even if a second `/*` appeared earlier.
    **Answer:** B
    **Explanation:** The first `*/` encountered closes the comment entirely, so an inner `/*` has no special nesting effect.

14. Why might excessive commenting (explaining obvious code) be considered poor practice?
    A) It's always beneficial, no matter how much
    B) It can clutter code and lose value when comments state the obvious rather than explaining "why," not "what"
    C) JavaScript limits the number of comments allowed
    D) Comments slow down execution significantly
    **Hint:** Consider the difference between commenting `// add 1 to x` above `x = x + 1;`, versus explaining why that increment is happening at all.
    **Answer:** B
    **Explanation:** Comments that just restate obvious code add clutter without adding insight — they're most valuable explaining the non-obvious "why."

15. What's a common practice for temporarily disabling a block of code during debugging?
    A) Deleting it entirely
    B) Wrapping it in `/* */` to comment it out
    C) Renaming all variables
    D) Adding extra semicolons
    **Hint:** This lets you quickly restore the code later, since it isn't actually removed from the file.
    **Answer:** B
    **Explanation:** Wrapping a block in `/* */` disables it temporarily without deleting it, making it easy to restore later.

16. Can comments appear inside a function's body, interspersed between lines of code?
    A) No, comments must be outside all functions
    B) Yes, comments can appear anywhere whitespace is otherwise allowed
    C) Only at the very start of a function
    D) Only single-line comments are allowed inside functions
    **Hint:** Since comments are essentially treated like whitespace by the parser, where can whitespace normally go?
    **Answer:** B
    **Explanation:** Comments can appear anywhere whitespace is valid, including interspersed between lines inside a function body.

17. What is "JSDoc," in relation to JavaScript comments?
    A) A separate scripting language
    B) A structured comment convention (using `/** ... */`) for documenting functions, parameters, and return types
    C) A built-in JavaScript function
    D) A CSS framework
    **Hint:** This convention is specifically used by many tools and IDEs to auto-generate documentation or provide inline hints.
    **Answer:** B
    **Explanation:** JSDoc is a structured `/** ... */` comment convention used to document functions, parameters, and return types.

18. If a `//` comment appears inside a string literal (e.g., `"http://example.com"`), is it treated as a comment?
    A) Yes, always
    B) No — inside a string literal, `//` is just plain text characters, not a comment marker
    C) Only in URLs specifically
    D) It causes a syntax error
    **Hint:** The parser tracks whether it's currently inside a string — comment syntax doesn't apply to characters within quotes.
    **Answer:** B
    **Explanation:** Inside a string literal, characters like `//` are just plain text, not comment syntax — the parser only treats `//` as a comment outside of strings.

19. Why might a team enforce a linting rule requiring comments above complex regular expressions?
    A) Regular expressions execute faster with comments
    B) Regular expressions can be notoriously hard to read, so a comment explaining intent helps future maintainers
    C) JavaScript requires comments before regex by syntax rules
    D) It's not a real practice
    **Hint:** Think about how cryptic a dense regular expression pattern can look to someone (including future-you) seeing it cold.
    **Answer:** B
    **Explanation:** Regular expressions can be dense and hard to parse visually, so an explanatory comment helps future readers understand the intent.

20. What's a potential downside of leaving large blocks of commented-out old code in a file long-term?
    A) There is no downside
    B) It clutters the file and can confuse readers about whether that code is still relevant or safe to delete
    C) It causes the JavaScript engine to run slower
    D) It causes syntax errors eventually
    **Hint:** Since version control (like Git) already preserves old code history, is keeping dead code commented out in the file itself still necessary?
    **Answer:** B
    **Explanation:** Old commented-out code accumulates clutter and leaves readers unsure whether it's still relevant or safe to remove.

### Hard

21. Why can a `//` comment placed right before a line ending in a template literal backtick sometimes cause unexpected parsing behavior?
    A) It never causes any issues
    B) If the comment itself isn't fully self-contained on its own line and interacts with unescaped backticks or special characters, it could affect how subsequent lines are parsed in rare edge cases
    C) Template literals disable all comments
    D) `//` comments are banned near template literals
    **Hint:** While generally safe, editors and some tooling can occasionally misinterpret comment boundaries near complex multi-line string syntax — always worth double-checking in tricky cases.
    **Answer:** B
    **Explanation:** In rare edge cases, tooling or editors can misjudge comment boundaries around unusual multi-line string syntax, so it's worth double-checking such interactions.

22. Why is JSDoc-style documentation (`/** ... */` with `@param`/`@returns` tags) particularly valuable in a dynamically typed language like JavaScript?
    A) It has no particular added value in JavaScript
    B) Since JavaScript lacks compile-time type declarations, JSDoc comments give both humans and tooling (like editors/TypeScript) a way to document expected types and structure
    C) JSDoc comments are required for code to compile
    D) JSDoc only works in TypeScript, never plain JavaScript
    **Hint:** Contrast this with Java, where a method signature itself declares parameter and return types — what fills that same documentation role in dynamically-typed JavaScript?
    **Answer:** B
    **Explanation:** Since JavaScript has no compile-time type declarations, JSDoc tags like `@param`/`@returns` give both humans and editor tooling a documented sense of expected types and structure.

23. Why might commented-out code in a pull request be treated as a code review red flag by many teams?
    A) It's always perfectly fine and never questioned
    B) It suggests uncertainty or incomplete work, and creates ambiguity about whether the code should be deleted, restored, or is simply forgotten clutter
    C) Commented-out code causes builds to fail
    D) It's illegal under most licensing agreements
    **Hint:** From a reviewer's perspective, dead code sitting in a comment raises the question: "is this meant to come back, or was it just forgotten?"
    **Answer:** B
    **Explanation:** Commented-out code leaves reviewers unsure whether it's intentional, forgotten, or meant to be restored later, which is why many teams flag it.

24. Why doesn't a `//` comment "protect" the rest of a multi-line statement that continues onto the next line?
    A) It fully protects the whole statement, no matter how many lines
    B) `//` only comments out the remainder of that single physical line — anything on subsequent lines is treated as regular code, even if logically part of the same statement
    C) `//` comments always extend until the next semicolon
    D) This scenario is impossible in JavaScript
    **Hint:** Comment scope is tied strictly to physical lines for `//`, not to logical statement boundaries — unlike `/* */`, which has no such limitation.
    **Answer:** B
    **Explanation:** A `//` comment only affects the rest of that single physical line — code on the next line is parsed normally, even if it's logically part of the same statement.

25. Why can heavy use of comments sometimes indicate that code itself could be refactored for clarity instead?
    A) Comments should always be added instead of refactoring
    B) If code requires extensive comments to explain confusing logic, restructuring the code (better naming, simpler logic) often reduces the need for those explanations in the first place
    C) This is never a valid perspective among developers
    D) Comments and code clarity are entirely unrelated concepts
    **Hint:** Consider the difference between a comment explaining a poorly-named variable, versus simply renaming that variable to be self-explanatory.
    **Answer:** B
    **Explanation:** Needing heavy comments to explain confusing logic often signals that renaming variables or restructuring the code would make the explanation unnecessary in the first place.

26. What risk does a stale (outdated) comment pose that's arguably worse than having no comment at all?
    A) There's no meaningful risk
    B) A comment that no longer matches the actual code behavior can actively mislead a developer into believing incorrect information about what the code does
    C) Stale comments cause runtime errors
    D) JavaScript automatically detects and removes stale comments
    **Hint:** If a comment says "returns the average" but the code was later changed to return the total, which is more dangerous: no comment, or a wrong one?
    **Answer:** B
    **Explanation:** A comment that no longer matches the code's actual behavior can actively mislead a reader, which is arguably worse than having no explanation at all.

27. Why do minification tools typically strip out all comments before deploying JavaScript to production?
    A) Comments cause the code to run incorrectly
    B) Comments add file size without contributing any runtime functionality, so removing them reduces download size for end users
    C) Browsers cannot parse files containing comments
    D) It's a legal requirement
    **Hint:** Since comments are purely for human readers and have zero effect on execution, are they actually needed once code ships to production?
    **Answer:** B
    **Explanation:** Comments have zero effect on execution but still add bytes to the file, so minifiers strip them to reduce the size shipped to users.

28. Why might some teams specifically require a comment explaining "why," rather than "what," for a non-obvious workaround or bug fix?
    A) Explaining "what" is always sufficient
    B) The code itself already shows *what* it does; a comment's real value is explaining the non-obvious reasoning or context behind an unusual decision that the code alone can't convey
    C) "Why" comments are discouraged in favor of "what" comments
    D) This distinction doesn't matter in practice
    **Hint:** Reading `x = x + 1;` already tells you *what* happens — a valuable comment instead might explain *why* that increment exists, e.g., "compensating for an off-by-one in the external API."
    **Answer:** B
    **Explanation:** The code already shows what it does; a comment's real value is explaining the non-obvious reasoning behind an unusual decision that isn't visible from the code itself.

29. Why does relying on comments to "document" a public function's expected argument types provide weaker guarantees than a statically typed language's function signature?
    A) There's no meaningful difference in guarantee strength
    B) Comments are not enforced by the JavaScript engine at all — nothing prevents a caller from passing the wrong type despite what the comment claims, unlike a compiler-checked type system
    C) JavaScript comments are actually validated at runtime
    D) Comments are converted into runtime type checks automatically
    **Hint:** In Java, passing a `String` where an `int` is expected fails to compile — does a JSDoc comment claiming a parameter "should be a number" stop anyone from passing a string anyway?
    **Answer:** B
    **Explanation:** Nothing in JavaScript enforces what a comment claims — a caller can still pass the wrong type despite a comment saying otherwise, unlike a compiler-checked signature.

30. Why might automated documentation generators (that parse JSDoc comments) be considered a partial bridge between JavaScript's dynamic typing and the tooling benefits of static typing?
    A) They provide no meaningful benefit at all
    B) They let editors and IDEs offer autocomplete, type hints, and inline documentation based on structured comments, approximating some benefits of compile-time type systems without changing the language itself
    C) They actually convert JavaScript into a statically typed language
    D) They are only cosmetic and have no tooling integration
    **Hint:** Think about how a code editor can still show you "expected parameter types" for a plain JavaScript function, purely by reading structured comments above it — without JavaScript itself enforcing anything.
    **Answer:** B
    **Explanation:** By parsing structured JSDoc comments, tools can offer autocomplete and type hints similar to a statically typed language, without JavaScript itself enforcing any of it.

---

*End of Quiz: JavaScript Basics — all 6 topics complete, 180 questions total.*
