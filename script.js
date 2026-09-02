const expenseForm = document.getElementById("expense-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const list = document.getElementById("expense-list");
const filter = document.getElementById("filter");
const message = document.getElementById("empty-message");
const total = document.getElementById("total-expenses");

const expenses = [];

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const expense = {
    description: description.value,
    amount: Number(amount.value),
    category: category.value,
  };

  const listItem = document.createElement("li");

  listItem.textContent = `${expense.description} - ${expense.amount} - ${expense.category}`;
  list.appendChild(listItem);

  expenses.push(expense);

  const totalAmount = expenses.reduce(function (accumulator, expense) {
    return accumulator + expense.amount;
  }, 0);

  total.textContent = totalAmount;

  expenseForm.reset();

  console.log(expenses);
  console.log(listItem);
});

// console.log(expenseForm);
// console.log(list);
// console.log(filter);
// console.log(message);
// console.log(total);
