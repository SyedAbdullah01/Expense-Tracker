const expenseForm = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const list = document.getElementById("expense-list");
const filter = document.getElementById("filter");
const message = document.getElementById("empty-message");
const total = document.getElementById("total-expenses");

const expenses = [];

function updateTotal() {
  const totalAmount = expenses.reduce(function (accumulator, expense) {
    return accumulator + expense.amount;
  }, 0);

  total.textContent = totalAmount;
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const expense = {
    description: description.value,
    amount: Number(amount.value),
    category: category.value,
    id: Date.now(),
  };

  const listItem = document.createElement("li");
  const leftDiv = document.createElement("div");
  const dot = document.createElement("span");
  const innerDiv = document.createElement("div");
  const descriptionText = document.createElement("strong");
  const categoryText = document.createElement("small");
  const amountSpan = document.createElement("span");
  const rightDiv = document.createElement("div");
  const delButton = document.createElement("button");

  // Add classes
  listItem.className = "expense-item";
  leftDiv.className = "item-left";
  dot.className = `dot ${expense.category}`;
  amountSpan.className = "amount negative";

  // Add text
  descriptionText.textContent = expense.description;
  categoryText.textContent = expense.category;
  amountSpan.textContent = `-$${expense.amount.toFixed(2)}`;
  delButton.textContent = "Delete";

  // Store expense ID on delete button
  delButton.dataset.id = expense.id;

  // Delete expense
  delButton.addEventListener("click", function () {
    console.log(delButton.dataset.id);

    const index = expenses.findIndex(function (expense) {
      return expense.id === Number(delButton.dataset.id);
    });

    expenses.splice(index, 1);

    listItem.remove();

    updateTotal();

    console.log(expenses);
  });

  // Build the hierarchy
  innerDiv.appendChild(descriptionText);
  innerDiv.appendChild(categoryText);

  rightDiv.appendChild(delButton);
  rightDiv.appendChild(amountSpan);

  leftDiv.appendChild(dot);
  leftDiv.appendChild(innerDiv);

  listItem.appendChild(leftDiv);
  listItem.appendChild(rightDiv);

  list.appendChild(listItem);

  expenses.push(expense);

  updateTotal();

  expenseForm.reset();

  console.log(expenses);
  console.log(listItem);
});
