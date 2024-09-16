# Coding Style

This page documents the coding style and conventions used to create and maintain the
codebase, ensuring consistency and quality throughout the code.

## Table of Contents

- [Indentation](#indentation)
- [Naming Conventions](#naming-conventions)
- [Source Code Formatters](#source-code-formatters)
- [Line Column Limit](#line-column-limit)
- [Code Commenting](#code-commenting)
- [Function Structure](#function-structure)
- [Strings](#strings)

<br>

## Indentation

The recommended indentation is **3 spaces**. While there is ongoing debate about using
tabs versus spaces and the ideal indentation size—whether 2 or 4 spaces—**3 spaces**
has been chosen as the balance.

<br>

## Naming Conventions

The naming convention follows standard JavaScript `camelCase`, which also applies to HTML
element IDs. For custom CSS classes, the standard convention is `kebab-case`.

<br>

## Source Code Formatters

Source code formatting is performed by the following default Language Server Protocol (LSP)
formatters:

* HTML: `html-lsp (html)`
* CSS: `css-lsp (cssls)`
* JavaScript: `typescript-language-server (ts_ls)`

<br>

## Line Column Limit

Each line of code should not exceed **90 columns**, with the exception of HTML files.
Adhering to the 90-column limit improves the readability of the source code by reducing
the need for horizontal scrolling. While this limit can be bypassed, it should be done
sparingly.

<br>

## Code Commenting

Code comments should be used sparingly. While commenting is a good practice, excessive
use can clutter the source code. To avoid this, aim to make the code readable by clearly
naming variables, components, and functions according to their purpose.

<br>

## Function Structure

This project follows a simple **Functional Programming** paradigm. Aim to make each
function concise and modular. A function should have only one purpose, and that purpose
should be clearly reflected in its name.

Each function should start with a log that states its name and parameters. The log
should be placed after a condition that prevents the function's execution if necessary.
```javascript
function foo(param1, param2) {
   if (!param1 || !param2) return;
   console.log(`foo(${param1}, ${param2})`);
}
```

Functions should use JSDoc comment formatting.
```javascript
/**
 * Description or purpose of the function
 *
 * @param {number} param1 - The first parameter.
 * @param {number} param2 - The second parameter.
 */
function foo(param1, param2) {
   if (!param1 || !param2) return;
   console.log(`foo(${param1}, ${param2})`);
}
```

<br>

## Strings

Most strings should be enclosed in `"double quotes"`. When emphasizing a specific word
within a string, it should be done like this: `"emphasize 'this'"`.

For JavaScript string formatting, always use backticks for template literals, as shown
below:

```javascript
const var = "heehee";
console.log(`The value of var is ${var}`);
