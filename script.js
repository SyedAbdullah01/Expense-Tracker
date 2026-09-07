const expenseForm = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const list = document.getElementById("expense-list");
const filter = document.getElementById("filter");
const message = document.getElementById("empty-message");
const total = document.getElementById("total-expenses");

const expenses = [];

// Load previously saved expenses from localStorage.
const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

savedExpenses.forEach(function (expense) {
  expenses.push(expense);
});

// Save the current expenses array to localStorage.
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Calculate and display the total amount of all expenses.
function updateTotal() {
  const totalAmount = expenses.reduce(function (accumulator, expense) {
    return accumulator + expense.amount;
  }, 0);

  total.textContent = totalAmount.toFixed(2);
}

// Show or hide the empty-state message.
function updateEmptyMessage(expensesToRender) {
  if (expensesToRender.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

// Render expenses to the DOM.
function renderExpenses(expensesToRender) {
  // Remove the current expense items before rendering.
  list.innerHTML = "";

  // Create and display each expense.
  expensesToRender.forEach(function (expense) {
    // Create the HTML elements for one expense.
    const listItem = document.createElement("li");
    const leftDiv = document.createElement("div");
    const dot = document.createElement("span");
    const innerDiv = document.createElement("div");
    const descriptionText = document.createElement("strong");
    const categoryText = document.createElement("small");
    const amountSpan = document.createElement("span");
    const rightDiv = document.createElement("div");
    const delButton = document.createElement("button");

    // Add CSS classes.
    listItem.className = "expense-item";
    leftDiv.className = "item-left";
    dot.className = `dot ${expense.category}`;
    amountSpan.className = "amount negative";

    // Add expense information.
    descriptionText.textContent = expense.description;
    categoryText.textContent = expense.category;
    amountSpan.textContent = `-$${expense.amount.toFixed(2)}`;
    delButton.textContent = "Delete";

    // Store the expense ID on the delete button.
    delButton.dataset.id = expense.id;

    // Delete the expense when the button is clicked.
    delButton.addEventListener("click", function () {
      const index = expenses.findIndex(function (expense) {
        return expense.id === Number(delButton.dataset.id);
      });

      // Remove the expense from the array.
      expenses.splice(index, 1);

      // Save the updated array.
      saveExpenses();

      // Re-render the list using the current filter.
      renderCurrentExpenses();

      // Update the total.
      updateTotal();
    });

    // Build the HTML hierarchy.
    innerDiv.appendChild(descriptionText);
    innerDiv.appendChild(categoryText);

    rightDiv.appendChild(delButton);
    rightDiv.appendChild(amountSpan);

    leftDiv.appendChild(dot);
    leftDiv.appendChild(innerDiv);

    listItem.appendChild(leftDiv);
    listItem.appendChild(rightDiv);

    // Add the completed expense to the list.
    list.appendChild(listItem);
  });

  // Update the empty-state message based on what is currently displayed.
  updateEmptyMessage(expensesToRender);
}

// Get the expenses that match the selected category.
function getFilteredExpenses() {
  return expenses.filter(function (expense) {
    return filter.value === "all" || expense.category === filter.value;
  });
}

// Render the expenses using the currently selected filter.
function renderCurrentExpenses() {
  const filteredExpenses = getFilteredExpenses();

  renderExpenses(filteredExpenses);
}

// Handle adding a new expense.
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Create an expense object from the form values.
  const expense = {
    description: description.value,
    amount: Number(amount.value),
    category: category.value,
    id: Date.now(),
  };

  // Add the expense to the array.
  expenses.push(expense);

  // Save the updated array to localStorage.
  saveExpenses();

  // Display the expenses using the current filter.
  renderCurrentExpenses();

  // Update the total amount.
  updateTotal();

  // Clear the form.
  expenseForm.reset();
});

// Handle category filter changes.
filter.addEventListener("change", function () {
  renderCurrentExpenses();
});

// Set the correct initial state when the page loads.
renderCurrentExpenses();
updateTotal();