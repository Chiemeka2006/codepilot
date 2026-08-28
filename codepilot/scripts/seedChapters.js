// Seeds/updates real course content. Safe to re-run — each chapter is
// upserted by (language, slug), so running this again just overwrites the
// existing content rather than duplicating it.
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Chapter } from "../models/Chapter.js";

const chapters = [
    {
        language: "JavaScript",
        title: "JS Basics",
        slug: "js-basics",
        order: 0,
        topics: [
            {
                title: "Introduction",
                slug: "intro",
                order: 0,
                content: `## Introduction to JavaScript
 
JavaScript is a scripting language that runs in web browsers and lets you make web pages interactive — think dropdown menus, form validation, live updates without reloading the page, and much more. Unlike HTML (which structures content) or CSS (which styles it), JavaScript adds *behavior*.
 
It was created in 1995 and has since grown far beyond the browser. With environments like Node.js, JavaScript now also powers servers, mobile apps, and even desktop applications.
 
**Where does JavaScript code live?**
 
You can add JavaScript to a web page in three ways:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">script-usage.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 1. Inline (avoid in real projects) --&gt;</span></div>
    <div class="snippet-line">&lt;button onclick="alert(<span class="tok-string">'Hello!'</span>)"&gt;Click me&lt;/button&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 2. Internal, inside a &lt;script&gt; tag --&gt;</span></div>
    <div class="snippet-line">&lt;script&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello from an internal script!"</span>);</div>
    <div class="snippet-line">&lt;/script&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 3. External file (the standard approach) --&gt;</span></div>
    <div class="snippet-line">&lt;script src="app.js"&gt;&lt;/script&gt;</div>
  </div>
</div>

Most real projects use external files, since it keeps your HTML clean and your JavaScript reusable across pages.
 
**Your first line of code**
 
The \`console.log()\` function prints output to the browser's developer console — it's the JavaScript equivalent of "Hello, World!":
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hello-world.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Hello, World!"</span>);</div>
  </div>
</div>

Open your browser's DevTools (usually F12 or right-click → Inspect) and check the Console tab to see it in action.
 
> 💡 **Try it:** Open your browser console right now and type \`console.log("I'm learning JS!")\`.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JavaScript adds behaviour to a page. It runs in every browser with no setup, and <code>console.log()</code> is how you look inside your own code.</p>
</div>

---`,
            },
            {
                title: "Syntax",
                slug: "syntax",
                order: 1,
                content: `## Syntax
 
JavaScript syntax is the set of rules that define how code must be written so the engine can understand it. Get familiar with these basics early — they show up in every single script you write.
 
**Statements and semicolons**
 
A JavaScript program is a sequence of statements, usually ending in a semicolon:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">statements.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> name = <span class="tok-string">"Ada"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(name);</div>
  </div>
</div>

JavaScript has a feature called *Automatic Semicolon Insertion*, which means it will often work without semicolons. Still, it's best practice to include them — relying on automatic insertion can cause subtle bugs.
 
**Case sensitivity**
 
JavaScript is case-sensitive. \`myVariable\` and \`myvariable\` are two completely different identifiers.
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">case-sensitivity.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> score = 10;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> Score = 20;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(score, Score); <span class="tok-comment">// 10 20 — these are NOT the same variable</span></div>
  </div>
</div>

**Whitespace and readability**
 
JavaScript ignores extra spaces and line breaks between statements, so you're free to format code for readability:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">whitespace.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> x=5;<span class="tok-keyword">let</span> y=10;<span class="tok-call">console.log</span>(x+y);</div>
    <div class="snippet-line"><span class="tok-comment">// same as:</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> x = 5;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> y = 10;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(x + y);</div>
  </div>
</div>

The second version is far easier to read — and readability matters more than you'd think once your codebase grows.
 
**Naming identifiers**
 
Variable and function names (identifiers) must:
- Start with a letter, \`_\`, or \`$\`
- Contain only letters, numbers, \`_\`, or \`$\` after that
- Not be a reserved keyword (like \`let\`, \`function\`, \`return\`)
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">naming.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> user_age = 25;      <span class="tok-comment">// valid</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> $price = 9.99;      <span class="tok-comment">// valid</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> 2ndPlace = <span class="tok-string">"Bob"</span>;   <span class="tok-comment">// ❌ invalid — can't start with a number</span></div>
  </div>
</div>

The convention in JavaScript is **camelCase** for variables and functions: \`firstName\`, \`calculateTotal\`.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JavaScript is case-sensitive and ignores extra whitespace, but consistent formatting and valid <code>camelCase</code> identifiers keep your code readable and error-free.</p>
</div>

---`,
            },
            {
                title: "Variables",
                slug: "variables",
                order: 2,
                content: `Variables are containers that store data your program can use and change. JavaScript gives you three ways to declare them: \`var\`, \`let\`, and \`const\`.
 
**\`let\` — for values that can change**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">let-example.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 21;</div>
    <div class="snippet-line">age = 22; <span class="tok-comment">// reassignment is fine</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(age); <span class="tok-comment">// 22</span></div>
  </div>
</div>

**\`const\` — for values that shouldn't be reassigned**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">const-example.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> birthYear = 2003;</div>
    <div class="snippet-line">birthYear = 2004; <span class="tok-comment">// ❌ TypeError: Assignment to constant variable</span></div>
  </div>
</div>

Use \`const\` by default, and switch to \`let\` only when you know the value needs to change. This makes your code more predictable and easier to debug.
 
**\`var\` — the old way**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">var-example.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">var</span> city = <span class="tok-string">"Lagos"</span>;</div>
  </div>
</div>

\`var\` was the only option before 2015. It still works, but it behaves differently from \`let\` and \`const\` in ways that cause bugs (mainly around *scope*, which you'll cover in a later chapter). Modern JavaScript style avoids \`var\` almost entirely.
 
**Declaring without assigning**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">undeclared.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> score;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(score); <span class="tok-comment">// undefined</span></div>
    <div class="snippet-line">score = 100;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(score); <span class="tok-comment">// 100</span></div>
  </div>
</div>

| Keyword | Reassignable? | Redeclarable? | Recommended use |
|---------|---------------|----------------|------------------|
| \`var\`   | ✅ Yes        | ✅ Yes         | Avoid |
| \`let\`   | ✅ Yes        | ❌ No          | Values that change |
| \`const\` | ❌ No         | ❌ No          | Values that stay fixed |
 
> 💡 **Try it:** Declare a \`const\` called \`pi\` set to \`3.14159\`, then try reassigning it. Read the error message — understanding errors is half the skill of programming.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Default to <code>const</code>, switch to <code>let</code> only when a value truly needs to change, and avoid <code>var</code> in modern code.</p>
</div>

---`,
            },
            {
                title: "Data Types",
                slug: "data-types",
                order: 3,
                content: `## Data Types
 
Every value in JavaScript has a type. JavaScript is **dynamically typed**, meaning you don't declare a variable's type upfront — it's determined automatically based on the value you assign.
 
**Primitive types**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">data-types.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> username = <span class="tok-string">"Chidi"</span>;        <span class="tok-comment">// String — text, wrapped in quotes</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 27;                  <span class="tok-comment">// Number — integers and decimals both</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> isLoggedIn = <span class="tok-keyword">true</span>;         <span class="tok-comment">// Boolean — true or false</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> middleName = <span class="tok-keyword">undefined</span>;    <span class="tok-comment">// Undefined — declared but no value assigned</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> pet = <span class="tok-keyword">null</span>;                <span class="tok-comment">// Null — intentional "nothing"</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> id = <span class="tok-call">Symbol</span>(<span class="tok-string">"id"</span>);         <span class="tok-comment">// Symbol — unique, mostly used internally</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> bigNumber = 9007199254740993n; <span class="tok-comment">// BigInt — for very large integers</span></div>
  </div>
</div>

**Checking a type**
 
The \`typeof\` operator tells you what type a value is:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">typeof.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> <span class="tok-string">"hello"</span>);   <span class="tok-comment">// "string"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> 42);        <span class="tok-comment">// "number"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> <span class="tok-keyword">true</span>);      <span class="tok-comment">// "boolean"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> <span class="tok-keyword">undefined</span>); <span class="tok-comment">// "undefined"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> <span class="tok-keyword">null</span>);      <span class="tok-comment">// "object" — a famous, long-standing JS quirk!</span></div>
  </div>
</div>

**The Object type**
 
Everything that isn't a primitive is an object — including arrays and functions. Objects group related data together:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">object-example.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> user = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Amara"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;age: 24,</div>
    <div class="snippet-line">&nbsp;&nbsp;isStudent: <span class="tok-keyword">true</span></div>
    <div class="snippet-line">};</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.name); <span class="tok-comment">// "Amara"</span></div>
  </div>
</div>

You'll cover objects and arrays in depth in later chapters — for now, just know they exist as a distinct category from primitives.
 
**Numbers: one type for everything**
 
Unlike many languages, JavaScript doesn't separate integers and decimals — they're both just \`Number\`:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">numbers.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> whole = 10;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> decimal = 10.5;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> whole, <span class="tok-keyword">typeof</span> decimal); <span class="tok-comment">// "number" "number"</span></div>
  </div>
</div>
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JavaScript is dynamically typed — a variable's type is set by its value, not declared upfront — and <code>typeof</code> lets you check that type at any time.</p>
</div>

---`,
            },
            {
                title: "Type Conversion",
                slug: "type-conversion",
                order: 4,
                content: `## Type Conversion
 
Because JavaScript is loosely typed, values often get converted between types — sometimes automatically (*coercion*), sometimes because you asked for it explicitly.
 
**Explicit conversion**
 
You can convert types on purpose using built-in functions:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">explicit-conversion.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> str = <span class="tok-string">"123"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> num = <span class="tok-call">Number</span>(str);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(num, <span class="tok-keyword">typeof</span> num); <span class="tok-comment">// 123 "number"</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> value = 456;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> text = <span class="tok-call">String</span>(value);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(text, <span class="tok-keyword">typeof</span> text); <span class="tok-comment">// "456" "string"</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">Boolean</span>(0));   <span class="tok-comment">// false</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">Boolean</span>(1));   <span class="tok-comment">// true</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">Boolean</span>(<span class="tok-string">""</span>));  <span class="tok-comment">// false</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">Boolean</span>(<span class="tok-string">"hi"</span>)); <span class="tok-comment">// true</span></div>
  </div>
</div>

**Implicit conversion (coercion)**
 
JavaScript sometimes converts types for you automatically, which can lead to surprising results:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">coercion.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"5"</span> + 3);   <span class="tok-comment">// "53" — number gets converted to a string</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"5"</span> - 3);   <span class="tok-comment">// 2   — string gets converted to a number</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"5"</span> * <span class="tok-string">"2"</span>); <span class="tok-comment">// 10  — both strings converted to numbers</span></div>
  </div>
</div>

The \`+\` operator prioritizes string concatenation if either side is a string. Other math operators (\`-\`, \`*\`, \`/\`) try to convert strings to numbers instead.
 
**Falsy and truthy values**
 
When JavaScript needs a Boolean (like in an \`if\` statement), it converts the value. These values are always **falsy**:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">falsy-values.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">false</span>, 0, <span class="tok-string">""</span>, <span class="tok-keyword">null</span>, <span class="tok-keyword">undefined</span>, NaN</div>
  </div>
</div>

Everything else — including \`"0"\` (a non-empty string!) and \`[]\` (an empty array) — is **truthy**:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">truthy-check.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">if</span> (<span class="tok-string">"0"</span>) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"This runs — non-empty strings are truthy!"</span>);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Predict the output of \`console.log("10" + 5 - 2)\` before running it. (Hint: JavaScript evaluates left to right.)
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JavaScript converts types automatically (coercion) and on purpose via <code>Number()</code>, <code>String()</code>, and <code>Boolean()</code> — knowing the difference prevents subtle bugs.</p>
</div>

---`,
            },
            {
                title: "Comments",
                slug: "comments",
                order: 5,
                content: `## Comments
 
Comments are notes in your code that JavaScript ignores when running. They're for humans — to explain **why** code does something, not just **what** it does.
 
**Single-line comments**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">single-line-comment.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// This calculates the total price including tax</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> total = price * 1.075;</div>
  </div>
</div>

**Multi-line comments**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multi-line-comment.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">/*</span></div>
    <div class="snippet-line"><span class="tok-comment">&nbsp;&nbsp;This function validates a user's email address.</span></div>
    <div class="snippet-line"><span class="tok-comment">&nbsp;&nbsp;It returns true if valid, false otherwise.</span></div>
    <div class="snippet-line"><span class="tok-comment">*/</span></div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">isValidEmail</span>(email) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-comment">// ...</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Good commenting habits**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">comment-style.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// ❌ Unhelpful — just restates the code</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 18; <span class="tok-comment">// set age to 18</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// ✅ Helpful — explains the reasoning</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 18; <span class="tok-comment">// minimum age required for account creation</span></div>
  </div>
</div>

Well-placed comments make code easier for others (and future-you) to understand. Over-commenting obvious code, on the other hand, just adds clutter.
 
> 💡 **Try it:** Add a comment above one line of code you wrote earlier explaining *why* it's there, not just what it does.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Comments should explain <strong>why</strong> code exists, not just <strong>what</strong> it does — good comments help future-you and your teammates just as much as they help right now.</p>
</div>

---`,
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Operators",
        slug: "js-operators",
        order: 1,
        topics: [
          {
            title: "Arithmetic Operators",
                slug: "intro",
                order: 0,
                content: `## Arithmetic Operators
 
Arithmetic operators perform mathematical calculations on numbers — the building blocks for anything involving math in your programs, from calculating totals to tracking scores.
 
**The core operators**
 
| Operator | Name | Example | Result |
|----------|------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Subtraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`5 / 3\` | \`1.666...\` |
| \`%\` | Modulus (remainder) | \`5 % 3\` | \`2\` |
| \`**\` | Exponentiation | \`5 ** 2\` | \`25\` |
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">arithmetic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> price = 50;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> quantity = 3;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(price * quantity); <span class="tok-comment">// 150</span></div>
  </div>
</div>
**The modulus operator**
 
The \`%\` operator returns the *remainder* of a division, not the quotient. It's especially useful for checking whether a number is even or odd:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">modulus.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(10 % 3); <span class="tok-comment">// 1 — 10 divided by 3 leaves a remainder of 1</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(8 % 2);  <span class="tok-comment">// 0 — evenly divisible, so 8 is even</span></div>
  </div>
</div>
**Increment and decrement**
 
\`\`\`
++  adds 1 to a value
--  subtracts 1 from a value
\`\`\`
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">increment.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> count = 5;</div>
    <div class="snippet-line">count++;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(count); <span class="tok-comment">// 6</span></div>
    <div class="snippet-line">count--;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(count); <span class="tok-comment">// 5</span></div>
  </div>
</div>
**Operator precedence**
 
Just like in math class, \`*\`, \`/\`, and \`%\` run before \`+\` and \`-\`, unless you use parentheses to control the order:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">precedence.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(2 + 3 * 4);   <span class="tok-comment">// 14 — multiplication happens first</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>((2 + 3) * 4); <span class="tok-comment">// 20 — parentheses run first</span></div>
  </div>
</div>
> 💡 **Try it:** Without running any code, predict the result of \`console.log(10 - 2 * 3)\`. Then check it in your console.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Arithmetic operators follow standard order of operations — use parentheses whenever you want to be explicit about what runs first, rather than relying on memory.</p>
</div>
`
          },
          {
            title: "Assignment Operator",
                slug: "assignment-operator",
                order: 1,
                content: `## Assignment Operators
 
Assignment operators store a value in a variable. You've already seen the basic one, \`=\`, but JavaScript offers shorthand versions that combine assignment with an arithmetic operation.
 
**Basic assignment**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-assignment.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> total = 100;</div>
  </div>
</div>
**Compound assignment operators**
 
| Operator | Equivalent to | Example |
|----------|---------------|---------|
| \`+=\` | \`x = x + y\` | \`total += 10\` |
| \`-=\` | \`x = x - y\` | \`total -= 10\` |
| \`*=\` | \`x = x * y\` | \`total *= 2\` |
| \`/=\` | \`x = x / y\` | \`total /= 2\` |
| \`%=\` | \`x = x % y\` | \`total %= 3\` |
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">compound-assignment.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> total = 100;</div>
    <div class="snippet-line">total += 10; <span class="tok-comment">// same as: total = total + 10</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(total); <span class="tok-comment">// 110</span></div>
    <div class="snippet-line">total -= 20;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(total); <span class="tok-comment">// 90</span></div>
  </div>
</div>
**Why use them?**
 
Compound operators are shorter to write and easier to scan than repeating the variable name — especially in loops and counters, which you'll see a lot of in the next chapter:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">why-compound.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> cartTotal = 0;</div>
    <div class="snippet-line">cartTotal += 25; <span class="tok-comment">// add an item</span></div>
    <div class="snippet-line">cartTotal += 15; <span class="tok-comment">// add another item</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(cartTotal); <span class="tok-comment">// 40</span></div>
  </div>
</div>
> 💡 **Try it:** Start with \`let x = 10;\` then use \`x *= 3\` and \`console.log(x)\` — predict the output before checking.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Compound assignment operators like <code>+=</code> and <code>*=</code> are shorthand for "update this variable based on its own value" — they make counters and running totals easier to read.</p>
</div>
`
          },
          {
            title: "Comparism Operator",
                slug: "comparism-operator",
                order: 2,
                content: `## Comparison Operators
 
Comparison operators compare two values and return a Boolean (\`true\` or \`false\`). They're the foundation of decision-making in code — you'll use them constantly with \`if\` statements and loops.
 
**Equality: \`==\` vs \`===\`**
 
This is one of the most important distinctions in JavaScript:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">equality.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(5 == <span class="tok-string">"5"</span>);  <span class="tok-comment">// true — loose equality converts types first</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(5 === <span class="tok-string">"5"</span>); <span class="tok-comment">// false — strict equality checks type too</span></div>
  </div>
</div>
\`==\` (loose equality) converts the values to the same type before comparing. \`===\` (strict equality) checks both value *and* type, with no conversion. **Almost always use \`===\`** — it avoids the confusing edge cases \`==\` can produce.
 
**Full comparison table**
 
| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`===\` | Strict equal | \`5 === 5\` | \`true\` |
| \`!==\` | Strict not equal | \`5 !== "5"\` | \`true\` |
| \`>\` | Greater than | \`7 > 3\` | \`true\` |
| \`<\` | Less than | \`7 < 3\` | \`false\` |
| \`>=\` | Greater than or equal | \`5 >= 5\` | \`true\` |
| \`<=\` | Less than or equal | \`4 <= 3\` | \`false\` |
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">comparisons.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 18;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(age >= 18); <span class="tok-comment">// true — old enough</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(age !== 21); <span class="tok-comment">// true — not equal to 21</span></div>
  </div>
</div>
> 💡 **Try it:** Test \`console.log(null == undefined)\` and \`console.log(null === undefined)\` — the different results reveal a lot about how \`==\` handles conversion.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Prefer <code>===</code> and <code>!==</code> over <code>==</code> and <code>!=</code> — strict comparison avoids surprising type-conversion bugs.</p>
</div>
`
          },
          {
            title: "Logical Operator",
                slug: "logical-operator",
                order: 3,
                content: `## Logical Operators
 
Logical operators combine or invert Boolean values, letting you build more complex conditions than a single comparison allows.
 
**AND, OR, NOT**
 
| Operator | Name | Meaning |
|----------|------|---------|
| \`&&\` | AND | \`true\` only if both sides are \`true\` |
| \`\|\|\` | OR | \`true\` if at least one side is \`true\` |
| \`!\` | NOT | Flips \`true\` to \`false\` and vice versa |
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">logical-and-or.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 20;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> hasTicket = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(age >= 18 && hasTicket); <span class="tok-comment">// true — both conditions are true</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(age >= 21 || hasTicket); <span class="tok-comment">// true — at least one condition is true</span></div>
  </div>
</div>
**The NOT operator**
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">logical-not.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> isRaining = <span class="tok-keyword">false</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(!isRaining); <span class="tok-comment">// true — NOT flips the value</span></div>
  </div>
</div>
**Short-circuit evaluation**
 
JavaScript stops evaluating as soon as it knows the answer. \`&&\` stops at the first falsy value; \`||\` stops at the first truthy one. This isn't just a performance detail — it's a common pattern in real code:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">short-circuit.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> username = <span class="tok-string">""</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> displayName = username || <span class="tok-string">"Guest"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(displayName); <span class="tok-comment">// "Guest" — username was falsy, so || fell back</span></div>
  </div>
</div>
> 💡 **Try it:** Set \`let loggedIn = true;\` and \`let isAdmin = false;\`, then predict \`console.log(loggedIn && isAdmin)\` before running it.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&&</code>, <code>||</code>, and <code>!</code> let you combine conditions — and short-circuit evaluation means <code>||</code> is a common way to set fallback values.</p>
</div>
`
          },
          {
            title: "Ternary Operator",
                slug: "ternary-operator",
                order: 4,
                content: `## The Ternary Operator
 
The ternary operator is a compact, one-line way to write a simple \`if...else\` statement. It's the only JavaScript operator that takes three parts, which is where the name comes from.
 
**Syntax**
 
\`\`\`
condition ? valueIfTrue : valueIfFalse
\`\`\`
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ternary-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> age = 20;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> status = age >= 18 ? <span class="tok-string">"adult"</span> : <span class="tok-string">"minor"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(status); <span class="tok-comment">// "adult"</span></div>
  </div>
</div>
**Compared to \`if...else\`**
 
The ternary version below does exactly the same thing as a full \`if...else\` block, just in a single line:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ternary-vs-if.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// Using if...else</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> message;</div>
    <div class="snippet-line"><span class="tok-keyword">if</span> (age >= 18) {</div>
    <div class="snippet-line">&nbsp;&nbsp;message = <span class="tok-string">"You can vote"</span>;</div>
    <div class="snippet-line">} <span class="tok-keyword">else</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;message = <span class="tok-string">"You can't vote yet"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Using a ternary — same result, one line</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> message2 = age >= 18 ? <span class="tok-string">"You can vote"</span> : <span class="tok-string">"You can't vote yet"</span>;</div>
  </div>
</div>
**When to use it (and when not to)**
 
Ternaries are great for short, simple conditions — especially when assigning a value. But nesting multiple ternaries together quickly becomes hard to read, and a regular \`if...else\` is usually the better choice at that point:
 
<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">avoid-nested-ternary.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// ❌ Hard to read — avoid nesting ternaries</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> grade = score >= 90 ? <span class="tok-string">"A"</span> : score >= 80 ? <span class="tok-string">"B"</span> : <span class="tok-string">"C"</span>;</div>
  </div>
</div>
> 💡 **Try it:** Write a ternary that sets \`let weather = "warm"\` if a variable \`temperature\` is above 20, or \`"cold"\` otherwise.
 
<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">The ternary operator (<code>condition ? a : b</code>) is a compact substitute for a simple <code>if...else</code> — reach for it with single conditions, not nested ones.</p>
</div>`
          },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Functions",
        slug: "js-functions",
        order: 2,
        topics: [
            {
                title: "Function Declarations",
                slug: "function-declarations",
                order: 0,
                content: `## Function Declarations

A function is a reusable block of code that performs a task. Instead of writing the same logic over and over, you wrap it in a function and *call* it whenever you need it.

**Basic syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">function-declaration.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello there!"</span>);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>(); <span class="tok-comment">// "Hello there!"</span></div>
  </div>
</div>

A function has three parts: the \`function\` keyword, a name, and a body (the code between \`{ }\`). Nothing inside the body runs until the function is *called* — writing the function just defines it.

**Why use functions?**

Without a function, repeated logic means repeated code. With one, you write it once and reuse it anywhere:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">why-functions.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">printDivider</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"------------------"</span>);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">printDivider</span>();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Section 1"</span>);</div>
    <div class="snippet-line"><span class="tok-call">printDivider</span>();</div>
  </div>
</div>

**Naming conventions**

Function names should describe what the function *does* — usually a verb or verb phrase, written in camelCase:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">naming-functions.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// ✅ Clear, describes the action</span></div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">calculateTotal</span>() { }</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// ❌ Vague — what does it do?</span></div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">doStuff</span>() { }</div>
  </div>
</div>

> 💡 **Try it:** Write a function called \`sayGoodbye\` that logs \`"Goodbye!"\` to the console, then call it.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A function definition doesn't run on its own — it only executes when you *call* it, letting you write logic once and reuse it anywhere.</p>
</div>
`
            },
            {
                title: "Parameters & Arguments",
                slug: "parameters-and-arguments",
                order: 1,
                content: `## Parameters & Arguments

Parameters let a function accept input, so it can work with different data each time it's called instead of doing the exact same thing every time.

**Defining parameters**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">parameters.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello, "</span> + name + <span class="tok-string">"!"</span>);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>(<span class="tok-string">"Tunde"</span>); <span class="tok-comment">// "Hello, Tunde!"</span></div>
    <div class="snippet-line"><span class="tok-call">greet</span>(<span class="tok-string">"Zara"</span>);  <span class="tok-comment">// "Hello, Zara!"</span></div>
  </div>
</div>

\`name\` here is a **parameter** — a placeholder in the function definition. \`"Tunde"\` and \`"Zara"\` are **arguments** — the actual values passed in when the function is called. The distinction is small but worth knowing, since you'll see both terms in docs and error messages.

**Multiple parameters**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multiple-parameters.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">addNumbers</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(a + b);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">addNumbers</span>(4, 7); <span class="tok-comment">// 11</span></div>
  </div>
</div>

**What happens with missing arguments?**

If you call a function without providing all its arguments, the missing parameters become \`undefined\` rather than throwing an error:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">missing-arguments.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello, "</span> + name);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>(); <span class="tok-comment">// "Hello, undefined"</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`multiply(a, b)\` that logs the product of two numbers, then call it with \`6\` and \`7\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Parameters are placeholders in a function's definition; arguments are the real values you pass in when calling it — missing arguments become <code>undefined</code> rather than causing an error.</p>
</div>
`
            },
            {
                title: "Return Values",
                slug: "return-values",
                order: 2,
                content: `## Return Values

So far, the example functions have only *printed* results with \`console.log()\`. But usually, you want a function to *give back* a value your program can use elsewhere — that's what \`return\` does.

**Using \`return\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">return-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">add</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> result = <span class="tok-call">add</span>(3, 4);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(result); <span class="tok-comment">// 7</span></div>
  </div>
</div>

Unlike \`console.log()\`, which just displays a value, \`return\` sends the value back out of the function so you can store it in a variable, pass it to another function, or use it in a calculation.

**\`return\` stops the function**

Once \`return\` runs, the function exits immediately — any code after it is never reached:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">return-stops-execution.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">checkAge</span>(age) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (age &lt; 18) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-string">"Too young"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-string">"Allowed"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">checkAge</span>(15)); <span class="tok-comment">// "Too young"</span></div>
  </div>
</div>

**No \`return\` means \`undefined\`**

If a function doesn't have a \`return\` statement, calling it produces \`undefined\` — the function may still *do* something (like log to the console), it just doesn't hand anything back:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">no-return.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">logMessage</span>(msg) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(msg);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> result = <span class="tok-call">logMessage</span>(<span class="tok-string">"Hi!"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(result); <span class="tok-comment">// undefined</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`isEven(num)\` that returns \`true\` if a number is even and \`false\` otherwise, using the \`%\` operator.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>return</code> sends a value back out of a function and immediately ends it — without <code>return</code>, calling a function always produces <code>undefined</code>.</p>
</div>
`
            },
            {
                title: "Function Expressions & Arrow Functions",
                slug: "function-expressions-and-arrow-functions",
                order: 3,
                content: `## Function Expressions & Arrow Functions

So far you've written functions using the \`function\` keyword followed by a name — called a *function declaration*. JavaScript also lets you store a function in a variable, and offers a shorter arrow syntax for writing them.

**Function expressions**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">function-expression.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> greet = <span class="tok-keyword">function</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hi, "</span> + name);</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>(<span class="tok-string">"Femi"</span>); <span class="tok-comment">// "Hi, Femi"</span></div>
  </div>
</div>

Here, the function has no name of its own — it's assigned to the \`greet\` variable instead. This is called a *function expression*, and unlike a declaration, it can't be called before the line where it's defined.

**Arrow functions**

Arrow functions (\`=>\`) are a more compact way to write function expressions, and they're extremely common in modern JavaScript:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">arrow-function.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// Function expression</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> square = <span class="tok-keyword">function</span>(x) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> x * x;</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Arrow function — same behavior, shorter syntax</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> squareArrow = (x) => {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> x * x;</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">squareArrow</span>(5)); <span class="tok-comment">// 25</span></div>
  </div>
</div>

**Implicit return**

When an arrow function's body is a single expression, you can drop the \`{ }\` and \`return\` entirely — the value is returned automatically:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">implicit-return.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> square = x => x * x;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">square</span>(6)); <span class="tok-comment">// 36</span></div>
  </div>
</div>

> 💡 **Try it:** Rewrite \`function double(n) { return n * 2; }\` as an arrow function using implicit return.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Arrow functions are a shorter way to write function expressions, and a single-expression arrow function can skip <code>{ }</code> and <code>return</code> entirely via implicit return.</p>
</div>
`
            },
            {
                title: "Default Parameters",
                slug: "default-parameters",
                order: 4,
                content: `## Default Parameters

Default parameters let you set a fallback value for a parameter, used automatically whenever the caller doesn't provide one — no more manually checking for \`undefined\`.

**Basic syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">default-parameters.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>(name = <span class="tok-string">"Guest"</span>) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello, "</span> + name);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>();          <span class="tok-comment">// "Hello, Guest"</span></div>
    <div class="snippet-line"><span class="tok-call">greet</span>(<span class="tok-string">"Ngozi"</span>);   <span class="tok-comment">// "Hello, Ngozi"</span></div>
  </div>
</div>

**Before default parameters**

Before this syntax existed (pre-2015), developers had to check for \`undefined\` manually inside the function body:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">before-defaults.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;name = name || <span class="tok-string">"Guest"</span>; <span class="tok-comment">// manual fallback</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello, "</span> + name);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Default parameters make the same intent clearer and shorter, right in the function signature.

**Multiple defaults**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multiple-defaults.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">createUser</span>(name = <span class="tok-string">"Anonymous"</span>, role = <span class="tok-string">"member"</span>) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(name + <span class="tok-string">" — "</span> + role);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">createUser</span>(<span class="tok-string">"Kwame"</span>); <span class="tok-comment">// "Kwame — member"</span></div>
    <div class="snippet-line"><span class="tok-call">createUser</span>(<span class="tok-string">"Amina"</span>, <span class="tok-string">"admin"</span>); <span class="tok-comment">// "Amina — admin"</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`power(base, exponent = 2)\` that returns \`base\` raised to \`exponent\`, defaulting to squaring when only one argument is given.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Default parameters (<code>param = value</code>) provide a fallback automatically, removing the need to manually check for <code>undefined</code> inside the function.</p>
</div>
`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Arrays",
        slug: "js-arrays",
        order: 3,
        topics: [
            {
                title: "Creating Arrays",
                slug: "creating-arrays",
                order: 0,
                content: `## Creating Arrays

An array is an ordered list of values, stored under a single variable name. Instead of creating \`fruit1\`, \`fruit2\`, \`fruit3\`, you can group them all into one array.

**Creating an array**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits); <span class="tok-comment">// ["apple", "banana", "mango"]</span></div>
  </div>
</div>

Arrays are written with square brackets \`[ ]\`, and each value inside is separated by a comma. Notice \`const\` is used here — the array itself won't be reassigned, even though its *contents* can still change (more on that in the next topic).

**Arrays can hold mixed types**

Unlike some languages, a single JavaScript array can hold values of different types at once:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">mixed-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> mixed = [<span class="tok-string">"Ade"</span>, 25, <span class="tok-keyword">true</span>, <span class="tok-keyword">null</span>];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(mixed); <span class="tok-comment">// ["Ade", 25, true, null]</span></div>
  </div>
</div>

In practice, most arrays hold values of the same type — mixing types is possible, but consistent arrays are usually easier to work with.

**Checking the length**

The \`.length\` property tells you how many items are in an array:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-length.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> colors = [<span class="tok-string">"red"</span>, <span class="tok-string">"green"</span>, <span class="tok-string">"blue"</span>];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(colors.length); <span class="tok-comment">// 3</span></div>
  </div>
</div>

> 💡 **Try it:** Create an array called \`numbers\` with five numbers of your choice, then log its \`.length\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Arrays store ordered lists of values using <code>[ ]</code> syntax, can mix types, and their size is always available via <code>.length</code>.</p>
</div>`
            },
            {
                title: "Accessing & Modifying Elements",
                slug: "accessing-modifying-elements",
                order: 1,
                content: `## Accessing & Modifying Elements

Every item in an array has a position, called its **index**. Indexes start at \`0\`, not \`1\` — the first item is at index \`0\`, the second at index \`1\`, and so on.

**Accessing elements by index**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">access-elements.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits[0]); <span class="tok-comment">// "apple" — first item</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits[2]); <span class="tok-comment">// "mango" — third item</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits[5]); <span class="tok-comment">// undefined — index doesn't exist</span></div>
  </div>
</div>

**Getting the last item**

Since indexes are zero-based, the last item's index is always \`length - 1\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">last-item.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits[fruits.length - 1]); <span class="tok-comment">// "mango"</span></div>
  </div>
</div>

**Modifying elements**

Even though the array was declared with \`const\`, you can still change what's *inside* it — \`const\` only locks the variable name from being reassigned to a whole new array:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">modify-elements.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">fruits[1] = <span class="tok-string">"blueberry"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits); <span class="tok-comment">// ["apple", "blueberry", "mango"]</span></div>
  </div>
</div>

> 💡 **Try it:** Given \`const colors = ["red", "green", "blue"];\`, change the second element to \`"yellow"\` and log the result.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Array indexes start at <code>0</code>, and <code>const</code> only prevents reassigning the array itself — individual elements can still be changed.</p>
</div>`
            },
            {
                title: "Adding & Removing Elements",
                slug: "adding-removing-elements",
                order: 2,
                content: `## Adding & Removing Elements

JavaScript gives you built-in methods to add or remove items from an array, at either the end or the beginning.

**Adding to the end: \`push()\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">push.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> tasks = [<span class="tok-string">"wake up"</span>, <span class="tok-string">"eat breakfast"</span>];</div>
    <div class="snippet-line">tasks.push(<span class="tok-string">"go to work"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(tasks); <span class="tok-comment">// ["wake up", "eat breakfast", "go to work"]</span></div>
  </div>
</div>

**Removing from the end: \`pop()\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pop.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> tasks = [<span class="tok-string">"wake up"</span>, <span class="tok-string">"eat breakfast"</span>, <span class="tok-string">"go to work"</span>];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> removed = tasks.pop();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(removed); <span class="tok-comment">// "go to work" — pop() returns what it removed</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(tasks);   <span class="tok-comment">// ["wake up", "eat breakfast"]</span></div>
  </div>
</div>

**Adding and removing from the start**

\`unshift()\` adds to the beginning, and \`shift()\` removes from the beginning:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">shift-unshift.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> queue = [<span class="tok-string">"second"</span>, <span class="tok-string">"third"</span>];</div>
    <div class="snippet-line">queue.unshift(<span class="tok-string">"first"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(queue); <span class="tok-comment">// ["first", "second", "third"]</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">queue.shift();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(queue); <span class="tok-comment">// ["second", "third"]</span></div>
  </div>
</div>

**Quick reference**

| Method | Adds/removes | Position |
|--------|---------------|----------|
| \`push()\` | Adds | End |
| \`pop()\` | Removes | End |
| \`unshift()\` | Adds | Start |
| \`shift()\` | Removes | Start |

> 💡 **Try it:** Start with \`const stack = [1, 2, 3];\`, \`push\` a \`4\`, then \`pop\` once and log the array after each step.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>push()</code>/<code>pop()</code> work at the end of an array, and <code>unshift()</code>/<code>shift()</code> work at the start — all four modify the original array directly.</p>
</div>`
            },
            {
                title: "Iterating Arrays",
                slug: "iterating-arrays",
                order: 3,
                content: `## Iterating Arrays

Iterating means going through each item in an array, one at a time — usually to do something with each value. JavaScript gives you a few different ways to do this.

**Using a \`for\` loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; fruits.length; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(fruits[i]);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints "apple", "banana", "mango"</span></div>
  </div>
</div>

**Using \`forEach()\`**

\`forEach()\` is a cleaner, more modern way to loop through an array — it runs a function once for every item, automatically:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">foreach.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">fruits.forEach(<span class="tok-keyword">function</span>(fruit) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(fruit);</div>
    <div class="snippet-line">});</div>
  </div>
</div>

You can write the same thing with an arrow function for a more compact style:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">foreach-arrow.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">fruits.forEach(fruit => <span class="tok-call">console.log</span>(fruit));</div>
  </div>
</div>

**Getting the index in \`forEach()\`**

The callback function optionally receives the index as a second parameter:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">foreach-index.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">fruits.forEach((fruit, index) => {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(index + <span class="tok-string">": "</span> + fruit);</div>
    <div class="snippet-line">});</div>
    <div class="snippet-line"><span class="tok-comment">// "0: apple", "1: banana", "2: mango"</span></div>
  </div>
</div>

> 💡 **Try it:** Use \`forEach()\` on \`const nums = [1, 2, 3, 4];\` to log each number doubled.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>forEach()</code> runs a function once per array item, offering a cleaner alternative to a manual <code>for</code> loop for most iteration needs.</p>
</div>`
            },
            {
                title: "Searching & Transforming Arrays",
                slug: "searching-transforming-arrays",
                order: 4,
                content: `## Searching & Transforming Arrays

Beyond looping, JavaScript arrays have built-in methods for finding specific items or transforming an entire array into a new one — without writing manual loops.

**Checking if a value exists: \`includes()\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">includes.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits.includes(<span class="tok-string">"banana"</span>)); <span class="tok-comment">// true</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(fruits.includes(<span class="tok-string">"grape"</span>));  <span class="tok-comment">// false</span></div>
  </div>
</div>

**Finding an item: \`find()\`**

\`find()\` returns the *first* item that matches a condition, or \`undefined\` if nothing matches:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">find.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> ages = [12, 25, 8, 34];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> firstAdult = ages.find(age => age >= 18);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(firstAdult); <span class="tok-comment">// 25</span></div>
  </div>
</div>

**Filtering an array: \`filter()\`**

\`filter()\` returns a *new array* containing every item that matches a condition:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">filter.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> ages = [12, 25, 8, 34];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> adults = ages.filter(age => age >= 18);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(adults); <span class="tok-comment">// [25, 34]</span></div>
  </div>
</div>

**Transforming an array: \`map()\`**

\`map()\` also returns a new array — but instead of filtering, it transforms every item and keeps the same array length:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">map.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> prices = [10, 20, 30];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> withTax = prices.map(price => price * 1.075);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(withTax); <span class="tok-comment">// [10.75, 21.5, 32.25]</span></div>
  </div>
</div>

Note that \`filter()\` and \`map()\` never change the original array — they always return a brand-new one, leaving \`prices\` and \`ages\` untouched.

> 💡 **Try it:** Given \`const nums = [1, 2, 3, 4, 5, 6];\`, use \`filter()\` to get only the even numbers.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>find()</code> gets one matching item, <code>filter()</code> gets all matching items, and <code>map()</code> transforms every item — all three return a new value without modifying the original array.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "Loops",
        slug: "loops",
        order: 4,
        topics: [
            {
                title: "The for Loop",
                slug: "the-for-loop",
                order: 0,
                content: `## The for Loop

Loops let you run the same block of code multiple times without copy-pasting it. The \`for\` loop is the most common one — it's built for situations where you know how many times you want to repeat something.

**Basic syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; 5; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 0, 1, 2, 3, 4</span></div>
  </div>
</div>

A \`for\` loop has three parts, separated by semicolons:
1. **Initialization** — \`let i = 0\` runs once, before the loop starts
2. **Condition** — \`i < 5\` is checked before every pass; the loop stops once it's \`false\`
3. **Update** — \`i++\` runs after every pass

**Looping backwards**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">countdown.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 5; i &gt; 0; i--) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 5, 4, 3, 2, 1</span></div>
  </div>
</div>

**Looping through an array by index**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> names = [<span class="tok-string">"Ola"</span>, <span class="tok-string">"Bisi"</span>, <span class="tok-string">"Tobi"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; names.length; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(names[i]);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Write a \`for\` loop that logs every even number from \`2\` to \`10\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A <code>for</code> loop has three parts — initialization, condition, and update — making it ideal when you know exactly how many times to repeat something.</p>
</div>`
            },
            {
                title: "The while and do...while Loops",
                slug: "the-while-and-do-while-loops",
                order: 1,
                content: `## The while and do...while Loops

\`while\` loops repeat a block of code as long as a condition stays \`true\`. They're useful when you don't know in advance exactly how many times you'll need to loop.

**The \`while\` loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">while-loop.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> count = 0;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">while</span> (count &lt; 3) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Count is "</span> + count);</div>
    <div class="snippet-line">&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// "Count is 0", "Count is 1", "Count is 2"</span></div>
  </div>
</div>

Unlike a \`for\` loop, the condition is the *only* thing controlling a \`while\` loop — you're responsible for updating the variable yourself inside the loop body. Forgetting to do so creates an **infinite loop**, which will freeze your program.

**The \`do...while\` loop**

\`do...while\` is nearly identical, except it runs the code block *first*, then checks the condition — guaranteeing at least one run even if the condition starts out \`false\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">do-while-loop.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> num = 10;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">do</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"This runs at least once"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;num++;</div>
    <div class="snippet-line">} <span class="tok-keyword">while</span> (num &lt; 5);</div>
  </div>
</div>

**\`for\` vs \`while\`: when to use which**

Use a \`for\` loop when you know the number of iterations ahead of time (like looping through an array). Use a \`while\` loop when you're repeating until some condition becomes true — for example, waiting for user input or processing data of unknown length.

> 💡 **Try it:** Write a \`while\` loop that starts at \`100\` and keeps halving the number, logging it each time, until it drops below \`1\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Use <code>while</code> when the number of repetitions isn't known upfront — just remember to update the condition inside the loop, or you'll create an infinite loop.</p>
</div>`
            },
            {
                title: "The for...of Loop",
                slug: "the-for-of-loop",
                order: 2,
                content: `## The for...of Loop

\`for...of\` is a modern, simplified loop built specifically for iterating over the *values* in something like an array or a string — no manual index tracking required.

**Looping over an array**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-of-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> fruit <span class="tok-keyword">of</span> fruits) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(fruit);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints "apple", "banana", "mango"</span></div>
  </div>
</div>

Compare this to the index-based \`for\` loop from Topic 1 — no \`i\`, no \`.length\`, no \`fruits[i]\`. You just get each value directly.

**Looping over a string**

Strings are iterable too, so \`for...of\` works character by character:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-of-string.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> word = <span class="tok-string">"Hi!"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> letter <span class="tok-keyword">of</span> word) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(letter);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints "H", "i", "!"</span></div>
  </div>
</div>

**Combining with array methods**

\`for...of\` is especially handy when you need to \`break\` out of a loop early — something \`forEach()\` can't do:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-of-break.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> nums = [3, 7, 12, 18, 25];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> num <span class="tok-keyword">of</span> nums) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (num &gt; 10) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Found: "</span> + num);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// "Found: 12" — stops as soon as it finds a match</span></div>
  </div>
</div>

> 💡 **Try it:** Use \`for...of\` to loop through \`const scores = [55, 72, 90, 43];\` and log only the scores above \`60\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>for...of</code> loops directly over values in arrays and strings without index tracking, and unlike <code>forEach()</code>, it supports <code>break</code> to exit early.</p>
</div>`
            },
            {
                title: "The for...in Loop",
                slug: "the-for-in-loop",
                order: 3,
                content: `## The for...in Loop

\`for...in\` is built for looping over the **keys** (property names) of an object, rather than the values in an array. It's easy to confuse with \`for...of\` — the names are similar, but they're meant for different jobs.

**Looping over an object's keys**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-in-object.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Femi"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;age: 30,</div>
    <div class="snippet-line">&nbsp;&nbsp;role: <span class="tok-string">"admin"</span></div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> key <span class="tok-keyword">in</span> user) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(key + <span class="tok-string">": "</span> + user[key]);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// "name: Femi", "age: 30", "role: admin"</span></div>
  </div>
</div>

Each pass through the loop, \`key\` holds the *property name* as a string (\`"name"\`, \`"age"\`, \`"role"\`) — you then use \`user[key]\` to get the matching value.

**\`for...in\` vs \`for...of\`: the key difference**

| Loop | Iterates over | Best for |
|------|----------------|----------|
| \`for...of\` | Values | Arrays, strings |
| \`for...in\` | Keys (property names) | Objects |

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-in-vs-for-of.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> nums = [10, 20, 30];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> i <span class="tok-keyword">in</span> nums) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(i); <span class="tok-comment">// "0", "1", "2" — the indexes, as strings</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

Using \`for...in\` on an array technically works, but it gives you the *indexes* rather than the values — \`for...of\` is almost always the better choice for arrays.

> 💡 **Try it:** Given \`const car = { brand: "Toyota", year: 2022, color: "blue" };\`, use \`for...in\` to log each key and its value.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>for...in</code> loops over an object's keys, while <code>for...of</code> loops over values — use <code>for...in</code> for objects and <code>for...of</code> for arrays and strings.</p>
</div>`
            },
            {
                title: "break, continue, and Nested Loops",
                slug: "break-continue-and-nested-loops",
                order: 4,
                content: `## break, continue, and Nested Loops

Sometimes you need finer control over a loop than just letting it run to completion — \`break\` and \`continue\` give you that control, and loops can also be nested inside each other for more complex tasks.

**\`break\` — exit the loop entirely**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">break.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; 10; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i === 5) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 0, 1, 2, 3, 4 — then stops completely</span></div>
  </div>
</div>

**\`continue\` — skip to the next iteration**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">continue.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; 6; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i % 2 === 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">continue</span>; <span class="tok-comment">// skip even numbers</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 1, 3, 5 — even numbers are skipped, loop keeps going</span></div>
  </div>
</div>

Unlike \`break\`, \`continue\` doesn't stop the loop — it just skips the rest of the *current* pass and moves on to the next one.

**Nested loops**

A loop inside another loop is common when working with grids, tables, or combinations of two lists:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nested-loops.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> row = 1; row &lt;= 3; row++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> col = 1; col &lt;= 2; col++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Row "</span> + row + <span class="tok-string">", Col "</span> + col);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// "Row 1, Col 1", "Row 1, Col 2", "Row 2, Col 1" ...</span></div>
  </div>
</div>

The inner loop runs completely for every single pass of the outer loop — here, that's 3 outer passes × 2 inner passes = 6 total lines logged.

> 💡 **Try it:** Write a loop from \`1\` to \`20\` that logs \`"Fizz"\` for multiples of 3, and every other number normally, using \`continue\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>break</code> exits a loop entirely, <code>continue</code> skips just the current iteration, and nested loops run the inner loop fully for every pass of the outer one.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Objects",
        slug: "js-objects",
        order: 5,
        topics: [
            {
                title: "Creating Objects & Accessing Properties",
                slug: "creating-objects-accessing-properties",
                order: 0,
                content: `## Creating Objects & Accessing Properties

An object stores related data as **key-value pairs**. Where an array is a list ordered by position, an object is a collection labeled by name — much closer to how we naturally describe real-world things.

**Creating an object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-object.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Zainab"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;age: 28,</div>
    <div class="snippet-line">&nbsp;&nbsp;isStudent: <span class="tok-keyword">false</span></div>
    <div class="snippet-line">};</div>
  </div>
</div>

Each \`key: value\` pair is called a **property**. Keys are usually written without quotes (unless they contain spaces or special characters), and values can be any type — strings, numbers, booleans, even other objects or arrays.

**Dot notation**

The most common way to access a property is dot notation — \`object.property\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dot-notation.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(person.name); <span class="tok-comment">// "Zainab"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(person.age);  <span class="tok-comment">// 28</span></div>
  </div>
</div>

**Bracket notation**

You can also access properties with square brackets — required when the property name is stored in a variable, or contains spaces:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">bracket-notation.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(person[<span class="tok-string">"name"</span>]); <span class="tok-comment">// "Zainab"</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> key = <span class="tok-string">"age"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(person[key]); <span class="tok-comment">// 28 — key comes from a variable</span></div>
  </div>
</div>

Dot notation is used for most day-to-day code; bracket notation is reserved for dynamic property names, like when the property you need depends on a variable.

> 💡 **Try it:** Create an object \`book\` with \`title\`, \`author\`, and \`pages\` properties, then log the \`title\` using dot notation.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Objects store data as labeled key-value pairs, accessible via dot notation for known property names or bracket notation when the name comes from a variable.</p>
</div>`
            },
            {
                title: "Modifying Objects",
                slug: "modifying-objects",
                order: 1,
                content: `## Modifying Objects

Objects created with \`const\` can still have their properties changed, added, or removed — just like arrays, \`const\` only locks the variable from being reassigned to a completely new object.

**Changing an existing property**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">modify-property.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = { name: <span class="tok-string">"Zainab"</span>, age: 28 };</div>
    <div class="snippet-line">person.age = 29;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(person.age); <span class="tok-comment">// 29</span></div>
  </div>
</div>

**Adding a new property**

Simply assign a value to a key that doesn't exist yet, and JavaScript adds it:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">add-property.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = { name: <span class="tok-string">"Zainab"</span>, age: 28 };</div>
    <div class="snippet-line">person.city = <span class="tok-string">"Abuja"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(person); <span class="tok-comment">// { name: "Zainab", age: 28, city: "Abuja" }</span></div>
  </div>
</div>

**Deleting a property**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">delete-property.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = { name: <span class="tok-string">"Zainab"</span>, age: 28, city: <span class="tok-string">"Abuja"</span> };</div>
    <div class="snippet-line"><span class="tok-keyword">delete</span> person.city;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(person); <span class="tok-comment">// { name: "Zainab", age: 28 }</span></div>
  </div>
</div>

**Checking if a property exists**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">has-property.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = { name: <span class="tok-string">"Zainab"</span>, age: 28 };</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"name"</span> <span class="tok-keyword">in</span> person); <span class="tok-comment">// true</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"email"</span> <span class="tok-keyword">in</span> person); <span class="tok-comment">// false</span></div>
  </div>
</div>

> 💡 **Try it:** Given \`const car = { brand: "Honda", year: 2020 };\`, add a \`color\` property set to \`"black"\`, then delete \`year\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Properties on a <code>const</code> object can still be changed, added with simple assignment, or removed with <code>delete</code> — only the variable binding itself is locked.</p>
</div>`
            },
            {
                title: "Methods — Functions Inside Objects",
                slug: "methods-functions-inside-objects",
                order: 2,
                content: `## Methods — Functions Inside Objects

When a property's value is a function, it's called a **method**. Methods let an object carry behavior alongside its data — for example, a \`person\` object that can \`greet()\`.

**Defining a method**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">define-method.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Kenji"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;greet: <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hi, I'm "</span> + <span class="tok-keyword">this</span>.name);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">person.greet(); <span class="tok-comment">// "Hi, I'm Kenji"</span></div>
  </div>
</div>

**The \`this\` keyword**

Inside a method, \`this\` refers to the object the method belongs to — it's how the method reaches the object's own properties. Without \`this\`, the method would have no way to know which object it was called on.

**Shorthand method syntax**

Modern JavaScript lets you skip the \`function\` keyword when defining a method:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">method-shorthand.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Kenji"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;greet() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hi, I'm "</span> + <span class="tok-keyword">this</span>.name);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
  </div>
</div>

**A method that returns a value**

Just like a regular function, a method can \`return\` something instead of (or in addition to) logging it:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">method-return.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> rectangle = {</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 4,</div>
    <div class="snippet-line">&nbsp;&nbsp;height: 5,</div>
    <div class="snippet-line">&nbsp;&nbsp;getArea() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">this</span>.width * <span class="tok-keyword">this</span>.height;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(rectangle.getArea()); <span class="tok-comment">// 20</span></div>
  </div>
</div>

> 💡 **Try it:** Add a \`isAdult()\` method to a \`person\` object that returns \`true\` if \`this.age\` is 18 or over.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A method is a function stored as an object property, and <code>this</code> inside it refers back to the object the method was called on.</p>
</div>`
            },
            {
                title: "Nested Objects & Arrays of Objects",
                slug: "nested-objects-arrays-of-objects",
                order: 3,
                content: `## Nested Objects & Arrays of Objects

Real-world data is rarely flat — objects commonly contain other objects, and arrays commonly hold multiple objects with the same shape. Learning to navigate these nested structures is essential for working with real data (like API responses).

**A nested object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nested-object.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = {</div>
    <div class="snippet-line">&nbsp;&nbsp;name: <span class="tok-string">"Priya"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;address: {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;city: <span class="tok-string">"Lagos"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;country: <span class="tok-string">"Nigeria"</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.address.city); <span class="tok-comment">// "Lagos"</span></div>
  </div>
</div>

Chain \`.\` to reach deeper — \`user.address.city\` walks into the \`address\` object and grabs its \`city\` property.

**An array of objects**

This pattern shows up constantly in real applications — a list of users, products, or records, each with the same set of properties:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-of-objects.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> products = [</div>
    <div class="snippet-line">&nbsp;&nbsp;{ name: <span class="tok-string">"Laptop"</span>, price: 1200 },</div>
    <div class="snippet-line">&nbsp;&nbsp;{ name: <span class="tok-string">"Mouse"</span>, price: 25 },</div>
    <div class="snippet-line">&nbsp;&nbsp;{ name: <span class="tok-string">"Keyboard"</span>, price: 60 }</div>
    <div class="snippet-line">];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(products[0].name); <span class="tok-comment">// "Laptop"</span></div>
  </div>
</div>

**Combining with array methods**

Array methods like \`map()\` and \`filter()\` work naturally with arrays of objects:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">objects-and-methods.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> products = [</div>
    <div class="snippet-line">&nbsp;&nbsp;{ name: <span class="tok-string">"Laptop"</span>, price: 1200 },</div>
    <div class="snippet-line">&nbsp;&nbsp;{ name: <span class="tok-string">"Mouse"</span>, price: 25 }</div>
    <div class="snippet-line">];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> names = products.map(product => product.name);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(names); <span class="tok-comment">// ["Laptop", "Mouse"]</span></div>
  </div>
</div>

> 💡 **Try it:** Given an array of three \`{ title, completed }\` task objects, use \`filter()\` to get only the tasks where \`completed\` is \`true\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Objects can nest inside each other and inside arrays — chain dot notation to reach deeper values, and combine with <code>map()</code>/<code>filter()</code> to work with lists of objects.</p>
</div>`
            },
            {
                title: "Object & Array Destructuring",
                slug: "object-array-destructuring",
                order: 4,
                content: `## Object & Array Destructuring

Destructuring is a shorthand for pulling values out of objects or arrays into their own variables — instead of accessing each property one line at a time.

**Object destructuring**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">object-destructuring.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> person = { name: <span class="tok-string">"Diego"</span>, age: 32, city: <span class="tok-string">"Madrid"</span> };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Without destructuring</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> name = person.name;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> age = person.age;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// With destructuring — same result, one line</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> { name, age } = person;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(name, age); <span class="tok-comment">// "Diego" 32</span></div>
  </div>
</div>

The variable names in \`{ name, age }\` must match the object's property names exactly — that's how JavaScript knows what to pull out.

**Array destructuring**

Array destructuring works similarly, but pulls values out by *position* instead of by name:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-destructuring.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> coordinates = [40.7128, -74.0060];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> [latitude, longitude] = coordinates;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(latitude);  <span class="tok-comment">// 40.7128</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(longitude); <span class="tok-comment">// -74.006</span></div>
  </div>
</div>

**Destructuring function parameters**

A common real-world use is destructuring directly inside a function's parameters, so you can reference properties without repeating the object name each time:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">destructure-parameters.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">printUser</span>({ name, age }) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(name + <span class="tok-string">" is "</span> + age);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">printUser</span>({ name: <span class="tok-string">"Amara"</span>, age: 24 }); <span class="tok-comment">// "Amara is 24"</span></div>
  </div>
</div>

> 💡 **Try it:** Destructure \`title\` and \`author\` out of \`const book = { title: "Dune", author: "Frank Herbert", pages: 412 };\` in a single line.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Destructuring unpacks object properties by name or array items by position into their own variables in one line, and works directly in function parameters too.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS DOM Manipulation",
        slug: "js-dom-manipulation",
        order: 6,
        topics: [
            {
                title: "What Is the DOM?",
                slug: "what-is-the-dom",
                order: 0,
                content: `## What Is the DOM?

The DOM (Document Object Model) is how JavaScript "sees" and interacts with an HTML page. When a browser loads your HTML, it builds a tree-like structure of every element — and JavaScript can read, change, add to, or remove from that structure while the page is running.

**The document object**

Every page has a global \`document\` object — your entry point into the DOM:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">document-basics.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(document.title); <span class="tok-comment">// the page's &lt;title&gt; text</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(document.URL);   <span class="tok-comment">// the current page's URL</span></div>
  </div>
</div>

**Why the DOM matters**

Without the DOM, JavaScript would only be able to run calculations in the background — it couldn't change what the user actually sees. The DOM is the bridge between your JavaScript logic and the visible page: showing a message, toggling a menu, or updating a score on screen all happen through it.

**A simple example page**

Imagine this HTML is on the page:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">example-page.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;h1 id="title"&gt;Welcome&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;p class="intro"&gt;This is a paragraph.&lt;/p&gt;</div>
    <div class="snippet-line">&lt;button id="myBtn"&gt;Click me&lt;/button&gt;</div>
  </div>
</div>

Every one of these tags — \`h1\`, \`p\`, \`button\` — becomes a *node* JavaScript can reach and manipulate. The next topics cover exactly how.

> 💡 **Try it:** Open DevTools on any website, go to the Console, and type \`document.title\` to see what comes back.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">The DOM is the browser's live, JavaScript-readable model of your HTML page, accessed through the global <code>document</code> object.</p>
</div>`
            },
            {
                title: "Selecting Elements",
                slug: "selecting-elements",
                order: 1,
                content: `## Selecting Elements

Before you can change anything on a page, you need to select the element you want to work with. JavaScript gives you a few methods for this, depending on what you're searching by.

**\`getElementById()\`**

The most direct way to grab a single element, using its \`id\` attribute:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">get-by-id.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> title = document.getElementById(<span class="tok-string">"title"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(title.textContent); <span class="tok-comment">// "Welcome"</span></div>
  </div>
</div>

**\`querySelector()\` and \`querySelectorAll()\`**

\`querySelector()\` accepts any CSS selector and returns the *first* matching element. \`querySelectorAll()\` returns *all* matches, as a list:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">query-selector.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> firstParagraph = document.querySelector(<span class="tok-string">"p"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> intro = document.querySelector(<span class="tok-string">".intro"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> button = document.querySelector(<span class="tok-string">"#myBtn"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> allParagraphs = document.querySelectorAll(<span class="tok-string">"p"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(allParagraphs.length); <span class="tok-comment">// number of &lt;p&gt; tags on the page</span></div>
  </div>
</div>

The selector strings work exactly like CSS: \`"#id"\` for an ID, \`".class"\` for a class, and a plain tag name (\`"p"\`, \`"button"\`) for element type.

**Which one should you use?**

\`querySelector()\` and \`querySelectorAll()\` are the modern, flexible standard — they can select by ID, class, tag, or complex combinations, so most developers reach for them by default rather than mixing several older methods.

> 💡 **Try it:** Given the example page from Topic 1, select the button using \`querySelector("#myBtn")\` and log it to the console.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>querySelector()</code> and <code>querySelectorAll()</code> accept any CSS selector, making them the most flexible way to find one or many elements.</p>
</div>`
            },
            {
                title: "Changing Content & Attributes",
                slug: "changing-content-attributes",
                order: 2,
                content: `## Changing Content & Attributes

Once you've selected an element, you can change what it displays, style it, or modify its attributes — this is how JavaScript makes a static page feel dynamic.

**Changing text with \`textContent\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">text-content.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> title = document.getElementById(<span class="tok-string">"title"</span>);</div>
    <div class="snippet-line">title.textContent = <span class="tok-string">"Hello, CodePilot!"</span>;</div>
    <div class="snippet-line"><span class="tok-comment">// the &lt;h1&gt; on the page now reads "Hello, CodePilot!"</span></div>
  </div>
</div>

**Changing HTML with \`innerHTML\`**

\`innerHTML\` works like \`textContent\`, but it interprets the string as actual HTML rather than plain text — useful when you need to insert markup, not just words:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">inner-html.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> intro = document.querySelector(<span class="tok-string">".intro"</span>);</div>
    <div class="snippet-line">intro.innerHTML = <span class="tok-string">"This is &lt;strong&gt;bold&lt;/strong&gt; text."</span>;</div>
  </div>
</div>

Only use \`innerHTML\` with content you trust — inserting raw user input this way can expose your site to security risks.

**Changing styles**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">change-style.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> title = document.getElementById(<span class="tok-string">"title"</span>);</div>
    <div class="snippet-line">title.style.color = <span class="tok-string">"crimson"</span>;</div>
    <div class="snippet-line">title.style.fontSize = <span class="tok-string">"32px"</span>;</div>
  </div>
</div>

**Changing attributes and classes**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">attributes-classes.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> button = document.getElementById(<span class="tok-string">"myBtn"</span>);</div>
    <div class="snippet-line">button.setAttribute(<span class="tok-string">"disabled"</span>, <span class="tok-string">"true"</span>);</div>
    <div class="snippet-line">button.classList.add(<span class="tok-string">"active"</span>);</div>
    <div class="snippet-line">button.classList.remove(<span class="tok-string">"active"</span>);</div>
    <div class="snippet-line">button.classList.toggle(<span class="tok-string">"active"</span>); <span class="tok-comment">// adds it if missing, removes it if present</span></div>
  </div>
</div>

> 💡 **Try it:** Select an element by ID and change both its \`textContent\` and its \`style.backgroundColor\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Use <code>textContent</code> for plain text, <code>innerHTML</code> for markup, <code>style</code> for inline CSS, and <code>classList</code> to add/remove/toggle classes.</p>
</div>`
            },
            {
                title: "Handling Events",
                slug: "handling-events",
                order: 3,
                content: `## Handling Events

Events are actions the user takes — clicking, typing, submitting a form, hovering — and event listeners let your JavaScript respond to them. This is what turns a static page into something genuinely interactive.

**Adding a click event**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">click-event.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> button = document.getElementById(<span class="tok-string">"myBtn"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">button.addEventListener(<span class="tok-string">"click"</span>, <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Button was clicked!"</span>);</div>
    <div class="snippet-line">});</div>
  </div>
</div>

\`addEventListener()\` takes two main arguments: the event type as a string (\`"click"\`), and a function to run when that event happens.

**Common event types**

| Event | Fires when... |
|-------|----------------|
| \`click\` | An element is clicked |
| \`input\` | A text field's value changes |
| \`submit\` | A form is submitted |
| \`mouseover\` | The cursor enters an element |
| \`keydown\` | A key is pressed |

**Using the event object**

The listener function automatically receives an \`event\` object with details about what happened:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">event-object.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> input = document.querySelector(<span class="tok-string">"input"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">input.addEventListener(<span class="tok-string">"input"</span>, <span class="tok-keyword">function</span>(event) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(event.target.value); <span class="tok-comment">// logs the current text as you type</span></div>
    <div class="snippet-line">});</div>
  </div>
</div>

**Combining events with DOM changes**

The real power comes from mixing what you learned in Topic 3 with events — reacting to user actions by updating the page:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">event-plus-dom.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> button = document.getElementById(<span class="tok-string">"myBtn"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> title = document.getElementById(<span class="tok-string">"title"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">button.addEventListener(<span class="tok-string">"click"</span>, <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;title.textContent = <span class="tok-string">"You clicked the button!"</span>;</div>
    <div class="snippet-line">});</div>
  </div>
</div>

> 💡 **Try it:** Add a click listener to a button that toggles an \`"active"\` class on a \`<div>\` each time it's clicked.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>addEventListener()</code> connects a JavaScript function to a user action, and the automatically-provided <code>event</code> object carries details like which element triggered it.</p>
</div>`
            },
            {
                title: "Creating & Removing Elements",
                slug: "creating-removing-elements",
                order: 4,
                content: `## Creating & Removing Elements

Beyond editing existing elements, JavaScript can build brand-new ones and insert them into the page — the technique behind things like dynamically adding items to a to-do list or rendering search results.

**Creating a new element**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-element.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> newItem = document.createElement(<span class="tok-string">"li"</span>);</div>
    <div class="snippet-line">newItem.textContent = <span class="tok-string">"Buy groceries"</span>;</div>
  </div>
</div>

\`createElement()\` builds the element in memory — it doesn't appear on the page yet. You still need to attach it somewhere, which is what \`appendChild()\` does.

**Adding it to the page**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">append-child.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> list = document.getElementById(<span class="tok-string">"todo-list"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> newItem = document.createElement(<span class="tok-string">"li"</span>);</div>
    <div class="snippet-line">newItem.textContent = <span class="tok-string">"Buy groceries"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">list.appendChild(newItem);</div>
    <div class="snippet-line"><span class="tok-comment">// the new &lt;li&gt; now shows up inside #todo-list</span></div>
  </div>
</div>

**Removing an element**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">remove-element.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> item = document.querySelector(<span class="tok-string">".completed"</span>);</div>
    <div class="snippet-line">item.remove();</div>
  </div>
</div>

**Putting it together: a simple to-do list**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">todo-example.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> input = document.getElementById(<span class="tok-string">"todo-input"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> list = document.getElementById(<span class="tok-string">"todo-list"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> addBtn = document.getElementById(<span class="tok-string">"add-btn"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">addBtn.addEventListener(<span class="tok-string">"click"</span>, <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">const</span> item = document.createElement(<span class="tok-string">"li"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;item.textContent = input.value;</div>
    <div class="snippet-line">&nbsp;&nbsp;list.appendChild(item);</div>
    <div class="snippet-line">&nbsp;&nbsp;input.value = <span class="tok-string">""</span>; <span class="tok-comment">// clear the input after adding</span></div>
    <div class="snippet-line">});</div>
  </div>
</div>

> 💡 **Try it:** Combine \`createElement()\`, \`appendChild()\`, and a click event to add a new \`<p>\` to the page every time a button is clicked.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>createElement()</code> builds a new element in memory, <code>appendChild()</code> inserts it into the page, and <code>.remove()</code> takes an element back out — together they let JavaScript build UI dynamically.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Scope & Closures",
        slug: "js-scope-closures",
        order: 7,
        topics: [
            {
                title: "What Is Scope?",
                slug: "what-is-scope",
                order: 0,
                content: `## What Is Scope?

Scope determines where in your code a variable is accessible. Get this wrong and you'll either hit confusing "not defined" errors, or accidentally let two unrelated parts of your program interfere with each other.

**Global scope**

A variable declared outside any function or block lives in the **global scope** — accessible from anywhere in your file:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">global-scope.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> appName = <span class="tok-string">"CodePilot"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">printName</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(appName); <span class="tok-comment">// "CodePilot" — reachable from inside the function</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">printName</span>();</div>
  </div>
</div>

**Function scope**

A variable declared inside a function only exists *inside* that function — it's invisible to code outside it:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">function-scope.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">showMessage</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> message = <span class="tok-string">"Hello!"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(message); <span class="tok-comment">// "Hello!" — works fine here</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">showMessage</span>();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(message); <span class="tok-comment">// — ReferenceError: message is not defined</span></div>
  </div>
</div>

**Block scope with \`let\` and \`const\`**

\`let\` and \`const\` are also scoped to the nearest \`{ }\` block — including \`if\` statements and loops, not just functions:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">block-scope.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">if</span> (<span class="tok-keyword">true</span>) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> secret = <span class="tok-string">"hidden"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(secret); <span class="tok-comment">// "hidden" — accessible inside the block</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(secret); <span class="tok-comment">// — ReferenceError: secret is not defined</span></div>
  </div>
</div>

This is one of the reasons \`let\`/\`const\` are preferred over \`var\` — \`var\` ignores block boundaries entirely, which can lead to subtle bugs.

> 💡 **Try it:** Declare a \`let\` variable inside a \`for\` loop's block, then try to log it right after the loop ends — see what error you get.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Scope controls where a variable can be accessed — global scope is visible everywhere, while <code>let</code>/<code>const</code> confine variables to the function or block they're declared in.</p>
</div>`
            },
            {
                title: "var vs let/const Scoping",
                slug: "var-vs-let-const-scoping",
                order: 1,
                content: `## var vs let/const Scoping

\`var\` predates block scoping in JavaScript, and it behaves differently in ways that catch a lot of learners off guard. Understanding the contrast makes it clear why modern code avoids \`var\`.

**\`var\` ignores block scope**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">var-block-scope.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">if</span> (<span class="tok-keyword">true</span>) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">var</span> leaked = <span class="tok-string">"I'm out here"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(leaked); <span class="tok-comment">// "I'm out here" — var escapes the block!</span></div>
  </div>
</div>

Unlike \`let\`, a \`var\` declared inside an \`if\` block or a loop is still accessible outside it — it only respects *function* boundaries, not block boundaries.

**A classic loop bug**

This difference causes a well-known bug when using \`var\` inside a loop with a delayed callback:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">var-loop-bug.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">var</span> i = 0; i &lt; 3; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => <span class="tok-call">console.log</span>(i), 0);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 3, 3, 3 — every callback shares the same "i"</span></div>
  </div>
</div>

**The \`let\` fix**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">let-loop-fix.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> i = 0; i &lt; 3; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => <span class="tok-call">console.log</span>(i), 0);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 0, 1, 2 — each iteration gets its own "i"</span></div>
  </div>
</div>

Because \`let\` creates a fresh, block-scoped \`i\` on every pass of the loop, each \`setTimeout\` callback captures its own separate value instead of sharing one.

> 💡 **Try it:** Rewrite the \`var\` loop bug example above using \`let\` and confirm the output changes from \`3, 3, 3\` to \`0, 1, 2\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>var</code> ignores block boundaries and can leak out of <code>if</code> statements and loops — <code>let</code>'s proper block scoping avoids a whole category of subtle bugs.</p>
</div>`
            },
            {
                title: "The Scope Chain",
                slug: "the-scope-chain",
                order: 2,
                content: `## The Scope Chain

When JavaScript looks up a variable, it doesn't just check the current scope — it searches outward, through each enclosing scope, until it finds the variable or runs out of places to look. This path is called the **scope chain**.

**Nested functions and outer variables**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">scope-chain.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">outer</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> city = <span class="tok-string">"Nairobi"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">function</span> <span class="tok-call">inner</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(city); <span class="tok-comment">// "Nairobi" — found in the outer scope</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">inner</span>();</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">outer</span>();</div>
  </div>
</div>

\`inner()\` doesn't have its own \`city\` variable, so JavaScript looks one level up — to \`outer()\`'s scope — and finds it there. This lookup only goes **outward**, never inward: \`outer()\` can't see variables declared inside \`inner()\`.

**Variable shadowing**

If an inner scope declares a variable with the same name as an outer one, the inner one "shadows" (hides) the outer one, just for that inner scope:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">shadowing.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> color = <span class="tok-string">"blue"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">printColor</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> color = <span class="tok-string">"red"</span>; <span class="tok-comment">// shadows the outer "color"</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(color); <span class="tok-comment">// "red"</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">printColor</span>();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(color); <span class="tok-comment">// "blue" — the outer variable is untouched</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`outer()\` containing a nested \`inner()\` function that logs a variable declared in \`outer()\` — confirm it works, then try logging a variable declared inside \`inner()\` from \`outer()\` and see the error.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JavaScript looks up variables through the scope chain, searching outward through enclosing scopes — and an inner variable with the same name shadows the outer one without changing it.</p>
</div>`
            },
            {
                title: "What Is a Closure?",
                slug: "what-is-a-closure",
                order: 3,
                content: `## What Is a Closure?

A closure happens when a function "remembers" the variables from the scope it was created in, even after that outer scope has finished running. It sounds abstract at first, but it's one of the most practical patterns in JavaScript.

**A basic closure**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-closure.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">makeGreeter</span>(greeting) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">function</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(greeting + <span class="tok-string">", "</span> + name + <span class="tok-string">"!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;};</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> sayHello = <span class="tok-call">makeGreeter</span>(<span class="tok-string">"Hello"</span>);</div>
    <div class="snippet-line">sayHello(<span class="tok-string">"Wale"</span>); <span class="tok-comment">// "Hello, Wale!"</span></div>
  </div>
</div>

By the time \`sayHello("Wale")\` runs, \`makeGreeter()\` has already finished executing — yet the returned function still remembers \`greeting\`. That's a closure: the inner function *closed over* the variable from its birth scope.

**Closures for private state**

A common real use is creating variables that can only be changed through specific functions — a lightweight form of privacy:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">closure-counter.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">createCounter</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> count = 0;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> count;</div>
    <div class="snippet-line">&nbsp;&nbsp;};</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> increment = <span class="tok-call">createCounter</span>();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(increment()); <span class="tok-comment">// 1</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(increment()); <span class="tok-comment">// 2</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(increment()); <span class="tok-comment">// 3</span></div>
  </div>
</div>

There's no other way to reach \`count\` from outside — it's only reachable, and only changeable, through the function returned by \`createCounter()\`.

**Each closure gets its own memory**

Calling \`createCounter()\` again creates a completely separate \`count\`, independent from the first:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">independent-closures.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> counterA = <span class="tok-call">createCounter</span>();</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> counterB = <span class="tok-call">createCounter</span>();</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(counterA()); <span class="tok-comment">// 1</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(counterA()); <span class="tok-comment">// 2</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(counterB()); <span class="tok-comment">// 1 — a totally separate count</span></div>
  </div>
</div>

> 💡 **Try it:** Write \`createCounter()\` from scratch on your own, without looking, then test it with two independent counters.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A closure is a function that remembers the variables from where it was created, even after that outer function has finished — a common way to create private, protected state.</p>
</div>`
            },
            {
                title: "Practical Uses of Closures",
                slug: "practical-uses-of-closures",
                order: 4,
                content: `## Practical Uses of Closures

Closures aren't just a theoretical concept — they quietly power several patterns you'll use often once you start building real features, from function factories to avoiding messy global variables.

**Function factories**

A closure can generate customized functions on demand:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">function-factory.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">multiplyBy</span>(factor) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">function</span>(num) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> num * factor;</div>
    <div class="snippet-line">&nbsp;&nbsp;};</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> double = <span class="tok-call">multiplyBy</span>(2);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> triple = <span class="tok-call">multiplyBy</span>(3);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(double(5)); <span class="tok-comment">// 10</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(triple(5)); <span class="tok-comment">// 15</span></div>
  </div>
</div>

**Avoiding globals in event handlers**

Closures let a button's click handler carry its own dedicated state, rather than relying on a shared global variable that every button would fight over:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">closure-in-handler.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">setupLikeButton</span>(button) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">let</span> likes = 0;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;button.addEventListener(<span class="tok-string">"click"</span>, <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;likes++;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Likes: "</span> + likes);</div>
    <div class="snippet-line">&nbsp;&nbsp;});</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Every button passed into \`setupLikeButton()\` gets its own private \`likes\` counter, isolated from every other button on the page.

**A subtle trap: closures in loops**

This connects back to the \`var\`/\`let\` loop bug from Topic 2 — it's actually a closure problem in disguise. Every \`setTimeout\` callback is a closure, and with \`var\`, they all end up sharing the same variable instead of each capturing its own:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">closures-loop-trap.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// ❌ var — all closures share one "i"</span></div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">var</span> i = 0; i &lt; 3; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => <span class="tok-call">console.log</span>(<span class="tok-string">"var:"</span>, i), 0);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// ✅ let — each closure gets its own "i"</span></div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">let</span> j = 0; j &lt; 3; j++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => <span class="tok-call">console.log</span>(<span class="tok-string">"let:"</span>, j), 0);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Write a \`createBankAccount(startingBalance)\` closure that returns \`deposit(amount)\` and \`getBalance()\` functions sharing one private \`balance\` variable.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Closures power function factories and per-instance private state in event handlers — and the classic <code>var</code>-in-a-loop bug is really a closure sharing one variable across every callback.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Error Handling",
        slug: "js-error-handling",
        order: 8,
        topics: [
            {
                title: "What Happens When Code Throws an Error",
                slug: "what-happens-when-code-throws-an-error",
                order: 0,
                content: `## What Happens When Code Throws an Error

When something goes wrong in JavaScript — like calling a function on \`undefined\`, or referencing a variable that doesn't exist — the engine "throws" an error. Left unhandled, this stops your script dead in its tracks.

**An unhandled error**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">unhandled-error.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Start"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.name); <span class="tok-comment">// — ReferenceError: user is not defined</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"End"</span>); <span class="tok-comment">// this line never runs</span></div>
  </div>
</div>

Once the error hits, execution stops completely — \`"End"\` never gets logged. In a browser, the rest of your script simply fails silently unless you're watching the console.

**Common built-in error types**

| Error type | Happens when... |
|------------|-------------------|
| \`ReferenceError\` | You use a variable that doesn't exist |
| \`TypeError\` | You use a value in a way its type doesn't allow (e.g. calling a non-function) |
| \`SyntaxError\` | Your code isn't valid JavaScript |
| \`RangeError\` | A number is outside an allowed range |

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">error-types.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> greeting = <span class="tok-keyword">null</span>;</div>
    <div class="snippet-line">greeting(); <span class="tok-comment">// — TypeError: greeting is not a function</span></div>
  </div>
</div>

**Reading an error message**

Error messages are made to be read, not feared — they usually tell you the error type, a description, and where in your file it happened. Getting comfortable reading them is one of the fastest ways to level up as a beginner.

> 💡 **Try it:** In your browser console, type \`null.toUpperCase()\` and read the exact error message it produces.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">An unhandled error stops script execution immediately — learning to read error types like <code>TypeError</code> and <code>ReferenceError</code> makes debugging far faster.</p>
</div>`
            },
            {
                title: "try...catch",
                slug: "try-catch",
                order: 1,
                content: `## try...catch

\`try...catch\` lets you attempt code that might fail, and handle the failure gracefully instead of letting it crash your whole script.

**Basic syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">try-catch.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(user.name); <span class="tok-comment">// this throws</span></div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Something went wrong: "</span> + error.message);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Program continues!"</span>); <span class="tok-comment">// this still runs</span></div>
  </div>
</div>

Code inside \`try { }\` runs normally. If it throws an error, execution immediately jumps to \`catch { }\`, where \`error\` holds the details — and critically, the rest of the program keeps going.

**Accessing error details**

The caught \`error\` object has useful properties, most commonly \`.message\` and \`.name\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">error-details.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">null</span>.toUpperCase();</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(error.name);    <span class="tok-comment">// "TypeError"</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(error.message); <span class="tok-comment">// description of what went wrong</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**The \`finally\` block**

\`finally\` runs after \`try\`/\`catch\`, whether an error happened or not — useful for cleanup code that always needs to run:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">finally-block.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Trying..."</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Oops"</span>);</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Caught: "</span> + error.message);</div>
    <div class="snippet-line">} <span class="tok-keyword">finally</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"This always runs"</span>);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Wrap \`JSON.parse("this is not valid JSON")\` in a \`try...catch\` and log a friendly error message instead of letting it crash.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>try...catch</code> lets your program recover from an error instead of crashing, and an optional <code>finally</code> block always runs regardless of whether an error occurred.</p>
</div>`
            },
            {
                title: "Throwing Your Own Errors",
                slug: "throwing-your-own-errors",
                order: 2,
                content: `## Throwing Your Own Errors

You're not limited to catching errors JavaScript generates automatically — you can deliberately \`throw\` your own, to signal that something in *your* logic has gone wrong.

**Using \`throw\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">throw-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">divide</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (b === 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Cannot divide by zero"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a / b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">divide</span>(10, 0); <span class="tok-comment">// — Error: Cannot divide by zero</span></div>
  </div>
</div>

\`throw new Error("message")\` is the standard way to create and throw an error object in one step. Anywhere this function is called, wrapping the call in \`try...catch\` lets the caller handle the failure instead of crashing.

**Catching a custom throw**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">catch-custom-throw.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">divide</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (b === 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Cannot divide by zero"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a / b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">divide</span>(10, 0);</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Validation failed: "</span> + error.message);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Validating input early**

Throwing errors is especially useful for validating function inputs — catching bad data immediately, rather than letting it silently produce wrong results further down the line:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">validate-input.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">setAge</span>(age) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (age &lt; 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Age cannot be negative"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> age;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Write a function \`withdraw(balance, amount)\` that throws an error if \`amount\` is greater than \`balance\`, then call it inside a \`try...catch\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>throw new Error("message")</code> lets you signal your own failures deliberately — commonly used to validate function inputs before bad data can cause problems later.</p>
</div>`
            },
            {
                title: "Errors in Asynchronous Code",
                slug: "errors-in-asynchronous-code",
                order: 3,
                content: `## Errors in Asynchronous Code

Errors thrown inside asynchronous code — like a network request — don't behave the same way as errors in regular, synchronous code. A regular \`try...catch\` around an async call often won't catch what you expect unless you handle it correctly.

**The problem with \`setTimeout\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">async-error-problem.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Delayed failure"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}, 100);</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"This never runs!"</span>);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// the thrown error crashes instead — try/catch already finished</span></div>
  </div>
</div>

By the time the \`setTimeout\` callback runs and throws, the surrounding \`try...catch\` has already completed — it has nothing left to catch.

**Handling errors with Promises**

Promises (covered fully in the next chapter) use \`.catch()\` instead of \`try...catch\` for this reason:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">promise-catch.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">fetch(<span class="tok-string">"/api/user"</span>)</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(response => response.json())</div>
    <div class="snippet-line">&nbsp;&nbsp;.catch(error => {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Request failed: "</span> + error.message);</div>
    <div class="snippet-line">&nbsp;&nbsp;});</div>
  </div>
</div>

**\`try...catch\` works fine with \`async\`/\`await\`**

With \`async\`/\`await\` syntax, \`try...catch\` works as expected again, because \`await\` pauses execution until the asynchronous work resolves:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">async-await-try-catch.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">loadUser</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">const</span> response = <span class="tok-keyword">await</span> fetch(<span class="tok-string">"/api/user"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">const</span> data = <span class="tok-keyword">await</span> response.json();</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(data);</div>
    <div class="snippet-line">&nbsp;&nbsp;} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Failed to load user: "</span> + error.message);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Note this down for now — you'll write your own \`async\`/\`await\` \`try...catch\` block once you reach the Asynchronous JavaScript chapter.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A regular <code>try...catch</code> can't catch errors from callbacks like <code>setTimeout</code> — use <code>.catch()</code> with Promises, or <code>try...catch</code> combined with <code>async</code>/<code>await</code> instead.</p>
</div>`
            },
            {
                title: "Writing Defensive, Reliable Code",
                slug: "writing-defensive-reliable-code",
                order: 4,
                content: `## Writing Defensive, Reliable Code

Good error handling isn't just about reacting to failures — it's also about writing code that anticipates likely problems before they happen, so your program degrades gracefully instead of breaking outright.

**Checking before you use a value**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">defensive-check.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">printUsername</span>(user) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (!user) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"No user provided"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(user.name);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">printUsername</span>(<span class="tok-keyword">null</span>); <span class="tok-comment">// "No user provided" — handled, not crashed</span></div>
  </div>
</div>

**Optional chaining (\`?.\`)**

Optional chaining safely accesses nested properties, returning \`undefined\` instead of throwing if something along the chain is missing:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">optional-chaining.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = { name: <span class="tok-string">"Tariq"</span> };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.address.city);  <span class="tok-comment">// — TypeError: address is undefined</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.address?.city); <span class="tok-comment">// undefined — no error, just a safe result</span></div>
  </div>
</div>

**The nullish coalescing operator (\`??\`)**

\`??\` provides a fallback value only when the left side is \`null\` or \`undefined\` — a more precise alternative to \`||\` for this specific case:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nullish-coalescing.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = { name: <span class="tok-string">"Tariq"</span> };</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> city = user.address?.city ?? <span class="tok-string">"Unknown"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(city); <span class="tok-comment">// "Unknown"</span></div>
  </div>
</div>

Combined, \`?.\` and \`??\` are a common, concise pattern for safely reading nested data with a sensible fallback — without needing a full \`try...catch\` for every property access.

> 💡 **Try it:** Given \`const config = {};\`, use \`config.settings?.theme ?? "light"\` to safely get a theme value, and confirm it falls back correctly.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Defensive code checks for missing values before using them — optional chaining (<code>?.</code>) and nullish coalescing (<code>??</code>) make this safe and concise without needing <code>try...catch</code> everywhere.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "Asynchronous JavaScript",
        slug: "js-async",
        order: 9,
        topics: [
            {
                title: "Synchronous vs Asynchronous Code",
                slug: "synchronous-vs-asynchronous-code",
                order: 0,
                content: `## Synchronous vs Asynchronous Code

JavaScript runs one line at a time, in order — that's **synchronous** execution. But some tasks, like waiting for a network response or a timer, would freeze your entire page if the browser had to sit and wait for them. **Asynchronous** code solves this by letting slow tasks run in the background.

**Synchronous code runs in order**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">synchronous.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"First"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Second"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Third"</span>);</div>
    <div class="snippet-line"><span class="tok-comment">// prints "First", "Second", "Third" — always in that order</span></div>
  </div>
</div>

**Asynchronous code doesn't wait**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">asynchronous.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"First"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">setTimeout(() => {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Second (delayed)"</span>);</div>
    <div class="snippet-line">}, 1000);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"Third"</span>);</div>
    <div class="snippet-line"><span class="tok-comment">// prints "First", "Third", then "Second (delayed)" a second later</span></div>
  </div>
</div>

Notice \`"Third"\` logs *before* \`"Second (delayed)"\`, even though it appears later in the code. \`setTimeout\` hands its callback off to run later, and JavaScript immediately moves on to the next line rather than waiting.

**Why this matters**

If JavaScript paused on every slow operation — loading data, waiting on a timer — the entire page would freeze until it finished: no scrolling, no clicking, nothing. Asynchronous code keeps the page responsive while slow tasks happen in the background.

> 💡 **Try it:** Add three \`console.log()\` calls with a \`setTimeout\` in the middle, and predict the print order before running it.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Synchronous code runs top to bottom in order, but asynchronous code like <code>setTimeout</code> lets slow tasks run in the background so the rest of your program isn't blocked.</p>
</div>`
            },
            {
                title: "Callbacks",
                slug: "callbacks",
                order: 1,
                content: `## Callbacks

A callback is simply a function passed into another function, to be called later — often once some asynchronous work finishes. You've already used them with \`setTimeout()\` and \`addEventListener()\`; this topic makes the pattern explicit.

**A basic callback**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-callback.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">greet</span>(name, callback) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Hello, "</span> + name);</div>
    <div class="snippet-line">&nbsp;&nbsp;callback();</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">greet</span>(<span class="tok-string">"Sade"</span>, <span class="tok-keyword">function</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Greeting complete!"</span>);</div>
    <div class="snippet-line">});</div>
  </div>
</div>

Here, \`callback\` is just a regular parameter — it happens to hold a function, which \`greet()\` calls once it's done with its own work.

**Simulating a delayed task**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">delayed-callback.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">fetchData</span>(callback) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;callback(<span class="tok-string">"Data loaded!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}, 1000);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">fetchData</span>(<span class="tok-keyword">function</span>(result) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(result); <span class="tok-comment">// "Data loaded!" — after a 1 second delay</span></div>
    <div class="snippet-line">});</div>
  </div>
</div>

**Callback hell**

Chaining multiple callbacks — each nested inside the previous one's callback — quickly becomes hard to read and maintain. This pattern is known, somewhat infamously, as "callback hell":

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">callback-hell.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-call">fetchData</span>(<span class="tok-keyword">function</span>(a) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">fetchMoreData</span>(a, <span class="tok-keyword">function</span>(b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">fetchEvenMoreData</span>(b, <span class="tok-keyword">function</span>(c) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(c); <span class="tok-comment">// deeply nested and hard to follow</span></div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;});</div>
    <div class="snippet-line">&nbsp;&nbsp;});</div>
    <div class="snippet-line">});</div>
  </div>
</div>

Promises, covered next, were designed specifically to solve this problem.

> 💡 **Try it:** Write a function \`processOrder(callback)\` that uses \`setTimeout\` to call \`callback("Order shipped!")\` after 2 seconds.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A callback is a function passed to run later — powerful, but nesting many of them creates hard-to-read "callback hell," which Promises were built to solve.</p>
</div>`
            },
            {
                title: "Promises",
                slug: "promises",
                order: 2,
                content: `## Promises

A Promise is an object representing a value that isn't available yet, but will be at some point — either successfully (**resolved**) or unsuccessfully (**rejected**). Promises give asynchronous code a cleaner structure than nested callbacks.

**The three states of a Promise**

| State | Meaning |
|-------|---------|
| Pending | Still waiting, not resolved or rejected yet |
| Fulfilled | Completed successfully |
| Rejected | Failed with an error |

**Creating a Promise**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-promise.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> orderPizza = <span class="tok-keyword">new</span> Promise(<span class="tok-keyword">function</span>(resolve, reject) {</div>
    <div class="snippet-line">&nbsp;&nbsp;setTimeout(() => {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">const</span> success = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> (success) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(<span class="tok-string">"Pizza is ready!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;} <span class="tok-keyword">else</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reject(<span class="tok-string">"Oven broke down"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;}, 2000);</div>
    <div class="snippet-line">});</div>
  </div>
</div>

You won't usually create Promises this way yourself — most of the time you'll receive one from a built-in function like \`fetch()\`. But understanding \`resolve\`/\`reject\` explains what's happening underneath.

**Using \`.then()\` and \`.catch()\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">then-catch.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">orderPizza</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(result => <span class="tok-call">console.log</span>(result))   <span class="tok-comment">// runs if resolved</span></div>
    <div class="snippet-line">&nbsp;&nbsp;.catch(error => <span class="tok-call">console.log</span>(error)); <span class="tok-comment">// runs if rejected</span></div>
  </div>
</div>

**Chaining Promises**

The real advantage over callbacks: chained \`.then()\` calls read top-to-bottom instead of nesting deeper and deeper:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">chaining-promises.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">fetchUser()</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(user => fetchOrders(user))</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(orders => <span class="tok-call">console.log</span>(orders))</div>
    <div class="snippet-line">&nbsp;&nbsp;.catch(error => <span class="tok-call">console.log</span>(<span class="tok-string">"Something failed: "</span> + error));</div>
  </div>
</div>

> 💡 **Try it:** Write a Promise that resolves with \`"Login successful"\` after 1 second, then log the result using \`.then()\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A Promise represents a future value that's pending, fulfilled, or rejected — <code>.then()</code> handles success and <code>.catch()</code> handles failure, and chains read top-to-bottom instead of nesting.</p>
</div>`
            },
            {
                title: "async/await",
                slug: "async-await",
                order: 3,
                content: `## async/await

\`async\`/\`await\` is modern syntax built on top of Promises, letting you write asynchronous code that *looks* synchronous — no \`.then()\` chains required.

**Marking a function \`async\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">async-function.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">greetLater</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-string">"Hello!"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">greetLater().then(result => <span class="tok-call">console.log</span>(result)); <span class="tok-comment">// "Hello!"</span></div>
  </div>
</div>

Adding \`async\` to a function automatically makes it return a Promise — even though it looks like a plain \`return\`, the value gets wrapped for you.

**Using \`await\`**

Inside an \`async\` function, \`await\` pauses execution until a Promise resolves, then gives you the resolved value directly:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">await-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">orderFood</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">const</span> result = <span class="tok-keyword">await</span> orderPizza;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(result); <span class="tok-comment">// "Pizza is ready!" — waits for the Promise to resolve</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Comparing \`.then()\` chains to \`async\`/\`await\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">then-vs-await.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// Using .then() chains</span></div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">loadDashboard</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;fetchUser()</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;.then(user => fetchOrders(user))</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;.then(orders => <span class="tok-call">console.log</span>(orders));</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Using async/await — reads top to bottom</span></div>
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">loadDashboard</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">const</span> user = <span class="tok-keyword">await</span> fetchUser();</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">const</span> orders = <span class="tok-keyword">await</span> fetchOrders(user);</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(orders);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Both versions do exactly the same thing — \`async\`/\`await\` just reads more like ordinary, step-by-step code, which is why it's the preferred style in most modern JavaScript.

> 💡 **Try it:** Rewrite a \`.then()\` chain of your choice from Topic 3 using \`async\`/\`await\` instead.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>async</code>/<code>await</code> is built on Promises but reads like ordinary synchronous code — <code>await</code> pauses until a Promise resolves and hands back the value directly.</p>
</div>`
            },
            {
                title: "Fetching Real Data with fetch()",
                slug: "fetching-real-data-with-fetch",
                order: 4,
                content: `## Fetching Real Data with fetch()

\`fetch()\` is the browser's built-in way to make network requests — asking a server for data (or sending data to it) without reloading the page. It's the most common real-world use of everything covered in this chapter.

**A basic GET request**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fetch-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">fetch(<span class="tok-string">"https://api.example.com/users"</span>)</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(response => response.json())</div>
    <div class="snippet-line">&nbsp;&nbsp;.then(data => <span class="tok-call">console.log</span>(data))</div>
    <div class="snippet-line">&nbsp;&nbsp;.catch(error => <span class="tok-call">console.log</span>(<span class="tok-string">"Request failed: "</span> + error));</div>
  </div>
</div>

\`fetch()\` returns a Promise that resolves to a \`Response\` object — \`.json()\` then unpacks the actual data out of that response, which is itself asynchronous, hence the second \`.then()\`.

**The same request with \`async\`/\`await\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fetch-async-await.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">getUsers</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">const</span> response = <span class="tok-keyword">await</span> fetch(<span class="tok-string">"https://api.example.com/users"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">const</span> data = <span class="tok-keyword">await</span> response.json();</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(data);</div>
    <div class="snippet-line">&nbsp;&nbsp;} <span class="tok-keyword">catch</span> (error) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-string">"Request failed: "</span> + error.message);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Sending data with a POST request**

\`fetch()\` also accepts a second argument for configuring the request — method, headers, and a body for sending data:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fetch-post.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">async</span> <span class="tok-keyword">function</span> <span class="tok-call">createUser</span>(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">const</span> response = <span class="tok-keyword">await</span> fetch(<span class="tok-string">"https://api.example.com/users"</span>, {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;method: <span class="tok-string">"POST"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;headers: { <span class="tok-string">"Content-Type"</span>: <span class="tok-string">"application/json"</span> },</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;body: JSON.stringify({ name: name })</div>
    <div class="snippet-line">&nbsp;&nbsp;});</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">await</span> response.json();</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Use \`fetch("https://jsonplaceholder.typicode.com/todos/1")\` with \`async\`/\`await\` inside a \`try...catch\`, and log the result to your console.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>fetch()</code> makes network requests and returns a Promise — pair it with <code>async</code>/<code>await</code> and <code>try...catch</code> for the cleanest, most readable way to load real data.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Classes & OOP",
        slug: "js-classes-oop",
        order: 10,
        topics: [
            {
                title: "Introduction to Object-Oriented Programming",
                slug: "introduction-to-object-oriented-programming",
                order: 0,
                content: `## Introduction to Object-Oriented Programming

Object-oriented programming (OOP) is a style of writing code that groups related data and behavior together into reusable "blueprints" called classes. You've already been using OOP concepts without the formal name — every object with methods you've built so far follows this idea.

**Objects vs. classes**

An object (from earlier chapters) is one specific "thing." A class is a *template* for creating many objects that share the same shape:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">object-vs-class.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// A single object, built by hand</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> user1 = { name: <span class="tok-string">"Tola"</span>, age: 27 };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// A class is a template for making many similar objects</span></div>
    <div class="snippet-line"><span class="tok-comment">// (covered fully in the next topic)</span></div>
  </div>
</div>

**Why OOP matters**

Without classes, creating many similar objects means repeating the same structure over and over. Classes let you define that structure once, then stamp out as many objects from it as you need — each with its own data, but shared behavior.

**Core OOP concepts you'll cover in this chapter**

| Concept | What it means |
|---------|----------------|
| Class | A blueprint for creating objects |
| Instance | One object created from a class |
| Constructor | Sets up a new instance's initial data |
| Inheritance | One class building on another |

> 💡 **Try it:** Think of three real-world "things" (like \`Car\`, \`Book\`, \`Player\`) that would make sense as classes — what data and behavior would each need?

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A class is a reusable blueprint for creating objects that share the same structure and behavior, instead of building each object by hand.</p>
</div>`
            },
            {
                title: "Defining a Class",
                slug: "defining-a-class",
                order: 1,
                content: `## Defining a Class

JavaScript's \`class\` syntax gives you a clean, dedicated way to define a blueprint — including how new objects get set up and what methods they share.

**Basic class syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-class.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Dog</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(name, breed) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.name = name;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.breed = breed;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;bark() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-keyword">this</span>.name + <span class="tok-string">" says Woof!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

The \`constructor\` is a special method that runs automatically whenever a new object is created from the class — it's where you set up the object's initial properties using the values passed in.

**Creating instances with \`new\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-instance.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> myDog = <span class="tok-keyword">new</span> Dog(<span class="tok-string">"Rex"</span>, <span class="tok-string">"Labrador"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(myDog.name);  <span class="tok-comment">// "Rex"</span></div>
    <div class="snippet-line">myDog.bark();          <span class="tok-comment">// "Rex says Woof!"</span></div>
  </div>
</div>

The \`new\` keyword creates a fresh **instance** of the class — an actual object built from the blueprint. Each instance has its own separate \`name\` and \`breed\`, even though they share the same \`bark()\` method.

**Multiple instances**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multiple-instances.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> dog1 = <span class="tok-keyword">new</span> Dog(<span class="tok-string">"Rex"</span>, <span class="tok-string">"Labrador"</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> dog2 = <span class="tok-keyword">new</span> Dog(<span class="tok-string">"Milo"</span>, <span class="tok-string">"Poodle"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">dog1.bark(); <span class="tok-comment">// "Rex says Woof!"</span></div>
    <div class="snippet-line">dog2.bark(); <span class="tok-comment">// "Milo says Woof!"</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`Book\` class with a \`title\` and \`author\` in its constructor, and a \`describe()\` method that logs \`"[title] by [author]"\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A class defines a <code>constructor</code> to set up new objects and shared methods; <code>new ClassName()</code> creates an independent instance from that blueprint.</p>
</div>`
            },
            {
                title: "Inheritance with extends",
                slug: "inheritance-with-extends",
                order: 2,
                content: `## Inheritance with extends

Inheritance lets one class build on another, reusing its properties and methods while adding or overriding what's specific to the new class. It's how you model "is a kind of" relationships — a \`Puppy\` is a kind of \`Dog\`.

**Extending a class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">extends-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Animal</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.name = name;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;eat() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-keyword">this</span>.name + <span class="tok-string">" is eating"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span> <span class="tok-keyword">extends</span> Animal {</div>
    <div class="snippet-line">&nbsp;&nbsp;meow() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-keyword">this</span>.name + <span class="tok-string">" says Meow!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> myCat = <span class="tok-keyword">new</span> Cat(<span class="tok-string">"Whiskers"</span>);</div>
    <div class="snippet-line">myCat.eat();  <span class="tok-comment">// "Whiskers is eating" — inherited from Animal</span></div>
    <div class="snippet-line">myCat.meow(); <span class="tok-comment">// "Whiskers says Meow!" — defined on Cat</span></div>
  </div>
</div>

\`Cat extends Animal\` means every \`Cat\` instance automatically gets everything \`Animal\` has (\`name\`, \`eat()\`), plus whatever's added directly on \`Cat\` (\`meow()\`).

**Using \`super()\` in the constructor**

If a child class needs its own constructor, it must call \`super()\` first — this runs the parent class's constructor before adding anything extra:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">super-constructor.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span> <span class="tok-keyword">extends</span> Animal {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(name, color) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">super</span>(name); <span class="tok-comment">// runs Animal's constructor first</span></div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.color = color;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> myCat = <span class="tok-keyword">new</span> Cat(<span class="tok-string">"Whiskers"</span>, <span class="tok-string">"black"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(myCat.name, myCat.color); <span class="tok-comment">// "Whiskers" "black"</span></div>
  </div>
</div>

**Overriding a method**

A child class can redefine a method it inherits, replacing the parent's version entirely:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">override-method.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span> <span class="tok-keyword">extends</span> Animal {</div>
    <div class="snippet-line">&nbsp;&nbsp;eat() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-call">console.log</span>(<span class="tok-keyword">this</span>.name + <span class="tok-string">" eats fish"</span>); <span class="tok-comment">// overrides Animal's eat()</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Create a \`Vehicle\` class with a \`honk()\` method, then a \`Car\` class that \`extends\` it and adds its own \`openTrunk()\` method.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>extends</code> lets a class inherit properties and methods from another, and <code>super()</code> calls the parent's constructor — a child class can also override any inherited method.</p>
</div>`
            },
            {
                title: "Getters, Setters & Private Fields",
                slug: "getters-setters-private-fields",
                order: 3,
                content: `## Getters, Setters & Private Fields

Beyond basic properties and methods, classes support a few more tools for controlling how data is read, written, and protected from outside interference.

**Getters**

A getter lets you access a computed value using property syntax, rather than calling it like a method:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">getter.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Rectangle</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(width, height) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.width = width;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.height = height;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;get area() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">this</span>.width * <span class="tok-keyword">this</span>.height;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> rect = <span class="tok-keyword">new</span> Rectangle(4, 5);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(rect.area); <span class="tok-comment">// 20 — no parentheses, it's accessed like a property</span></div>
  </div>
</div>

**Setters**

A setter lets you run custom logic whenever a property is assigned — useful for validation:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">setter.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Account</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(balance) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>._balance = balance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;set balance(amount) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> (amount &lt; 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> Error(<span class="tok-string">"Balance can't be negative"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>._balance = amount;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Private fields with \`#\`**

A property name starting with \`#\` is truly private — only accessible from inside the class itself, not from outside code:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">private-fields.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">BankAccount</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;#balance = 0; <span class="tok-comment">// private — not reachable outside this class</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;deposit(amount) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.#balance += amount;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;getBalance() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-keyword">this</span>.#balance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> account = <span class="tok-keyword">new</span> BankAccount();</div>
    <div class="snippet-line">account.deposit(100);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(account.getBalance()); <span class="tok-comment">// 100</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(account.#balance);      <span class="tok-comment">// — SyntaxError — can't reach it from outside</span></div>
  </div>
</div>

> 💡 **Try it:** Add a \`#temperature\` private field to a \`Thermostat\` class, with a \`setTemp()\` method that rejects values below \`-20\` or above \`40\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Getters/setters let you run logic behind normal property syntax, and <code>#</code>-prefixed fields are truly private — only accessible from inside the class itself.</p>
</div>`
            },
            {
                title: "Static Methods & Real-World Class Design",
                slug: "static-methods-real-world-class-design",
                order: 4,
                content: `## Static Methods & Real-World Class Design

Static methods belong to the class itself rather than to any individual instance — useful for utility functions related to the class that don't need a specific object's data.

**Defining a static method**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">static-method.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">MathHelper</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">static</span> square(n) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> n * n;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(MathHelper.square(5)); <span class="tok-comment">// 25 — called on the class, not an instance</span></div>
  </div>
</div>

Unlike regular methods, you never need \`new MathHelper()\` to use \`square()\` — it's called directly on the class.

**A realistic class example**

Bringing several ideas from this chapter together — constructor, methods, and a static helper:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">realistic-class.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Task</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(title) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.title = title;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.completed = <span class="tok-keyword">false</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;complete() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.completed = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">static</span> fromTitleList(titles) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> titles.map(title => <span class="tok-keyword">new</span> Task(title));</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> tasks = Task.fromTitleList([<span class="tok-string">"Buy milk"</span>, <span class="tok-string">"Walk dog"</span>]);</div>
    <div class="snippet-line">tasks[0].complete();</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(tasks[0]); <span class="tok-comment">// Task { title: "Buy milk", completed: true }</span></div>
  </div>
</div>

**When to reach for a class**

Classes shine when you have many objects sharing the same shape and behavior — users, products, tasks. For a handful of one-off objects, a plain object literal (from earlier chapters) is often simpler and perfectly fine.

> 💡 **Try it:** Add a static method \`Task.completedCount(tasks)\` that returns how many tasks in an array have \`completed === true\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Static methods belong to the class itself, not individual instances — useful for utility or factory functions related to the class as a whole.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "Modern JS Features",
        slug: "modern-js-features",
        order: 11,
        topics: [
            {
                title: "Template Literals",
                slug: "template-literals",
                order: 0,
                content: `## Template Literals

Template literals are strings written with backticks (\`\` \` \`\`) instead of quotes, offering two big upgrades over regular strings: embedding variables directly, and writing multi-line text without extra symbols.

**String interpolation**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">template-literal-basic.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> name = <span class="tok-string">"Chidinma"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> age = 24;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Old way — string concatenation</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">"My name is "</span> + name + <span class="tok-string">" and I am "</span> + age);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Template literal — cleaner, using \${ }</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">\`My name is \${name} and I am \${age}\`</span>);</div>
  </div>
</div>

Anything inside \`\${ }\` is evaluated as JavaScript and inserted into the string — variables, math, even function calls.

**Expressions inside \`\${ }\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">template-expressions.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> price = 20;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> quantity = 3;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-string">\`Total: $\${price * quantity}\`</span>); <span class="tok-comment">// "Total: $60"</span></div>
  </div>
</div>

**Multi-line strings**

Regular strings can't span multiple lines without awkward \`\\n\` characters. Template literals handle this naturally:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multiline-template.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> message = <span class="tok-string">\`Hello,</span></div>
    <div class="snippet-line"><span class="tok-string">This spans</span></div>
    <div class="snippet-line"><span class="tok-string">multiple lines.\`</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(message);</div>
  </div>
</div>

> 💡 **Try it:** Given \`const item = "notebook"; const cost = 4.5;\`, write a template literal that logs \`"1 notebook costs $4.5"\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Template literals (backtick strings) let you embed variables and expressions directly with <code>\${ }</code>, and support multi-line text without special characters.</p>
</div>`
            },
            {
                title: "The Spread Operator",
                slug: "the-spread-operator",
                order: 1,
                content: `## The Spread Operator

The spread operator (\`...\`) expands an array or object into its individual elements. It shows up constantly in modern JavaScript — for copying, combining, and passing data around.

**Spreading arrays**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">spread-arrays.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> moreFruits = [...fruits, <span class="tok-string">"mango"</span>, <span class="tok-string">"kiwi"</span>];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(moreFruits); <span class="tok-comment">// ["apple", "banana", "mango", "kiwi"]</span></div>
  </div>
</div>

**Copying an array**

Spreading into a new array creates a genuine copy, rather than a reference to the original — changing the copy won't affect the source:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">copy-array.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> original = [1, 2, 3];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> copy = [...original];</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">copy.push(4);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(original); <span class="tok-comment">// [1, 2, 3] — untouched</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(copy);     <span class="tok-comment">// [1, 2, 3, 4]</span></div>
  </div>
</div>

**Spreading objects**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">spread-objects.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = { name: <span class="tok-string">"Kofi"</span>, age: 30 };</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> updatedUser = { ...user, age: 31 };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(updatedUser); <span class="tok-comment">// { name: "Kofi", age: 31 }</span></div>
  </div>
</div>

This pattern — spread the original, then override specific properties — is extremely common for updating data without mutating the original object.

**Spreading into function arguments**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">spread-function-args.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">addThree</span>(a, b, c) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b + c;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> nums = [1, 2, 3];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">addThree</span>(...nums)); <span class="tok-comment">// 6 — spread as separate arguments</span></div>
  </div>
</div>

> 💡 **Try it:** Given \`const a = [1, 2]; const b = [3, 4];\`, use spread to combine them into a single array \`[1, 2, 3, 4]\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">The spread operator (<code>...</code>) expands arrays or objects into individual elements — commonly used to copy, merge, or update data without mutating the original.</p>
</div>`
            },
            {
                title: "The Rest Parameter",
                slug: "the-rest-parameter",
                order: 2,
                content: `## The Rest Parameter

The rest parameter uses the same \`...\` syntax as spread, but does the opposite job: it *gathers* multiple arguments into a single array, instead of expanding one.

**Collecting arguments with rest**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">rest-parameter.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">sumAll</span>(...numbers) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> numbers.reduce((total, n) => total + n, 0);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">sumAll</span>(1, 2, 3));       <span class="tok-comment">// 6</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">sumAll</span>(1, 2, 3, 4, 5)); <span class="tok-comment">// 15 — works with any number of arguments</span></div>
  </div>
</div>

Inside \`sumAll\`, \`numbers\` is a real array containing every argument passed in, no matter how many there are.

**Rest with regular parameters**

Rest must come *last* in the parameter list — it scoops up everything remaining after the named parameters:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">rest-with-params.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">introduce</span>(name, ...hobbies) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">console.log</span>(name + <span class="tok-string">"'s hobbies: "</span> + hobbies.join(<span class="tok-string">", "</span>));</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">introduce</span>(<span class="tok-string">"Nadia"</span>, <span class="tok-string">"chess"</span>, <span class="tok-string">"painting"</span>, <span class="tok-string">"hiking"</span>);</div>
    <div class="snippet-line"><span class="tok-comment">// "Nadia's hobbies: chess, painting, hiking"</span></div>
  </div>
</div>

**Rest in destructuring**

Rest also works when destructuring arrays or objects, capturing whatever's "left over":

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">rest-destructuring.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> [first, ...rest] = [10, 20, 30, 40];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(first); <span class="tok-comment">// 10</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(rest);  <span class="tok-comment">// [20, 30, 40]</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`logAll(first, ...others)\` that logs the first argument separately, then logs how many "other" arguments followed.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">The rest parameter (<code>...args</code>) gathers multiple function arguments — or leftover destructured values — into a real array, always as the final parameter.</p>
</div>`
            },
            {
                title: "Sets and Maps",
                slug: "sets-and-maps",
                order: 3,
                content: `## Sets and Maps

\`Set\` and \`Map\` are built-in data structures that solve two common problems more naturally than plain arrays and objects: storing only unique values, and using any type of value as a key.

**Set — a collection of unique values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">set-basics.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> uniqueNumbers = <span class="tok-keyword">new</span> Set([1, 2, 2, 3, 3, 3]);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(uniqueNumbers); <span class="tok-comment">// Set { 1, 2, 3 } — duplicates removed automatically</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(uniqueNumbers.size); <span class="tok-comment">// 3</span></div>
  </div>
</div>

**Working with a \`Set\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">set-methods.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> tags = <span class="tok-keyword">new</span> Set();</div>
    <div class="snippet-line">tags.add(<span class="tok-string">"javascript"</span>);</div>
    <div class="snippet-line">tags.add(<span class="tok-string">"beginner"</span>);</div>
    <div class="snippet-line">tags.add(<span class="tok-string">"javascript"</span>); <span class="tok-comment">// ignored — already exists</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(tags.has(<span class="tok-string">"beginner"</span>)); <span class="tok-comment">// true</span></div>
    <div class="snippet-line">tags.delete(<span class="tok-string">"beginner"</span>);</div>
  </div>
</div>

A common real use: removing duplicates from an array by converting it to a \`Set\` and back with the spread operator:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dedupe-with-set.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> numbers = [1, 2, 2, 3, 3, 4];</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> unique = [...<span class="tok-keyword">new</span> Set(numbers)];</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(unique); <span class="tok-comment">// [1, 2, 3, 4]</span></div>
  </div>
</div>

**Map — key-value pairs with any key type**

A \`Map\` behaves like an object, but keys can be any type — not just strings — and it keeps insertion order reliably:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">map-basics.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> userRoles = <span class="tok-keyword">new</span> Map();</div>
    <div class="snippet-line">userRoles.set(<span class="tok-string">"Amina"</span>, <span class="tok-string">"admin"</span>);</div>
    <div class="snippet-line">userRoles.set(<span class="tok-string">"Kwame"</span>, <span class="tok-string">"editor"</span>);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(userRoles.get(<span class="tok-string">"Amina"</span>)); <span class="tok-comment">// "admin"</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(userRoles.size); <span class="tok-comment">// 2</span></div>
  </div>
</div>

> 💡 **Try it:** Use a \`Set\` to find out how many *unique* words are in \`"the cat sat on the mat the cat ran".split(" ")\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>Set</code> stores only unique values (great for deduplication), and <code>Map</code> stores key-value pairs with any key type — both are purpose-built alternatives to arrays and objects.</p>
</div>`
            },
            {
                title: "Ternary Chains, Optional Chaining & Shorthand Patterns",
                slug: "ternary-chains-optional-chaining-shorthand-patterns",
                order: 4,
                content: `## Ternary Chains, Optional Chaining & Shorthand Patterns

This final topic rounds up a handful of small, high-frequency patterns you'll see constantly in real JavaScript codebases — mostly about writing common logic more concisely.

**Object property shorthand**

When a variable name matches the property name you want, you can skip repeating it:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">property-shorthand.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> name = <span class="tok-string">"Yuki"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> age = 29;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Old way</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> user1 = { name: name, age: age };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// Shorthand — same result</span></div>
    <div class="snippet-line"><span class="tok-keyword">const</span> user2 = { name, age };</div>
  </div>
</div>

**Computed property names**

Square brackets in an object literal let you use a variable's *value* as the key itself:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">computed-property.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> field = <span class="tok-string">"email"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> user = {</div>
    <div class="snippet-line">&nbsp;&nbsp;[field]: <span class="tok-string">"yuki@example.com"</span></div>
    <div class="snippet-line">};</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.email); <span class="tok-comment">// "yuki@example.com"</span></div>
  </div>
</div>

**Array destructuring for swapping**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">destructure-swap.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">let</span> a = 1;</div>
    <div class="snippet-line"><span class="tok-keyword">let</span> b = 2;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">[a, b] = [b, a]; <span class="tok-comment">// swaps values without a temp variable</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(a, b); <span class="tok-comment">// 2 1</span></div>
  </div>
</div>

**Putting several patterns together**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">combined-patterns.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">createUser</span>(name, ...roles) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> { name, roles, id: <span class="tok-string">\`\${name.toLowerCase()}-\${roles.length}\`</span> };</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">createUser</span>(<span class="tok-string">"Sena"</span>, <span class="tok-string">"editor"</span>, <span class="tok-string">"reviewer"</span>));</div>
    <div class="snippet-line"><span class="tok-comment">// { name: "Sena", roles: ["editor", "reviewer"], id: "sena-2" }</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function that takes \`name\` and \`email\`, and returns an object using property shorthand for both.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Property shorthand, computed keys, and destructuring-based swaps are small syntax conveniences you'll see constantly — they don't add new logic, just less repetition.</p>
</div>`
            },
        ],
    },
    {
        language: "JavaScript",
        title: "JS Modules & JSON",
        slug: "js-modules-json",
        order: 12,
        topics: [
            {
                title: "Why Modules?",
                slug: "why-modules",
                order: 0,
                content: `## Why Modules?

As a JavaScript project grows, keeping every function and variable in one giant file becomes unmanageable. Modules let you split code across multiple files, each responsible for one clear piece of functionality, and connect them together with \`import\`/\`export\`.

**The problem modules solve**

Without modules, every \`<script>\` on a page shares one global scope — meaning a variable in one file can accidentally clash with a variable of the same name in another:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">global-collision.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// file1.js</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> total = 100;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// file2.js (loaded on the same page)</span></div>
    <div class="snippet-line"><span class="tok-keyword">let</span> total = 200; <span class="tok-comment">// — SyntaxError: total already declared</span></div>
  </div>
</div>

Modules give each file its own private scope by default — nothing leaks out unless you explicitly \`export\` it.

**A basic module layout**

A typical small project splits related logic into its own file, then pulls in exactly what's needed elsewhere:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">project-structure.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// math.js — exports reusable functions</span></div>
    <div class="snippet-line"><span class="tok-comment">// app.js  — imports and uses them</span></div>
  </div>
</div>

**Enabling modules in HTML**

To use \`import\`/\`export\` in the browser, the \`<script>\` tag needs \`type="module"\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">enable-modules.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</div>
  </div>
</div>

> 💡 **Try it:** Think about a project you might build — what would be a natural way to split it into separate files (e.g. \`utils.js\`, \`api.js\`, \`ui.js\`)?

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Modules give each file its own private scope, avoiding naming collisions, and require <code>type="module"</code> on the <code>&lt;script&gt;</code> tag to enable <code>import</code>/<code>export</code> in the browser.</p>
</div>`
            },
            {
                title: "Named Exports & Imports",
                slug: "named-exports-imports",
                order: 1,
                content: `## Named Exports & Imports

Named exports let a single file share multiple specific values — functions, variables, or classes — each importable by name wherever they're needed.

**Exporting multiple values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">math.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">function</span> <span class="tok-call">add</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">function</span> <span class="tok-call">subtract</span>(a, b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a - b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">const</span> PI = 3.14159;</div>
  </div>
</div>

**Importing named exports**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">app.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> { add, subtract, PI } <span class="tok-keyword">from</span> <span class="tok-string">"./math.js"</span>;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">add</span>(2, 3));      <span class="tok-comment">// 5</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">subtract</span>(5, 2)); <span class="tok-comment">// 3</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(PI);           <span class="tok-comment">// 3.14159</span></div>
  </div>
</div>

The names inside \`{ }\` must match the exported names exactly, and the file path (\`"./math.js"\`) must point to where that file actually lives, relative to the importing file.

**Exporting a group at the bottom of the file**

You can also export several things together at the end of a file, instead of tagging each one individually:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">export-group.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">add</span>(a, b) { <span class="tok-keyword">return</span> a + b; }</div>
    <div class="snippet-line"><span class="tok-keyword">function</span> <span class="tok-call">subtract</span>(a, b) { <span class="tok-keyword">return</span> a - b; }</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">export</span> { add, subtract };</div>
  </div>
</div>

**Renaming an import with \`as\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">import-rename.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> { add <span class="tok-keyword">as</span> sum } <span class="tok-keyword">from</span> <span class="tok-string">"./math.js"</span>;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-call">sum</span>(4, 5)); <span class="tok-comment">// 9</span></div>
  </div>
</div>

> 💡 **Try it:** Sketch out (on paper or in comments) a \`strings.js\` file that exports \`capitalize()\` and \`reverse()\` functions, and an \`app.js\` that imports both.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Named exports (<code>export function/const</code>) let a file share multiple values, imported by matching name with <code>import { name } from "./file.js"</code>.</p>
</div>`
            },
            {
                title: "Default Exports",
                slug: "default-exports",
                order: 2,
                content: `## Default Exports

A default export marks one value as the "main" thing a file provides. Unlike named exports, the importing file can call it whatever name it wants.

**Exporting a default**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">user.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">User</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;constructor(name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.name = name;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">default</span> User;</div>
  </div>
</div>

**Importing a default export**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">import-default.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> User <span class="tok-keyword">from</span> <span class="tok-string">"./user.js"</span>; <span class="tok-comment">// no { } needed</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> newUser = <span class="tok-keyword">new</span> User(<span class="tok-string">"Kemi"</span>);</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(newUser.name); <span class="tok-comment">// "Kemi"</span></div>
  </div>
</div>

Because it's a default export, the importing file could name it anything — \`import Person from "./user.js"\` would work exactly the same way.

**Combining default and named exports**

A single file can export one default *and* several named exports at the same time:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">combined-exports.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// config.js</span></div>
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">const</span> API_URL = <span class="tok-string">"https://api.example.com"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">export</span> <span class="tok-keyword">default</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;appName: <span class="tok-string">"CodePilot"</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;version: <span class="tok-string">"1.0"</span></div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// app.js</span></div>
    <div class="snippet-line"><span class="tok-keyword">import</span> config, { API_URL } <span class="tok-keyword">from</span> <span class="tok-string">"./config.js"</span>;</div>
  </div>
</div>

**When to use default vs. named**

Use a default export when a file's whole purpose is providing one main thing (like a single class or component). Use named exports when a file is a toolbox of several related, independent pieces.

> 💡 **Try it:** Write a \`logger.js\` file (in your head or on paper) with a default-exported \`log()\` function and a named-exported \`LOG_LEVELS\` constant.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>export default</code> marks a file's one main value, importable under any name without <code>{ }</code> — a file can combine one default export with several named ones.</p>
</div>`
            },
            {
                title: "What Is JSON?",
                slug: "what-is-json",
                order: 3,
                content: `## What Is JSON?

JSON (JavaScript Object Notation) is a lightweight text format for representing data — it looks almost identical to a JavaScript object literal, and it's the standard way data travels between a server and your JavaScript code.

**What JSON looks like**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">example.json</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">{</div>
    <div class="snippet-line">&nbsp;&nbsp;"name": "Adaeze",</div>
    <div class="snippet-line">&nbsp;&nbsp;"age": 26,</div>
    <div class="snippet-line">&nbsp;&nbsp;"isActive": true,</div>
    <div class="snippet-line">&nbsp;&nbsp;"hobbies": ["reading", "cycling"]</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**JSON vs. a JavaScript object**

They look almost the same, but JSON has stricter rules: property names must be in double quotes, and JSON can't contain functions, \`undefined\`, or comments — only plain data.

| JavaScript object | JSON |
|--------------------|------|
| Keys can be unquoted | Keys must be double-quoted |
| Can contain functions | Data only — no functions |
| Allows trailing commas (in some cases) | No trailing commas allowed |
| Lives in your code | A plain text format, used for storage/transfer |

**Why JSON matters**

APIs, config files, and data storage overwhelmingly use JSON because it's lightweight, human-readable, and supported by nearly every programming language — not just JavaScript.

> 💡 **Try it:** Look at the response of any public API (like \`https://jsonplaceholder.typicode.com/users/1\`) in your browser — that's JSON.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">JSON is a text-based data format that looks like a JavaScript object but follows stricter rules — it's the standard way data moves between servers and JavaScript.</p>
</div>`
            },
            {
                title: "Converting Between JSON and JavaScript",
                slug: "converting-between-json-and-javascript",
                order: 4,
                content: `## Converting Between JSON and JavaScript

Since JSON is just text, you need to convert it into a real JavaScript object before you can use it — and convert a JavaScript object back into JSON text before sending or storing it. Two built-in methods handle both directions.

**JSON.parse() — text to object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">json-parse.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> jsonText = <span class="tok-string">'{"name": "Adaeze", "age": 26}'</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> user = JSON.parse(jsonText);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(user.name); <span class="tok-comment">// "Adaeze" — now a real JS object</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> user);  <span class="tok-comment">// "object"</span></div>
  </div>
</div>

This is exactly what happens behind \`response.json()\` when using \`fetch()\` from the Asynchronous JavaScript chapter — it parses the JSON text the server sent into a usable object.

**JSON.stringify() — object to text**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">json-stringify.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> user = { name: <span class="tok-string">"Adaeze"</span>, age: 26 };</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> jsonText = JSON.stringify(user);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(jsonText); <span class="tok-comment">// '{"name":"Adaeze","age":26}'</span></div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(<span class="tok-keyword">typeof</span> jsonText); <span class="tok-comment">// "string"</span></div>
  </div>
</div>

**A round trip**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">json-round-trip.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> original = { title: <span class="tok-string">"Learn JS"</span>, done: <span class="tok-keyword">false</span> };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> asText = JSON.stringify(original);</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> backToObject = JSON.parse(asText);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(backToObject.title); <span class="tok-comment">// "Learn JS"</span></div>
  </div>
</div>

**Real-world use: saving to \`localStorage\`**

\`localStorage\` can only store strings, so \`JSON.stringify()\`/\`JSON.parse()\` are the standard way to save and retrieve structured data in the browser:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">json-localstorage.js</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> settings = { theme: <span class="tok-string">"dark"</span>, fontSize: 16 };</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">localStorage.setItem(<span class="tok-string">"settings"</span>, JSON.stringify(settings));</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">const</span> saved = JSON.parse(localStorage.getItem(<span class="tok-string">"settings"</span>));</div>
    <div class="snippet-line"><span class="tok-call">console.log</span>(saved.theme); <span class="tok-comment">// "dark"</span></div>
  </div>
</div>

> 💡 **Try it:** Create an object with three properties, \`JSON.stringify()\` it, log the result, then \`JSON.parse()\` it back and confirm you get an equivalent object.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>JSON.parse()</code> turns JSON text into a JavaScript object, and <code>JSON.stringify()</code> does the reverse — essential for APIs and for storing structured data as text.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "HTML Basics",
        slug: "html-basics",
        order: 0,
        topics: [
            {
                title: "Introduction to HTML",
                slug: "introduction-to-html",
                order: 0,
                content: `## Introduction to HTML

HTML (HyperText Markup Language) is the foundation of every web page — it's not a programming language, but a **markup language** used to structure content: headings, paragraphs, images, links, and everything else you see on a page.

**What HTML actually does**

HTML doesn't make a page look pretty (that's CSS) or make it interactive (that's JavaScript) — it defines the *structure and meaning* of content, using **elements** made up of tags:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hello-world.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;h1&gt;Hello, World!&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;p&gt;This is my first paragraph.&lt;/p&gt;</div>
  </div>
</div>

**Anatomy of an element**

Most HTML elements have three parts: an opening tag, the content, and a closing tag:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">element-anatomy.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;This is the content&lt;/p&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ^opening tag  ^content            ^closing tag (note the /) --&gt;</span></div>
  </div>
</div>

The closing tag always has a forward slash (\`/\`) before the tag name. Forgetting it is one of the most common beginner mistakes.

**Self-closing elements**

Some elements don't wrap around content, so they don't need a separate closing tag:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">self-closing.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;img src="photo.jpg" alt="A photo"&gt;</div>
    <div class="snippet-line">&lt;br&gt;</div>
    <div class="snippet-line">&lt;hr&gt;</div>
  </div>
</div>

\`<img>\` inserts an image, \`<br>\` inserts a line break, and \`<hr>\` inserts a horizontal divider — all three are complete on their own, with no matching closing tag needed.

> 💡 **Try it:** Write a short HTML snippet with one \`<h1>\` heading and two \`<p>\` paragraphs describing yourself.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">HTML structures content using elements made of opening and closing tags — some elements, like <code>&lt;img&gt;</code>, are self-closing and need no closing tag.</p>
</div>`
            },
            {
                title: "Document Structure",
                slug: "document-structure",
                order: 1,
                content: `## Document Structure

Every HTML page follows the same basic skeleton. Browsers expect this structure to correctly interpret and display your content — skipping parts of it can cause unpredictable rendering.

**The basic template**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">document-structure.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;!DOCTYPE html&gt;</div>
    <div class="snippet-line">&lt;html lang="en"&gt;</div>
    <div class="snippet-line">&lt;head&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;title&gt;My First Page&lt;/title&gt;</div>
    <div class="snippet-line">&lt;/head&gt;</div>
    <div class="snippet-line">&lt;body&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;h1&gt;Welcome!&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;/body&gt;</div>
    <div class="snippet-line">&lt;/html&gt;</div>
  </div>
</div>

**What each part does**

| Tag | Purpose |
|-----|---------|
| \`<!DOCTYPE html>\` | Tells the browser this is a modern HTML5 document |
| \`<html>\` | The root element wrapping the entire page |
| \`<head>\` | Metadata — not visible content (title, character encoding, linked files) |
| \`<body>\` | Everything the user actually sees on the page |

**The \`<head>\` in more detail**

The \`<head>\` doesn't display anything directly, but it's essential — it's where you set the page title (shown in the browser tab), link stylesheets, and define character encoding:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">head-example.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;head&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;title&gt;CodePilot&lt;/title&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;link rel="stylesheet" href="styles.css"&gt;</div>
    <div class="snippet-line">&lt;/head&gt;</div>
  </div>
</div>

The viewport \`<meta>\` tag in particular is essential for making a page display correctly on mobile devices.

> 💡 **Try it:** Write out the full basic HTML template from memory, then check it against the example above.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Every HTML page needs the same skeleton — <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> for metadata, and <code>&lt;body&gt;</code> for visible content.</p>
</div>`
            },
            {
                title: "Text Elements",
                slug: "text-elements",
                order: 2,
                content: `## Text Elements

Most of the content on any web page is text, structured using a handful of core elements: headings, paragraphs, and a few ways to emphasize specific words.

**Headings — \`<h1>\` through \`<h6>\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">headings.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;h1&gt;Main Page Title&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;h2&gt;A Major Section&lt;/h2&gt;</div>
    <div class="snippet-line">&lt;h3&gt;A Subsection&lt;/h3&gt;</div>
  </div>
</div>

\`<h1>\` is the most important heading, typically used once per page for the main title. \`<h6>\` is the least important. Skipping levels (like jumping from \`<h1>\` straight to \`<h4>\`) is bad practice — it should read like an outline.

**Paragraphs**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">paragraphs.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;This is a paragraph of text. It can be as long as you need.&lt;/p&gt;</div>
    <div class="snippet-line">&lt;p&gt;This is a second, separate paragraph.&lt;/p&gt;</div>
  </div>
</div>

**Text emphasis**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">text-emphasis.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;This word is &lt;strong&gt;important&lt;/strong&gt;.&lt;/p&gt;</div>
    <div class="snippet-line">&lt;p&gt;This word is &lt;em&gt;emphasized&lt;/em&gt;.&lt;/p&gt;</div>
  </div>
</div>

\`<strong>\` marks text as important (rendered bold by default), and \`<em>\` marks it as emphasized (rendered italic). Prefer these over \`<b>\`/\`<i>\`, since they also carry semantic meaning — useful for accessibility tools like screen readers.

> 💡 **Try it:** Write a short bio using an \`<h2>\` heading, two paragraphs, and one \`<strong>\` word.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Headings (<code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>) should follow a logical outline, and <code>&lt;strong&gt;</code>/<code>&lt;em&gt;</code> are preferred over <code>&lt;b&gt;</code>/<code>&lt;i&gt;</code> since they also carry semantic meaning.</p>
</div>`
            },
            {
                title: "Links & Images",
                slug: "links-images",
                order: 3,
                content: `## Links & Images

Links and images are what make the web "the web" — connecting pages together and bringing in visual media.

**Creating a link**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">links.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;</div>
  </div>
</div>

The \`<a>\` (anchor) tag creates a link. The \`href\` attribute holds the destination URL, and the text between the tags is what the user clicks.

**Opening a link in a new tab**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">link-new-tab.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;a href="https://example.com" target="_blank"&gt;Visit Example&lt;/a&gt;</div>
  </div>
</div>

**Linking within the same site**

Relative paths (rather than a full URL) are used to link between pages on your own site:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">relative-link.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;a href="about.html"&gt;About Us&lt;/a&gt;</div>
    <div class="snippet-line">&lt;a href="/contact"&gt;Contact&lt;/a&gt;</div>
  </div>
</div>

**Adding an image**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">images.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;img src="cat.jpg" alt="A sleepy orange cat"&gt;</div>
  </div>
</div>

\`src\` points to the image file, and \`alt\` is a text description — always include it. It's read aloud by screen readers, shown if the image fails to load, and used by search engines.

> 💡 **Try it:** Write a link to your favorite website that opens in a new tab, and an \`<img>\` tag with a descriptive \`alt\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&lt;a href="..."&gt;</code> creates links and <code>&lt;img src="..." alt="..."&gt;</code> embeds images — always include a meaningful <code>alt</code> description for accessibility.</p>
</div>`
            },
            {
                title: "Lists",
                slug: "lists",
                order: 4,
                content: `## Lists

Lists group related items together — either ordered (numbered) or unordered (bulleted) — and are one of the most common structural patterns on the web, from navigation menus to article steps.

**Unordered lists**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">unordered-list.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;ul&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Coffee&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Tea&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Juice&lt;/li&gt;</div>
    <div class="snippet-line">&lt;/ul&gt;</div>
  </div>
</div>

\`<ul>\` wraps the whole list, and each item goes inside its own \`<li>\` (list item) tag — rendered with a bullet point by default.

**Ordered lists**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ordered-list.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;ol&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Preheat the oven&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Mix the ingredients&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Bake for 30 minutes&lt;/li&gt;</div>
    <div class="snippet-line">&lt;/ol&gt;</div>
  </div>
</div>

\`<ol>\` (ordered list) works the same way, but automatically numbers each \`<li>\` — perfect for steps where order matters.

**Nested lists**

Lists can be nested inside a list item, useful for sub-categories:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nested-list.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;ul&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;li&gt;Fruits</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Apple&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;Banana&lt;/li&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/li&gt;</div>
    <div class="snippet-line">&lt;/ul&gt;</div>
  </div>
</div>

> 💡 **Try it:** Write an ordered list with the steps to make your favorite simple meal (at least 3 steps).

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Use <code>&lt;ul&gt;</code> for unordered (bulleted) lists and <code>&lt;ol&gt;</code> for ordered (numbered) lists — both use <code>&lt;li&gt;</code> for each item, and lists can nest inside each other.</p>
</div>`
            },
            {
                title: "Attributes",
                slug: "attributes",
                order: 5,
                content: `## Attributes

Attributes provide extra information about an element, written inside the opening tag as \`name="value"\` pairs. You've already used several — \`href\`, \`src\`, \`alt\` — this topic makes the pattern explicit.

**Attribute syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">attribute-syntax.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;a href="https://example.com" target="_blank"&gt;Link&lt;/a&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!--    ^attribute  ^value      ^attribute ^value --&gt;</span></div>
  </div>
</div>

Attributes always live inside the opening tag, are separated by spaces when there are multiple, and their values are wrapped in quotes.

**Common global attributes**

Some attributes work on nearly any HTML element:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">global-attributes.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p id="intro" class="highlight" title="Extra info on hover"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;Hello there!</div>
    <div class="snippet-line">&lt;/p&gt;</div>
  </div>
</div>

| Attribute | Purpose |
|-----------|---------|
| \`id\` | A unique identifier for one specific element |
| \`class\` | A label used to group and style multiple elements |
| \`title\` | Extra text shown as a tooltip on hover |
| \`style\` | Inline CSS applied directly to the element |

**\`id\` vs. \`class\`**

\`id\` should be unique — used only once per page, typically to target one specific element. \`class\` can be reused across many elements, which is why it's the primary tool CSS uses to style groups of things consistently.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">id-vs-class.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;h1 id="page-title"&gt;My Site&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;p class="note"&gt;First note&lt;/p&gt;</div>
    <div class="snippet-line">&lt;p class="note"&gt;Second note&lt;/p&gt;</div>
  </div>
</div>

> 💡 **Try it:** Write a \`<div>\` with an \`id\` of \`"card"\` and a \`class\` of \`"featured"\` — you'll use exactly this pattern constantly once you reach CSS.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Attributes add extra information inside an opening tag — <code>id</code> targets one unique element, while <code>class</code> groups multiple elements for shared styling.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "HTML Forms",
        slug: "html-forms",
        order: 1,
        topics: [
            {
                title: "The form Element",
                slug: "the-form-element",
                order: 0,
                content: `## The form Element

Forms are how a web page collects input from a user — a login screen, a search bar, a checkout page. Everything starts with the \`<form>\` element, which wraps all the individual input fields together.

**Basic form structure**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-form.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;form action="/submit" method="POST"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;input type="text" name="username"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;button type="submit"&gt;Submit&lt;/button&gt;</div>
    <div class="snippet-line">&lt;/form&gt;</div>
  </div>
</div>

**Key form attributes**

| Attribute | Purpose |
|-----------|---------|
| \`action\` | The URL the form data is sent to |
| \`method\` | How data is sent — usually \`GET\` or \`POST\` |

\`GET\` appends form data to the URL (fine for searches, not for sensitive data). \`POST\` sends data in the request body, hidden from the URL — the standard choice for logins, sign-ups, and anything private.

**Why \`name\` matters on inputs**

The \`name\` attribute on each field is what identifies that field's data when the form is submitted — without it, the field's value won't be sent at all:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">name-attribute.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="email"&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- submitted as: email=whatever-the-user-typed --&gt;</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`<form>\` with one text input named \`"search"\` and a submit button.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A <code>&lt;form&gt;</code> wraps input fields together, using <code>action</code> and <code>method</code> to control where and how data is sent — and each field needs a <code>name</code> to be included.</p>
</div>`
            },
            {
                title: "Input Types",
                slug: "input-types",
                order: 1,
                content: `## Input Types

The \`<input>\` element is the most versatile form field — its \`type\` attribute changes both its appearance and its behavior, giving you built-in support for many kinds of data without any extra code.

**Common input types**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">input-types.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="fullname"&gt;</div>
    <div class="snippet-line">&lt;input type="email" name="email"&gt;</div>
    <div class="snippet-line">&lt;input type="password" name="password"&gt;</div>
    <div class="snippet-line">&lt;input type="number" name="age"&gt;</div>
    <div class="snippet-line">&lt;input type="date" name="birthday"&gt;</div>
    <div class="snippet-line">&lt;input type="checkbox" name="subscribe"&gt;</div>
    <div class="snippet-line">&lt;input type="radio" name="plan" value="free"&gt;</div>
  </div>
</div>

| Type | Behavior |
|------|----------|
| \`email\` | Validates a basic email format automatically |
| \`password\` | Masks the typed characters |
| \`number\` | Restricts input to numeric values, adds up/down arrows |
| \`date\` | Shows a native date picker |
| \`checkbox\` | An on/off toggle — multiple can be selected |
| \`radio\` | One choice from a group sharing the same \`name\` |

**Radio buttons and grouping**

Radio buttons only work as a mutually-exclusive group when they share the same \`name\` — checking one automatically unchecks the others:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">radio-group.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="radio" name="plan" value="free"&gt; Free&lt;br&gt;</div>
    <div class="snippet-line">&lt;input type="radio" name="plan" value="pro"&gt; Pro&lt;br&gt;</div>
    <div class="snippet-line">&lt;input type="radio" name="plan" value="team"&gt; Team</div>
  </div>
</div>

**Placeholder text**

\`placeholder\` shows greyed-out hint text inside an empty field — it disappears once the user starts typing, and isn't a substitute for a real label (covered next topic):

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">placeholder.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="search" placeholder="Search products..."&gt;</div>
  </div>
</div>

> 💡 **Try it:** Write three radio buttons for a "favorite season" question, all sharing the same \`name\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">The <code>type</code> attribute on <code>&lt;input&gt;</code> unlocks built-in behavior for different data — and radio buttons only group correctly when they share the same <code>name</code>.</p>
</div>`
            },
            {
                title: "Labels & Accessibility",
                slug: "labels-accessibility",
                order: 2,
                content: `## Labels & Accessibility

A \`<label>\` connects descriptive text to a form field. It's easy to skip, but it's essential for accessibility — and it makes forms easier to use for everyone, not just screen reader users.

**Connecting a label with \`for\`/\`id\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">label-for-id.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;label for="email"&gt;Email address&lt;/label&gt;</div>
    <div class="snippet-line">&lt;input type="email" id="email" name="email"&gt;</div>
  </div>
</div>

The label's \`for\` attribute must exactly match the input's \`id\`. Once connected, clicking the label text focuses the input automatically — try it with checkboxes especially, where it makes the clickable area much larger.

**Wrapping the input instead**

Alternatively, you can nest the input directly inside the label, which achieves the same connection without needing matching \`for\`/\`id\` values:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">wrapped-label.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;label&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;Subscribe to newsletter</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;input type="checkbox" name="subscribe"&gt;</div>
    <div class="snippet-line">&lt;/label&gt;</div>
  </div>
</div>

**Why labels matter**

Screen readers announce a label's text when a user focuses the associated field — without one, a blank input gives no indication of what it's asking for. Labels also make small checkboxes and radio buttons far easier to click accurately.

> 💡 **Try it:** Add a properly connected \`<label>\` to an \`<input type="text">\` for a "Full Name" field, using the \`for\`/\`id\` method.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A <code>&lt;label&gt;</code> connected via matching <code>for</code>/<code>id</code> (or by wrapping the input) is essential for accessibility and makes fields easier to click.</p>
</div>`
            },
            {
                title: "Textareas, Select Dropdowns & Buttons",
                slug: "textareas-select-dropdowns-buttons",
                order: 3,
                content: `## Textareas, Select Dropdowns & Buttons

Beyond \`<input>\`, forms have a few other essential field types for multi-line text, dropdown choices, and the buttons that submit or reset everything.

**Multi-line text with \`<textarea>\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">textarea.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;label for="bio"&gt;Bio&lt;/label&gt;</div>
    <div class="snippet-line">&lt;textarea id="bio" name="bio" rows="4" cols="30"&gt;&lt;/textarea&gt;</div>
  </div>
</div>

Unlike \`<input>\`, \`<textarea>\` needs both an opening and closing tag — any default text goes between them, not in a \`value\` attribute.

**Dropdown menus with \`<select>\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">select-dropdown.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;label for="country"&gt;Country&lt;/label&gt;</div>
    <div class="snippet-line">&lt;select id="country" name="country"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;option value="ng"&gt;Nigeria&lt;/option&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;option value="ke"&gt;Kenya&lt;/option&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;option value="za"&gt;South Africa&lt;/option&gt;</div>
    <div class="snippet-line">&lt;/select&gt;</div>
  </div>
</div>

Each \`<option>\`'s \`value\` is what actually gets submitted — the text between the tags is just what the user sees.

**Buttons**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">buttons.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;button type="submit"&gt;Submit&lt;/button&gt;</div>
    <div class="snippet-line">&lt;button type="reset"&gt;Clear Form&lt;/button&gt;</div>
    <div class="snippet-line">&lt;button type="button"&gt;Not part of the form submission&lt;/button&gt;</div>
  </div>
</div>

\`type="submit"\` sends the form; \`type="reset"\` clears every field back to its default; plain \`type="button"\` does neither on its own — it's meant to be paired with a JavaScript click handler instead.

> 💡 **Try it:** Build a small feedback form: a \`<select>\` for a rating (1-5), a \`<textarea>\` for comments, and a submit button.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&lt;textarea&gt;</code> handles multi-line text and <code>&lt;select&gt;</code>/<code>&lt;option&gt;</code> handles dropdowns — and a button's <code>type</code> (<code>submit</code>, <code>reset</code>, or <code>button</code>) determines what it actually does.</p>
</div>`
            },
            {
                title: "Form Validation",
                slug: "form-validation",
                order: 4,
                content: `## Form Validation

HTML provides built-in validation attributes that catch common input mistakes *before* the form is even submitted — no JavaScript required for the basics.

**Requiring a field**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">required.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="username" required&gt;</div>
  </div>
</div>

\`required\` is a **boolean attribute** — just including it turns the behavior on, no value needed. Trying to submit the form with this field empty shows a built-in browser warning.

**Length and value constraints**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">validation-constraints.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="username" minlength="3" maxlength="20" required&gt;</div>
    <div class="snippet-line">&lt;input type="number" name="age" min="13" max="120"&gt;</div>
  </div>
</div>

**Pattern matching**

\`pattern\` accepts a regular expression, letting you enforce a specific format:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pattern-validation.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="text" name="zipcode" pattern="[0-9]{5}" title="Enter a 5-digit ZIP code"&gt;</div>
  </div>
</div>

**Built-in type validation**

Certain \`type\` values validate themselves automatically — \`email\` rejects text without an \`@\`, and \`url\` rejects text that isn't a valid link format, with zero extra attributes needed:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">type-validation.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;input type="email" name="email" required&gt;</div>
  </div>
</div>

Built-in validation is a great first layer, but it's not a substitute for validating data again on the server — anyone can bypass client-side checks, so the server should never fully trust what it receives.

> 💡 **Try it:** Add \`required\`, \`minlength="8"\`, and \`type="password"\` to a password field, then try submitting the form with a short password.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Attributes like <code>required</code>, <code>minlength</code>, and <code>pattern</code> provide free built-in validation — but server-side validation is still necessary, since client-side checks can be bypassed.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "HTML Tables",
        slug: "html-tables",
        order: 2,
        topics: [
            {
                title: "Basic Table Structure",
                slug: "basic-table-structure",
                order: 0,
                content: `## Basic Table Structure

Tables display data in rows and columns — think spreadsheets, pricing comparisons, or schedules. They're built from a small set of elements that always nest together in a specific pattern.

**The core elements**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-table.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Apple&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;$1.20&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Banana&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;$0.50&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

| Element | Meaning |
|---------|---------|
| \`<table>\` | Wraps the entire table |
| \`<tr>\` | Table row |
| \`<td>\` | Table data — one cell |

Every \`<td>\` sits inside a \`<tr>\`, and every \`<tr>\` sits inside the \`<table>\` — this nesting is strict and always follows this order.

**Adding headers with \`<th>\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">table-headers.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Fruit&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Price&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Apple&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;$1.20&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

\`<th>\` (table header) works like \`<td>\`, but marks a cell as a header — browsers bold and center it by default, and screen readers announce it differently to help users understand column meaning.

> 💡 **Try it:** Build a 3-row, 2-column table listing three of your favorite books and their authors, with a header row.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Tables nest strictly: <code>&lt;table&gt;</code> &rarr; <code>&lt;tr&gt;</code> &rarr; <code>&lt;td&gt;</code>/<code>&lt;th&gt;</code> — use <code>&lt;th&gt;</code> for header cells to give them semantic meaning.</p>
</div>`
            },
            {
                title: "Semantic Table Sections",
                slug: "semantic-table-sections",
                order: 1,
                content: `## Semantic Table Sections

Larger tables benefit from grouping rows into a head, body, and footer — this doesn't change how the table looks much by default, but it clarifies structure for both styling and accessibility.

**\`<thead>\`, \`<tbody>\`, \`<tfoot>\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">table-sections.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;thead&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Item&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Price&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/thead&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tbody&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Notebook&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;$3.00&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tbody&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tfoot&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Total&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;$3.00&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tfoot&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

\`<thead>\` groups the header row(s), \`<tbody>\` groups the main data, and \`<tfoot>\` groups summary rows like totals. Browsers can even keep \`<thead>\` visible while \`<tbody>\` scrolls, on long tables with the right CSS.

**Why this grouping matters**

Without these sections, a screen reader (or a script processing the table) has no easy way to distinguish "this is the header info" from "this is the actual data" — the semantic grouping makes that explicit rather than implied by position.

> 💡 **Try it:** Take the table you built in Topic 1 and wrap its header row in \`<thead>\` and the rest in \`<tbody>\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and <code>&lt;tfoot&gt;</code> group table rows semantically, clarifying structure for both styling and accessibility tools.</p>
</div>`
            },
            {
                title: "Spanning Rows & Columns",
                slug: "spanning-rows-columns",
                order: 2,
                content: `## Spanning Rows & Columns

Sometimes a single cell needs to stretch across multiple columns or rows — like a heading that spans an entire table width, or a category label covering several rows. \`colspan\` and \`rowspan\` handle both cases.

**Spanning columns with \`colspan\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">colspan.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;th colspan="2"&gt;Contact Info&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Email&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;ada@example.com&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

\`colspan="2"\` makes that single \`<th>\` occupy the space of two normal columns — the row below still has two separate \`<td>\` cells as usual.

**Spanning rows with \`rowspan\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">rowspan.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td rowspan="2"&gt;Fruit&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Apple&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Banana&lt;/td&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

Here, the first \`<td>\` ("Fruit") stretches down across both rows, while each row still has its own second cell alongside it.

**A key rule**

When a cell spans multiple columns or rows, every other row it affects needs *one fewer* \`<td>\` to account for the space already taken — as seen in the \`rowspan\` example, where the second \`<tr>\` only has a single \`<td>\`, not two.

> 💡 **Try it:** Build a small schedule table where one \`<th>\` spans two columns for a "Morning" header, above two individual time-slot columns.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>colspan</code> and <code>rowspan</code> stretch a cell across multiple columns or rows — remember that affected rows need fewer cells to compensate for the space taken.</p>
</div>`
            },
            {
                title: "Table Accessibility & Best Practices",
                slug: "table-accessibility-best-practices",
                order: 3,
                content: `## Table Accessibility & Best Practices

A well-structured table isn't just about visual layout — a few extra touches make tables genuinely usable for screen reader users and easier to maintain for everyone else.

**The \`<caption>\` element**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">caption.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;table&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;caption&gt;Monthly Grocery Prices&lt;/caption&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Item&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Price&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/tr&gt;</div>
    <div class="snippet-line">&lt;/table&gt;</div>
  </div>
</div>

\`<caption>\` provides a title for the whole table, announced by screen readers right when they enter the table — it goes immediately after the opening \`<table>\` tag.

**The \`scope\` attribute**

For more complex tables, \`scope\` clarifies whether a header applies to its column or its row — helpful when a table has headers running both directions:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">scope-attribute.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;tr&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;th scope="row"&gt;Apple&lt;/th&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;td&gt;$1.20&lt;/td&gt;</div>
    <div class="snippet-line">&lt;/tr&gt;</div>
  </div>
</div>

**What tables are (and aren't) for**

Tables should only be used for genuinely tabular data — rows and columns of related values. A common older mistake was using tables purely for *page layout* (positioning a header, sidebar, and footer). Modern CSS (Flexbox and Grid, covered in later chapters) handles layout far more flexibly, so tables should be reserved for actual data.

> 💡 **Try it:** Add a \`<caption>\` to a table you've already built, describing what the table contains in one short sentence.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Use <code>&lt;caption&gt;</code> to title a table and <code>scope</code> to clarify header direction — and reserve tables for real tabular data, not page layout.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "Semantic HTML & Embedded Media",
        slug: "semantic-html-embedded-media",
        order: 3,
        topics: [
            {
                title: "Why Semantic HTML Matters",
                slug: "why-semantic-html-matters",
                order: 0,
                content: `## Why Semantic HTML Matters

Semantic elements describe the *meaning* of content, not just its appearance. \`<div>\` and \`<span>\` are generic containers that say nothing about what's inside them — semantic tags like \`<header>\` or \`<article>\` communicate structure clearly, to browsers, screen readers, and other developers alike.

**Non-semantic vs. semantic**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">non-semantic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- Non-semantic — meaningless to anything reading the structure --&gt;</span></div>
    <div class="snippet-line">&lt;div class="header"&gt;...&lt;/div&gt;</div>
    <div class="snippet-line">&lt;div class="nav"&gt;...&lt;/div&gt;</div>
    <div class="snippet-line">&lt;div class="main"&gt;...&lt;/div&gt;</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">semantic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- Semantic — the tag names themselves explain the structure --&gt;</span></div>
    <div class="snippet-line">&lt;header&gt;...&lt;/header&gt;</div>
    <div class="snippet-line">&lt;nav&gt;...&lt;/nav&gt;</div>
    <div class="snippet-line">&lt;main&gt;...&lt;/main&gt;</div>
  </div>
</div>

Both examples can *look* identical on the page with the right CSS — the difference is entirely about meaning, not appearance.

**Why it's worth the effort**

Semantic HTML improves accessibility (screen readers use these tags to let users jump between sections), SEO (search engines weigh content in \`<article>\` or \`<h1>\` differently than a generic \`<div>\`), and long-term maintainability, since your own code becomes self-documenting.

> 💡 **Try it:** Look at a real website's page source (right-click → "View Page Source") and see how many semantic tags vs. generic \`<div>\`s it uses.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Semantic elements describe meaning, not just appearance — improving accessibility, SEO, and code readability, even when the visual result is identical to using generic <code>&lt;div&gt;</code>s.</p>
</div>`
            },
            {
                title: "Common Semantic Elements",
                slug: "common-semantic-elements",
                order: 1,
                content: `## Common Semantic Elements

HTML5 introduced a set of semantic elements specifically for structuring a typical page layout — header, navigation, main content, sidebars, and footer.

**A full semantic page layout**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">semantic-layout.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;header&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;h1&gt;My Blog&lt;/h1&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;nav&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;a href="/"&gt;Home&lt;/a&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;a href="/about"&gt;About&lt;/a&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/nav&gt;</div>
    <div class="snippet-line">&lt;/header&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&lt;main&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;article&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;h2&gt;My First Post&lt;/h2&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Post content goes here...&lt;/p&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/article&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;aside&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Related links go here&lt;/p&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;/aside&gt;</div>
    <div class="snippet-line">&lt;/main&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&lt;footer&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;p&gt;&amp;copy; 2026 My Blog&lt;/p&gt;</div>
    <div class="snippet-line">&lt;/footer&gt;</div>
  </div>
</div>

**What each element means**

| Element | Represents |
|---------|-------------|
| \`<header>\` | Introductory content — often a logo, title, nav |
| \`<nav>\` | A block of navigation links |
| \`<main>\` | The primary content of the page (used once per page) |
| \`<article>\` | Self-contained content — a blog post, news story |
| \`<aside>\` | Tangentially related content — sidebars, pull quotes |
| \`<section>\` | A thematic grouping of content, usually with its own heading |
| \`<footer>\` | Closing content — copyright, contact info, links |

**\`<section>\` vs. \`<article>\` vs. \`<div>\`**

Use \`<article>\` for something that could stand alone (and make sense) if pulled out of the page entirely — a blog post, a product card. Use \`<section>\` for a distinct, titled grouping within the page that doesn't necessarily stand alone. If neither fits and you just need a generic wrapper for styling, \`<div>\` is still the right choice — semantic tags aren't meant to replace every container.

> 💡 **Try it:** Sketch out (in comments or on paper) the semantic layout for a portfolio site homepage — what goes in \`<header>\`, \`<main>\`, and \`<footer>\`?

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">HTML5's semantic elements (<code>header</code>, <code>nav</code>, <code>main</code>, <code>article</code>, <code>aside</code>, <code>footer</code>) map to real page regions — reach for <code>&lt;div&gt;</code> only when nothing semantic fits.</p>
</div>`
            },
            {
                title: "Embedding Video & Audio",
                slug: "embedding-video-audio",
                order: 2,
                content: `## Embedding Video & Audio

HTML has native elements for embedding media directly, without relying on third-party plugins — giving you built-in playback controls with almost no setup.

**Embedding video**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">video-embed.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;video src="demo.mp4" controls width="600"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;Your browser doesn't support video playback.</div>
    <div class="snippet-line">&lt;/video&gt;</div>
  </div>
</div>

\`controls\` adds the browser's built-in play/pause/volume UI. The fallback text between the tags only shows in the rare case a browser can't play video at all.

**Embedding audio**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">audio-embed.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;audio src="podcast-episode.mp3" controls&gt;&lt;/audio&gt;</div>
  </div>
</div>

**Multiple source formats**

Different browsers support different video/audio formats — \`<source>\` lets you offer several, and the browser picks the first one it can play:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multiple-sources.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;video controls width="600"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;source src="demo.webm" type="video/webm"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;source src="demo.mp4" type="video/mp4"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;Your browser doesn't support video playback.</div>
    <div class="snippet-line">&lt;/video&gt;</div>
  </div>
</div>

**Useful attributes**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">video-attributes.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;video src="demo.mp4" controls autoplay muted loop&gt;&lt;/video&gt;</div>
  </div>
</div>

\`autoplay\` starts playback automatically — browsers require \`muted\` alongside it, or the video won't autoplay at all. \`loop\` restarts playback when it ends.

> 💡 **Try it:** Write a \`<video>\` tag with \`controls\`, a \`width\` of \`500\`, and two \`<source>\` elements for different formats.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> provide native media playback with the <code>controls</code> attribute — use <code>&lt;source&gt;</code> for multiple formats, and pair <code>autoplay</code> with <code>muted</code>.</p>
</div>`
            },
            {
                title: "Embedding External Content with iframe",
                slug: "embedding-external-content-with-iframe",
                order: 3,
                content: `## Embedding External Content with iframe

An \`<iframe>\` embeds an entire separate web page inside your own — commonly used for maps, YouTube videos, or embedded widgets from another service.

**Basic iframe**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">iframe-basic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;iframe src="https://example.com" width="600" height="400"&gt;&lt;/iframe&gt;</div>
  </div>
</div>

The \`src\` works just like a link — it's the URL of the page being embedded. \`width\` and \`height\` control the visible frame size.

**A YouTube embed example**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">youtube-embed.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;iframe</div>
    <div class="snippet-line">&nbsp;&nbsp;src="https://www.youtube.com/embed/VIDEO_ID"</div>
    <div class="snippet-line">&nbsp;&nbsp;width="560"</div>
    <div class="snippet-line">&nbsp;&nbsp;height="315"</div>
    <div class="snippet-line">&nbsp;&nbsp;title="Video title"</div>
    <div class="snippet-line">&nbsp;&nbsp;allowfullscreen&gt;</div>
    <div class="snippet-line">&lt;/iframe&gt;</div>
  </div>
</div>

Most embeddable services (YouTube, Google Maps, CodePen) give you a ready-made \`<iframe>\` snippet to copy directly from their site — you rarely need to write one from scratch.

**A security note**

Because an \`<iframe>\` loads someone else's page inside yours, only embed content from sources you trust — a malicious embedded page can pose real security risks (like phishing attempts styled to look like part of your site).

> 💡 **Try it:** Find the "Share → Embed" option on a YouTube video and paste its \`<iframe>\` code — notice how closely it matches the example above.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">An <code>&lt;iframe&gt;</code> embeds an entire external page inside your own — most services provide ready-made embed code, but only embed content from sources you trust.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "HTML Containers, Entities & Accessibility",
        slug: "html-containers-entities-accessibility",
        order: 4,
        topics: [
            {
                title: "div and span",
                slug: "div-and-span",
                order: 0,
                content: `## div and span

\`<div>\` and \`<span>\` are generic containers with no inherent meaning of their own — pure structural tools, used whenever no semantic element (from an earlier chapter) fits what you're building.

**\`<div>\` — a block-level container**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">div-basic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;div class="card"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;h3&gt;Product Name&lt;/h3&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;p&gt;$29.99&lt;/p&gt;</div>
    <div class="snippet-line">&lt;/div&gt;</div>
  </div>
</div>

\`<div>\` takes up its own line and stretches the full available width by default — it exists purely to group content together, usually so CSS can style or position that group as a unit.

**\`<span>\` — an inline container**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">span-basic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;Your order total is &lt;span class="price"&gt;$45.00&lt;/span&gt;.&lt;/p&gt;</div>
  </div>
</div>

Unlike \`<div>\`, \`<span>\` flows inline with surrounding text — useful for styling a specific word or phrase (like highlighting a price) without breaking the sentence onto its own line.

**When to reach for \`<div>\`/\`<span>\` vs. semantic elements**

If a semantic tag accurately describes the content — \`<nav>\`, \`<article>\`, \`<header>\` — always prefer it. \`<div>\`/\`<span>\` are for the layout wrapping *around* that content: a container to apply spacing, a grid layout, or a background color to, where no semantic meaning applies.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">div-wrapping-semantic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;div class="card-grid"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;article class="product-card"&gt;...&lt;/article&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;article class="product-card"&gt;...&lt;/article&gt;</div>
    <div class="snippet-line">&lt;/div&gt;</div>
  </div>
</div>

> 💡 **Try it:** Write a \`<div>\` containing a heading and paragraph, with one word inside the paragraph wrapped in a \`<span>\` for styling.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> are meaning-free containers for block and inline content respectively — use them for layout wrapping, and prefer semantic tags whenever one accurately fits.</p>
</div>`
            },
            {
                title: "HTML Entities & Special Characters",
                slug: "html-entities-special-characters",
                order: 1,
                content: `## HTML Entities & Special Characters

Some characters have special meaning in HTML itself — like \`<\` and \`>\`, which define tags — so displaying them as literal text requires a special code called an **HTML entity**.

**Why you need entities**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">entity-problem.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;Use the &lt;div&gt; tag for containers.&lt;/p&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- — the browser tries to interpret "&lt;div&gt;" as an actual tag --&gt;</span></div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">entity-fix.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;Use the &amp;lt;div&amp;gt; tag for containers.&lt;/p&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- — renders as: Use the &lt;div&gt; tag for containers. --&gt;</span></div>
  </div>
</div>

**Common entities**

| Entity | Renders as | Used for |
|--------|------------|----------|
| \`&lt;\` | \`<\` | Less-than sign / opening a literal tag symbol |
| \`&gt;\` | \`>\` | Greater-than sign / closing a literal tag symbol |
| \`&amp;\` | \`&\` | Ampersand (since \`&\` starts every entity) |
| \`&quot;\` | \`"\` | Double quote inside quoted text |
| \`&copy;\` | © | Copyright symbol |
| \`&nbsp;\` | (a space) | A non-breaking space |

**\`&nbsp;\` — a special case**

Regular spaces collapse when repeated in HTML — typing five spaces in a row still renders as just one. \`&nbsp;\` (non-breaking space) is the standard way to force extra visible spacing:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nbsp-example.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;Left&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;Right&lt;/p&gt;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- renders with genuine extra space between "Left" and "Right" --&gt;</span></div>
  </div>
</div>

> 💡 **Try it:** Write a paragraph that displays the literal text \`<h1>\` on the page, using the correct entities.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">HTML entities like <code>&amp;lt;</code>, <code>&amp;gt;</code>, and <code>&amp;amp;</code> display characters that would otherwise be interpreted as HTML syntax — <code>&amp;nbsp;</code> forces extra spacing that regular spaces collapse.</p>
</div>`
            },
            {
                title: "Introduction to ARIA",
                slug: "introduction-to-aria",
                order: 2,
                content: `## Introduction to ARIA

ARIA (Accessible Rich Internet Applications) is a set of extra attributes that fill in accessibility gaps — mainly for custom, interactive elements that don't have an obvious native HTML equivalent.

**The first rule of ARIA: use it sparingly**

The accessibility community's own guidance is that a real semantic HTML element is *always* better than adding ARIA to a generic one:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">aria-vs-semantic.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ❌ Avoid — reinventing a button with a div --&gt;</span></div>
    <div class="snippet-line">&lt;div role="button" tabindex="0"&gt;Submit&lt;/div&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ✅ Better — a real button already has this built in --&gt;</span></div>
    <div class="snippet-line">&lt;button&gt;Submit&lt;/button&gt;</div>
  </div>
</div>

A native \`<button>\` already comes with keyboard support, focus behavior, and screen reader announcements for free — recreating that manually with a \`<div>\` and ARIA is far more error-prone.

**\`aria-label\`: naming an element with no visible text**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">aria-label.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;button aria-label="Close menu"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;svg&gt;...&lt;/svg&gt; <span class="tok-comment">&lt;!-- just an icon, no visible text --&gt;</span></div>
    <div class="snippet-line">&lt;/button&gt;</div>
  </div>
</div>

Without \`aria-label\`, a screen reader would only announce "button" — giving the user no idea what it actually does. This is the single most common, genuinely useful ARIA attribute.

**\`aria-hidden\`: hiding decorative content**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">aria-hidden.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;p&gt;&lt;span aria-hidden="true"&gt;&#11088;&lt;/span&gt; Featured Product&lt;/p&gt;</div>
  </div>
</div>

\`aria-hidden="true"\` tells screen readers to skip an element entirely — appropriate for purely decorative icons that don't add meaningful information.

> 💡 **Try it:** Add \`aria-label="Search"\` to an \`<input type="text">\` that has no visible \`<label>\` alongside it (like a compact search bar).

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A native semantic element beats a generic one with ARIA added — but <code>aria-label</code> for icon-only buttons and <code>aria-hidden</code> for decorative content are genuinely useful, common exceptions.</p>
</div>`
            },
            {
                title: "Accessibility Best Practices",
                slug: "accessibility-best-practices",
                order: 3,
                content: `## Accessibility Best Practices

Beyond specific attributes, a handful of habits make a huge accessibility difference across an entire site — most of them costing very little extra effort once they become routine.

**Meaningful \`alt\` text**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">good-alt-text.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ❌ Vague, unhelpful --&gt;</span></div>
    <div class="snippet-line">&lt;img src="chart.png" alt="image"&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ✅ Describes what the image actually shows --&gt;</span></div>
    <div class="snippet-line">&lt;img src="chart.png" alt="Bar chart showing sales growth from January to June"&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ✅ Purely decorative images use an empty alt, not omitted entirely --&gt;</span></div>
    <div class="snippet-line">&lt;img src="divider-line.png" alt=""&gt;</div>
  </div>
</div>

**Logical heading order**

Screen reader users frequently navigate a page by jumping between headings — skipping levels (like \`<h1>\` straight to \`<h4>\`) breaks that navigation, even if it visually looks fine:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">heading-order.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ❌ Skips from h1 to h3 --&gt;</span></div>
    <div class="snippet-line">&lt;h1&gt;Blog Post Title&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;h3&gt;A Subsection&lt;/h3&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- ✅ Follows a logical outline --&gt;</span></div>
    <div class="snippet-line">&lt;h1&gt;Blog Post Title&lt;/h1&gt;</div>
    <div class="snippet-line">&lt;h2&gt;A Subsection&lt;/h2&gt;</div>
  </div>
</div>

**Keyboard accessibility**

Every interactive element — links, buttons, form fields — should be reachable and usable with the \`Tab\` key alone, no mouse required. Native HTML elements (\`<button>\`, \`<a>\`, \`<input>\`) get this automatically; it's only custom, JavaScript-driven widgets that need extra care.

**Color contrast**

Text needs sufficient contrast against its background to be readable, especially for users with low vision — light gray text on a white background is a common accessibility failure that's easy to overlook visually but shows up immediately in contrast-checking tools.

> 💡 **Try it:** Right-click any image on a real website and check its \`alt\` text (via "Inspect") — is it descriptive, or generic like "image1.jpg"?

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Descriptive <code>alt</code> text, logical heading order, full keyboard reachability, and sufficient color contrast are low-effort habits that meaningfully improve accessibility across an entire site.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Basics",
        slug: "css-basics",
        order: 5,
        topics: [
            {
                title: "What Is CSS?",
                slug: "what-is-css",
                order: 0,
                content: `## What Is CSS?

CSS (Cascading Style Sheets) controls how HTML looks — colors, fonts, spacing, layout. Where HTML defines *structure*, CSS defines *presentation*, keeping the two cleanly separated.

**A CSS rule's anatomy**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">css-anatomy.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p {</div>
    <div class="snippet-line">&nbsp;&nbsp;color: blue;</div>
    <div class="snippet-line">&nbsp;&nbsp;font-size: 18px;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">/* ^selector  ^property: value;               */</span></div>
  </div>
</div>

A rule has a **selector** (what to style — here, every \`<p>\`), and a **declaration block** in \`{ }\` containing one or more \`property: value;\` pairs.

**Three ways to add CSS**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">adding-css.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 1. Inline — on a single element (avoid for real projects) --&gt;</span></div>
    <div class="snippet-line">&lt;p style="color: red;"&gt;Text&lt;/p&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 2. Internal — inside a &lt;style&gt; tag in &lt;head&gt; --&gt;</span></div>
    <div class="snippet-line">&lt;style&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;p { color: red; }</div>
    <div class="snippet-line">&lt;/style&gt;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">&lt;!-- 3. External — a separate .css file (standard approach) --&gt;</span></div>
    <div class="snippet-line">&lt;link rel="stylesheet" href="styles.css"&gt;</div>
  </div>
</div>

External stylesheets are the standard for real projects — one file styling every page on your site, kept separate and cacheable by the browser.

**CSS comments**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">css-comments.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">/* This is a CSS comment — it's ignored by the browser */</span></div>
    <div class="snippet-line">p {</div>
    <div class="snippet-line">&nbsp;&nbsp;color: blue; <span class="tok-comment">/* inline comment too */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Create a \`styles.css\` file that makes every \`<h1>\` on a page blue, and link it in an HTML file's \`<head>\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A CSS rule pairs a selector with <code>property: value;</code> declarations — external stylesheets, linked via <code>&lt;link&gt;</code>, are the standard way to add CSS to a real project.</p>
</div>`
            },
            {
                title: "Selectors",
                slug: "selectors",
                order: 1,
                content: `## Selectors

Selectors determine *which* elements a CSS rule applies to. Mastering them is the key to targeting exactly the elements you want, without accidentally styling everything else.

**Basic selector types**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">basic-selectors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: green; }         <span class="tok-comment">/* every &lt;p&gt; element */</span></div>
    <div class="snippet-line">.highlight { color: gold; } <span class="tok-comment">/* every element with class="highlight" */</span></div>
    <div class="snippet-line">#header { color: navy; }    <span class="tok-comment">/* the one element with id="header" */</span></div>
  </div>
</div>

| Selector | Targets |
|----------|---------|
| \`tag\` | Every element of that HTML tag |
| \`.classname\` | Every element with that class |
| \`#idname\` | The single element with that id |

**Combining selectors**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">combined-selectors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p.warning { color: red; } <span class="tok-comment">/* only &lt;p&gt; elements with class="warning" */</span></div>
    <div class="snippet-line">h1, h2, h3 { font-family: sans-serif; } <span class="tok-comment">/* multiple selectors, one rule */</span></div>
  </div>
</div>

**Descendant and child selectors**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">descendant-selectors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">nav a { color: white; }   <span class="tok-comment">/* any &lt;a&gt; anywhere inside &lt;nav&gt; */</span></div>
    <div class="snippet-line">nav &gt; a { color: white; } <span class="tok-comment">/* only &lt;a&gt; that is a DIRECT child of &lt;nav&gt; */</span></div>
  </div>
</div>

A space means "anywhere inside," while \`>\` means "immediate child only" — an important distinction once your HTML gets more deeply nested.

**Pseudo-classes**

Pseudo-classes target elements in a specific *state*, like being hovered over or being the first of its kind:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pseudo-classes.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">a:hover { color: orange; }        <span class="tok-comment">/* while the mouse is over the link */</span></div>
    <div class="snippet-line">li:first-child { font-weight: bold; } <span class="tok-comment">/* only the first &lt;li&gt; in its parent */</span></div>
  </div>
</div>

> 💡 **Try it:** Write a selector that targets every \`<a>\` element inside an element with class \`"sidebar"\`, and changes their color on hover.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Tag, class (<code>.name</code>), and id (<code>#name</code>) selectors can be combined and nested — pseudo-classes like <code>:hover</code> target elements based on state.</p>
</div>`
            },
            {
                title: "The Cascade & Specificity",
                slug: "the-cascade-specificity",
                order: 2,
                content: `## The Cascade & Specificity

"Cascading" in CSS refers to how conflicting rules get resolved when multiple selectors could apply to the same element. Understanding this is essential for debugging "why isn't my CSS working?" moments.

**When rules conflict**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">conflicting-rules.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: blue; }</div>
    <div class="snippet-line">p { color: red; }</div>
    <div class="snippet-line"><span class="tok-comment">/* Result: text is red — the later rule wins when specificity ties */</span></div>
  </div>
</div>

**Specificity: which selector "wins"**

When rules conflict, CSS gives priority based on how *specific* a selector is — roughly, IDs beat classes, and classes beat plain tags:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">specificity.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: blue; }             <span class="tok-comment">/* specificity: low */</span></div>
    <div class="snippet-line">.intro { color: green; }       <span class="tok-comment">/* specificity: medium */</span></div>
    <div class="snippet-line">#main-text { color: red; }     <span class="tok-comment">/* specificity: high — this one wins */</span></div>
  </div>
</div>

| Selector type | Specificity weight |
|----------------|---------------------|
| Tag (\`p\`) | Lowest |
| Class (\`.name\`) | Medium |
| ID (\`#name\`) | High |
| Inline \`style=""\` | Highest |

**\`!important\` — use sparingly**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">important.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: blue !important; } <span class="tok-comment">/* overrides almost everything else */</span></div>
  </div>
</div>

\`!important\` forcibly overrides normal specificity rules. It's tempting as a quick fix, but overusing it makes CSS much harder to reason about and debug — reach for a more specific selector first.

> 💡 **Try it:** Given a \`<p class="intro" id="main">\` element, predict which of three conflicting \`p\`, \`.intro\`, and \`#main\` color rules would actually apply.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">When rules conflict, more specific selectors (IDs &gt; classes &gt; tags) win — <code>!important</code> overrides this but should be used sparingly, since it makes debugging harder.</p>
</div>`
            },
            {
                title: "Units of Measurement",
                slug: "units-of-measurement",
                order: 3,
                content: `## Units of Measurement

CSS offers several ways to specify sizes — some fixed, some relative to other values. Choosing the right unit affects how well your design adapts across different screens and settings.

**Absolute units: \`px\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pixels.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">h1 { font-size: 32px; }</div>
  </div>
</div>

\`px\` (pixels) is a fixed size — 32px is always 32px, regardless of context. Simple and predictable, but doesn't scale with a user's font size preferences.

**Relative units: \`em\` and \`rem\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">em-rem.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">html { font-size: 16px; } <span class="tok-comment">/* the root size */</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.card { font-size: 1.5rem; } <span class="tok-comment">/* 1.5 &times; root (16px) = 24px, always */</span></div>
    <div class="snippet-line">.card p { font-size: 1.2em; } <span class="tok-comment">/* 1.2 &times; the .card's own font-size */</span></div>
  </div>
</div>

\`rem\` is always relative to the root \`<html>\` font size — predictable no matter how deeply nested an element is. \`em\` is relative to its *own* element's font size, which means it can compound unexpectedly in nested elements. Most developers default to \`rem\` for this reason.

**Percentages and viewport units**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">percent-viewport.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container { width: 80%; }   <span class="tok-comment">/* 80% of the parent element's width */</span></div>
    <div class="snippet-line">.hero { height: 100vh; }     <span class="tok-comment">/* 100% of the browser viewport height */</span></div>
    <div class="snippet-line">.banner { width: 50vw; }     <span class="tok-comment">/* 50% of the browser viewport width */</span></div>
  </div>
</div>

\`vh\`/\`vw\` (viewport height/width) are especially useful for full-screen sections — \`100vh\` always fills the exact visible browser height, regardless of content.

> 💡 **Try it:** Set a \`<div>\`'s \`height\` to \`100vh\` and its \`width\` to \`50%\` — resize your browser window and watch how each behaves differently.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>px</code> is fixed, <code>rem</code>/<code>em</code> scale relative to font size (prefer <code>rem</code> for predictability), and <code>%</code>/<code>vh</code>/<code>vw</code> scale relative to the parent or viewport.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Box Model",
        slug: "css-box-model",
        order: 6,
        topics: [
            {
                title: "Understanding the Box Model",
                slug: "understanding-the-box-model",
                order: 0,
                content: `## Understanding the Box Model

Every single HTML element is rendered as a rectangular box — the box model describes what makes up that box: its content, and the space around it. This concept underlies almost everything about CSS layout.

**The four layers**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">box-model-layers.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 200px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 20px;</div>
    <div class="snippet-line">&nbsp;&nbsp;border: 2px solid black;</div>
    <div class="snippet-line">&nbsp;&nbsp;margin: 10px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

From the inside out:

| Layer | What it is |
|-------|------------|
| Content | The actual text or elements inside |
| Padding | Space between the content and the border |
| Border | A visible (or invisible) line around the padding |
| Margin | Space outside the border, separating this box from others |

**Visualizing it**

Think of a framed photo on a wall: the photo is the *content*, the mat around it is the *padding*, the frame itself is the *border*, and the empty wall space around the frame is the *margin*.

**Why this matters**

Every layout bug — elements too close together, unexpected spacing, things not lining up — almost always traces back to a misunderstanding of how padding, border, and margin interact for a specific element.

> 💡 **Try it:** Create a \`<div>\` with \`padding: 20px\`, a \`2px solid\` border, and \`margin: 15px\` — inspect it in your browser's DevTools to see the box model diagram.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Every element is a box made of content, padding, border, and margin, from the inside out — understanding this order is the foundation for debugging almost any layout issue.</p>
</div>`
            },
            {
                title: "Padding & Margin",
                slug: "padding-margin",
                order: 1,
                content: `## Padding & Margin

Padding and margin both add space, but on opposite sides of the border — padding is *inside* the box, margin is *outside* it. Each can be set as a single value or targeted per-side.

**Setting all sides at once**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">padding-margin-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 20px; <span class="tok-comment">/* all four sides */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;margin: 15px;  <span class="tok-comment">/* all four sides */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Targeting individual sides**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">individual-sides.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;padding-top: 10px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding-right: 20px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding-bottom: 10px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding-left: 20px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**The shorthand order: top, right, bottom, left**

A single \`padding\`/\`margin\` line can set all four sides at once, in clockwise order starting from the top:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">shorthand-order.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;margin: 10px 20px 10px 20px; <span class="tok-comment">/* top right bottom left */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 10px 20px;          <span class="tok-comment">/* top/bottom, then left/right */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

With two values, the first applies to top/bottom and the second to left/right — a common, convenient shortcut.

**Centering with \`margin: auto\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">margin-auto.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 600px;</div>
    <div class="snippet-line">&nbsp;&nbsp;margin: 0 auto; <span class="tok-comment">/* 0 top/bottom, auto left/right — centers horizontally */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Give a \`<div>\` a fixed \`width\`, then center it on the page using \`margin: 0 auto\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Padding sits inside the border, margin sits outside it — both accept shorthand values in top/right/bottom/left order, and <code>margin: 0 auto</code> horizontally centers a fixed-width block.</p>
</div>`
            },
            {
                title: "Borders & box-sizing",
                slug: "borders-box-sizing",
                order: 2,
                content: `## Borders & box-sizing

Borders add a visible outline to a box, and \`box-sizing\` controls one of the most confusing parts of the box model: whether padding and border are added *on top of* your specified width, or included *within* it.

**Border shorthand**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">border-basics.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;border: 2px solid #333; <span class="tok-comment">/* width style color */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;border-radius: 8px;     <span class="tok-comment">/* rounds the corners */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**The default box-sizing problem**

By default, \`width\` only sets the *content* area — padding and border get added on top, making the box wider than you specified:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">content-box-problem.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 200px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 20px;</div>
    <div class="snippet-line">&nbsp;&nbsp;border: 5px solid black;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">/* actual rendered width: 200 + 20+20 + 5+5 = 250px, not 200px! */</span></div>
  </div>
</div>

**The \`box-sizing: border-box\` fix**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">border-box-fix.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;box-sizing: border-box;</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 200px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 20px;</div>
    <div class="snippet-line">&nbsp;&nbsp;border: 5px solid black;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">/* actual rendered width: exactly 200px — padding/border now included */</span></div>
  </div>
</div>

\`border-box\` makes \`width\` include padding and border, so your specified size is always the actual rendered size — far more predictable, which is why most projects apply it globally.

**A common global reset**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">global-border-box.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">* {</div>
    <div class="snippet-line">&nbsp;&nbsp;box-sizing: border-box;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

The \`*\` selector targets *every* element on the page — applying \`border-box\` this broadly, right at the top of a stylesheet, is an extremely common first step in real projects.

> 💡 **Try it:** Build two boxes with identical \`width\`, \`padding\`, and \`border\` — set one to \`box-sizing: content-box\` (the default) and the other to \`border-box\`, then compare their actual rendered widths.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>box-sizing: border-box</code> makes <code>width</code> include padding and border, avoiding unexpectedly oversized boxes — applying it globally with <code>* { box-sizing: border-box; }</code> is standard practice.</p>
</div>`
            },
            {
                title: "Display Types",
                slug: "display-types",
                order: 3,
                content: `## Display Types

The \`display\` property controls how an element behaves in the page's layout flow — whether it stacks on its own line, sits inline with text, or disappears entirely.

**\`block\` vs. \`inline\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">block-vs-inline.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">div { display: block; }  <span class="tok-comment">/* takes the full width, stacks vertically — the default for &lt;div&gt;, &lt;p&gt;, &lt;h1&gt; */</span></div>
    <div class="snippet-line">span { display: inline; } <span class="tok-comment">/* only as wide as its content, flows with surrounding text */</span></div>
  </div>
</div>

A key difference: \`block\` elements accept \`width\`/\`height\`/vertical \`margin\`, while \`inline\` elements largely ignore those — sizing is determined entirely by content.

**\`inline-block\` — the best of both**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">inline-block.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.badge {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: inline-block;</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 100px;</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 8px;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">/* flows like inline elements, but respects width/height/margin like block */</span></div>
  </div>
</div>

**Hiding an element**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">display-none.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.hidden {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: none; <span class="tok-comment">/* removed entirely — takes up no space at all */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`display: none\` is different from just making something invisible — the element is removed from the layout completely, as if it never existed.

**A quick reference**

| Value | Behavior |
|-------|----------|
| \`block\` | Full width, own line |
| \`inline\` | Flows with text, no width/height |
| \`inline-block\` | Flows with text, but accepts width/height |
| \`none\` | Removed from layout entirely |

> 💡 **Try it:** Give three \`<span>\` elements \`display: inline-block\` with a fixed \`width\` and background color — notice how they now sit side by side, still respecting their set size.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>display</code> controls layout flow — <code>block</code> stacks full-width, <code>inline</code> flows with text ignoring size, <code>inline-block</code> combines both, and <code>none</code> removes the element entirely.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Colors & Typography",
        slug: "css-colors-typography",
        order: 7,
        topics: [
            {
                title: "Color Formats",
                slug: "color-formats",
                order: 0,
                content: `## Color Formats

CSS supports several ways to specify color, from plain named colors to precise numeric formats. Knowing when to use each makes styling — and communicating colors with a design team — much easier.

**Named colors**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">named-colors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: tomato; }</div>
    <div class="snippet-line">div { background-color: lightgray; }</div>
  </div>
</div>

CSS supports 140+ named colors — convenient for quick prototyping, but limited when you need an exact brand color.

**Hex codes**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hex-colors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: #FF6347; }        <span class="tok-comment">/* same red-orange as "tomato" */</span></div>
    <div class="snippet-line">div { background-color: #333; } <span class="tok-comment">/* 3-digit shorthand for #333333 */</span></div>
  </div>
</div>

Hex codes represent red, green, and blue values in base 16 — the most common format for exact colors, especially when copying from a design tool like Figma.

**\`rgb()\` and \`rgba()\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">rgb-colors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: rgb(255, 99, 71); }         <span class="tok-comment">/* same tomato red, 0-255 per channel */</span></div>
    <div class="snippet-line">div { background-color: rgba(0, 0, 0, 0.5); } <span class="tok-comment">/* black at 50% opacity */</span></div>
  </div>
</div>

\`rgba()\` adds a fourth value — alpha (opacity), from \`0\` (fully transparent) to \`1\` (fully opaque) — essential for overlays and semi-transparent effects.

**\`hsl()\` — often the most intuitive**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hsl-colors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">p { color: hsl(9, 100%, 64%); } <span class="tok-comment">/* hue, saturation, lightness */</span></div>
  </div>
</div>

HSL describes color as hue (a position on the color wheel, 0-360), saturation, and lightness — which makes it easy to create related shades just by adjusting the lightness percentage.

> 💡 **Try it:** Pick a hex color, then look up its equivalent \`rgb()\` value using your browser's DevTools color picker.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Hex codes are common for exact design colors, while <code>rgba()</code> and <code>hsl()</code> support opacity and more intuitive adjustments respectively — pick the format that fits the task.</p>
</div>`
            },
            {
                title: "Fonts & Text Properties",
                slug: "fonts-text-properties",
                order: 1,
                content: `## Fonts & Text Properties

Typography properties control how text looks — the font family, size, weight, and spacing — and are some of the most frequently used CSS declarations in any project.

**Setting a font family**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">font-family.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">body {</div>
    <div class="snippet-line">&nbsp;&nbsp;font-family: "Helvetica Neue", Arial, sans-serif;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Listing multiple fonts creates a **fallback chain** — the browser tries each one in order, using the first it has available, ending with a generic family (\`sans-serif\`, \`serif\`, \`monospace\`) as a guaranteed last resort.

**Core text properties**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">text-properties.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">h1 {</div>
    <div class="snippet-line">&nbsp;&nbsp;font-size: 2.5rem;</div>
    <div class="snippet-line">&nbsp;&nbsp;font-weight: bold;</div>
    <div class="snippet-line">&nbsp;&nbsp;line-height: 1.2;</div>
    <div class="snippet-line">&nbsp;&nbsp;text-align: center;</div>
    <div class="snippet-line">&nbsp;&nbsp;letter-spacing: 1px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

| Property | Controls |
|----------|-----------|
| \`font-size\` | Text size |
| \`font-weight\` | Boldness (\`normal\`, \`bold\`, or \`100\`-\`900\`) |
| \`line-height\` | Vertical space between lines |
| \`text-align\` | Horizontal alignment (\`left\`, \`center\`, \`right\`) |
| \`letter-spacing\` | Space between individual characters |

**Text decoration and transform**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">text-decoration-transform.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">a {</div>
    <div class="snippet-line">&nbsp;&nbsp;text-decoration: none; <span class="tok-comment">/* removes the default underline */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.label {</div>
    <div class="snippet-line">&nbsp;&nbsp;text-transform: uppercase;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Style a \`<blockquote>\` with a larger \`font-size\`, \`italic\` font-style, and a \`line-height\` of \`1.6\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A <code>font-family</code> fallback chain ensures text always renders, and properties like <code>font-size</code>, <code>font-weight</code>, and <code>line-height</code> control the reading experience.</p>
</div>`
            },
            {
                title: "Backgrounds",
                slug: "backgrounds",
                order: 2,
                content: `## Backgrounds

Background properties let you add color, images, or gradients behind an element's content — a core tool for building visual interest into a page.

**Background color and image**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">background-basics.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.hero {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: #1a1a2e;</div>
    <div class="snippet-line">&nbsp;&nbsp;background-image: url("hero-bg.jpg");</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`background-color\` shows if the image fails to load, or shows through any transparent parts of the image — a useful fallback to always include.

**Controlling how a background image displays**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">background-sizing.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.hero {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-image: url("hero-bg.jpg");</div>
    <div class="snippet-line">&nbsp;&nbsp;background-size: cover;</div>
    <div class="snippet-line">&nbsp;&nbsp;background-position: center;</div>
    <div class="snippet-line">&nbsp;&nbsp;background-repeat: no-repeat;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`background-size: cover\` scales the image to fill the entire element, cropping if needed, without distorting its proportions — the most common setting for full-width hero images.

**Gradients**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">gradients.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.banner {</div>
    <div class="snippet-line">&nbsp;&nbsp;background: linear-gradient(to right, #ff6a00, #ee0979);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`linear-gradient()\` blends between colors smoothly — no image file needed at all, and it scales perfectly to any element size.

> 💡 **Try it:** Give a \`<div>\` a \`linear-gradient\` background going from blue to purple, at a \`to bottom right\` direction.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>background-size: cover</code> is the standard way to fill an element with an image without distortion, and <code>linear-gradient()</code> creates smooth color blends without needing an image file.</p>
</div>`
            },
            {
                title: "CSS Variables",
                slug: "css-variables",
                order: 3,
                content: `## CSS Variables

CSS custom properties (commonly called CSS variables) let you define a reusable value once and reference it throughout your stylesheet — invaluable for maintaining consistent colors, spacing, and fonts across a whole project.

**Defining and using a variable**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">css-variables-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">:root {</div>
    <div class="snippet-line">&nbsp;&nbsp;--primary-color: #4361ee;</div>
    <div class="snippet-line">&nbsp;&nbsp;--spacing-unit: 16px;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.button {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: var(--primary-color);</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: var(--spacing-unit);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`:root\` targets the top-level element of the document — defining variables here makes them available everywhere. Every variable name starts with \`--\`, and is read using \`var(--name)\`.

**Why this matters**

Without variables, changing a brand color means finding and replacing every instance of that color across your whole stylesheet. With a variable, you change it in exactly one place:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">variable-reuse.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">:root {</div>
    <div class="snippet-line">&nbsp;&nbsp;--primary-color: #4361ee;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.button { background-color: var(--primary-color); }</div>
    <div class="snippet-line">a { color: var(--primary-color); }</div>
    <div class="snippet-line">.badge { border-color: var(--primary-color); }</div>
    <div class="snippet-line"><span class="tok-comment">/* change --primary-color once, all three update automatically */</span></div>
  </div>
</div>

**A fallback value**

\`var()\` accepts an optional second argument, used if the variable isn't defined:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">variable-fallback.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;color: var(--text-color, black); <span class="tok-comment">/* uses black if --text-color isn't set */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Define \`--main-bg\`, \`--main-text\`, and \`--accent\` variables in \`:root\`, then use all three across a few different selectors.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">CSS variables (<code>--name</code>, defined in <code>:root</code>, used with <code>var(--name)</code>) let you update a value once and have it apply everywhere it's referenced.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Flexbox",
        slug: "css-flexbox",
        order: 8,
        topics: [
            {
                title: "Introduction to Flexbox",
                slug: "introduction-to-flexbox",
                order: 0,
                content: `## Introduction to Flexbox

Flexbox is a layout system built for arranging items in a single row or column, automatically handling spacing, alignment, and sizing that used to require awkward workarounds. It's one of the most-used CSS tools in modern web development.

**Activating flexbox**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flexbox-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flexbox-html.html</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">&lt;div class="container"&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;div&gt;Item 1&lt;/div&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;div&gt;Item 2&lt;/div&gt;</div>
    <div class="snippet-line">&nbsp;&nbsp;&lt;div&gt;Item 3&lt;/div&gt;</div>
    <div class="snippet-line">&lt;/div&gt;</div>
  </div>
</div>

The moment \`display: flex\` is applied to \`.container\`, its direct children automatically line up side by side in a row — no floats, no manual positioning required.

**Container vs. items**

Flexbox involves two roles: the **container** (the parent with \`display: flex\`) and the **items** (its direct children). Properties for arranging items as a group go on the container; properties for individual item behavior go on the items themselves — this distinction matters throughout the whole chapter.

**Why flexbox replaced older techniques**

Before flexbox, centering something vertically, or making a row of boxes equal height, required fragile hacks. Flexbox handles both in a couple of lines — which is why it became the default choice for most one-dimensional layouts (a single row or column).

> 💡 **Try it:** Create a \`<div class="container">\` with three child \`<div>\`s, apply \`display: flex\`, and watch them align in a row.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>display: flex</code> on a container automatically arranges its direct children in a row — container-level properties control the group, item-level properties control individuals.</p>
</div>`
            },
            {
                title: "The Main Axis — justify-content & flex-direction",
                slug: "the-main-axis-justify-content-flex-direction",
                order: 1,
                content: `## The Main Axis — justify-content & flex-direction

Flexbox thinks in terms of a **main axis** — by default, horizontal — and \`justify-content\` controls how items are spaced along it.

**\`flex-direction\`: row or column**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flex-direction.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;flex-direction: row; <span class="tok-comment">/* default — left to right */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.sidebar {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;flex-direction: column; <span class="tok-comment">/* stacked top to bottom instead */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

Switching to \`column\` flips the main axis to vertical — every property that follows in this chapter still applies, just along the new direction.

**\`justify-content\`: spacing along the main axis**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">justify-content.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;justify-content: space-between;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

| Value | Effect |
|-------|--------|
| \`flex-start\` | Items packed at the start (default) |
| \`center\` | Items packed in the center |
| \`flex-end\` | Items packed at the end |
| \`space-between\` | Equal space *between* items, none at the edges |
| \`space-around\` | Equal space around every item, including edges |

**A common pattern: navbar layout**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">navbar-justify.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.navbar {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;justify-content: space-between; <span class="tok-comment">/* logo on the left, links on the right */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Build a \`<div>\` with three child boxes, set \`justify-content: center\`, then change it to \`space-around\` and compare the spacing.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>flex-direction</code> sets the main axis (row or column), and <code>justify-content</code> controls how items are spaced along that axis.</p>
</div>`
            },
            {
                title: "The Cross Axis — align-items & align-self",
                slug: "the-cross-axis-align-items-align-self",
                order: 2,
                content: `## The Cross Axis — align-items & align-self

While \`justify-content\` controls the main axis, \`align-items\` controls the **cross axis** — perpendicular to the main one. This is flexbox's famous solution to vertical centering.

**\`align-items\`: cross-axis alignment for all items**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">align-items.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;height: 300px;</div>
    <div class="snippet-line">&nbsp;&nbsp;align-items: center; <span class="tok-comment">/* vertically centers items, since main axis is horizontal */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

| Value | Effect |
|-------|--------|
| \`stretch\` | Items stretch to fill the container's cross-axis size (default) |
| \`flex-start\` | Items align to the start of the cross axis |
| \`center\` | Items align to the center of the cross axis |
| \`flex-end\` | Items align to the end of the cross axis |

**The famous centering combo**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">perfect-centering.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;justify-content: center; <span class="tok-comment">/* horizontal centering */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;align-items: center;     <span class="tok-comment">/* vertical centering */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;height: 100vh;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

This two-line combination — genuinely both horizontal *and* vertical centering — replaced pages of older CSS hacks and is one of flexbox's most celebrated uses.

**\`align-self\`: overriding one item**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">align-self.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;align-items: center;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.special-item {</div>
    <div class="snippet-line">&nbsp;&nbsp;align-self: flex-end; <span class="tok-comment">/* just this one item breaks from the group alignment */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Build a full-height \`<div class="container">\` and perfectly center a single child box, both horizontally and vertically.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>align-items</code> controls cross-axis alignment for the whole group, and combined with <code>justify-content: center</code>, it's the standard way to perfectly center content both ways.</p>
</div>`
            },
            {
                title: "Sizing Items — flex-grow, flex-shrink & flex-wrap",
                slug: "sizing-items-flex-grow-flex-shrink-flex-wrap",
                order: 3,
                content: `## Sizing Items — flex-grow, flex-shrink & flex-wrap

Beyond alignment, flexbox controls how individual items grow, shrink, or wrap onto new lines when space runs out.

**\`flex-grow\`: sharing extra space**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flex-grow.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.item {</div>
    <div class="snippet-line">&nbsp;&nbsp;flex-grow: 1; <span class="tok-comment">/* all items grow equally to fill leftover space */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.item.featured {</div>
    <div class="snippet-line">&nbsp;&nbsp;flex-grow: 2; <span class="tok-comment">/* this one grows twice as much as the others */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

By default, \`flex-grow\` is \`0\` — items only take up as much space as their content needs. Setting it to \`1\` (or higher) lets an item expand to absorb any leftover space in the container.

**The \`flex\` shorthand**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flex-shorthand.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.item {</div>
    <div class="snippet-line">&nbsp;&nbsp;flex: 1; <span class="tok-comment">/* shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0; */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`flex: 1\` on every item is an extremely common pattern for creating equal-width columns that automatically share all available space.

**\`flex-wrap\`: allowing items onto new lines**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">flex-wrap.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;flex-wrap: wrap; <span class="tok-comment">/* items move to a new line instead of shrinking to fit */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;gap: 16px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

By default, flex items all try to squeeze onto one line, shrinking as needed. \`flex-wrap: wrap\` lets them flow onto additional lines instead — essential for card grids and responsive layouts.

**\`gap\`: spacing between items**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">gap.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: flex;</div>
    <div class="snippet-line">&nbsp;&nbsp;gap: 20px; <span class="tok-comment">/* clean spacing between items, no margin hacks needed */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`gap\` replaced older techniques (like adding margin to every item except the last) with one clean, reliable property.

> 💡 **Try it:** Build a \`<div class="container">\` with \`flex-wrap: wrap\` and \`gap: 12px\`, containing six fixed-width child boxes — resize the container and watch them reflow.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>flex: 1</code> creates equal-sharing items, <code>flex-wrap: wrap</code> lets items flow onto new lines, and <code>gap</code> cleanly spaces items without margin workarounds.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Grid",
        slug: "css-grid",
        order: 9,
        topics: [
            {
                title: "Introduction to Grid",
                slug: "introduction-to-grid",
                order: 0,
                content: `## Introduction to Grid

CSS Grid is a layout system built for two-dimensional layouts — rows *and* columns at the same time. Where flexbox excels at a single row or column, grid is the right tool once you're laying out a genuine grid of content.

**Activating grid**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">grid-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: 200px 200px 200px;</div>
    <div class="snippet-line">&nbsp;&nbsp;gap: 16px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`grid-template-columns\` defines the column structure — here, three fixed 200px columns. Child elements automatically flow into this grid, filling each cell in order.

**Flexbox vs. Grid: when to use which**

Flexbox thinks in one direction at a time (either a row or a column). Grid thinks in both directions simultaneously — defining a full structure of rows and columns up front. A common rule of thumb: reach for flexbox when aligning items in a line (like a navbar), and grid when arranging content into an actual grid (like a photo gallery or dashboard layout).

**The \`fr\` unit**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fr-unit.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: 1fr 1fr 1fr; <span class="tok-comment">/* three equal, flexible columns */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`fr\` (fraction) is a unit built specifically for grid — it divides available space proportionally, without you needing to calculate exact pixel or percentage widths.

> 💡 **Try it:** Create a \`<div class="container">\` with six child boxes, set \`display: grid\` and \`grid-template-columns: 1fr 1fr 1fr\`, and watch them arrange into a 3-column grid.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>display: grid</code> with <code>grid-template-columns</code> defines a two-dimensional layout — use grid for genuine row-and-column structures, flexbox for single-direction alignment.</p>
</div>`
            },
            {
                title: "Defining Rows & Columns",
                slug: "defining-rows-columns",
                order: 1,
                content: `## Defining Rows & Columns

Beyond simple equal-width columns, grid gives you precise control over both dimensions — mixing fixed and flexible sizes, and defining explicit row heights too.

**Mixing fixed and flexible columns**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">mixed-columns.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.layout {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: 250px 1fr; <span class="tok-comment">/* fixed sidebar, flexible main content */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

This single line builds a classic sidebar layout — a fixed 250px sidebar, and the main content area automatically filling every remaining pixel.

**Defining rows**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">grid-rows.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.page {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-rows: 80px 1fr 100px; <span class="tok-comment">/* header, content, footer */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;height: 100vh;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**The \`repeat()\` function**

For many equal-sized tracks, \`repeat()\` avoids typing the same value over and over:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">repeat-function.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.gallery {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: repeat(4, 1fr); <span class="tok-comment">/* same as: 1fr 1fr 1fr 1fr */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;gap: 12px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Auto-fit responsive grids**

Combined with \`minmax()\`, \`repeat()\` can create a grid that automatically fits as many columns as space allows — no media query needed:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">auto-fit-grid.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.gallery {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</div>
    <div class="snippet-line">&nbsp;&nbsp;gap: 16px;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

This reads as: "fit as many columns as possible, each at least 200px wide, and stretch them evenly to fill any leftover space." It's one of grid's most powerful, widely-used patterns.

> 💡 **Try it:** Build a photo gallery layout with \`repeat(auto-fit, minmax(150px, 1fr))\` and resize your browser window to watch the column count adjust automatically.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>repeat(auto-fit, minmax(200px, 1fr))</code> creates a grid that automatically adjusts its column count to available space — one of grid's most useful responsive patterns.</p>
</div>`
            },
            {
                title: "Placing & Spanning Items",
                slug: "placing-spanning-items",
                order: 2,
                content: `## Placing & Spanning Items

Grid lets you position individual items precisely — spanning multiple columns or rows, or jumping to a specific location — rather than always relying on automatic flow.

**Spanning multiple columns**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">grid-column-span.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: repeat(3, 1fr);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.featured {</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-column: span 2; <span class="tok-comment">/* this item takes up 2 of the 3 columns */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Precise placement with line numbers**

Grid lines are numbered starting at \`1\` — you can place an item using exact start and end line numbers instead of just spanning:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">grid-line-placement.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.header {</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-column: 1 / 4; <span class="tok-comment">/* from line 1 to line 4 — spans across 3 columns */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;grid-row: 1 / 2;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Named grid areas**

For complex layouts, named areas make the structure self-documenting — you literally draw the layout as ASCII art in your CSS:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">grid-template-areas.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.page {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: 200px 1fr;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-areas:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;"sidebar header"</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;"sidebar main"</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;"sidebar footer";</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.sidebar { grid-area: sidebar; }</div>
    <div class="snippet-line">.header  { grid-area: header; }</div>
    <div class="snippet-line">.main    { grid-area: main; }</div>
    <div class="snippet-line">.footer  { grid-area: footer; }</div>
  </div>
</div>

Each element is assigned to a named area with \`grid-area\`, and the visual shape of \`grid-template-areas\` in the parent makes the whole layout immediately readable, even months later.

> 💡 **Try it:** Sketch a \`grid-template-areas\` layout for a page with a header, a sidebar, main content, and a footer, then match it up with the corresponding \`.header\`, \`.sidebar\`, etc. rules.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>grid-column: span 2</code> spans items across tracks, and named <code>grid-template-areas</code> let you visually sketch a layout directly in CSS, making complex structures self-documenting.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "Responsive Design & Animations",
        slug: "responsive-design-animations",
        order: 10,
        topics: [
            {
                title: "Positioning",
                slug: "positioning",
                order: 0,
                content: `## Positioning

The \`position\` property changes how an element is placed relative to the normal page flow — the foundation for things like sticky headers, dropdown menus, and floating badges.

**The \`position\` values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">position-values.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.static  { position: static; }   <span class="tok-comment">/* default — normal document flow */</span></div>
    <div class="snippet-line">.relative { position: relative; } <span class="tok-comment">/* shifted relative to its own normal position */</span></div>
    <div class="snippet-line">.absolute { position: absolute; } <span class="tok-comment">/* positioned relative to nearest positioned ancestor */</span></div>
    <div class="snippet-line">.fixed   { position: fixed; }    <span class="tok-comment">/* positioned relative to the browser window, stays put on scroll */</span></div>
    <div class="snippet-line">.sticky  { position: sticky; }   <span class="tok-comment">/* normal flow, until scroll passes a threshold, then sticks */</span></div>
  </div>
</div>

**\`relative\` + \`absolute\`: the classic combo**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">relative-absolute.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.card {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: relative; <span class="tok-comment">/* becomes the reference point for children */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.badge {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: absolute;</div>
    <div class="snippet-line">&nbsp;&nbsp;top: 8px;</div>
    <div class="snippet-line">&nbsp;&nbsp;right: 8px; <span class="tok-comment">/* pinned to the top-right corner of .card */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

An \`absolute\`-positioned element looks for the nearest ancestor with \`position: relative\` (or any non-\`static\` value) to position itself against. This pattern — badges, tooltips, overlay icons — is extremely common.

**\`fixed\` vs. \`sticky\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fixed-vs-sticky.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.navbar {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: fixed;</div>
    <div class="snippet-line">&nbsp;&nbsp;top: 0;</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 100%; <span class="tok-comment">/* stays at the top of the viewport always */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.section-heading {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: sticky;</div>
    <div class="snippet-line">&nbsp;&nbsp;top: 0; <span class="tok-comment">/* scrolls normally, then sticks once it hits the top */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Build a \`<div class="card">\` with \`position: relative\`, containing a small \`<span class="badge">\` pinned to its top-right corner with \`position: absolute\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A <code>relative</code> parent with an <code>absolute</code> child is the standard way to pin one element inside another — <code>fixed</code> stays put on scroll, <code>sticky</code> sticks only past a threshold.</p>
</div>`
            },
            {
                title: "Media Queries",
                slug: "media-queries",
                order: 1,
                content: `## Media Queries

Media queries let you apply different CSS depending on the browser's characteristics — most commonly, screen width — making responsive design possible: one site that adapts to phones, tablets, and desktops.

**Basic media query syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">media-query-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;width: 90%;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">@media (max-width: 768px) {</div>
    <div class="snippet-line">&nbsp;&nbsp;.container {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;width: 100%; <span class="tok-comment">/* overrides the rule above, but only under 768px wide */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Everything inside the \`@media\` block only applies when the condition is true — here, when the viewport is 768px wide or narrower (a common tablet/mobile breakpoint).

**Mobile-first design**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">mobile-first.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">/* Base styles — apply to mobile first */</span></div>
    <div class="snippet-line">.grid {</div>
    <div class="snippet-line">&nbsp;&nbsp;display: grid;</div>
    <div class="snippet-line">&nbsp;&nbsp;grid-template-columns: 1fr;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">/* Then progressively enhance for larger screens */</span></div>
    <div class="snippet-line">@media (min-width: 600px) {</div>
    <div class="snippet-line">&nbsp;&nbsp;.grid { grid-template-columns: 1fr 1fr; }</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">@media (min-width: 1000px) {</div>
    <div class="snippet-line">&nbsp;&nbsp;.grid { grid-template-columns: 1fr 1fr 1fr; }</div>
    <div class="snippet-line">}</div>
  </div>
</div>

"Mobile-first" means writing your base (unqualified) styles for small screens, then layering on \`min-width\` media queries to add complexity as screen size grows. It's the recommended approach for most projects, since more people now browse on mobile devices than desktop.

**Common breakpoints**

| Breakpoint | Roughly targets |
|-----------|-------------------|
| \`480px\` | Small phones |
| \`768px\` | Tablets |
| \`1024px\` | Small laptops |
| \`1200px+\` | Desktops |

These aren't official standards — treat them as a starting point, and adjust based on where your own design actually starts to break.

> 💡 **Try it:** Give a \`<div>\` a \`background-color\` of blue by default, and use a media query to turn it red when the viewport is under \`500px\` wide.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>@media (max-width/min-width: ...)</code> applies CSS conditionally based on viewport size — mobile-first design starts with base styles for small screens and adds complexity with <code>min-width</code> queries.</p>
</div>`
            },
            {
                title: "Transitions",
                slug: "transitions",
                order: 2,
                content: `## Transitions

CSS transitions animate a property change smoothly over time, instead of it snapping instantly — a small touch that makes interfaces feel noticeably more polished, for very little code.

**Basic transition syntax**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">transition-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.button {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: #4361ee;</div>
    <div class="snippet-line">&nbsp;&nbsp;transition: background-color 0.3s ease;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.button:hover {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: #3651d4;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`transition\` takes the property to animate, a duration, and an easing curve. Without it, the color change on hover would happen instantly; with it, the browser smoothly blends between the two colors over 0.3 seconds.

**Transitioning multiple properties**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">transition-multiple.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.card {</div>
    <div class="snippet-line">&nbsp;&nbsp;transform: scale(1);</div>
    <div class="snippet-line">&nbsp;&nbsp;box-shadow: 0 2px 4px rgba(0,0,0,0.1);</div>
    <div class="snippet-line">&nbsp;&nbsp;transition: transform 0.2s ease, box-shadow 0.2s ease;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.card:hover {</div>
    <div class="snippet-line">&nbsp;&nbsp;transform: scale(1.03);</div>
    <div class="snippet-line">&nbsp;&nbsp;box-shadow: 0 8px 16px rgba(0,0,0,0.2);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Separate \`property duration easing\` groups, comma-separated, let different properties animate with different timing if needed — though matching them, as above, is common for a cohesive feel.

**Easing functions**

| Value | Feel |
|-------|------|
| \`linear\` | Constant speed throughout |
| \`ease\` | Starts slow, speeds up, ends slow (default, natural-feeling) |
| \`ease-in\` | Starts slow, ends fast |
| \`ease-out\` | Starts fast, ends slow |

> 💡 **Try it:** Add \`transition: transform 0.3s ease;\` to a \`<div class="card">\`, then use \`:hover { transform: scale(1.05); }\` to make it grow slightly on hover.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>transition: property duration easing;</code> smoothly animates a property change, most often paired with <code>:hover</code> for a more polished, responsive-feeling interface.</p>
</div>`
            },
            {
                title: "Keyframe Animations",
                slug: "keyframe-animations",
                order: 3,
                content: `## Keyframe Animations

While \`transition\` animates between two states (like normal and \`:hover\`), \`@keyframes\` defines a full, multi-step animation sequence that can run automatically, repeat, or loop — independent of user interaction.

**Defining keyframes**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">keyframes-basic.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">@keyframes fadeIn {</div>
    <div class="snippet-line">&nbsp;&nbsp;from {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;to {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;opacity: 1;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.fade-in-element {</div>
    <div class="snippet-line">&nbsp;&nbsp;animation: fadeIn 1s ease;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`@keyframes\` names an animation and defines what happens \`from\` (0%) \`to\` (100%) — then \`animation: name duration easing\` applies it to an element.

**Multiple steps with percentages**

For more than two states, use percentage checkpoints instead of just \`from\`/\`to\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">keyframes-percentages.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">@keyframes bounce {</div>
    <div class="snippet-line">&nbsp;&nbsp;0%   { transform: translateY(0); }</div>
    <div class="snippet-line">&nbsp;&nbsp;50%  { transform: translateY(-20px); }</div>
    <div class="snippet-line">&nbsp;&nbsp;100% { transform: translateY(0); }</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.icon {</div>
    <div class="snippet-line">&nbsp;&nbsp;animation: bounce 1s ease-in-out infinite;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`infinite\` makes the animation loop forever — useful for loading spinners, attention-grabbing icons, and similar continuous effects.

**Common \`animation\` sub-properties**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">animation-properties.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.spinner {</div>
    <div class="snippet-line">&nbsp;&nbsp;animation-name: spin;</div>
    <div class="snippet-line">&nbsp;&nbsp;animation-duration: 1s;</div>
    <div class="snippet-line">&nbsp;&nbsp;animation-timing-function: linear;</div>
    <div class="snippet-line">&nbsp;&nbsp;animation-iteration-count: infinite;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

These can be written individually, as above, or combined into the shorthand \`animation: spin 1s linear infinite;\` — both are equivalent.

> 💡 **Try it:** Write a \`@keyframes spin\` animation that rotates an element from \`0deg\` to \`360deg\` using \`transform: rotate(...)\`, applied with \`animation: spin 2s linear infinite\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>@keyframes</code> defines a multi-step animation sequence, applied with <code>animation: name duration easing</code> — add <code>infinite</code> to loop it continuously, independent of user interaction.</p>
</div>`
            },
        ],
    },
    {
        language: "HTML & CSS",
        title: "CSS Advanced Selectors & Effects",
        slug: "css-advanced-selectors-effects",
        order: 11,
        topics: [
            {
                title: "Pseudo-Elements",
                slug: "pseudo-elements",
                order: 0,
                content: `## Pseudo-Elements

Pseudo-elements let you style a specific *part* of an element, or insert extra content, without adding any additional HTML. They're written with a double colon (\`::\`) — distinct from pseudo-classes like \`:hover\`, which target a *state* rather than a part.

**\`::before\` and \`::after\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">before-after.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.quote::before {</div>
    <div class="snippet-line">&nbsp;&nbsp;content: "\\201C"; <span class="tok-comment">/* opening curly quote character */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.quote::after {</div>
    <div class="snippet-line">&nbsp;&nbsp;content: "\\201D"; <span class="tok-comment">/* closing curly quote character */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`::before\` inserts generated content immediately before an element's actual content; \`::after\` inserts it immediately after. The \`content\` property is required — without it, nothing renders, even if other styles are set.

**A common use: decorative icons**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">before-decoration.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.external-link::after {</div>
    <div class="snippet-line">&nbsp;&nbsp;content: " \\2197";</div>
    <div class="snippet-line">&nbsp;&nbsp;font-size: 0.8em;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

This keeps decorative symbols out of your actual HTML content — useful because it means screen readers won't announce them as real text.

**\`::placeholder\` and \`::selection\`**

Other pseudo-elements style specific browser-generated parts of the page:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">placeholder-selection.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">input::placeholder {</div>
    <div class="snippet-line">&nbsp;&nbsp;color: #999;</div>
    <div class="snippet-line">&nbsp;&nbsp;font-style: italic;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">::selection {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: #4361ee;</div>
    <div class="snippet-line">&nbsp;&nbsp;color: white; <span class="tok-comment">/* styles text the user highlights with their cursor */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Add a \`::before\` pseudo-element to a \`<blockquote>\` that inserts a large decorative quotation mark before the text.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>::before</code>/<code>::after</code> insert generated content around an element using CSS alone (requiring the <code>content</code> property), keeping purely decorative content out of your HTML.</p>
</div>`
            },
            {
                title: "Advanced Selectors",
                slug: "advanced-selectors",
                order: 1,
                content: `## Advanced Selectors

Beyond tags, classes, and IDs, CSS offers more precise selectors for targeting elements by attribute, position among siblings, or by excluding certain matches entirely.

**Attribute selectors**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">attribute-selectors.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">input[type="email"] {</div>
    <div class="snippet-line">&nbsp;&nbsp;border-color: blue; <span class="tok-comment">/* only inputs where type="email" */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">a[target="_blank"] {</div>
    <div class="snippet-line">&nbsp;&nbsp;text-decoration: underline; <span class="tok-comment">/* only links that open in a new tab */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**\`:nth-child()\` — targeting by position**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nth-child.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">li:nth-child(2) {</div>
    <div class="snippet-line">&nbsp;&nbsp;font-weight: bold; <span class="tok-comment">/* only the 2nd &lt;li&gt; in its parent */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">tr:nth-child(odd) {</div>
    <div class="snippet-line">&nbsp;&nbsp;background-color: #f5f5f5; <span class="tok-comment">/* classic striped table rows */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">li:nth-child(2n) {</div>
    <div class="snippet-line">&nbsp;&nbsp;color: gray; <span class="tok-comment">/* every 2nd item — same as "even" */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`odd\`/\`even\` are readable shortcuts for the most common striping pattern; \`2n\`, \`3n\`, etc. work like a formula for more specific patterns.

**\`:not()\` — excluding matches**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">not-selector.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">button:not(.disabled) {</div>
    <div class="snippet-line">&nbsp;&nbsp;cursor: pointer; <span class="tok-comment">/* every button EXCEPT ones with class "disabled" */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.list-item:not(:last-child) {</div>
    <div class="snippet-line">&nbsp;&nbsp;border-bottom: 1px solid #eee; <span class="tok-comment">/* a divider on every item except the last */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

That last pattern — a divider on every item but the last — is an extremely common, clean way to avoid an unwanted trailing border.

> 💡 **Try it:** Style a \`<ul>\` of list items so every *odd* item has a light gray background, using \`:nth-child(odd)\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Attribute selectors (<code>[type="..."]</code>), <code>:nth-child()</code>, and <code>:not()</code> allow precise targeting by attribute value, sibling position, or exclusion — without adding extra classes to your HTML.</p>
</div>`
            },
            {
                title: "Overflow, z-index & Stacking",
                slug: "overflow-z-index-stacking",
                order: 2,
                content: `## Overflow, z-index & Stacking

\`overflow\` controls what happens when content is too big for its container, and \`z-index\` controls which elements appear on top when they overlap — two properties that solve very common, very visible layout problems.

**\`overflow\`: handling content that doesn't fit**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">overflow.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.box {</div>
    <div class="snippet-line">&nbsp;&nbsp;height: 150px;</div>
    <div class="snippet-line">&nbsp;&nbsp;overflow: auto; <span class="tok-comment">/* scrollbar appears only if content overflows */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

| Value | Behavior |
|-------|----------|
| \`visible\` | Content spills out of the box (default) |
| \`hidden\` | Overflow is clipped, invisibly |
| \`scroll\` | Always shows scrollbars, even if not needed |
| \`auto\` | Scrollbars appear only when content actually overflows |

**A common use: clipped image corners**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">overflow-hidden-radius.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.avatar-frame {</div>
    <div class="snippet-line">&nbsp;&nbsp;border-radius: 50%;</div>
    <div class="snippet-line">&nbsp;&nbsp;overflow: hidden; <span class="tok-comment">/* clips the image into a perfect circle */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**\`z-index\`: controlling stacking order**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">z-index.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.modal-overlay {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: fixed;</div>
    <div class="snippet-line">&nbsp;&nbsp;z-index: 10; <span class="tok-comment">/* sits above regular page content */</span></div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">.tooltip {</div>
    <div class="snippet-line">&nbsp;&nbsp;position: absolute;</div>
    <div class="snippet-line">&nbsp;&nbsp;z-index: 20; <span class="tok-comment">/* sits above the modal too */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`z-index\` only works on positioned elements (\`relative\`, \`absolute\`, \`fixed\`, or \`sticky\`) — it's ignored entirely on \`static\` (default) elements. Higher numbers stack on top of lower ones.

> 💡 **Try it:** Build two overlapping \`<div>\`s using \`position: absolute\`, and use \`z-index\` to control which one appears on top.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>overflow</code> controls content that doesn't fit its container, and <code>z-index</code> (only effective on positioned elements) controls which overlapping elements appear on top.</p>
</div>`
            },
            {
                title: "Shadows & Styling Lists/Forms",
                slug: "shadows-styling-lists-forms",
                order: 3,
                content: `## Shadows & Styling Lists/Forms

A few remaining visual properties round out everyday CSS — shadows for depth, and overriding the browser's default list and form styling to match your own design.

**\`box-shadow\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">box-shadow.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.card {</div>
    <div class="snippet-line">&nbsp;&nbsp;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-comment">/* horizontal-offset vertical-offset blur-radius color */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

The four values, in order: how far right, how far down, how soft/blurred the edge is, and the shadow's color (usually a low-opacity black or the theme's shadow color).

**\`text-shadow\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">text-shadow.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">.hero-title {</div>
    <div class="snippet-line">&nbsp;&nbsp;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); <span class="tok-comment">/* same syntax as box-shadow */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Removing default list bullets**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">list-style-none.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">nav ul {</div>
    <div class="snippet-line">&nbsp;&nbsp;list-style: none; <span class="tok-comment">/* removes bullets — extremely common for nav menus */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 0;       <span class="tok-comment">/* removes the default left indentation too */</span></div>
    <div class="snippet-line">&nbsp;&nbsp;margin: 0;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Browsers add default bullet points and left padding to every \`<ul>\` — removing both is one of the most common first steps when turning a list into a navigation menu.

**Styling form inputs**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">form-styling.css</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">input[type="text"],</div>
    <div class="snippet-line">input[type="email"] {</div>
    <div class="snippet-line">&nbsp;&nbsp;padding: 10px;</div>
    <div class="snippet-line">&nbsp;&nbsp;border: 1px solid #ccc;</div>
    <div class="snippet-line">&nbsp;&nbsp;border-radius: 6px;</div>
    <div class="snippet-line">&nbsp;&nbsp;font-size: 1rem;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">input:focus {</div>
    <div class="snippet-line">&nbsp;&nbsp;outline: none;</div>
    <div class="snippet-line">&nbsp;&nbsp;border-color: #4361ee; <span class="tok-comment">/* custom focus indicator */</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

If you remove the default \`outline\` on \`:focus\` (as above), always replace it with another clear visual indicator like a border-color change — removing focus styles entirely is a significant accessibility problem for keyboard users.

> 💡 **Try it:** Style a \`<ul class="nav-menu">\` with \`list-style: none\`, and add a subtle \`box-shadow\` to a \`<div class="card">\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>box-shadow</code>/<code>text-shadow</code> add depth, <code>list-style: none</code> is the standard first step for nav menus — and any removed <code>:focus</code> outline must be replaced with another visible indicator.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Java Basics",
        slug: "java-basics",
        order: 0,
        topics: [
            {
                title: "Introduction to Java",
                slug: "introduction-to-java",
                order: 0,
                content: `## Introduction to Java

Java is a general-purpose, object-oriented programming language known for portability — the promise of "write once, run anywhere." Unlike JavaScript, Java is **compiled** and **statically typed**: your code is checked and converted to bytecode before it ever runs, catching many errors early.

**A minimal Java program**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">HelloWorld.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">HelloWorld</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">void</span> <span class="tok-call">main</span>(String[] args) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span class="tok-string">"Hello, World!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Every Java program needs a \`class\`, and every runnable program needs a \`main\` method — the entry point where execution begins. The class name must match the filename exactly (\`HelloWorld.java\` for \`class HelloWorld\`).

**Compiling and running**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">terminal.sh</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">javac HelloWorld.java <span class="tok-comment">// compiles to HelloWorld.class (bytecode)</span></div>
    <div class="snippet-line">java HelloWorld       <span class="tok-comment">// runs it, prints "Hello, World!"</span></div>
  </div>
</div>

**Compiled vs. interpreted**

Java code is compiled to bytecode, then run by the Java Virtual Machine (JVM) — the same bytecode runs identically on Windows, macOS, or Linux, since each has its own JVM. This is different from JavaScript, which browsers interpret directly without a separate compile step.

> 💡 **Try it:** Write and run a \`HelloWorld\` program that prints your name instead of "Hello, World!".

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Java is compiled to bytecode and run by the JVM, giving "write once, run anywhere" portability — every program needs a class and a <code>main</code> method as its entry point.</p>
</div>`
            },
            {
                title: "Variables & Data Types",
                slug: "variables-data-types",
                order: 1,
                content: `## Variables & Data Types

Java is **statically typed** — every variable's type is declared upfront and never changes. This differs sharply from JavaScript, where a variable can hold any type at any time.

**Declaring variables**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Variables.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 25;</div>
    <div class="snippet-line"><span class="tok-keyword">double</span> price = 19.99;</div>
    <div class="snippet-line"><span class="tok-keyword">boolean</span> isActive = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">String name = <span class="tok-string">"Adaeze"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">char</span> grade = <span class="tok-string">'A'</span>;</div>
  </div>
</div>

**Primitive types**

| Type | Holds | Example |
|------|-------|---------|
| \`int\` | Whole numbers | \`42\` |
| \`double\` | Decimal numbers | \`3.14\` |
| \`boolean\` | \`true\`/\`false\` | \`true\` |
| \`char\` | A single character | \`'A'\` |
| \`long\` | Very large whole numbers | \`10000000000L\` |

\`String\` is technically not primitive (it's an object), but it's used constantly for text, just like a primitive.

**Type mismatch errors**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">type-error.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = <span class="tok-string">"twenty-five"</span>; <span class="tok-comment">// — Compile error: incompatible types</span></div>
  </div>
</div>

Unlike JavaScript, this fails to even *compile* — Java catches the mismatch before the program ever runs, rather than producing a confusing runtime bug.

**\`final\` — Java's constant**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">final-variable.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">final</span> <span class="tok-keyword">double</span> PI = 3.14159;</div>
    <div class="snippet-line">PI = 3.15; <span class="tok-comment">// — Compile error: cannot assign a value to final variable</span></div>
  </div>
</div>

> 💡 **Try it:** Declare an \`int\`, a \`double\`, a \`boolean\`, and a \`String\` variable, then print all four using \`System.out.println()\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Java is statically typed — every variable's type is fixed at declaration, and mismatches are caught at compile time; <code>final</code> creates an unreassignable constant.</p>
</div>`
            },
            {
                title: "Input & Output",
                slug: "input-output",
                order: 2,
                content: `## Input & Output

Reading user input and printing output are two of the first practical skills in any language — Java handles output through \`System.out\`, and input through the \`Scanner\` class.

**Printing output**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">output.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">System.out.println(<span class="tok-string">"This prints with a newline after"</span>);</div>
    <div class="snippet-line">System.out.print(<span class="tok-string">"This prints with no newline"</span>);</div>
  </div>
</div>

**Reading input with \`Scanner\`**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ScannerInput.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> java.util.Scanner;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">ScannerInput</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">void</span> <span class="tok-call">main</span>(String[] args) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;Scanner scanner = <span class="tok-keyword">new</span> Scanner(System.in);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.print(<span class="tok-string">"Enter your name: "</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;String name = scanner.nextLine();</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span class="tok-string">"Hello, "</span> + name + <span class="tok-string">"!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`import java.util.Scanner;\` brings in Java's built-in input class. \`Scanner(System.in)\` connects it to keyboard input, and \`.nextLine()\` reads one full line of text as a \`String\`.

**Reading different types**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">scanner-types.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Scanner scanner = <span class="tok-keyword">new</span> Scanner(System.in);</div>
    <div class="snippet-line">System.out.print(<span class="tok-string">"Enter your age: "</span>);</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> age = scanner.nextInt();</div>
    <div class="snippet-line">System.out.println(<span class="tok-string">"You are "</span> + age + <span class="tok-string">" years old"</span>);</div>
  </div>
</div>

\`.nextInt()\` reads a whole number directly, \`.nextDouble()\` reads a decimal — using the wrong method for the actual input causes a runtime error.

> 💡 **Try it:** Write a program that asks for the user's age using \`Scanner\`, then prints how many years until they turn 100.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>System.out.println()</code> handles output, and Java's <code>Scanner</code> class (with methods like <code>.nextLine()</code>, <code>.nextInt()</code>) handles reading typed user input.</p>
</div>`
            },
            {
                title: "Comments",
                slug: "comments",
                order: 3,
                content: `## Comments

Comments document code without affecting how it runs — Java supports the same two comment styles as many C-family languages.

**Single-line and multi-line comments**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">comments.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">// This is a single-line comment</span></div>
    <div class="snippet-line"><span class="tok-keyword">int</span> score = 100; <span class="tok-comment">// inline comment too</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">/*</span></div>
    <div class="snippet-line"><span class="tok-comment"> * This is a multi-line comment,</span></div>
    <div class="snippet-line"><span class="tok-comment"> * often used for longer explanations.</span></div>
    <div class="snippet-line"><span class="tok-comment"> */</span></div>
  </div>
</div>

**Javadoc comments**

Java has a third style, specifically for documentation tools that auto-generate reference docs from your code:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">javadoc.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">/**</span></div>
    <div class="snippet-line"><span class="tok-comment"> * Calculates the area of a rectangle.</span></div>
    <div class="snippet-line"><span class="tok-comment"> * @param width the rectangle's width</span></div>
    <div class="snippet-line"><span class="tok-comment"> * @param height the rectangle's height</span></div>
    <div class="snippet-line"><span class="tok-comment"> * @return the calculated area</span></div>
    <div class="snippet-line"><span class="tok-comment"> */</span></div>
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">int</span> <span class="tok-call">calculateArea</span>(<span class="tok-keyword">int</span> width, <span class="tok-keyword">int</span> height) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> width * height;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

The \`/** ... */\` style, with \`@param\` and \`@return\` tags, is the convention for documenting public methods in real Java projects.

> 💡 **Try it:** Add a single-line comment explaining what a variable is for, and wrap a short paragraph in a multi-line comment.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Java supports <code>//</code> single-line and <code>/* */</code> multi-line comments, plus a special <code>/** */</code> Javadoc style used to auto-generate documentation for public methods.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Java Operators",
        slug: "java-operators",
        order: 1,
        topics: [
            {
                title: "Arithmetic Operators & Integer Division",
                slug: "arithmetic-operators-integer-division",
                order: 0,
                content: `## Arithmetic Operators & Integer Division

Java's arithmetic operators work similarly to most languages, with one important twist: dividing two \`int\` values truncates any decimal remainder, which trips up many beginners.

**Basic arithmetic**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">arithmetic.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> sum = 5 + 3;        <span class="tok-comment">// 8</span></div>
    <div class="snippet-line"><span class="tok-keyword">int</span> difference = 5 - 3; <span class="tok-comment">// 2</span></div>
    <div class="snippet-line"><span class="tok-keyword">int</span> product = 5 * 3;    <span class="tok-comment">// 15</span></div>
    <div class="snippet-line"><span class="tok-keyword">int</span> quotient = 5 / 3;   <span class="tok-comment">// 1 — integer division truncates!</span></div>
    <div class="snippet-line"><span class="tok-keyword">int</span> remainder = 5 % 3;  <span class="tok-comment">// 2</span></div>
  </div>
</div>

**Fixing integer division with a cast**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">division-cast.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> a = 5;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> b = 2;</div>
    <div class="snippet-line">System.out.println(a / b);        <span class="tok-comment">// 2 — both int, truncates the .5</span></div>
    <div class="snippet-line">System.out.println((<span class="tok-keyword">double</span>) a / b); <span class="tok-comment">// 2.5 — casting one operand to double fixes it</span></div>
  </div>
</div>

\`(double)\` is a **cast** — it temporarily treats \`a\` as a \`double\` for that one calculation, so the division produces a precise decimal result instead of truncating.

> 💡 **Try it:** Divide 7 by 2 as plain \`int\` division, then again after casting one operand to \`double\`, and compare the two results.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Dividing two <code>int</code> values truncates the result — cast one operand to <code>double</code> (or make it a decimal literal) to get a precise decimal answer.</p>
</div>`
            },
            {
                title: "Comparison & Logical Operators",
                slug: "comparison-logical-operators",
                order: 1,
                content: `## Comparison & Logical Operators

Comparison operators produce a boolean result, and logical operators combine or invert those results — the foundation for every conditional statement you'll write.

**Comparison operators**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">comparisons.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 20;</div>
    <div class="snippet-line">System.out.println(age &gt; 18);  <span class="tok-comment">// true</span></div>
    <div class="snippet-line">System.out.println(age == 20); <span class="tok-comment">// true</span></div>
    <div class="snippet-line">System.out.println(age != 21); <span class="tok-comment">// true</span></div>
  </div>
</div>

**\`==\` on objects — a common trap**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">string-equality.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">String a = <span class="tok-keyword">new</span> String(<span class="tok-string">"hello"</span>);</div>
    <div class="snippet-line">String b = <span class="tok-keyword">new</span> String(<span class="tok-string">"hello"</span>);</div>
    <div class="snippet-line">System.out.println(a == b);        <span class="tok-comment">// false! compares object identity, not content</span></div>
    <div class="snippet-line">System.out.println(a.equals(b));   <span class="tok-comment">// true — compares actual content</span></div>
  </div>
</div>

Unlike primitive types, \`==\` on objects (including \`String\`) checks whether two variables point to the *same object in memory*, not whether their contents match.

**Logical operators**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">logical-operators.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">boolean</span> isAdult = age &gt;= 18;</div>
    <div class="snippet-line"><span class="tok-keyword">boolean</span> hasLicense = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">System.out.println(isAdult &amp;&amp; hasLicense); <span class="tok-comment">// true — both must be true</span></div>
    <div class="snippet-line">System.out.println(isAdult || hasLicense); <span class="tok-comment">// true — at least one is true</span></div>
    <div class="snippet-line">System.out.println(!isAdult);              <span class="tok-comment">// false — inverts the value</span></div>
  </div>
</div>

> 💡 **Try it:** Compare two \`String\` objects created with \`new String(...)\` using both \`==\` and \`.equals()\`, and confirm they give different results.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Always use <code>.equals()</code> to compare <code>String</code> content — <code>==</code> on objects checks identity, not equality, which is one of Java's most common beginner bugs.</p>
</div>`
            },
            {
                title: "Type Casting",
                slug: "type-casting",
                order: 2,
                content: `## Type Casting

Casting converts a value from one type to another — either automatically (**widening**) or explicitly (**narrowing**), depending on whether data could be lost.

**Widening — automatic, safe**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">widening.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> wholeNumber = 10;</div>
    <div class="snippet-line"><span class="tok-keyword">double</span> decimal = wholeNumber; <span class="tok-comment">// automatic — int safely fits into double</span></div>
  </div>
</div>

Going from a smaller type (\`int\`) to a larger one (\`double\`) never loses data, so Java allows it automatically, with no special syntax.

**Narrowing — explicit, risky**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">narrowing.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">double</span> price = 19.99;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> roundedDown = (<span class="tok-keyword">int</span>) price; <span class="tok-comment">// explicit cast required</span></div>
    <div class="snippet-line">System.out.println(roundedDown); <span class="tok-comment">// 19 — decimal part is simply cut off, not rounded</span></div>
  </div>
</div>

Going from a larger type to a smaller one (\`double\` to \`int\`) can lose data, so Java forces you to explicitly acknowledge that with \`(int)\` — a compile error otherwise.

**Casting always truncates, never rounds**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">cast-truncates.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">double</span> value = 9.99;</div>
    <div class="snippet-line">System.out.println((<span class="tok-keyword">int</span>) value); <span class="tok-comment">// 9, not 10 — casting always truncates toward zero</span></div>
  </div>
</div>

> 💡 **Try it:** Cast a \`double\` like \`4.7\` down to \`int\`, and confirm it becomes \`4\`, not \`5\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Widening (small &rarr; large type) happens automatically; narrowing (large &rarr; small) requires an explicit cast and always truncates rather than rounds.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Control Flow",
        slug: "control-flow",
        order: 2,
        topics: [
            {
                title: "if / else Statements",
                slug: "if-else-statements",
                order: 0,
                content: `## if / else Statements

Java's \`if\`/\`else\` syntax will look familiar if you've seen JavaScript, with one key structural difference in how it's typically formatted.

**Basic if / else if / else**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">if-else.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> score = 75;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">if</span> (score &gt;= 90) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"A"</span>);</div>
    <div class="snippet-line">} <span class="tok-keyword">else if</span> (score &gt;= 70) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"B"</span>);</div>
    <div class="snippet-line">} <span class="tok-keyword">else</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"C or below"</span>);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Conditions are checked top to bottom, and execution stops at the first one that's true — later conditions are never even checked once a match is found.

**The ternary operator**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ternary.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 20;</div>
    <div class="snippet-line">String status = (age &gt;= 18) ? <span class="tok-string">"adult"</span> : <span class="tok-string">"minor"</span>;</div>
    <div class="snippet-line">System.out.println(status); <span class="tok-comment">// "adult"</span></div>
  </div>
</div>

> 💡 **Try it:** Write an \`if\`/\`else if\`/\`else\` chain that prints "cold", "mild", or "hot" based on a temperature variable.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Conditions in an <code>if</code>/<code>else if</code> chain are checked top to bottom, stopping at the first match — the ternary operator offers a compact one-line alternative for simple two-way branches.</p>
</div>`
            },
            {
                title: "switch Statements",
                slug: "switch-statements",
                order: 1,
                content: `## switch Statements

\`switch\` is a cleaner alternative to a long \`else if\` chain, when you're comparing one variable against several specific, known values.

**Basic switch**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">switch-basic.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> day = 3;</div>
    <div class="snippet-line">String dayName;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">switch</span> (day) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 1:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span class="tok-string">"Monday"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 2:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span class="tok-string">"Tuesday"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 3:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span class="tok-string">"Wednesday"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">default</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span class="tok-string">"Unknown"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">System.out.println(dayName); <span class="tok-comment">// "Wednesday"</span></div>
  </div>
</div>

Without \`break\`, execution "falls through" to the next \`case\`, running its code too — usually a bug, occasionally used intentionally:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fallthrough.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">switch</span> (day) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 6:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 7:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span class="tok-string">"Weekend!"</span>); <span class="tok-comment">// runs for either 6 or 7</span></div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**Modern switch expressions**

Newer Java versions support a more concise \`switch\` expression using \`->\`, which avoids fall-through entirely:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">switch-expression.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">String dayName = <span class="tok-keyword">switch</span> (day) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 1 -&gt; <span class="tok-string">"Monday"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 2 -&gt; <span class="tok-string">"Tuesday"</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">default</span> -&gt; <span class="tok-string">"Unknown"</span>;</div>
    <div class="snippet-line">};</div>
  </div>
</div>

> 💡 **Try it:** Write a \`switch\` statement on a month number (1-12) that prints its season, being careful to add \`break\` after every case.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Traditional <code>switch</code> statements need <code>break</code> to prevent unintended fall-through — modern switch expressions (<code>-&gt;</code> syntax) avoid this risk entirely.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Java Loops",
        slug: "java-loops",
        order: 3,
        topics: [
            {
                title: "for and for-each Loops",
                slug: "for-and-for-each-loops",
                order: 0,
                content: `## for and for-each Loops

The \`for\` loop repeats a block of code a specific number of times — Java's version has identical structure to what you may have seen in other C-family languages.

**Standard for loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> i = 0; i &lt; 5; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 0 1 2 3 4</span></div>
  </div>
</div>

Same three parts as before: initialization (\`int i = 0\`), condition (\`i < 5\`), and update (\`i++\`) — all separated by semicolons.

**Enhanced for-each loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-each.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">String[] fruits = {<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"cherry"</span>};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (String fruit : fruits) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(fruit);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

This reads as "for each \`String fruit\` in \`fruits\`" — cleaner than the index-based version when you don't actually need the index itself.

> 💡 **Try it:** Write a for-each loop that prints each number in an \`int[]\` array, then a standard \`for\` loop that prints only the even indexes.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A standard <code>for</code> loop handles counted iteration, while the enhanced <code>for (Type item : collection)</code> syntax is cleaner whenever you just need each element in turn.</p>
</div>`
            },
            {
                title: "while, do-while, break & continue",
                slug: "while-do-while-break-continue",
                order: 1,
                content: `## while, do-while, break & continue

\`while\` loops repeat as long as a condition stays true — used when the number of iterations isn't known ahead of time.

**while loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">while-loop.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> count = 0;</div>
    <div class="snippet-line"><span class="tok-keyword">while</span> (count &lt; 3) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(count);</div>
    <div class="snippet-line">&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**do-while loop**

Runs the body first, then checks the condition — guaranteeing at least one execution:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">do-while.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> count = 0;</div>
    <div class="snippet-line"><span class="tok-keyword">do</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(count);</div>
    <div class="snippet-line">&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">} <span class="tok-keyword">while</span> (count &lt; 3);</div>
  </div>
</div>

**break and continue**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">break-continue.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> i = 0; i &lt; 10; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i == 5) <span class="tok-keyword">break</span>;    <span class="tok-comment">// exits the loop entirely</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i % 2 == 0) <span class="tok-keyword">continue</span>; <span class="tok-comment">// skips to the next iteration</span></div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(i);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 1, 3 — even numbers skipped, stops entirely at 5</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`while\` loop that prints numbers from 10 down to 1, then add a \`continue\` that skips multiples of 3.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>while</code> checks its condition before running; <code>do-while</code> runs once before checking — both support <code>break</code> to exit early and <code>continue</code> to skip an iteration.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Methods",
        slug: "methods",
        order: 4,
        topics: [
            {
                title: "Defining & Calling Methods",
                slug: "defining-calling-methods",
                order: 0,
                content: `## Defining & Calling Methods

A method is Java's term for a function — a reusable, named block of code.

**Defining a simple method**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">simple-method.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">void</span> <span class="tok-call">greet</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"Hello there!"</span>);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">greet(); <span class="tok-comment">// call it — prints "Hello there!"</span></div>
  </div>
</div>

\`void\` means this method returns nothing. \`static\` (covered more in the OOP chapters) means it belongs to the class itself rather than a specific object.

**Parameters and return values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">params-return.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> result = add(3, 4);</div>
    <div class="snippet-line">System.out.println(result); <span class="tok-comment">// 7</span></div>
  </div>
</div>

Each parameter needs its own type declared (\`String name\`), unlike JavaScript's untyped parameters. The return type (\`int\` here) must match what \`return\` actually sends back — returning a \`String\` from an \`int\`-declared method is a compile error.

**Greeting by name**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">greet-name.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> String <span class="tok-call">greet</span>(String name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> <span class="tok-string">"Hello, "</span> + name + <span class="tok-string">"!"</span>;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">System.out.println(greet(<span class="tok-string">"Amara"</span>)); <span class="tok-comment">// "Hello, Amara!"</span></div>
  </div>
</div>

> 💡 **Try it:** Write a method \`square(int n)\` that returns \`n * n\`, and call it with a few different numbers.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Every Java method declares a return type (or <code>void</code>) and typed parameters — the return type must match exactly what the method actually returns.</p>
</div>`
            },
            {
                title: "Method Overloading",
                slug: "method-overloading",
                order: 1,
                content: `## Method Overloading

Method overloading lets you define multiple methods with the same name but different parameter lists — Java picks the right one automatically based on how you call it.

**Overloading by parameter count**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">overload-count.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b, <span class="tok-keyword">int</span> c) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b + c;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">System.out.println(add(1, 2));    <span class="tok-comment">// 3 — calls the two-parameter version</span></div>
    <div class="snippet-line">System.out.println(add(1, 2, 3)); <span class="tok-comment">// 6 — calls the three-parameter version</span></div>
  </div>
</div>

**Overloading by parameter type**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">overload-type.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">double</span> <span class="tok-call">add</span>(<span class="tok-keyword">double</span> a, <span class="tok-keyword">double</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">System.out.println(add(1, 2));     <span class="tok-comment">// 3 — int version</span></div>
    <div class="snippet-line">System.out.println(add(1.5, 2.5)); <span class="tok-comment">// 4.0 — double version</span></div>
  </div>
</div>

Java matches the call to a method based on both the number and types of arguments — this is how \`System.out.println()\` itself works, accepting a \`String\`, an \`int\`, a \`double\`, and more.

> 💡 **Try it:** Write two overloaded \`describe\` methods — one taking an \`int\`, one taking a \`String\` — that each print a different message.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Method overloading lets multiple methods share a name with different parameter lists — Java automatically picks the correct one based on the arguments passed at the call site.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Arrays",
        slug: "arrays",
        order: 5,
        topics: [
            {
                title: "Declaring & Using Arrays",
                slug: "declaring-using-arrays",
                order: 0,
                content: `## Declaring & Using Arrays

A Java array is a fixed-size collection of values, all of the same type — a stricter cousin of JavaScript arrays.

**Declaring and initializing**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-basics.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span>[] numbers = {10, 20, 30};</div>
    <div class="snippet-line">String[] fruits = <span class="tok-keyword">new</span> String[3];</div>
    <div class="snippet-line">fruits[0] = <span class="tok-string">"apple"</span>;</div>
    <div class="snippet-line">fruits[1] = <span class="tok-string">"banana"</span>;</div>
    <div class="snippet-line">fruits[2] = <span class="tok-string">"cherry"</span>;</div>
  </div>
</div>

**Accessing elements and length**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-access.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">System.out.println(numbers[0]); <span class="tok-comment">// 10 — indexes start at 0, same as JS</span></div>
    <div class="snippet-line">System.out.println(numbers.length); <span class="tok-comment">// 3 — note: NO parentheses, it's a field not a method</span></div>
  </div>
</div>

**Fixed size**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fixed-size.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span>[] scores = <span class="tok-keyword">new</span> <span class="tok-keyword">int</span>[5];</div>
    <div class="snippet-line"><span class="tok-comment">// scores can only ever hold exactly 5 int values</span></div>
  </div>
</div>

Once created with \`new int[5]\`, the array's size is permanent — you can't add a 6th element later, unlike a JavaScript array or a Java \`ArrayList\`.

> 💡 **Try it:** Declare an \`int[]\` array of five numbers, print the third element, and print the array's \`.length\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Java arrays hold a fixed number of same-typed elements — <code>.length</code> is a field (no parentheses), unlike <code>String.length()</code>, which is a method.</p>
</div>`
            },
            {
                title: "Looping Through Arrays & 2D Arrays",
                slug: "looping-through-arrays-2d-arrays",
                order: 1,
                content: `## Looping Through Arrays & 2D Arrays

Looping through arrays uses the same \`for\` and enhanced for-each syntax from the Loops chapter — and Java also supports arrays of arrays, for grid-like data.

**Looping with for and for-each**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-loops.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span>[] numbers = {10, 20, 30};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> i = 0; i &lt; numbers.length; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(numbers[i]);</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> n : numbers) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(n);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**2D arrays**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">2d-arrays.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span>[][] grid = {</div>
    <div class="snippet-line">&nbsp;&nbsp;{1, 2, 3},</div>
    <div class="snippet-line">&nbsp;&nbsp;{4, 5, 6},</div>
    <div class="snippet-line">&nbsp;&nbsp;{7, 8, 9}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">System.out.println(grid[1][2]); <span class="tok-comment">// 6 — row index 1, column index 2</span></div>
  </div>
</div>

A 2D array is really an array of arrays — \`grid[1]\` gets the second row (itself an \`int[]\`), and \`grid[1][2]\` gets the third element of that row.

**Looping through a 2D array**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">2d-array-loop.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span>[] row : grid) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> value : row) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.print(value + <span class="tok-string">" "</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println();</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Build a 3x3 \`int[][]\` grid and use a nested for-each loop to print every value, row by row.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Both standard <code>for</code> and enhanced for-each loops work on arrays — a 2D array (<code>int[][]</code>) is really an array of arrays, and needs a nested loop to visit every value.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "OOP: Classes & Objects",
        slug: "oop-classes-objects",
        order: 6,
        topics: [
            {
                title: "Defining Classes & Constructors",
                slug: "defining-classes-constructors",
                order: 0,
                content: `## Defining Classes & Constructors

A class is a blueprint for creating objects — everything in Java lives inside a class, but this chapter focuses on writing classes that model real things, like a \`Dog\`.

**A simple class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Dog.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">Dog</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;String name;</div>
    <div class="snippet-line">&nbsp;&nbsp;String breed;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">Dog</span>(String name, String breed) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.name = name;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.breed = breed;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">void</span> <span class="tok-call">bark</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(name + <span class="tok-string">" says Woof!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`name\` and \`breed\` are **fields** (instance variables) — data every \`Dog\` object will have. The constructor (matching the class name, no return type) runs when a new \`Dog\` is created, setting up its initial state.

**Creating and using an object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-dog.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Dog myDog = <span class="tok-keyword">new</span> Dog(<span class="tok-string">"Rex"</span>, <span class="tok-string">"Labrador"</span>);</div>
    <div class="snippet-line">myDog.bark(); <span class="tok-comment">// "Rex says Woof!"</span></div>
    <div class="snippet-line">System.out.println(myDog.breed); <span class="tok-comment">// "Labrador"</span></div>
  </div>
</div>

\`this.name\` refers to the object's own field, distinguishing it from the \`name\` parameter — necessary since they share the same name here.

> 💡 **Try it:** Write a \`Cat\` class with \`name\` and \`color\` fields, a constructor, and a \`meow()\` method, then create and use one instance.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A class defines fields (data) and methods (behavior); a constructor sets up a new object's initial state and runs automatically when you call <code>new ClassName()</code>.</p>
</div>`
            },
            {
                title: "Access Modifiers & Encapsulation",
                slug: "access-modifiers-encapsulation",
                order: 1,
                content: `## Access Modifiers & Encapsulation

Access modifiers control which parts of your code can see or change a class's fields and methods — the basis of **encapsulation**, one of OOP's core principles.

**private fields, public methods**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">BankAccount.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">BankAccount</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">private</span> <span class="tok-keyword">double</span> balance;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">BankAccount</span>(<span class="tok-keyword">double</span> initialBalance) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.balance = initialBalance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">void</span> <span class="tok-call">deposit</span>(<span class="tok-keyword">double</span> amount) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> (amount &gt; 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;balance += amount;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">double</span> <span class="tok-call">getBalance</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> balance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`private\` fields can only be accessed from inside the same class — trying \`account.balance\` from outside won't compile. Instead, controlled access goes through public methods like \`deposit()\` and \`getBalance()\`.

**Why this matters**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">encapsulation-benefit.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">BankAccount account = <span class="tok-keyword">new</span> BankAccount(100);</div>
    <div class="snippet-line">account.deposit(-50); <span class="tok-comment">// silently ignored, thanks to the check inside deposit()</span></div>
    <div class="snippet-line">System.out.println(account.getBalance()); <span class="tok-comment">// still 100</span></div>
  </div>
</div>

Without encapsulation, any code anywhere could set \`account.balance = -1000;\` directly, bypassing every safety check.

> 💡 **Try it:** Add a \`withdraw(double amount)\` method to \`BankAccount\` that refuses to let the balance go below zero.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>private</code> fields paired with public getter/setter methods (encapsulation) let a class validate and control how its internal data is accessed or changed.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "OOP: Inheritance & Polymorphism",
        slug: "oop-inheritance-polymorphism",
        order: 7,
        topics: [
            {
                title: "Inheritance with extends & super",
                slug: "inheritance-with-extends-super",
                order: 0,
                content: `## Inheritance with extends & super

Inheritance lets one class build on another, reusing fields and methods while adding or overriding what's specific to it — modeling "is a kind of" relationships.

**A parent and child class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Animal.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">Animal</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;String name;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">Animal</span>(String name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.name = name;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">void</span> <span class="tok-call">eat</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(name + <span class="tok-string">" is eating"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Cat.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">Cat</span> <span class="tok-keyword">extends</span> Animal {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">Cat</span>(String name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">super</span>(name); <span class="tok-comment">// calls Animal's constructor</span></div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">void</span> <span class="tok-call">meow</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(name + <span class="tok-string">" says Meow!"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">use-cat.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Cat myCat = <span class="tok-keyword">new</span> Cat(<span class="tok-string">"Whiskers"</span>);</div>
    <div class="snippet-line">myCat.eat();  <span class="tok-comment">// "Whiskers is eating" — inherited from Animal</span></div>
    <div class="snippet-line">myCat.meow(); <span class="tok-comment">// "Whiskers says Meow!" — defined on Cat</span></div>
  </div>
</div>

\`super(name)\` calls the parent class's constructor — required as the first line whenever the subclass has its own constructor and the parent's constructor needs arguments.

**Overriding a method**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">override.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">Cat</span> <span class="tok-keyword">extends</span> Animal {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">Cat</span>(String name) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">super</span>(name);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-annotation">@Override</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">void</span> <span class="tok-call">eat</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(name + <span class="tok-string">" delicately nibbles food"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`@Override\` isn't strictly required, but it's strongly recommended — it tells the compiler to double-check that a matching method actually exists on the parent class, catching typos at compile time.

> 💡 **Try it:** Write a \`Dog\` class that extends \`Animal\`, calls \`super(name)\`, and overrides \`eat()\` with its own message.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>extends</code> inherits a parent class's fields and methods, <code>super()</code> calls the parent constructor, and <code>@Override</code> safely marks a method that replaces the parent's version.</p>
</div>`
            },
            {
                title: "Polymorphism & Abstract Classes",
                slug: "polymorphism-abstract-classes",
                order: 1,
                content: `## Polymorphism & Abstract Classes

Polymorphism means a single reference type can represent many different actual object types — letting you write flexible code that works across an entire family of related classes.

**Polymorphism in action**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">polymorphism.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Animal myPet = <span class="tok-keyword">new</span> Cat(<span class="tok-string">"Whiskers"</span>); <span class="tok-comment">// declared as Animal, actually a Cat</span></div>
    <div class="snippet-line">myPet.eat(); <span class="tok-comment">// "Whiskers eats fish" — Cat's overridden version runs, not Animal's</span></div>
  </div>
</div>

Even though \`myPet\` is declared as type \`Animal\`, Java calls the actual object's real method (\`Cat\`'s \`eat()\`) at runtime — this is polymorphism, and it's what makes code like \`List<Animal>\` able to hold a mix of \`Cat\`, \`Dog\`, and other subclasses, each behaving correctly.

**Abstract classes**

An abstract class can't be instantiated directly — it exists purely as a base for other classes to build on.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Shape.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">abstract</span> <span class="tok-keyword">class</span> <span class="tok-call">Shape</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">abstract</span> <span class="tok-keyword">double</span> <span class="tok-call">getArea</span>();</div>
    <div class="snippet-line">}</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Circle.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">class</span> <span class="tok-call">Circle</span> <span class="tok-keyword">extends</span> Shape {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">private</span> <span class="tok-keyword">double</span> radius;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-call">Circle</span>(<span class="tok-keyword">double</span> radius) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">this</span>.radius = radius;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-annotation">@Override</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">public</span> <span class="tok-keyword">double</span> <span class="tok-call">getArea</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> Math.PI * radius * radius;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`new Shape()\` would fail to compile — \`Shape\` is abstract and can only exist through its concrete subclasses, like \`Circle\`, each of which must provide its own \`getArea()\`.

> 💡 **Try it:** Add a \`Rectangle\` class that extends \`Shape\`, implements \`getArea()\`, then store a \`Circle\` and a \`Rectangle\` in an \`Animal\`-style polymorphic list (\`Shape[]\`) and print each area.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Polymorphism means the real object's overridden method runs, even through a parent-type reference — abstract classes formalize this by requiring subclasses to implement key methods themselves.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Exception Handling",
        slug: "exception-handling",
        order: 8,
        topics: [
            {
                title: "try / catch / finally",
                slug: "try-catch-finally",
                order: 0,
                content: `## try / catch / finally

An exception is Java's term for a runtime error — dividing by zero, accessing an invalid array index, or similar. \`try\`/\`catch\` lets you handle it gracefully instead of crashing the whole program.

**Basic try / catch**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">try-catch.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">int</span> result = 10 / 0;</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (ArithmeticException e) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"Error: "</span> + e.getMessage());</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// "Error: / by zero"</span></div>
  </div>
</div>

Unlike JavaScript's generic \`Error\`, Java's \`catch\` specifies the exact exception type to catch — \`ArithmeticException\` here specifically, rather than catching everything indiscriminately.

**Multiple catch blocks and finally**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">try-catch-finally.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">int</span>[] numbers = {1, 2, 3};</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(numbers[5]);</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (ArrayIndexOutOfBoundsException e) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"Invalid index!"</span>);</div>
    <div class="snippet-line">} <span class="tok-keyword">catch</span> (Exception e) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"Something else went wrong"</span>);</div>
    <div class="snippet-line">} <span class="tok-keyword">finally</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(<span class="tok-string">"This always runs"</span>);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Multiple \`catch\` blocks let you handle different exception types differently — the more general \`Exception\` catch-all should always come last, since Java checks each \`catch\` in order and stops at the first match. \`finally\` always runs, whether an exception occurred or not — ideal for cleanup code.

> 💡 **Try it:** Write a \`try\`/\`catch\` that attempts to access an invalid array index, catches \`ArrayIndexOutOfBoundsException\` specifically, and prints a \`finally\` message regardless.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Java's <code>catch</code> targets specific exception types (with a general <code>Exception</code> catch-all placed last), and <code>finally</code> always runs — ideal for cleanup code.</p>
</div>`
            },
            {
                title: "Checked vs. Unchecked Exceptions & throw",
                slug: "checked-vs-unchecked-exceptions-throw",
                order: 1,
                content: `## Checked vs. Unchecked Exceptions & throw

Java categorizes exceptions into two groups with very different rules — and lets you define and throw custom exceptions of your own.

**Checked exceptions**

Checked exceptions must be either caught or declared — the compiler enforces this, refusing to compile otherwise:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">checked-exception.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">void</span> <span class="tok-call">readFile</span>(String path) <span class="tok-keyword">throws</span> IOException {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-comment">// file-reading code that might throw an IOException</span></div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`throws IOException\` in the method signature declares "calling this might throw this exception — it's now your responsibility to handle it," either by catching it or by declaring \`throws\` yourself and passing the responsibility further up.

**Unchecked exceptions**

Unchecked exceptions (like \`NullPointerException\` or \`ArithmeticException\`) aren't enforced by the compiler at all — they can occur anywhere, without any \`throws\` declaration:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">unchecked-exception.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">String name = <span class="tok-keyword">null</span>;</div>
    <div class="snippet-line">System.out.println(name.length()); <span class="tok-comment">// — NullPointerException — compiles fine, fails at runtime</span></div>
  </div>
</div>

**Throwing your own exceptions**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">throw-custom.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">public</span> <span class="tok-keyword">static</span> <span class="tok-keyword">void</span> <span class="tok-call">setAge</span>(<span class="tok-keyword">int</span> age) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (age &lt; 0) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">throw</span> <span class="tok-keyword">new</span> IllegalArgumentException(<span class="tok-string">"Age cannot be negative"</span>);</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}</div>
  </div>
</div>

> 💡 **Try it:** Write a method that throws \`IllegalArgumentException\` when given a negative number, then call it inside a \`try\`/\`catch\` that prints the exception's message.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Checked exceptions must be caught or declared with <code>throws</code>; unchecked exceptions aren't enforced by the compiler — <code>throw new SomeException(...)</code> signals your own custom error conditions.</p>
</div>`
            },
        ],
    },
    {
        language: "Java",
        title: "Collections",
        slug: "collections",
        order: 9,
        topics: [
            {
                title: "ArrayList",
                slug: "arraylist",
                order: 0,
                content: `## ArrayList

\`ArrayList\` is a resizable array — solving arrays' biggest limitation (a fixed size) by growing and shrinking automatically as you add or remove elements.

**Creating and using an ArrayList**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ArrayListBasics.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> java.util.ArrayList;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">ArrayList&lt;String&gt; fruits = <span class="tok-keyword">new</span> ArrayList&lt;&gt;();</div>
    <div class="snippet-line">fruits.add(<span class="tok-string">"apple"</span>);</div>
    <div class="snippet-line">fruits.add(<span class="tok-string">"banana"</span>);</div>
    <div class="snippet-line">fruits.add(<span class="tok-string">"cherry"</span>);</div>
  </div>
</div>

\`<String>\` is a generic type parameter — it locks this \`ArrayList\` to only hold \`String\` values, catching type mistakes at compile time.

**Common ArrayList operations**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ArrayListOps.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">System.out.println(fruits.get(0));      <span class="tok-comment">// "apple" — access by index</span></div>
    <div class="snippet-line">System.out.println(fruits.size());      <span class="tok-comment">// 3 — number of elements</span></div>
    <div class="snippet-line">fruits.remove(<span class="tok-string">"banana"</span>);</div>
    <div class="snippet-line">System.out.println(fruits.contains(<span class="tok-string">"apple"</span>)); <span class="tok-comment">// true</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (String fruit : fruits) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(fruit);</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**ArrayList vs. a plain array**

Use \`ArrayList\` whenever the collection's size will change over time — arrays are locked at their initial size, \`ArrayList\` grows and shrinks freely with \`.add()\` and \`.remove()\`.

> 💡 **Try it:** Create an \`ArrayList<Integer>\` of scores, add four numbers, remove the lowest one, then print the final size.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>ArrayList&lt;Type&gt;</code> is a resizable, type-safe collection — reach for it instead of a plain array whenever the number of elements will change over time.</p>
</div>`
            },
            {
                title: "HashMap",
                slug: "hashmap",
                order: 1,
                content: `## HashMap

\`HashMap\` stores key-value pairs, similar to a JavaScript object — giving you fast lookups by key rather than by numeric position.

**Creating and using a HashMap**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">HashMapBasics.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">import</span> java.util.HashMap;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">HashMap&lt;String, Integer&gt; ages = <span class="tok-keyword">new</span> HashMap&lt;&gt;();</div>
    <div class="snippet-line">ages.put(<span class="tok-string">"Amara"</span>, 25);</div>
    <div class="snippet-line">ages.put(<span class="tok-string">"Kwame"</span>, 30);</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">System.out.println(ages.get(<span class="tok-string">"Amara"</span>)); <span class="tok-comment">// 25</span></div>
  </div>
</div>

\`<String, Integer>\` declares the key type first, then the value type — here, \`String\` keys mapping to \`Integer\` values.

**Looping through a HashMap**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">HashMapLoop.java</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (String key : ages.keySet()) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(key + <span class="tok-string">": "</span> + ages.get(key));</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment">// or, more efficient — iterate entries directly:</span></div>
    <div class="snippet-line"><span class="tok-keyword">for</span> (Map.Entry&lt;String, Integer&gt; entry : ages.entrySet()) {</div>
    <div class="snippet-line">&nbsp;&nbsp;System.out.println(entry.getKey() + <span class="tok-string">": "</span> + entry.getValue());</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`.entrySet()\` avoids a second \`.get()\` lookup per key, making it the more efficient choice for larger maps — worth knowing even if \`.keySet()\` reads slightly simpler for beginners.

> 💡 **Try it:** Create a \`HashMap<String, Integer>\` mapping three product names to their prices, then loop through it with \`.entrySet()\` and print each pair.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>HashMap&lt;KeyType, ValueType&gt;</code> stores key-value pairs with fast lookup by key — <code>.entrySet()</code> is the efficient way to loop through both keys and values together.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Python Basics",
        slug: "python-basics",
        order: 0,
        topics: [
            {
                title: "Introduction to Python",
                slug: "introduction-to-python",
                order: 0,
                content: `## Introduction to Python

Python is known for clean, readable syntax — it reads almost like plain English, which is part of why it's a popular first language.

**A minimal Python program**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hello.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">print(<span class="tok-string">"Hello, World!"</span>)</div>
  </div>
</div>

That's the entire program — no class, no main method, no semicolons.

**Indentation matters**

Python uses indentation, not curly braces, to define code blocks. This isn't just a style preference — it's required syntax:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">indentation.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">if</span> <span class="tok-keyword">True</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"This line is indented"</span>)</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"So is this one"</span>)</div>
    <div class="snippet-line">print(<span class="tok-string">"This runs regardless — it's not indented"</span>)</div>
  </div>
</div>

Inconsistent indentation causes an \`IndentationError\` — Python won't even run the file.

> 💡 **Try it:** Write an \`if\` block with two indented \`print()\` statements, then remove the indentation from one and see the error.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python uses indentation (not braces) to define code blocks — this is required syntax, not a style choice, and inconsistent indentation raises an <code>IndentationError</code>.</p>
</div>`
            },
            {
                title: "Variables & Types",
                slug: "variables-types",
                order: 1,
                content: `## Variables & Types

Python is dynamically typed, like JavaScript — variables don't declare a type upfront, and can be reassigned to a different type later.

**Declaring variables**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">variables.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">age = 25</div>
    <div class="snippet-line">price = 19.99</div>
    <div class="snippet-line">name = <span class="tok-string">"Amara"</span></div>
    <div class="snippet-line">is_active = <span class="tok-keyword">True</span></div>
  </div>
</div>

No \`let\`, \`var\`, or type keyword required — just \`name = value\`. Python figures out the type automatically.

**Checking a variable's type**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">check-type.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">print(type(age))       <span class="tok-comment"># &lt;class 'int'&gt;</span></div>
    <div class="snippet-line">print(type(price))     <span class="tok-comment"># &lt;class 'float'&gt;</span></div>
    <div class="snippet-line">print(type(name))      <span class="tok-comment"># &lt;class 'str'&gt;</span></div>
  </div>
</div>

**Naming convention: snake_case**

Unlike JavaScript's camelCase, Python's style convention uses snake_case for variable and function names:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">snake-case.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">first_name = <span class="tok-string">"Amara"</span>   <span class="tok-comment"># — Python convention</span></div>
  </div>
</div>

> 💡 **Try it:** Create three variables of different types (\`int\`, \`float\`, \`str\`), then print each one's \`type()\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python variables need no type declaration — <code>type()</code> reveals a variable's current type at any point, and snake_case is the standard naming convention.</p>
</div>`
            },
            {
                title: "f-strings",
                slug: "f-strings",
                order: 2,
                content: `## f-strings

f-strings are Python's modern way to embed variables directly inside text — the equivalent of JavaScript's template literals.

**Basic f-strings**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fstrings.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">name = <span class="tok-string">"Amara"</span></div>
    <div class="snippet-line">age = 25</div>
    <div class="snippet-line">print(<span class="tok-string">f"{name} is {age} years old"</span>) <span class="tok-comment"># "Amara is 25 years old"</span></div>
  </div>
</div>

The \`f\` right before the opening quote marks it as an f-string — anything inside \`{ }\` is evaluated as Python and inserted directly.

**Expressions and formatting inside f-strings**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">fstring-formatting.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">price = 19.999</div>
    <div class="snippet-line">quantity = 3</div>
    <div class="snippet-line">print(<span class="tok-string">f"Total: {price * quantity:.2f}"</span>) <span class="tok-comment"># "Total: 59.997" rounded — "Total: 60.00"</span></div>
  </div>
</div>

\`:.2f\` formats the number to 2 decimal places — a common pattern for displaying prices or percentages cleanly.

**Why f-strings over older approaches**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">older-approaches.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment"># concatenation — clunky</span></div>
    <div class="snippet-line">print(<span class="tok-string">"Hello, "</span> + name + <span class="tok-string">"!"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment"># .format() — verbose</span></div>
    <div class="snippet-line">print(<span class="tok-string">"Hello, {}!"</span>.format(name))</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-comment"># f-string — clean and direct</span></div>
    <div class="snippet-line">print(<span class="tok-string">f"Hello, {name}!"</span>)</div>
  </div>
</div>

f-strings are the modern, preferred approach — cleaner and faster than both older alternatives.

> 💡 **Try it:** Create a \`price\` and \`quantity\` variable, then print their product formatted to 2 decimal places using an f-string.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">f-strings (<code>f"...{variable}..."</code>) are Python's modern, preferred way to embed variables and expressions in text, with <code>:.2f</code>-style formatting for numbers built right in.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Python Operators & Control Flow",
        slug: "python-operators-control-flow",
        order: 1,
        topics: [
            {
                title: "Operators",
                slug: "operators",
                order: 0,
                content: `## Operators

Python's operators closely resemble other languages, with a couple of Python-specific additions worth knowing early — especially floor division.

**Arithmetic operators**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">arithmetic.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">print(5 / 3)  <span class="tok-comment"># 1.6666... — always returns a float</span></div>
    <div class="snippet-line">print(5 // 3) <span class="tok-comment"># 1 — floor division, rounds down to a whole number</span></div>
    <div class="snippet-line">print(5 % 3)  <span class="tok-comment"># 2 — remainder</span></div>
    <div class="snippet-line">print(5 ** 2) <span class="tok-comment"># 25 — exponent (5 squared)</span></div>
  </div>
</div>

Unlike Java, \`/\` in Python always returns a \`float\`, even when dividing two whole numbers evenly — \`//\` is the operator to use when you specifically want a truncated whole-number result.

**Comparison and logical operators**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">comparison-logical.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">age = 20</div>
    <div class="snippet-line">has_ticket = <span class="tok-keyword">True</span></div>
    <div class="snippet-line">print(age &gt;= 18 <span class="tok-keyword">and</span> has_ticket) <span class="tok-comment"># True</span></div>
    <div class="snippet-line">print(age &lt; 18 <span class="tok-keyword">or</span> has_ticket)  <span class="tok-comment"># True</span></div>
    <div class="snippet-line">print(<span class="tok-keyword">not</span> has_ticket)          <span class="tok-comment"># False</span></div>
  </div>
</div>

Unlike JavaScript, Python has only one equality operator, \`==\` — there's no separate strict-equality version, since Python doesn't perform the kind of implicit type coercion that made JavaScript's \`===\` necessary. Python spells out \`and\`, \`or\`, and \`not\` as actual words instead of using symbols like \`&&\`, \`||\`, \`!\` — a deliberate readability choice.

> 💡 **Try it:** Write an expression combining \`age >= 18\` and \`has_ticket\` with \`and\`, then try the same logic with \`or\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>/</code> always returns a float, <code>//</code> performs floor division, and logical operators are written as the readable words <code>and</code>, <code>or</code>, <code>not</code> instead of symbols.</p>
</div>`
            },
            {
                title: "Conditionals",
                slug: "conditionals",
                order: 1,
                content: `## Conditionals

Python's conditional syntax relies entirely on indentation and colons — no parentheses around the condition, no curly braces around the body.

**if / elif / else**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">conditionals.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">score = 75</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">if</span> score &gt;= 90:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"A"</span>)</div>
    <div class="snippet-line"><span class="tok-keyword">elif</span> score &gt;= 70:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"B"</span>)</div>
    <div class="snippet-line"><span class="tok-keyword">else</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"C or below"</span>)</div>
  </div>
</div>

The colon (\`:\`) after the condition is required — forgetting it is a common early mistake and produces a \`SyntaxError\`. Python uses \`elif\` — not \`else if\` — as its keyword for chained conditions:

**Ternary expression**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">ternary.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">age = 20</div>
    <div class="snippet-line">status = <span class="tok-string">"adult"</span> <span class="tok-keyword">if</span> age &gt;= 18 <span class="tok-keyword">else</span> <span class="tok-string">"minor"</span></div>
    <div class="snippet-line">print(status) <span class="tok-comment"># "adult"</span></div>
  </div>
</div>

Python's ternary reads almost like English: \`value_if_true if condition else value_if_false\` — notably reordered compared to JavaScript's \`condition ? true : false\` structure.

> 💡 **Try it:** Write an \`if\`/\`elif\`/\`else\` chain that prints "cold", "mild", or "hot" based on a temperature variable, then rewrite the same logic as a ternary.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python's conditionals use indentation and colons instead of braces, chain with <code>elif</code> (not <code>else if</code>), and support a readable one-line ternary: <code>x if condition else y</code>.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Python Loops",
        slug: "python-loops",
        order: 2,
        topics: [
            {
                title: "for Loops, range() & enumerate()",
                slug: "for-loops-range-enumerate",
                order: 0,
                content: `## for Loops, range() & enumerate()

Python's \`for\` loop is built to iterate directly over a sequence — a list, string, or range of numbers — rather than manually tracking an index.

**Iterating over a list**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"cherry"</span>]</div>
    <div class="snippet-line"><span class="tok-keyword">for</span> fruit <span class="tok-keyword">in</span> fruits:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(fruit)</div>
  </div>
</div>

There's no separate "index-based" \`for\` loop in Python at all — this direct, value-based style is the only \`for\` loop Python has.

**range() for counted loops**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">range-loop.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> i <span class="tok-keyword">in</span> range(5):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(i)</div>
    <div class="snippet-line"><span class="tok-comment"># prints 0 1 2 3 4</span></div>
  </div>
</div>

\`range(5)\` generates the sequence 0 through 4 — 5 numbers total, but stopping before 5, similar to how array indexes work.

**enumerate() for index + value**

When you genuinely need both the index and the value, \`enumerate()\` provides both without manual counting:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">enumerate-loop.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> index, fruit <span class="tok-keyword">in</span> enumerate(fruits):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(index, fruit)</div>
    <div class="snippet-line"><span class="tok-comment"># 0 apple</span></div>
    <div class="snippet-line"><span class="tok-comment"># 1 banana</span></div>
    <div class="snippet-line"><span class="tok-comment"># 2 cherry</span></div>
  </div>
</div>

> 💡 **Try it:** Use \`enumerate()\` to loop through a list of names, printing each one's position (starting from 1, not 0) alongside the name.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python's <code>for</code> loop always iterates over a sequence directly — <code>range()</code> generates a number sequence for counted loops, and <code>enumerate()</code> provides both index and value together.</p>
</div>`
            },
            {
                title: "while Loops, break & continue",
                slug: "while-loops-break-continue",
                order: 1,
                content: `## while Loops, break & continue

\`while\` loops repeat as long as a condition holds true — used when the number of iterations isn't known in advance.

**while loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">while-loop.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">count = 0</div>
    <div class="snippet-line"><span class="tok-keyword">while</span> count &lt; 3:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(count)</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;count += 1</div>
  </div>
</div>

**No do-while — the while True workaround**

Python has no \`do-while\` loop at all — if you need a loop that runs at least once, the common workaround is \`while True:\` with a \`break\` condition inside.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">while-true-workaround.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">while</span> <span class="tok-keyword">True</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;user_input = input(<span class="tok-string">"Enter 'quit' to stop: "</span>)</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> user_input == <span class="tok-string">"quit"</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span></div>
  </div>
</div>

**break and continue**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">break-continue.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> i <span class="tok-keyword">in</span> range(10):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> i == 5:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>       <span class="tok-comment"># exits the loop entirely</span></div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> i % 2 == 0:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">continue</span>    <span class="tok-comment"># skips to the next iteration</span></div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(i)</div>
    <div class="snippet-line"><span class="tok-comment"># prints 1, 3 — even numbers skipped, stops entirely at 5</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`while True:\` loop that keeps asking for a number until the user enters \`0\`, using \`break\` to stop.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python has no <code>do-while</code> loop — use <code>while True:</code> with a <code>break</code> for that pattern — and <code>break</code>/<code>continue</code> work the same as in other languages.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Functions",
        slug: "functions",
        order: 3,
        topics: [
            {
                title: "Defining Functions, Defaults & Keyword Arguments",
                slug: "defining-functions-defaults-keyword-arguments",
                order: 0,
                content: `## Defining Functions, Defaults & Keyword Arguments

Python functions are defined with \`def\`, requiring no type declarations for parameters or return values — a much lighter syntax than Java's typed methods.

**Defining and calling a function**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">simple-function.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">greet</span>():</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"Hello there!"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">greet() <span class="tok-comment"># call it — prints "Hello there!"</span></div>
  </div>
</div>

**Default parameter values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">default-params.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">greet</span>(name=<span class="tok-string">"friend"</span>):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"Hello, {name}!"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">greet()          <span class="tok-comment"># "Hello, friend!"</span></div>
    <div class="snippet-line">greet(<span class="tok-string">"Amara"</span>)  <span class="tok-comment"># "Hello, Amara!"</span></div>
  </div>
</div>

**Keyword arguments**

Python lets you pass arguments by name, regardless of their order — helpful for readability when a function has several parameters:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">keyword-args.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">describe_pet</span>(name, animal_type):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{name} is a {animal_type}"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">describe_pet(animal_type=<span class="tok-string">"cat"</span>, name=<span class="tok-string">"Whiskers"</span>)</div>
    <div class="snippet-line"><span class="tok-comment"># "Whiskers is a cat" — order didn't matter</span></div>
  </div>
</div>

> 💡 **Try it:** Write a function \`describe_pet(name, animal_type="dog")\` with a default value, then call it once with just a name, and once with both arguments passed by keyword.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Python functions (<code>def</code>) need no type declarations, support default parameter values, and accept keyword arguments so calls can be readable regardless of parameter order.</p>
</div>`
            },
            {
                title: "*args, **kwargs & Lambdas",
                slug: "args-kwargs-lambdas",
                order: 1,
                content: `## *args, **kwargs & Lambdas

Python offers two more tools for flexible functions: catching any number of extra arguments, and writing tiny, throwaway functions in a single line.

**\\*args — variable positional arguments**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">args.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">sum_all</span>(*numbers):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> sum(numbers)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">print(sum_all(1, 2, 3, 4, 5)) <span class="tok-comment"># 15 — works with any number of arguments</span></div>
  </div>
</div>

\`*numbers\` collects every positional argument into a tuple, similar to JavaScript's rest parameter.

**\\*\\*kwargs — variable keyword arguments**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">kwargs.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">print_details</span>(**details):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">for</span> key, value <span class="tok-keyword">in</span> details.items():</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{key}: {value}"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">print_details(name=<span class="tok-string">"Amara"</span>, age=25)</div>
  </div>
</div>

\`**details\` collects any number of keyword arguments into a dictionary — useful when a function needs to accept flexible, named data without a fixed parameter list.

**Lambda functions**

A lambda is a small, anonymous function written in one line — most useful when passed directly into another function:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">lambda.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">people = [(<span class="tok-string">"Amara"</span>, 25), (<span class="tok-string">"Kwame"</span>, 19), (<span class="tok-string">"Zola"</span>, 32)]</div>
    <div class="snippet-line">people.sort(key=<span class="tok-keyword">lambda</span> person: person[1])</div>
    <div class="snippet-line">print(people) <span class="tok-comment"># sorted by age</span></div>
  </div>
</div>

Here, \`lambda person: person[1]\` tells \`sorted()\` to sort by each tuple's second element (the age) — a lambda is often clearer than defining a whole separate named function just for this.

> 💡 **Try it:** Write a function using \`*args\` to find the maximum of any number of arguments, then sort a list of tuples by a lambda key of your choice.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>*args</code>/<code>**kwargs</code> let a function accept any number of positional/keyword arguments, and <code>lambda</code> creates small anonymous functions — commonly passed as a key or callback.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Lists & Tuples",
        slug: "lists-tuples",
        order: 4,
        topics: [
            {
                title: "Lists, Slicing & List Comprehensions",
                slug: "lists-slicing-list-comprehensions",
                order: 0,
                content: `## Lists, Slicing & List Comprehensions

A Python list is an ordered, changeable collection — the closest equivalent to a JavaScript array.

**Creating and indexing a list**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">list-basics.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">fruits = [<span class="tok-string">"apple"</span>, <span class="tok-string">"banana"</span>, <span class="tok-string">"mango"</span>]</div>
    <div class="snippet-line">print(fruits[0])  <span class="tok-comment"># "apple"</span></div>
    <div class="snippet-line">print(fruits[-1]) <span class="tok-comment"># "mango" — negative indexes count from the end</span></div>
  </div>
</div>

Negative indexing (\`-1\` for the last item, \`-2\` for the second-to-last) is a Python-specific convenience most other languages don't offer directly.

**Slicing**

Slicing extracts a portion of a list using \`start:stop\` — one of Python's most distinctive and widely used features:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">slicing.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">numbers = [10, 20, 30, 40, 50]</div>
    <div class="snippet-line">print(numbers[1:3])  <span class="tok-comment"># [20, 30] — index 1 up to (not including) index 3</span></div>
    <div class="snippet-line">print(numbers[:2])   <span class="tok-comment"># [10, 20] — from the start up to index 2</span></div>
    <div class="snippet-line">print(numbers[2:])   <span class="tok-comment"># [30, 40, 50] — from index 2 to the end</span></div>
  </div>
</div>

**List comprehensions**

A list comprehension builds a new list from an existing one, in a single readable line — replacing what would otherwise be a multi-line loop:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">list-comprehension.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">numbers = [1, 2, 3, 4, 5]</div>
    <div class="snippet-line">squares = [n ** 2 <span class="tok-keyword">for</span> n <span class="tok-keyword">in</span> numbers]</div>
    <div class="snippet-line">print(squares) <span class="tok-comment"># [1, 4, 9, 16, 25]</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">evens = [n <span class="tok-keyword">for</span> n <span class="tok-keyword">in</span> numbers <span class="tok-keyword">if</span> n % 2 == 0]</div>
    <div class="snippet-line">print(evens) <span class="tok-comment"># [2, 4]</span></div>
  </div>
</div>

The pattern reads as: \`[expression for item in iterable if condition]\` — the \`if\` part is optional, used only when filtering.

> 💡 **Try it:** Write a list comprehension that builds a list of the cubes of every number from 1 to 10 that's divisible by 3.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Lists support negative indexing and slicing (<code>list[start:stop]</code>) — list comprehensions (<code>[expr for item in iterable if condition]</code>) build new lists concisely from existing ones.</p>
</div>`
            },
            {
                title: "Tuples & Unpacking",
                slug: "tuples-unpacking",
                order: 1,
                content: `## Tuples & Unpacking

A tuple is like a list, but **immutable** — once created, its contents can never be changed.

**Creating and accessing a tuple**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">tuple-basics.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">coordinates = (40.7128, -74.0060)</div>
    <div class="snippet-line">print(coordinates[0]) <span class="tok-comment"># 40.7128 — accessed just like a list</span></div>
    <div class="snippet-line">coordinates[0] = 41.0 <span class="tok-comment"># — TypeError: 'tuple' object does not support item assignment</span></div>
  </div>
</div>

**Unpacking a tuple**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">unpacking.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">latitude, longitude = coordinates</div>
    <div class="snippet-line">print(latitude)  <span class="tok-comment"># 40.7128</span></div>
    <div class="snippet-line">print(longitude) <span class="tok-comment"># -74.0060</span></div>
  </div>
</div>

Unpacking pulls each tuple value directly into its own named variable — this same pattern is exactly how Python functions can appear to "return multiple values."

**A function "returning" multiple values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">multi-return.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">min_and_max</span>(numbers):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> min(numbers), max(numbers) <span class="tok-comment"># actually returns a tuple</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">lowest, highest = min_and_max([4, 8, 1, 9, 3])</div>
    <div class="snippet-line">print(lowest, highest) <span class="tok-comment"># 1 9</span></div>
  </div>
</div>

Use a list for a collection that will grow, shrink, or change over time (like a shopping cart). Use a tuple for a fixed grouping of values that shouldn't change (like coordinates).

> 💡 **Try it:** Write a function that returns both the sum and the average of a list of numbers, then unpack both values when calling it.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Tuples are immutable, fixed groupings (unlike changeable lists) — unpacking (<code>a, b = tuple</code>) is the standard way to extract their values, including from a function's return.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Dictionaries & Sets",
        slug: "dictionaries-sets",
        order: 5,
        topics: [
            {
                title: "Dictionaries",
                slug: "dictionaries",
                order: 0,
                content: `## Dictionaries

A dictionary stores key-value pairs, just like a JavaScript object — the go-to structure for looking up data by a name rather than a numeric position.

**Creating and accessing a dictionary**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dict-basics.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">person = {<span class="tok-string">"name"</span>: <span class="tok-string">"Amara"</span>, <span class="tok-string">"age"</span>: 25}</div>
    <div class="snippet-line">print(person[<span class="tok-string">"name"</span>]) <span class="tok-comment"># "Amara"</span></div>
  </div>
</div>

Unlike JavaScript objects, Python dictionary keys are almost always accessed with \`[ ]\` bracket notation — there's no dot-notation equivalent.

**Safely handling missing keys with .get()**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dict-get.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">print(person[<span class="tok-string">"email"</span>])           <span class="tok-comment"># — KeyError: 'email'</span></div>
    <div class="snippet-line">print(person.get(<span class="tok-string">"email"</span>))       <span class="tok-comment"># None — no error</span></div>
    <div class="snippet-line">print(person.get(<span class="tok-string">"email"</span>, <span class="tok-string">"N/A"</span>)) <span class="tok-comment"># "N/A" — custom default value</span></div>
  </div>
</div>

Accessing a missing key with \`[ ]\` raises an error — \`.get()\` returns \`None\` (or a specified default) instead.

**Looping through key-value pairs**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dict-loop.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> key, value <span class="tok-keyword">in</span> person.items():</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{key}: {value}"</span>)</div>
  </div>
</div>

\`.items()\` gives you both key and value together, in one loop — the standard, most efficient way to iterate a dictionary's contents.

> 💡 **Try it:** Create a dictionary of three products mapped to their prices, then use \`.get()\` to safely look up a product that doesn't exist.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Dictionaries store key-value pairs accessed with <code>[ ]</code> — <code>.get()</code> safely handles missing keys, and <code>.items()</code> is the standard way to loop through both keys and values.</p>
</div>`
            },
            {
                title: "Sets",
                slug: "sets",
                order: 1,
                content: `## Sets

A set is an unordered collection of unique values — automatically removing duplicates, and offering fast membership checks.

**Creating a set**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">set-basics.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">unique_numbers = {1, 2, 2, 3, 3, 3}</div>
    <div class="snippet-line">print(unique_numbers) <span class="tok-comment"># {1, 2, 3} — duplicates removed automatically</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">numbers_list = [1, 2, 2, 3, 4, 4]</div>
    <div class="snippet-line">unique = list(set(numbers_list))</div>
    <div class="snippet-line">print(unique) <span class="tok-comment"># [1, 2, 3, 4] — order isn't guaranteed to match the original</span></div>
  </div>
</div>

**Mathematical set operations**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">set-operations.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">a = {1, 2, 3}</div>
    <div class="snippet-line">b = {2, 3, 4}</div>
    <div class="snippet-line">print(a | b) <span class="tok-comment"># {1, 2, 3, 4} — union: everything in either set</span></div>
    <div class="snippet-line">print(a &amp; b) <span class="tok-comment"># {2, 3} — intersection: only in both sets</span></div>
    <div class="snippet-line">print(a - b) <span class="tok-comment"># {1} — difference: in a but not in b</span></div>
  </div>
</div>

These mathematical set operations are one of the main reasons to reach for a set specifically, rather than a list — comparing two lists this way would require writing manual loops.

**Fast membership checks**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">set-membership.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">valid_ids = {101, 102, 103, 104}</div>
    <div class="snippet-line">print(103 <span class="tok-keyword">in</span> valid_ids) <span class="tok-comment"># True — checking membership in a set is very fast</span></div>
  </div>
</div>

Checking \`in\` on a set is significantly faster than checking \`in\` on a list, especially as the collection grows large — a real, practical reason to prefer a set for lookup-heavy code.

> 💡 **Try it:** Create two sets of numbers with some overlap, then print their union, intersection, and difference.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Sets store unique values with fast membership checks and support mathematical operations (<code>|</code>, <code>&amp;</code>, <code>-</code>) — commonly used to deduplicate data or compare collections.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Python String Manipulation",
        slug: "python-string-manipulation",
        order: 6,
        topics: [
            {
                title: "Indexing, Slicing & Immutability",
                slug: "indexing-slicing-immutability",
                order: 0,
                content: `## Indexing, Slicing & Immutability

Strings in Python behave a lot like lists of characters — you can index into them, slice them, but never modify them in place.

**Indexing and slicing strings**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">string-indexing.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">word = <span class="tok-string">"Python"</span></div>
    <div class="snippet-line">print(word[0])    <span class="tok-comment"># "P"</span></div>
    <div class="snippet-line">print(word[-1])   <span class="tok-comment"># "n" — last character</span></div>
    <div class="snippet-line">print(word[0:3])  <span class="tok-comment"># "Pyt" — slicing works just like lists</span></div>
  </div>
</div>

**Strings are immutable**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">string-immutable.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">word[0] = <span class="tok-string">"J"</span> <span class="tok-comment"># — TypeError: 'str' object does not support item assignment</span></div>
  </div>
</div>

Like tuples, strings can never be modified in place — any "change" to a string actually creates a brand-new string.

**Common string methods**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">string-methods.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">text = <span class="tok-string">"  Hello, World!  "</span></div>
    <div class="snippet-line">print(text.strip())       <span class="tok-comment"># "Hello, World!" — removes leading/trailing whitespace</span></div>
    <div class="snippet-line">print(text.lower())       <span class="tok-comment"># "  hello, world!  "</span></div>
    <div class="snippet-line">print(text.replace(<span class="tok-string">"World"</span>, <span class="tok-string">"Python"</span>)) <span class="tok-comment"># "  Hello, Python!  "</span></div>
  </div>
</div>

> 💡 **Try it:** Take a messy string with extra spaces and mixed case, then clean it up using \`.strip()\` and \`.lower()\` together.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Strings support indexing and slicing just like lists, but are immutable — string methods like <code>.strip()</code>, <code>.lower()</code>, and <code>.replace()</code> always return a new string.</p>
</div>`
            },
            {
                title: "Splitting, Joining & Searching",
                slug: "splitting-joining-searching",
                order: 1,
                content: `## Splitting, Joining & Searching

Beyond basic transformations, Python strings have powerful methods for converting between strings and lists, and for finding or checking content within text.

**split() and join()**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">split-join.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">sentence = <span class="tok-string">"the quick brown fox"</span></div>
    <div class="snippet-line">words = sentence.split() <span class="tok-comment"># splits on whitespace by default</span></div>
    <div class="snippet-line">print(words) <span class="tok-comment"># ["the", "quick", "brown", "fox"]</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">joined = <span class="tok-string">"-"</span>.join(words)</div>
    <div class="snippet-line">print(joined) <span class="tok-comment"># "the-quick-brown-fox"</span></div>
  </div>
</div>

\`.join()\` does the reverse of \`.split()\` — combining a list of strings into one, using the string it's called on as the separator. The separator (\`" "\`, \`"-"\`) comes *before* \`.join()\`, not as an argument to it — a common point of confusion for beginners used to other languages.

**Searching within a string**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">string-search.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">text = <span class="tok-string">"the quick brown fox"</span></div>
    <div class="snippet-line">print(<span class="tok-string">"quick"</span> <span class="tok-keyword">in</span> text)      <span class="tok-comment"># True</span></div>
    <div class="snippet-line">print(text.startswith(<span class="tok-string">"the"</span>)) <span class="tok-comment"># True</span></div>
    <div class="snippet-line">print(text.find(<span class="tok-string">"fun"</span>))       <span class="tok-comment"># 10 — the starting index, or -1 if not found</span></div>
  </div>
</div>

> 💡 **Try it:** Split a sentence into words, join them back together with commas, then check whether a specific word is present using \`in\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>.split()</code> turns a string into a list, <code>separator.join(list)</code> reverses that — <code>in</code>, <code>.startswith()</code>, and <code>.find()</code> handle common text searching.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "OOP in Python",
        slug: "oop-in-python",
        order: 7,
        topics: [
            {
                title: "Classes, __init__ & self",
                slug: "classes-init-self",
                order: 0,
                content: `## Classes, __init__ & self

Python classes let you bundle data and behavior together, just like in Java — but with lighter, more flexible syntax.

**Defining a class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">dog-class.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Dog</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">__init__</span>(self, name, breed):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.breed = breed</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">bark</span>(self):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{self.name} says Woof!"</span>)</div>
  </div>
</div>

\`__init__\` is Python's constructor — it runs automatically when a new object is created. \`self\` refers to the specific object being created or used, and must be the first parameter of every regular method.

**Creating and using an object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">use-dog.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">dog1 = Dog(<span class="tok-string">"Rex"</span>, <span class="tok-string">"Labrador"</span>)</div>
    <div class="snippet-line">dog2 = Dog(<span class="tok-string">"Milo"</span>, <span class="tok-string">"Poodle"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">dog1.bark() <span class="tok-comment"># "Rex says Woof!" — self refers to dog1 here</span></div>
    <div class="snippet-line">dog2.bark() <span class="tok-comment"># "Milo says Woof!" — self refers to dog2 here</span></div>
  </div>
</div>

Unlike Java, there's no \`new\` keyword — just calling \`Dog(...)\` directly creates a new instance. \`self\` is how each method knows which object's data to work with — every instance shares the same method code, but \`self\` makes it operate on the right one.

> 💡 **Try it:** Write a \`Cat\` class with \`name\` and \`color\`, an \`__init__\`, and a \`meow()\` method, then create two different cats and call \`meow()\` on each.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>__init__</code> is Python's constructor, and <code>self</code> (the required first parameter of every method) refers to the specific object the method is called on.</p>
</div>`
            },
            {
                title: "Inheritance",
                slug: "inheritance",
                order: 1,
                content: `## Inheritance

Python classes support inheritance through the same "is a kind of" relationship modeling seen in other OOP languages.

**A parent and child class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">animal-cat.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Animal</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">__init__</span>(self, name):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">eat</span>(self):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{self.name} is eating"</span>)</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span>(Animal):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">__init__</span>(self, name):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super().__init__(name) <span class="tok-comment"># runs Animal's __init__ first</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">def</span> <span class="tok-call">meow</span>(self):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"{self.name} says Meow!"</span>)</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">use-cat.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">my_cat = Cat(<span class="tok-string">"Whiskers"</span>)</div>
    <div class="snippet-line">my_cat.eat()  <span class="tok-comment"># "Whiskers is eating" — inherited from Animal</span></div>
    <div class="snippet-line">my_cat.meow() <span class="tok-comment"># "Whiskers says Meow!" — defined on Cat</span></div>
  </div>
</div>

\`class Cat(Animal):\` puts the parent class name in parentheses — that's Python's entire syntax for inheritance, no \`extends\` keyword needed. \`super().__init__(name)\` calls the parent constructor, letting \`Cat\` reuse \`Animal\`'s setup logic instead of duplicating it.

> 💡 **Try it:** Write a \`Dog\` class that extends \`Animal\`, calls \`super().__init__(name)\`, and overrides \`eat()\` with its own message.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>class Child(Parent):</code> is Python's entire inheritance syntax, and <code>super().__init__()</code> calls the parent constructor — a subclass can override any inherited method.</p>
</div>`
            },
        ],
    },
    {
        language: "Python",
        title: "Python Error Handling & File I/O",
        slug: "python-error-handling-file-io",
        order: 8,
        topics: [
            {
                title: "try / except / else / finally",
                slug: "try-except-else-finally",
                order: 0,
                content: `## try / except / else / finally

Python's exception handling uses \`try\`/\`except\` — functionally identical to \`try\`/\`catch\` in other languages, with one small extra clause.

**Basic try / except**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">try-except.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;result = 10 / 0</div>
    <div class="snippet-line"><span class="tok-keyword">except</span> ZeroDivisionError <span class="tok-keyword">as</span> e:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"Error: {e}"</span>)</div>
    <div class="snippet-line"><span class="tok-comment"># "Error: division by zero"</span></div>
  </div>
</div>

\`as e\` names the caught exception object, letting you access its message — similar to \`catch (Exception e)\` in Java.

**else and finally**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">try-except-else-finally.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">try</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;number = <span class="tok-keyword">int</span>(<span class="tok-string">"42"</span>)</div>
    <div class="snippet-line"><span class="tok-keyword">except</span> ValueError:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"That wasn't a valid number"</span>)</div>
    <div class="snippet-line"><span class="tok-keyword">else</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">f"Parsed successfully: {number}"</span>)</div>
    <div class="snippet-line"><span class="tok-keyword">finally</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="tok-string">"This always runs"</span>)</div>
  </div>
</div>

Python's \`else\` clause (specific to \`try\`/\`except\`) is a small addition most other languages don't have — code there runs only when the \`try\` block succeeds with no exception at all.

**Raising your own exceptions**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">raise-custom.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">def</span> <span class="tok-call">set_age</span>(age):</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">if</span> age &lt; 0:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">raise</span> ValueError(<span class="tok-string">"Age cannot be negative"</span>)</div>
  </div>
</div>

> 💡 **Try it:** Write a \`try\`/\`except\`/\`else\`/\`finally\` block that attempts to convert user input to an \`int\`, printing a different message for each outcome.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>try</code>/<code>except</code> handles errors, an optional <code>else</code> runs only on success, and <code>finally</code> always runs — <code>raise SomeError(...)</code> signals your own custom failure conditions.</p>
</div>`
            },
            {
                title: "Reading & Writing Files",
                slug: "reading-writing-files",
                order: 1,
                content: `## Reading & Writing Files

Python's built-in \`open()\` function handles reading from and writing to files — paired with the \`with\` statement for automatic cleanup.

**Reading a file**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">read-file.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">with</span> open(<span class="tok-string">"notes.txt"</span>, <span class="tok-string">"r"</span>) <span class="tok-keyword">as</span> file:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;content = file.read()</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;print(content)</div>
  </div>
</div>

\`"r"\` opens the file in read mode. The \`with\` block guarantees the file gets closed properly afterward, without you needing to remember to call \`.close()\` manually.

**Writing to a file**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">write-file.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">with</span> open(<span class="tok-string">"notes.txt"</span>, <span class="tok-string">"w"</span>) <span class="tok-keyword">as</span> file:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;file.write(<span class="tok-string">"Hello, file!"</span>)</div>
  </div>
</div>

\`"w"\` (write mode) creates the file if it doesn't exist, and **overwrites it completely** if it does — an important distinction from append mode.

**Appending to a file**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">append-file.py</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">with</span> open(<span class="tok-string">"notes.txt"</span>, <span class="tok-string">"a"</span>) <span class="tok-keyword">as</span> file:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;file.write(<span class="tok-string">"\\nAnother line"</span>)</div>
  </div>
</div>

> 💡 **Try it:** Write a short message to a new file with \`"w"\`, then reopen it with \`"a"\` to append a second line, and finally read the whole file back with \`"r"\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Use <code>with open(...) as file:</code> for automatic file closing — <code>"r"</code> reads, <code>"w"</code> overwrites, and <code>"a"</code> appends without erasing existing content.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "C++ Basics",
        slug: "cpp-basics",
        order: 0,
        topics: [
            {
                title: "Introduction to C++",
                slug: "introduction-to-c",
                order: 0,
                content: `## Introduction to C++

C++ is a compiled, statically typed language that gives you far more direct control over memory and performance than Java or Python — the tradeoff for that power is more manual responsibility for the programmer.

**A minimal C++ program**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">hello.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">#include &lt;iostream&gt;</span></div>
    <div class="snippet-line"><span class="tok-keyword">using</span> <span class="tok-keyword">namespace</span> std;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">main</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Hello, World!"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> 0;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`#include <iostream>\` brings in the input/output library. \`main()\` is the entry point, and \`return 0;\` signals the program finished successfully.

**Compiled to native machine code**

Unlike Java's bytecode/JVM system, C++ compiles directly to native machine code specific to your operating system — faster to run, but the compiled file only works on the platform it was built for.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">terminal.sh</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">g++ hello.cpp -o hello <span class="tok-comment"># compiles to a native executable</span></div>
    <div class="snippet-line">./hello                <span class="tok-comment"># runs it, prints "Hello, World!"</span></div>
  </div>
</div>

**std:: and using namespace std;**

\`std::\` refers to the standard library's namespace. \`using namespace std;\` lets you drop the prefix — convenient for small programs, though larger real-world projects often avoid it to prevent naming conflicts:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">namespace.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">cout &lt;&lt; <span class="tok-string">"Works with using namespace std;"</span> &lt;&lt; endl;</div>
    <div class="snippet-line">std::cout &lt;&lt; <span class="tok-string">"Always works, with or without it"</span> &lt;&lt; std::endl;</div>
  </div>
</div>

> 💡 **Try it:** Write and compile a \`hello.cpp\` that prints your name instead of "Hello, World!".

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ compiles directly to native machine code via <code>main()</code> as the entry point — <code>std::cout</code> handles output, and <code>using namespace std;</code> lets you drop the <code>std::</code> prefix.</p>
</div>`
            },
            {
                title: "Variables & const",
                slug: "variables-const",
                order: 1,
                content: `## Variables & const

Like Java, C++ is statically typed — every variable's type is fixed at declaration.

**Declaring variables**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">variables.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 25;</div>
    <div class="snippet-line"><span class="tok-keyword">double</span> price = 19.99;</div>
    <div class="snippet-line"><span class="tok-keyword">bool</span> isActive = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">std::string name = <span class="tok-string">"Adaeze"</span>;</div>
    <div class="snippet-line"><span class="tok-keyword">char</span> grade = <span class="tok-string">'A'</span>;</div>
  </div>
</div>

**const — C++'s constant**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">const.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">const</span> <span class="tok-keyword">double</span> PI = 3.14159;</div>
    <div class="snippet-line">PI = 3.15; <span class="tok-comment">// — Compile error: assignment of read-only variable</span></div>
  </div>
</div>

> 💡 **Try it:** Declare an \`int\`, a \`double\`, a \`bool\`, and a \`std::string\` variable, then print all four with \`std::cout\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ is statically typed with familiar primitives (<code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>) plus <code>std::string</code> for text — <code>const</code> creates an unreassignable constant.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "C++ Operators & Control Flow",
        slug: "cpp-operators-control-flow",
        order: 1,
        topics: [
            {
                title: "Operators",
                slug: "operators",
                order: 0,
                content: `## Operators

C++'s operators are nearly identical to Java's, since Java's syntax was itself modeled closely on C++.

**Arithmetic operators**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">arithmetic.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">std::cout &lt;&lt; 5 / 3 &lt;&lt; std::endl; <span class="tok-comment">// 1 — integer division truncates!</span></div>
    <div class="snippet-line">std::cout &lt;&lt; 5 % 3 &lt;&lt; std::endl; <span class="tok-comment">// 2 — remainder</span></div>
  </div>
</div>

**Fixing integer division with a cast**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">division-cast.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> a = 5;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> b = 2;</div>
    <div class="snippet-line">std::cout &lt;&lt; a / b &lt;&lt; std::endl;               <span class="tok-comment">// 2 — both int, truncates</span></div>
    <div class="snippet-line">std::cout &lt;&lt; (<span class="tok-keyword">double</span>) a / b &lt;&lt; std::endl;    <span class="tok-comment">// 2.5 — cast one operand to double</span></div>
  </div>
</div>

**Booleans print as 1/0**

C++ prints \`bool\` values as \`1\` (true) or \`0\` (false) by default, rather than the words \`true\`/\`false\` — a small but common surprise for beginners.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">bool-print.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">bool</span> isActive = <span class="tok-keyword">true</span>;</div>
    <div class="snippet-line">std::cout &lt;&lt; isActive &lt;&lt; std::endl; <span class="tok-comment">// 1</span></div>
  </div>
</div>

> 💡 **Try it:** Divide 7 by 2 as plain \`int\` division, then again after casting one operand to \`double\`, and print a \`bool\` value to see it appear as \`1\`/\`0\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Integer division truncates, cast one operand to <code>double</code> for a precise result — and C++ prints <code>bool</code> values as <code>1</code>/<code>0</code> by default.</p>
</div>`
            },
            {
                title: "Control Flow",
                slug: "control-flow",
                order: 1,
                content: `## Control Flow

C++'s conditional syntax uses curly braces and parenthesized conditions — nearly identical to Java's.

**if / else if / else**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">if-else.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> score = 75;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">if</span> (score &gt;= 90) {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"A"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">} <span class="tok-keyword">else if</span> (score &gt;= 70) {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"B"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">} <span class="tok-keyword">else</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"C or below"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**switch statement**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">switch.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> day = 3;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">switch</span> (day) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 1:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Monday"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">case</span> 2:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Tuesday"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">default</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Unknown"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

Just like Java, missing \`break\` causes fall-through to the next case — the exact same care applies here.

> 💡 **Try it:** Write a \`switch\` statement on a month number (1-12) that prints its season, being careful to add \`break\` after every case.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++'s <code>if</code>/<code>else</code> and <code>switch</code> syntax mirrors Java closely — including the same fall-through risk from a missing <code>break</code>.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "C++ Loops",
        slug: "cpp-loops",
        order: 2,
        topics: [
            {
                title: "for, while & do-while",
                slug: "for-while-do-while",
                order: 0,
                content: `## for, while & do-while

C++ supports the same three loop types as Java — \`for\`, \`while\`, and \`do-while\` — with essentially identical syntax.

**for loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">for-loop.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> i = 0; i &lt; 5; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; i &lt;&lt; std::endl;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 0 1 2 3 4</span></div>
  </div>
</div>

**while loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">while-loop.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> count = 0;</div>
    <div class="snippet-line"><span class="tok-keyword">while</span> (count &lt; 3) {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; count &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

**do-while loop**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">do-while.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> count = 0;</div>
    <div class="snippet-line"><span class="tok-keyword">do</span> {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; count &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;count++;</div>
    <div class="snippet-line">} <span class="tok-keyword">while</span> (count &lt; 3);</div>
  </div>
</div>

**break and continue**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">break-continue.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">for</span> (<span class="tok-keyword">int</span> i = 0; i &lt; 10; i++) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i == 5) <span class="tok-keyword">break</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">if</span> (i % 2 == 0) <span class="tok-keyword">continue</span>;</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; i &lt;&lt; std::endl;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line"><span class="tok-comment">// prints 1, 3</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`for\` loop that prints numbers 1 through 10, skipping multiples of 3 with \`continue\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ supports the same three loop types as Java — <code>for</code>, <code>while</code>, and <code>do-while</code> — with essentially identical syntax.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "C++ Functions",
        slug: "cpp-functions",
        order: 3,
        topics: [
            {
                title: "Defining Functions & Prototypes",
                slug: "defining-functions-prototypes",
                order: 0,
                content: `## Defining Functions & Prototypes

C++ functions require a declared return type and typed parameters, just like Java methods — but exist independently, without needing to live inside a class.

**A simple function**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">simple-function.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">main</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; add(3, 4) &lt;&lt; std::endl; <span class="tok-comment">// 7</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> 0;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

\`void\` means the function returns nothing — identical in meaning to Java's \`void\`.

**Function prototypes**

Unlike Java, C++ often requires a function to be declared before it's used, if it's defined further down the file — a function prototype solves this:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">prototype.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b); <span class="tok-comment">// prototype — declares add() exists, without defining it yet</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">main</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;std::cout &lt;&lt; add(3, 4) &lt;&lt; std::endl; <span class="tok-comment">// works, even though add() is defined below</span></div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> 0;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> <span class="tok-call">add</span>(<span class="tok-keyword">int</span> a, <span class="tok-keyword">int</span> b) {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">return</span> a + b;</div>
    <div class="snippet-line">}</div>
  </div>
</div>

This is a distinctly C++ concept without a real Java equivalent — the compiler reads top to bottom, so it needs to know a function exists before \`main()\` calls it, even if the full definition comes later.

> 💡 **Try it:** Write a \`multiply(int a, int b)\` function defined below \`main()\`, using a prototype above \`main()\` so it compiles correctly.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ functions need a declared return type and parameters, and may need a function prototype declared above <code>main()</code> if the actual definition comes later in the file.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "C++ Arrays & Strings",
        slug: "cpp-arrays-strings",
        order: 4,
        topics: [
            {
                title: "Arrays",
                slug: "arrays",
                order: 0,
                content: `## Arrays

C++ arrays are fixed-size collections of same-typed values, similar to Java — but with lower-level behavior.

**Declaring and accessing an array**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-basics.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> numbers[3] = {10, 20, 30};</div>
    <div class="snippet-line">std::cout &lt;&lt; numbers[0] &lt;&lt; std::endl; <span class="tok-comment">// 10 — indexes start at 0</span></div>
  </div>
</div>

**No bounds checking**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">no-bounds-check.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">std::cout &lt;&lt; numbers[10] &lt;&lt; std::endl; <span class="tok-comment">// ⚠️ undefined behavior — no error, just garbage or a crash</span></div>
  </div>
</div>

Java throws an \`ArrayIndexOutOfBoundsException\` for this — C++ does not check at all, silently reading whatever memory happens to be at that location.

**No built-in .length**

Unlike Java's simple \`.length\`, plain C++ arrays have no built-in size property — \`sizeof(array) / sizeof(element)\` is the classic (if clunky) workaround:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">array-size.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> size = <span class="tok-keyword">sizeof</span>(numbers) / <span class="tok-keyword">sizeof</span>(numbers[0]);</div>
    <div class="snippet-line">std::cout &lt;&lt; size &lt;&lt; std::endl; <span class="tok-comment">// 3</span></div>
  </div>
</div>

> 💡 **Try it:** Declare an \`int\` array of five numbers, print its size using the \`sizeof\` trick, then try (carefully, in a compiler that allows it) accessing an out-of-bounds index.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Unlike Java, C++ arrays have no automatic bounds checking — accessing an invalid index is undefined behavior, not a caught exception — and array size requires the <code>sizeof</code> trick.</p>
</div>`
            },
            {
                title: "Strings",
                slug: "strings",
                order: 1,
                content: `## Strings

C++ offers two distinct ways to work with text: the modern, safer \`std::string\`, and the older, lower-level C-style character array — knowing both matters when reading real-world code.

**std::string — the modern approach**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">std-string.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">std::string name = <span class="tok-string">"Chidi"</span>;</div>
    <div class="snippet-line">std::cout &lt;&lt; name[0] &lt;&lt; std::endl;          <span class="tok-comment">// 'C' — strings support indexing</span></div>
    <div class="snippet-line">std::cout &lt;&lt; name.length() &lt;&lt; std::endl;    <span class="tok-comment">// 5</span></div>
  </div>
</div>

**C-style character arrays**

Older C++ code (and code interfacing with C libraries) uses character arrays instead:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">c-style-string.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">char</span> greeting[] = <span class="tok-string">"Hello"</span>; <span class="tok-comment">// a char array, ending with an invisible '\\0'</span></div>
  </div>
</div>

C-style strings are just arrays of \`char\`, terminated by a special \`'\\0'\` (null character) marking the end. \`std::string\` handles this complexity internally and is strongly preferred for new code — reach for C-style strings mainly when required by an older API.

> 💡 **Try it:** Declare a \`std::string\`, print its \`.length()\`, then declare a C-style \`char[]\` string and compare how each is created.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Prefer <code>std::string</code> for text — it handles memory safely and supports familiar methods; C-style character arrays (terminated by <code>'\\0'</code>) are an older, lower-level alternative.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "Pointers & References",
        slug: "pointers-references",
        order: 5,
        topics: [
            {
                title: "Pointers",
                slug: "pointers",
                order: 0,
                content: `## Pointers

A pointer is a variable that stores a memory address — the location where another variable's actual data lives, rather than the data itself.

**Declaring and dereferencing a pointer**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pointer-basics.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 25;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span>* agePtr = &amp;age; <span class="tok-comment">// agePtr stores age's address</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">std::cout &lt;&lt; agePtr &lt;&lt; std::endl;  <span class="tok-comment">// prints the memory address itself</span></div>
    <div class="snippet-line">std::cout &lt;&lt; *agePtr &lt;&lt; std::endl; <span class="tok-comment">// 25 — dereferencing gets the value AT that address</span></div>
  </div>
</div>

\`int* agePtr\` declares a pointer that can hold the address of an \`int\`. \`*agePtr\` (dereferencing) follows the pointer to retrieve the actual value stored there — the same \`*\` symbol means something different depending on whether it's in a declaration or an expression.

**Modifying through a pointer**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">modify-through-pointer.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">*agePtr = 30; <span class="tok-comment">// changes the value at that address</span></div>
    <div class="snippet-line">std::cout &lt;&lt; age &lt;&lt; std::endl; <span class="tok-comment">// 30 — the original "age" variable itself changed!</span></div>
  </div>
</div>

Since \`agePtr\` points directly at \`age\`'s memory location, changing the value through the pointer changes \`age\` itself — this is the fundamental power (and risk) pointers offer.

> 💡 **Try it:** Declare an \`int\` and a pointer to it, print the value through the pointer with \`*\`, then modify it through the pointer and print the original variable to confirm it changed.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A pointer stores a memory address (using <code>&amp;</code>), and dereferencing it with <code>*</code> accesses or modifies the actual value stored there — the core concept behind all of C++'s manual memory features.</p>
</div>`
            },
            {
                title: "References",
                slug: "references",
                order: 1,
                content: `## References

A reference is an alternative name (an "alias") for an existing variable — safer and simpler to use than a pointer, since it can never be reassigned to point elsewhere.

**Declaring a reference**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">reference-basics.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span> age = 25;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span>&amp; ageRef = age; <span class="tok-comment">// ageRef is now another name for "age"</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">ageRef = 30;</div>
    <div class="snippet-line">std::cout &lt;&lt; age &lt;&lt; std::endl; <span class="tok-comment">// 30 — changing ageRef changes age directly</span></div>
  </div>
</div>

**Passing by reference to a function**

This is where references become genuinely useful — passing a variable by reference lets a function modify the caller's original variable:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pass-by-reference.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">void</span> <span class="tok-call">doubleValue</span>(<span class="tok-keyword">int</span>&amp; num) {</div>
    <div class="snippet-line">&nbsp;&nbsp;num = num * 2;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> myNumber = 5;</div>
    <div class="snippet-line">doubleValue(myNumber);</div>
    <div class="snippet-line">std::cout &lt;&lt; myNumber &lt;&lt; std::endl; <span class="tok-comment">// 10 — the original variable was actually modified</span></div>
  </div>
</div>

**Without a reference — pass by value**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pass-by-value.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">void</span> <span class="tok-call">tryToDouble</span>(<span class="tok-keyword">int</span> num) { <span class="tok-comment">// pass by value — a COPY</span></div>
    <div class="snippet-line">&nbsp;&nbsp;num = num * 2;</div>
    <div class="snippet-line">}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">int</span> myNumber = 5;</div>
    <div class="snippet-line">tryToDouble(myNumber);</div>
    <div class="snippet-line">std::cout &lt;&lt; myNumber &lt;&lt; std::endl; <span class="tok-comment">// 5 — unchanged, since only a copy was modified</span></div>
  </div>
</div>

Without \`&\`, a function parameter receives a copy of the argument — changes inside the function never reach the original. Adding \`&\` switches to pass-by-reference, letting the function modify the caller's actual variable — commonly used to avoid copying large data unnecessarily.

> 💡 **Try it:** Write a \`swap(int& a, int& b)\` function that swaps two numbers using references, and confirm the caller's original variables actually changed.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A reference (<code>Type&amp; name</code>) is an alias for an existing variable — using <code>&amp;</code> in a function parameter passes by reference, letting the function modify the caller's original variable.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "OOP: Classes & Objects",
        slug: "oop-classes-objects",
        order: 6,
        topics: [
            {
                title: "Defining Classes & Constructors",
                slug: "defining-classes-constructors",
                order: 0,
                content: `## Defining Classes & Constructors

C++ classes work much like Java's — bundling data and behavior together — with syntax that mixes familiar \`{ }\` structure with a few C++-specific quirks.

**A simple class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Dog.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Dog</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;std::string name;</div>
    <div class="snippet-line">&nbsp;&nbsp;std::string breed;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">Dog</span>(std::string dogName, std::string dogBreed) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;name = dogName;</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;breed = dogBreed;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">void</span> <span class="tok-call">bark</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; name &lt;&lt; <span class="tok-string">" says Woof!"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">}; <span class="tok-comment">// note the semicolon after the closing brace</span></div>
  </div>
</div>

\`public:\` marks everything below it as accessible from outside the class — note the semicolon after the closing \`}\` of the class definition, which Java doesn't require. The constructor's name matches the class exactly, same as Java, with no return type at all — not even \`void\`.

**Creating an object**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-dog.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Dog myDog(<span class="tok-string">"Rex"</span>, <span class="tok-string">"Labrador"</span>); <span class="tok-comment">// no "new" needed for a stack-based object</span></div>
    <div class="snippet-line">myDog.bark(); <span class="tok-comment">// "Rex says Woof!"</span></div>
  </div>
</div>

Unlike Java, C++ objects can be created directly on the "stack" (as shown here) without \`new\` at all — \`new\` is reserved for objects that need to live on the "heap," covered in the Memory Management chapter.

> 💡 **Try it:** Write a \`Cat\` class with \`name\` and \`color\` fields, a constructor, and a \`meow()\` method, then create and use one instance.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ classes need <code>public:</code> to expose members, a semicolon after the closing brace, and can be created directly (without <code>new</code>) for simple stack-based objects.</p>
</div>`
            },
            {
                title: "Access Specifiers & Encapsulation",
                slug: "access-specifiers-encapsulation",
                order: 1,
                content: `## Access Specifiers & Encapsulation

Like Java, C++ uses access specifiers to control visibility — \`private\` members are hidden from outside the class, forming the basis of encapsulation.

**private with public getters/setters**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">BankAccount.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">BankAccount</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">private</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">double</span> balance;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">BankAccount</span>(<span class="tok-keyword">double</span> initialBalance) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;balance = initialBalance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">double</span> <span class="tok-call">getBalance</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-keyword">return</span> balance;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
  </div>
</div>

A key difference from Java: C++ classes default to \`private\` for everything unless marked otherwise — the opposite of Java's default.

**Access from outside the class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">access-attempt.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">BankAccount account(100);</div>
    <div class="snippet-line">std::cout &lt;&lt; account.balance; <span class="tok-comment">// — Compile error: balance is private</span></div>
    <div class="snippet-line">std::cout &lt;&lt; account.getBalance(); <span class="tok-comment">// — works — public method</span></div>
  </div>
</div>

> 💡 **Try it:** Add a \`private\` \`age\` field to a class with a \`public\` \`setAge(int)\` method that rejects negative values.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ class members default to <code>private</code> unless labeled otherwise (opposite of Java's default) — <code>private:</code> fields with public getters/setters enforce the same encapsulation principle.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "OOP: Inheritance & Polymorphism",
        slug: "oop-inheritance-polymorphism",
        order: 7,
        topics: [
            {
                title: "Inheritance",
                slug: "inheritance",
                order: 0,
                content: `## Inheritance

C++ inheritance uses a colon and access level, rather than a dedicated \`extends\` keyword — one of several syntax differences from Java worth learning deliberately.

**A parent and child class**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Animal.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Animal</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;std::string name;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">Animal</span>(std::string animalName) {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;name = animalName;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">void</span> <span class="tok-call">eat</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; name &lt;&lt; <span class="tok-string">" is eating"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">Cat.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span> : <span class="tok-keyword">public</span> Animal {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-call">Cat</span>(std::string catName) : Animal(catName) {} <span class="tok-comment">// calls Animal's constructor</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">void</span> <span class="tok-call">meow</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; name &lt;&lt; <span class="tok-string">" says Meow!"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
  </div>
</div>

C++ inheritance uses a colon and access level, rather than a dedicated \`extends\` keyword — \`class Derived : public Base\` is the pattern. \`: Animal(catName)\` in the constructor's header — called an **initializer list** — is how the parent constructor gets called, replacing Java's \`super()\`.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">use-cat.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line">Cat myCat(<span class="tok-string">"Whiskers"</span>);</div>
    <div class="snippet-line">myCat.eat();  <span class="tok-comment">// "Whiskers is eating" — inherited from Animal</span></div>
    <div class="snippet-line">myCat.meow(); <span class="tok-comment">// "Whiskers says Meow!" — defined on Cat</span></div>
  </div>
</div>

> 💡 **Try it:** Write a \`Dog\` class that inherits from \`Animal\` using \`: public Animal(dogName)\` in its constructor's initializer list.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ inheritance uses <code>class Derived : public Base</code>, and an initializer list (<code>: Base(args)</code>) calls the parent constructor, replacing Java's <code>super()</code>.</p>
</div>`
            },
            {
                title: "Polymorphism & virtual",
                slug: "polymorphism-virtual",
                order: 1,
                content: `## Polymorphism & virtual

C++ requires you to explicitly opt into polymorphism using the \`virtual\` keyword — a meaningful difference from Java, where every method is polymorphic by default.

**Without virtual — polymorphism doesn't work**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">without-virtual.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Animal</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">void</span> <span class="tok-call">speak</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Some generic animal sound"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Cat</span> : <span class="tok-keyword">public</span> Animal {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">void</span> <span class="tok-call">speak</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Meow!"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">Animal* myPet = <span class="tok-keyword">new</span> Cat();</div>
    <div class="snippet-line">myPet-&gt;speak(); <span class="tok-comment">// — prints "Some generic animal sound" — NOT "Meow!"</span></div>
  </div>
</div>

Without \`virtual\`, C++ decides which \`speak()\` to call based on the *declared* type (\`Animal*\`), not the actual object type (\`Cat\`) — the opposite of what most beginners expect, and the opposite of Java's default behavior.

**With virtual — polymorphism works correctly**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">with-virtual.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Animal</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">virtual</span> <span class="tok-keyword">void</span> <span class="tok-call">speak</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span class="tok-string">"Some generic animal sound"</span> &lt;&lt; std::endl;</div>
    <div class="snippet-line">&nbsp;&nbsp;}</div>
    <div class="snippet-line">};</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">Animal* myPet = <span class="tok-keyword">new</span> Cat();</div>
    <div class="snippet-line">myPet-&gt;speak(); <span class="tok-comment">// — "Meow!" — correctly calls Cat's version</span></div>
  </div>
</div>

Marking the base class method \`virtual\` tells the compiler: "check the actual object's real type at runtime, not just the declared pointer type." This is the mechanism Java gives you automatically, that C++ makes an explicit opt-in.

**Pure virtual functions (abstract methods)**

A pure virtual function (\`= 0\`) has no implementation at all, forcing every derived class to provide one — C++'s equivalent of Java's \`abstract\`:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">pure-virtual.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">class</span> <span class="tok-call">Shape</span> {</div>
    <div class="snippet-line"><span class="tok-keyword">public</span>:</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">virtual</span> <span class="tok-keyword">double</span> <span class="tok-call">getArea</span>() = 0; <span class="tok-comment">// pure virtual — no body, must be overridden</span></div>
    <div class="snippet-line">};</div>
  </div>
</div>

> 💡 **Try it:** Add \`virtual\` to a base class method, override it in a subclass, and call it through a base-class pointer to confirm the correct version runs.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">C++ requires <code>virtual</code> to enable polymorphism through base class pointers — without it, the declared type decides which method runs, not the actual object's type; <code>= 0</code> creates a pure virtual (abstract) method.</p>
</div>`
            },
        ],
    },
    {
        language: "C++",
        title: "Memory Management",
        slug: "memory-management",
        order: 8,
        topics: [
            {
                title: "The Stack & The Heap",
                slug: "the-stack-the-heap",
                order: 0,
                content: `## The Stack & The Heap

C++ gives you direct control over the stack and the heap — and understanding the difference is essential to writing correct, leak-free programs.

**The stack**

Every variable you've used so far — locals, function parameters — lives on the stack — memory that's automatically managed, allocated when a function starts and freed the instant it returns.

**The heap**

The heap is a separate region of memory that persists until *you* explicitly free it — useful for data that needs to outlive the function that created it.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">heap-allocation.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">int</span>* number = <span class="tok-keyword">new</span> <span class="tok-keyword">int</span>(42); <span class="tok-comment">// allocated on the heap</span></div>
    <div class="snippet-line">std::cout &lt;&lt; *number &lt;&lt; std::endl; <span class="tok-comment">// 42 — dereference to get the value</span></div>
    <div class="snippet-line"><span class="tok-keyword">delete</span> number; <span class="tok-comment">// must be freed manually, or it leaks</span></div>
  </div>
</div>

Java and Python handle heap memory automatically through garbage collection — memory is cleaned up whenever it's no longer reachable. Unlike Java or Python's automatic garbage collection, C++ makes heap management entirely your responsibility.

> 💡 **Try it:** Allocate an \`int\` on the heap with \`new\`, print its value through the pointer, then free it with \`delete\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>new</code> allocates memory on the heap, and <code>delete</code> frees it — every single <code>new</code> must be matched with exactly one <code>delete</code>, unlike Java or Python's automatic garbage collection.</p>
</div>`
            },
            {
                title: "Memory Leaks & Smart Pointers",
                slug: "memory-leaks-smart-pointers",
                order: 1,
                content: `## Memory Leaks & Smart Pointers

Forgetting to free heap memory causes a **memory leak** — one of the most notorious classes of C++ bugs, and one modern C++ has real tools to help avoid.

**A memory leak**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">memory-leak.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">void</span> <span class="tok-call">createLeak</span>() {</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">int</span>* number = <span class="tok-keyword">new</span> <span class="tok-keyword">int</span>(42);</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-comment">// ...forgot to delete number! ⚠️</span></div>
    <div class="snippet-line">} <span class="tok-comment">// number (the pointer) is gone, but the heap memory it pointed to is not</span></div>
  </div>
</div>

This is called a memory leak — the heap memory is never freed, and since the pointer itself was a local (stack) variable that just disappeared, there's no longer any way to reach that memory to free it later.

**Smart pointers**

Modern C++ provides \`std::unique_ptr\` and \`std::shared_ptr\`, which automatically call \`delete\` for you when appropriate — largely eliminating manual memory management bugs.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">smart-pointer.cpp</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">#include &lt;memory&gt;</span></div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line">std::unique_ptr&lt;<span class="tok-keyword">int</span>&gt; number = std::make_unique&lt;<span class="tok-keyword">int</span>&gt;(42);</div>
    <div class="snippet-line">std::cout &lt;&lt; *number &lt;&lt; std::endl; <span class="tok-comment">// 42</span></div>
    <div class="snippet-line"><span class="tok-comment">// no delete needed — it's freed automatically when number goes out of scope</span></div>
  </div>
</div>

> 💡 **Try it:** Rewrite a \`new int(...)\`/\`delete\` pair using \`std::unique_ptr\` and \`std::make_unique\` instead.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">Every <code>new</code> needs a matching <code>delete</code> (and <code>new[]</code> needs <code>delete[]</code>) — forgetting this causes memory leaks; <code>std::unique_ptr</code>/<code>std::shared_ptr</code> automate this safely.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "SQL Basics",
        slug: "sql-basics",
        order: 0,
        topics: [
            {
                title: "Introduction to SQL & SELECT",
                slug: "introduction-to-sql-select",
                order: 0,
                content: `## Introduction to SQL & SELECT

SQL (Structured Query Language) is how you talk to a relational database — asking it to retrieve, add, change, or remove data.

**Relational tables**

A relational database organizes data into tables — rows and columns, much like a spreadsheet:

| id | name | city |
|----|------|------|
| 1 | Ada | Lagos |
| 2 | Kwame | Accra |
| 3 | Zola | Nairobi |

**Selecting columns**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">select.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, city <span class="tok-keyword">FROM</span> users;</div>
  </div>
</div>

\`SELECT\` specifies which columns; \`FROM\` specifies which table.

**Selecting all columns**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">select-all.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users;</div>
  </div>
</div>

The \`*\` wildcard means "every column." It's convenient for exploring a table, but real applications usually name specific columns explicitly — pulling unnecessary data wastes bandwidth and makes queries harder to reason about.

> 💡 **Try it:** Write a query that selects only the \`name\` column from a \`users\` table, then rewrite it to select every column with \`*\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">SQL is declarative — <code>SELECT columns FROM table;</code> describes what data you want, and <code>*</code> selects every column, though naming specific columns is better practice.</p>
</div>`
            },
            {
                title: "Filtering with WHERE",
                slug: "filtering-with-where",
                order: 1,
                content: `## Filtering with WHERE

\`WHERE\` filters which rows are returned, based on a condition — without it, \`SELECT\` returns every single row in the table.

**Basic WHERE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">where.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> city = <span class="tok-string">'Lagos'</span>;</div>
  </div>
</div>

Only rows where \`city\` exactly equals \`'Lagos'\` are returned. Note SQL uses single quotes for text values, and \`=\` (not \`==\`) for equality.

**Combining conditions with AND / OR**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">and-or.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> city = <span class="tok-string">'Lagos'</span> <span class="tok-keyword">AND</span> age &gt; 18;</div>
  </div>
</div>

**IN for multiple possible values**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">in-clause.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> city <span class="tok-keyword">IN</span> (<span class="tok-string">'Lagos'</span>, <span class="tok-string">'Accra'</span>, <span class="tok-string">'Nairobi'</span>);</div>
  </div>
</div>

\`IN\` is a cleaner shorthand for what would otherwise be a chain of \`OR\` conditions checking the same column against different values.

> 💡 **Try it:** Write a query selecting users from either \`'Lagos'\` or \`'Accra'\` using \`IN\`, then rewrite the same logic using \`OR\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>WHERE</code> filters rows by condition, combinable with <code>AND</code>/<code>OR</code> — <code>IN (...)</code> is a clean shorthand for checking a column against multiple possible values.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "Filtering & Sorting",
        slug: "filtering-sorting",
        order: 1,
        topics: [
            {
                title: "ORDER BY & LIMIT",
                slug: "order-by-limit",
                order: 0,
                content: `## ORDER BY & LIMIT

\`ORDER BY\` controls the order results are returned in, and \`LIMIT\` caps how many rows come back — two of the most frequently used clauses beyond basic filtering.

**Sorting results**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">order-by.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, age <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">ORDER BY</span> age <span class="tok-keyword">DESC</span>;</div>
  </div>
</div>

\`ASC\` (ascending, low to high) is the default, so it can be omitted. \`DESC\` reverses it to descending, high to low.

**Sorting by multiple columns**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">order-by-multiple.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, city, age <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">ORDER BY</span> city <span class="tok-keyword">ASC</span>, age <span class="tok-keyword">DESC</span>;</div>
  </div>
</div>

Rows are sorted by \`city\` first — and only when two rows share the same \`city\` does \`age\` (descending) decide the order between them.

**LIMIT**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">limit.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, age <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">ORDER BY</span> age <span class="tok-keyword">DESC</span></div>
    <div class="snippet-line"><span class="tok-keyword">LIMIT</span> 5;</div>
  </div>
</div>

This is the standard pattern for "top N" queries — here, the 5 oldest users.

> 💡 **Try it:** Write a query that returns the 3 youngest users, sorted by age ascending, using \`ORDER BY\` and \`LIMIT\` together.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>ORDER BY column ASC/DESC</code> sorts results, and <code>LIMIT n</code> caps the row count — combined, they're the standard pattern for "top N" queries.</p>
</div>`
            },
            {
                title: "Pattern Matching & NULL",
                slug: "pattern-matching-null",
                order: 1,
                content: `## Pattern Matching & NULL

Beyond exact matches, SQL supports partial text matching and has special handling for missing data — both essential once you're working with real, messy datasets.

**LIKE with wildcards**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">like.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> name <span class="tok-keyword">LIKE</span> <span class="tok-string">'A%'</span>;</div>
    <div class="snippet-line"><span class="tok-comment">-- matches any name starting with "A"</span></div>
  </div>
</div>

\`%\` is a wildcard matching any sequence of characters (including none). \`_\` matches exactly one character:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">like-underscore.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> name <span class="tok-keyword">LIKE</span> <span class="tok-string">'_da'</span>;</div>
    <div class="snippet-line"><span class="tok-comment">-- matches any 3-letter name ending in "da", like "Ada"</span></div>
  </div>
</div>

**NULL and missing data**

\`NULL\` represents missing or unknown data — critically, it can never be compared using \`=\`, since "unknown equals unknown" isn't a meaningful comparison.

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">null-wrong.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> city = <span class="tok-keyword">NULL</span>;     <span class="tok-comment">-- — never matches anything, even NULL rows</span></div>
  </div>
</div>

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">null-correct.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> city <span class="tok-keyword">IS</span> <span class="tok-keyword">NULL</span>;  <span class="tok-comment">-- — correct way to check for missing values</span></div>
  </div>
</div>

\`IS NULL\` and \`IS NOT NULL\` are the only correct ways to test for missing data — \`= NULL\` is a very common beginner mistake that silently returns zero rows instead of erroring.

> 💡 **Try it:** Write a query finding all users whose name starts with \`'K'\` using \`LIKE\`, then a separate query finding all users with a missing \`city\` using \`IS NULL\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>LIKE</code> with <code>%</code>/<code>_</code> wildcards handles partial text matching, and missing values must be checked with <code>IS NULL</code>/<code>IS NOT NULL</code> — never <code>= NULL</code>.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "Aggregate Functions & GROUP BY",
        slug: "aggregate-functions-group-by",
        order: 2,
        topics: [
            {
                title: "Aggregate Functions",
                slug: "aggregate-functions",
                order: 0,
                content: `## Aggregate Functions

Aggregate functions calculate a single summary value across many rows — counting, summing, averaging, and finding minimums or maximums.

**COUNT, AVG, SUM, MIN, MAX**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">aggregates.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> <span class="tok-keyword">COUNT</span>(*) <span class="tok-keyword">FROM</span> users;         <span class="tok-comment">-- total number of rows</span></div>
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> <span class="tok-keyword">AVG</span>(age) <span class="tok-keyword">FROM</span> users;         <span class="tok-comment">-- average age</span></div>
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> <span class="tok-keyword">SUM</span>(age) <span class="tok-keyword">FROM</span> users;         <span class="tok-comment">-- sum of all ages</span></div>
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> <span class="tok-keyword">MIN</span>(age), <span class="tok-keyword">MAX</span>(age) <span class="tok-keyword">FROM</span> users; <span class="tok-comment">-- youngest and oldest</span></div>
  </div>
</div>

Each of these collapses the entire table (or filtered subset) into a single number — very different from a regular \`SELECT\`, which returns one row per matching record.

**Naming the result with AS**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">as-alias.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> <span class="tok-keyword">AVG</span>(age) <span class="tok-keyword">AS</span> average_age <span class="tok-keyword">FROM</span> users;</div>
  </div>
</div>

Without \`AS\`, the result column typically has an unhelpful generic name — \`AS\` gives it a clear, readable label instead.

> 💡 **Try it:** Write a query that counts all users and finds the average age, giving each result column a readable name with \`AS\`.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>COUNT()</code>, <code>AVG()</code>, <code>SUM()</code>, <code>MIN()</code>, <code>MAX()</code> collapse rows into a single summary value — combine with <code>WHERE</code> to filter first, and <code>AS</code> to name the result.</p>
</div>`
            },
            {
                title: "GROUP BY & HAVING",
                slug: "group-by-having",
                order: 1,
                content: `## GROUP BY & HAVING

\`GROUP BY\` splits rows into groups based on a shared column value, then runs an aggregate function per group — instead of one summary for the whole table.

**Basic GROUP BY**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">group-by.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> city, <span class="tok-keyword">COUNT</span>(*) <span class="tok-keyword">AS</span> user_count</div>
    <div class="snippet-line"><span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">GROUP BY</span> city;</div>
  </div>
</div>

This returns one row per unique \`city\`, each with a count of how many users live there — instead of one giant \`COUNT(*)\` for the entire table.

**Filtering groups with HAVING**

\`WHERE\` filters individual rows before grouping; \`HAVING\` filters entire groups after aggregation — a distinction that trips up many SQL beginners:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">having.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> city, <span class="tok-keyword">COUNT</span>(*) <span class="tok-keyword">AS</span> user_count</div>
    <div class="snippet-line"><span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">GROUP BY</span> city</div>
    <div class="snippet-line"><span class="tok-keyword">HAVING</span> <span class="tok-keyword">COUNT</span>(*) &gt; 5; <span class="tok-comment">-- only cities with more than 5 users</span></div>
  </div>
</div>

You can't write \`WHERE COUNT(*) > 5\` — \`WHERE\` runs before aggregation even happens, so it has no access to the aggregated count yet.

> 💡 **Try it:** Write a query that groups users by \`city\`, counts them, and uses \`HAVING\` to show only cities with more than 2 users.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>GROUP BY</code> runs aggregates per group instead of the whole table — <code>WHERE</code> filters rows before grouping, while <code>HAVING</code> filters entire groups after aggregation.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "SQL Joins",
        slug: "sql-joins",
        order: 3,
        topics: [
            {
                title: "INNER JOIN",
                slug: "inner-join",
                order: 0,
                content: `## INNER JOIN

Real databases split related data across multiple tables — a \`users\` table and a separate \`orders\` table, linked by a shared ID. \`JOIN\` combines rows from two tables based on a matching column, letting you query across that relationship.

**Two related tables**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">tables.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-comment">-- users: id, name</span></div>
    <div class="snippet-line"><span class="tok-comment">-- orders: id, user_id, product</span></div>
  </div>
</div>

\`orders.user_id\` is a foreign key — it references \`users.id\`, establishing the relationship between an order and the user who placed it.

**INNER JOIN**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">inner-join.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> users.name, orders.product</div>
    <div class="snippet-line"><span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">INNER JOIN</span> orders <span class="tok-keyword">ON</span> users.id = orders.user_id;</div>
  </div>
</div>

\`ON users.id = orders.user_id\` tells SQL how to match rows between the two tables. The result combines matching rows from both — Ada's row appears twice here if she placed two orders.

\`INNER JOIN\` only returns rows where a match exists in both tables — a user with zero orders wouldn't appear at all in these results.

> 💡 **Try it:** Write an \`INNER JOIN\` between a \`users\` and \`orders\` table that lists each user's name alongside every product they ordered.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>INNER JOIN ... ON</code> combines matching rows from two related tables via a foreign key — but only rows with a match in both tables are included.</p>
</div>`
            },
            {
                title: "LEFT JOIN",
                slug: "left-join",
                order: 1,
                content: `## LEFT JOIN

\`LEFT JOIN\` is \`INNER JOIN\`'s essential companion — it includes every row from the first table, even when there's no matching row in the second.

**LEFT JOIN**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">left-join.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> users.name, orders.product</div>
    <div class="snippet-line"><span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">LEFT JOIN</span> orders <span class="tok-keyword">ON</span> users.id = orders.user_id;</div>
  </div>
</div>

Unlike \`INNER JOIN\`, a user with no orders still appears in the results here — with \`NULL\` in the \`product\` column, instead of being dropped entirely.

**Finding unmatched rows**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">left-join-null-check.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> users.name</div>
    <div class="snippet-line"><span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">LEFT JOIN</span> orders <span class="tok-keyword">ON</span> users.id = orders.user_id</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> orders.id <span class="tok-keyword">IS</span> <span class="tok-keyword">NULL</span>; <span class="tok-comment">-- users with no matching order row at all</span></div>
  </div>
</div>

**RIGHT JOIN**

\`RIGHT JOIN\` mirrors \`LEFT JOIN\` in the opposite direction — in practice, most developers default to writing \`LEFT JOIN\` and simply swapping table order, rather than reaching for \`RIGHT JOIN\` directly.

> 💡 **Try it:** Write a \`LEFT JOIN\` between \`users\` and \`orders\`, then add a \`WHERE orders.id IS NULL\` to find every user who has never placed an order.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>LEFT JOIN</code> keeps every row from the first table even without a match (filling gaps with <code>NULL</code>) — combined with <code>WHERE ... IS NULL</code>, it's the standard way to find unmatched rows.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "Data Modification",
        slug: "data-modification",
        order: 4,
        topics: [
            {
                title: "INSERT",
                slug: "insert",
                order: 0,
                content: `## INSERT

\`INSERT\` adds new rows into a table — the SQL equivalent of adding a new item to a list or array.

**Basic INSERT**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">insert.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">INSERT INTO</span> users (name, city, age)</div>
    <div class="snippet-line"><span class="tok-keyword">VALUES</span> (<span class="tok-string">'Ada'</span>, <span class="tok-string">'Lagos'</span>, 25);</div>
  </div>
</div>

Column names go in the first parentheses, and their corresponding values (in the same order) go in \`VALUES\`. Any columns left out get their default value (often \`NULL\`) automatically.

**Inserting multiple rows at once**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">insert-multiple.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">INSERT INTO</span> users (name, city, age)</div>
    <div class="snippet-line"><span class="tok-keyword">VALUES</span></div>
    <div class="snippet-line">&nbsp;&nbsp;(<span class="tok-string">'Kwame'</span>, <span class="tok-string">'Accra'</span>, 30),</div>
    <div class="snippet-line">&nbsp;&nbsp;(<span class="tok-string">'Zola'</span>, <span class="tok-string">'Nairobi'</span>, 22);</div>
  </div>
</div>

Batching several rows into one \`INSERT\` statement is far more efficient than running separate \`INSERT\` statements one at a time.

> 💡 **Try it:** Write an \`INSERT\` statement adding three new rows to a \`products\` table in a single statement.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>INSERT INTO table (columns) VALUES (values);</code> adds new rows — multiple rows can be batched into one statement for efficiency.</p>
</div>`
            },
            {
                title: "UPDATE & DELETE",
                slug: "update-delete",
                order: 1,
                content: `## UPDATE & DELETE

\`UPDATE\` modifies existing rows, and \`DELETE\` removes them — both are among the most dangerous SQL commands, since a missing \`WHERE\` clause affects every single row in the table.

**UPDATE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">update.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">UPDATE</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">SET</span> city = <span class="tok-string">'Lagos'</span></div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> id = 1;</div>
  </div>
</div>

\`SET\` specifies the new value(s); \`WHERE\` specifies which rows to change.

**The danger of a missing WHERE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">update-no-where.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">UPDATE</span> users <span class="tok-keyword">SET</span> city = <span class="tok-string">'Lagos'</span>; <span class="tok-comment">-- — NO WHERE! Updates EVERY row in the table</span></div>
  </div>
</div>

This is one of the most infamous SQL mistakes — always double-check the \`WHERE\` clause before running an \`UPDATE\`.

**DELETE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">delete.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">DELETE FROM</span> users <span class="tok-keyword">WHERE</span> id = 1;</div>
    <div class="snippet-line">&nbsp;</div>
    <div class="snippet-line"><span class="tok-keyword">DELETE FROM</span> users; <span class="tok-comment">-- — NO WHERE! Deletes EVERY row in the table</span></div>
  </div>
</div>

> 💡 **Try it:** Write an \`UPDATE\` that changes one user's \`city\`, then a \`DELETE\` that removes one specific user by \`id\` — always including a \`WHERE\` clause in both.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A missing <code>WHERE</code> on <code>UPDATE</code> or <code>DELETE</code> affects every row in the table — always test the same <code>WHERE</code> with a <code>SELECT</code> first to confirm exactly what will be changed.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "Table Creation & Constraints",
        slug: "table-creation-constraints",
        order: 5,
        topics: [
            {
                title: "CREATE TABLE & DROP TABLE",
                slug: "create-table-drop-table",
                order: 0,
                content: `## CREATE TABLE & DROP TABLE

\`CREATE TABLE\` defines a new table's structure — its columns, and the type of data each one can hold.

**Creating a table**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">create-table.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">CREATE TABLE</span> users (</div>
    <div class="snippet-line">&nbsp;&nbsp;id <span class="tok-keyword">INT</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;name <span class="tok-keyword">VARCHAR</span>(100),</div>
    <div class="snippet-line">&nbsp;&nbsp;age <span class="tok-keyword">INT</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;city <span class="tok-keyword">VARCHAR</span>(100)</div>
    <div class="snippet-line">);</div>
  </div>
</div>

**Deleting a table entirely**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">drop-table.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">DROP TABLE</span> users; <span class="tok-comment">-- deletes the entire table AND all its data, irreversibly</span></div>
  </div>
</div>

\`DROP TABLE\` is even more destructive than \`DELETE FROM\` — it removes the table's structure entirely, not just its rows.

> 💡 **Try it:** Write a \`CREATE TABLE\` statement for a \`products\` table with \`id\`, \`name\`, and \`price\` columns.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>CREATE TABLE</code> defines column names and data types upfront — <code>DROP TABLE</code> permanently removes both the structure and all data.</p>
</div>`
            },
            {
                title: "Constraints",
                slug: "constraints",
                order: 1,
                content: `## Constraints

Constraints are rules attached to columns that the database enforces automatically — rejecting any \`INSERT\` or \`UPDATE\` that would violate them.

**PRIMARY KEY, NOT NULL & UNIQUE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">constraints.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">CREATE TABLE</span> users (</div>
    <div class="snippet-line">&nbsp;&nbsp;id <span class="tok-keyword">INT</span> <span class="tok-keyword">PRIMARY KEY</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;name <span class="tok-keyword">VARCHAR</span>(100) <span class="tok-keyword">NOT NULL</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;email <span class="tok-keyword">VARCHAR</span>(100) <span class="tok-keyword">UNIQUE</span></div>
    <div class="snippet-line">);</div>
  </div>
</div>

A primary key uniquely identifies every row in a table — no two rows can share the same value, and it can never be \`NULL\`. \`NOT NULL\` rejects any attempt to insert a row without a value for that column. \`UNIQUE\` rejects any value that already exists elsewhere in that column — here, preventing two users from sharing an email.

**FOREIGN KEY**

Foreign keys formally establish and enforce the table relationships used in the Joins chapter:

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">foreign-key.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">CREATE TABLE</span> orders (</div>
    <div class="snippet-line">&nbsp;&nbsp;id <span class="tok-keyword">INT</span> <span class="tok-keyword">PRIMARY KEY</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;user_id <span class="tok-keyword">INT</span>,</div>
    <div class="snippet-line">&nbsp;&nbsp;product <span class="tok-keyword">VARCHAR</span>(100),</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">FOREIGN KEY</span> (user_id) <span class="tok-keyword">REFERENCES</span> users(id)</div>
    <div class="snippet-line">);</div>
  </div>
</div>

This tells the database that \`orders.user_id\` must correspond to a real \`id\` in the \`users\` table — it prevents inserting an order for a user that doesn't actually exist.

> 💡 **Try it:** Write a \`CREATE TABLE\` for \`orders\` with a \`PRIMARY KEY\` and a \`FOREIGN KEY\` referencing a \`users\` table.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>PRIMARY KEY</code> uniquely identifies rows, <code>NOT NULL</code>/<code>UNIQUE</code> enforce data quality, and <code>FOREIGN KEY ... REFERENCES</code> enforces valid relationships between tables.</p>
</div>`
            },
        ],
    },
    {
        language: "SQL",
        title: "Subqueries & Advanced SQL",
        slug: "subqueries-advanced-sql",
        order: 6,
        topics: [
            {
                title: "Subqueries",
                slug: "subqueries",
                order: 0,
                content: `## Subqueries

A subquery is a \`SELECT\` statement nested inside another query — used when a filter or value itself needs to be calculated from the database.

**A subquery in WHERE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">subquery-where.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, age <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> age &gt; (<span class="tok-keyword">SELECT</span> <span class="tok-keyword">AVG</span>(age) <span class="tok-keyword">FROM</span> users);</div>
  </div>
</div>

The inner query runs first, calculating the average age — the outer query then uses that single number to filter for users older than average. This solves something a plain \`WHERE\` comparison alone couldn't, since the comparison value isn't known ahead of time.

**A subquery with IN**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">subquery-in.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name <span class="tok-keyword">FROM</span> users</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> id <span class="tok-keyword">IN</span> (<span class="tok-keyword">SELECT</span> user_id <span class="tok-keyword">FROM</span> orders <span class="tok-keyword">WHERE</span> product = <span class="tok-string">'Laptop'</span>);</div>
  </div>
</div>

This finds every user who has ordered a \`'Laptop'\` — the inner query returns a list of matching \`user_id\`s, and the outer query looks up the corresponding user names. Many subquery patterns can also be written as a \`JOIN\`, and vice versa — \`JOIN\` is often more efficient, but subqueries can be more readable for certain nested logic.

> 💡 **Try it:** Write a subquery that finds all users whose \`age\` is above the average, then a separate subquery finding all users who have placed at least one order.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body">A subquery — a <code>SELECT</code> nested inside another query — lets you filter or compare against a value calculated from the database itself.</p>
</div>`
            },
            {
                title: "Common Table Expressions (CTEs)",
                slug: "common-table-expressions-ctes",
                order: 1,
                content: `## Common Table Expressions (CTEs)

A Common Table Expression (CTE), written with \`WITH\`, names a temporary result set that the main query can then reference — making complex, multi-step queries far more readable.

**A basic CTE**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">cte.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">WITH</span> older_users <span class="tok-keyword">AS</span> (</div>
    <div class="snippet-line">&nbsp;&nbsp;<span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> age &gt; 30</div>
    <div class="snippet-line">)</div>
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, city <span class="tok-keyword">FROM</span> older_users <span class="tok-keyword">WHERE</span> city = <span class="tok-string">'Lagos'</span>;</div>
  </div>
</div>

\`older_users\` behaves like a temporary, named table for the duration of this one query — the main \`SELECT\` below can reference it exactly like a real table.

**CTE vs. equivalent nested subquery**

<div class="snippet-card">
  <div class="snippet-tab">
    <span class="snippet-dot"></span>
    <span class="snippet-filename">nested-equivalent.sql</span>
    <button type="button" class="snippet-copy-btn">Copy</button>
  </div>
  <div class="snippet-body">
    <div class="snippet-line"><span class="tok-keyword">SELECT</span> name, city <span class="tok-keyword">FROM</span></div>
    <div class="snippet-line">&nbsp;&nbsp;(<span class="tok-keyword">SELECT</span> * <span class="tok-keyword">FROM</span> users <span class="tok-keyword">WHERE</span> age &gt; 30) <span class="tok-keyword">AS</span> older_users</div>
    <div class="snippet-line"><span class="tok-keyword">WHERE</span> city = <span class="tok-string">'Lagos'</span>;</div>
  </div>
</div>

Both queries return identical results — the CTE version just reads more like a sequence of clear steps, rather than a query nested inside another query.

> 💡 **Try it:** Rewrite a nested subquery you've already written as a \`WITH\` CTE, and compare which version reads more clearly.

<div class="callout callout-success">
  <div class="callout-header">
    <span class="callout-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="callout-title">Key Takeaway</span>
  </div>
  <p class="callout-body"><code>WITH name AS (...)</code> creates a temporary, named result set the main query can reference — making complex, multi-step queries far more readable than deeply nested subqueries.</p>
</div>`
            },
        ],
    },
];

await connectDB();
for (const chapter of chapters) {
    await Chapter.findOneAndUpdate(
        { language: chapter.language, slug: chapter.slug },
        chapter,
        { upsert: true, returnDocument: "after" },
    );
    console.log(`Seeded: ${chapter.language} > ${chapter.title}`);
}
await mongoose.disconnect();
process.exit(0);
