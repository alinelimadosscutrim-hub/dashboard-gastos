const form = document.getElementById('formGasto');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const lista = document.getElementById('lista');
const totalEl = document.getElementById('total');
const limparBtn = document.getElementById('limpar');

let gastos = JSON.parse(localStorage.getItem('gastos_v1') || '[]');

function salvar() {
  localStorage.setItem('gastos_v1', JSON.stringify(gastos));
}

function render() {
  lista.innerHTML = '';
  let total = 0;
  gastos.forEach((g, idx) => {
    total += Number(g.valor);
    const li = document.createElement('li');
    li.innerHTML = `<span>${g.descricao} — R$ ${Number(g.valor).toFixed(2)}</span>
                    <button data-idx="${idx}">x</button>`;
    lista.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
}

lista.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const idx = Number(e.target.dataset.idx);
    gastos.splice(idx, 1);
    salvar();
    render();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  if (!descricao || !valor || valor <= 0) return alert('Preencha corretamente');
  gastos.push({ descricao, valor: valor });
  salvar();
  render();
  descricaoInput.value = '';
  valorInput.value = '';
});

limparBtn.addEventListener('click', () => {
  if (!confirm('Limpar todos os gastos?')) return;
  gastos = [];
  salvar();
  render();
});

render();
