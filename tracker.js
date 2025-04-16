const form = document.getElementById('tradeForm');
const tableBody = document.querySelector('#tradeTable tbody');
const summaryDiv = document.getElementById('summary');

let trades = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const week = document.getElementById('week').value;
  const premium = parseFloat(document.getElementById('premium').value);
  const pnl = parseFloat(document.getElementById('pnl').value);

  trades.push({ week, premium, pnl });
  updateTable();
  form.reset();
});

function updateTable() {
  tableBody.innerHTML = '';
  let totalPremium = 0;
  let totalPnL = 0;

  trades.forEach((trade) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trade.week}</td>
      <td>₹${trade.premium}</td>
      <td>₹${trade.pnl}</td>
    `;
    tableBody.appendChild(row);

    totalPremium += trade.premium;
    totalPnL += trade.pnl;
  });

  summaryDiv.innerHTML = `
    Total Premium Collected: ₹${totalPremium}<br>
    Total P&L: ₹${totalPnL}<br>
    Win Rate: ${calculateWinRate()}%
  `;
}

function calculateWinRate() {
  if (trades.length === 0) return 0;
  const wins = trades.filter((t) => t.pnl >= 0).length;
  return ((wins / trades.length) * 100).toFixed(2);
}