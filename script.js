const expenseForm = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const list = document.getElementById("expense-list");
const filter = document.getElementById("filter");
const message = document.getElementById("empty-message");
const total = document.getElementById("total-expenses");

const expenses = [];

// Show or hide the empty-state message depending on the number of expenses.
function updateEmptyMessage() {
  if (expenses.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

// Calculate and display the total amount of all expenses.
function updateTotal() {
  const totalAmount = expenses.reduce(function (accumulator, expense) {
    return accumulator + expense.amount;
  }, 0);

  total.textContent = totalAmount.toFixed(2);
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

  // Create the HTML elements for the new expense.
  const listItem = document.createElement("li");
  const leftDiv = document.createElement("div");
  const dot = document.createElement("span");
  const innerDiv = document.createElement("div");
  const descriptionText = document.createElement("strong");
  const categoryText = document.createElement("small");
  const amountSpan = document.createElement("span");
  const rightDiv = document.createElement("div");
  const delButton = document.createElement("button");

  // Add CSS classes to the elements.
  listItem.className = "expense-item";
  leftDiv.className = "item-left";
  dot.className = `dot ${expense.category}`;
  amountSpan.className = "amount negative";

  // Add the expense information to the elements.
  descriptionText.textContent = expense.description;
  categoryText.textContent = expense.category;
  amountSpan.textContent = `-$${expense.amount.toFixed(2)}`;
  delButton.textContent = "Delete";

  // Store the expense ID on the delete button.
  delButton.dataset.id = expense.id;

  // Handle deleting this expense.
  delButton.addEventListener("click", function () {
    const index = expenses.findIndex(function (expense) {
      return expense.id === Number(delButton.dataset.id);
    });

    // Remove the expense from the JavaScript array.
    expenses.splice(index, 1);

    // Remove the expense from the page.
    listItem.remove();

    // Update the total and empty-state message after deletion.
    updateTotal();
    updateEmptyMessage();

    console.log(expenses);
  });

  // Build the HTML structure for the expense item.
  innerDiv.appendChild(descriptionText);
  innerDiv.appendChild(categoryText);

  rightDiv.appendChild(delButton);
  rightDiv.appendChild(amountSpan);

  leftDiv.appendChild(dot);
  leftDiv.appendChild(innerDiv);

  listItem.appendChild(leftDiv);
  listItem.appendChild(rightDiv);

  // Add the completed expense item to the list on the page.
  list.appendChild(listItem);

  // Add the expense object to the JavaScript array.
  expenses.push(expense);

  // Update the UI after adding the expense.
  updateTotal();
  updateEmptyMessage();

  // Clear the form fields.
  expenseForm.reset();

  console.log(expenses);
  console.log(listItem);
});

function renderExpenses(expensesToRender) {
  list.innerHTML = "";
}

const filteredExpenses = expenses.filter(function (expense) {
  return filter.value === "all" || expense.category === filter.value;
});

// Set the correct initial state when the page first loads.
updateTotal();
updateEmptyMessage();
