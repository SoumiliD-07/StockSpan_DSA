# Stock Span Visualizer

Stock Span Visualizer demonstrates the stock span problem with both a browser-based interface and a standalone C program. Enter a sequence of daily prices to calculate each day's span and inspect the results as a table and bar chart, or run the C implementation in a terminal.

## Features

- Calculates the stock span for each price using a monotonic stack.
- Accepts prices separated by spaces or commas in the browser interface.
- Displays the day, price, and span in a results table.
- Shows the total number of days, average span, and a span bar chart in the browser.
- Includes a C implementation with a terminal table and text-based span chart.
- Supports up to 1,000 non-negative integer prices.

## Run the Web Visualizer

No package installation or build step is required.

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Enter prices separated by spaces or commas, such as `100 80 60 70 60 75 85`.
4. Select **Calculate Span** to show the results. Select **Clear** to reset the page.

The web version is implemented with plain HTML, CSS, and JavaScript. It can be opened directly from disk; a local web server is optional.

## Build and Run the C Program

With GCC or Clang installed, compile from the repository directory:

```sh
gcc stockspan.c -o stockspan
```

On Linux or macOS, run it with:

```sh
./stockspan
```

On Windows PowerShell, run the generated executable with:

```powershell
.\stockspan.exe
```

The program asks for the number of days, followed by that many prices separated by whitespace.

## Example

For the prices:

```text
100 80 60 70 60 75 85
```

The corresponding spans are:

```text
1 1 1 2 1 4 6
```

The span for a day is the number of consecutive days ending on that day for which the price was less than or equal to that day's price. The count includes the current day and stops at the previous day with a strictly higher price.

## Algorithm

Both implementations scan prices from left to right and maintain a stack of indices whose prices are in decreasing order. For each day, they remove indices with prices less than or equal to the current price. The remaining top of the stack, if present, identifies the nearest previous day with a higher price; otherwise, the span reaches back to the first day.

- Time complexity: `O(n)`
- Auxiliary space: `O(n)`

Each index is pushed onto and popped from the stack at most once.

## Project Files

- `index.html` contains the browser interface structure.
- `style.css` contains the page and chart styling.
- `script.js` validates input, calculates spans, and renders the results.
- `stockspan.c` is the command-line C implementation.