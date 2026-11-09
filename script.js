function calculateSpan() {

    const input = document.getElementById("prices").value.trim();

    const error = document.getElementById("error");

    error.textContent = "";

    if (input === "") {
        error.textContent = "Please enter stock prices!";
        return;
    }

    // Convert input into an array
    const price = input.split(/[\s,]+/).map(Number);

    // Validate input
    if (
        price.some(p => !Number.isSafeInteger(p) || p < 0)
        || price.length > 1000
    ) {
        error.textContent =
            "Enter between 1 and 1000 non-negative integer prices.";
        return;
    }

    const n = price.length;

    const span = new Array(n);

    const stack = [];

    // Calculate stock span
    for (let i = 0; i < n; i++) {

        // Remove smaller or equal prices
        while (
            stack.length > 0 &&
            price[stack[stack.length - 1]] <= price[i]
        ) {
            stack.pop();
        }

        // Calculate span
        if (stack.length === 0) {
            span[i] = i + 1;
        }
        else {
            span[i] = i - stack[stack.length - 1];
        }

        // Push current index
        stack.push(i);
    }

    // Display results
    displayResults(price, span);
}


// Display text and graphical results
function displayResults(price, span) {

    const resultBody = document.getElementById("resultBody");

    const chart = document.getElementById("chart");

    resultBody.innerHTML = "";

    chart.innerHTML = "";

    const n = price.length;

    const maxSpan = Math.max(...span);

    const total = span.reduce((sum, value) => sum + value, 0);

    document.getElementById("totalDays").textContent = n;

    document.getElementById("averageSpan").textContent =
        (total / n).toFixed(2);

    for (let i = 0; i < n; i++) {

        // Create table row
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${price[i]}</td>
            <td>${span[i]}</td>
        `;

        resultBody.appendChild(row);


        // Create graphical bar
        const column = document.createElement("div");

        column.className = "bar-column";

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height =
            (span[i] / maxSpan * 100) + "%";

        bar.textContent = span[i];

        const label = document.createElement("span");

        label.textContent = "Day " + (i + 1);

        column.appendChild(bar);

        column.appendChild(label);

        chart.appendChild(column);
    }
}


// Clear all results
function clearResults() {

    document.getElementById("prices").value = "";

    document.getElementById("resultBody").innerHTML = "";

    document.getElementById("chart").innerHTML = "";

    document.getElementById("totalDays").textContent = "0";

    document.getElementById("averageSpan").textContent = "0";

    document.getElementById("error").textContent = "";
}