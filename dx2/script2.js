(function () {
  const inputArea = document.getElementById('inputArea');
  const output = document.getElementById('output');
  const runBtn = document.getElementById('runBtn');
  const clearBtn = document.getElementById('clearBtn');

  function calcularMelhorAluno(texto) {
    const linhas = texto.trim().split(/\n+/).map(l => l.trim()).filter(l => l.length > 0);
    if (linhas.length === 0) return 'Entrada vazia';

    const N = parseInt(linhas[0]);
    if (isNaN(N) || N <= 0) return 'Primeira linha deve conter um número válido';

    let melhorAluno = '';
    let maiorNota = -Infinity;

    for (let i = 1; i <= N && i < linhas.length; i++) {
      const partes = linhas[i].split(/\s+/);
      const nome = partes[0];
      const nota = parseFloat(partes[1]);
      if (isNaN(nota)) return `Nota inválida na linha ${i + 1}`;
      if (nota > maiorNota) {
        maiorNota = nota;
        melhorAluno = nome;
      }
    }

    if (melhorAluno === '') return 'Nenhum aluno válido encontrado';
    return melhorAluno;
  }

  runBtn.addEventListener('click', () => {
    const texto = inputArea.value;
    const resultado = calcularMelhorAluno(texto);
    output.value = resultado;
  });

  clearBtn.addEventListener('click', () => {
    inputArea.value = '';
    output.value = '';
    inputArea.focus();
  });

  inputArea.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      runBtn.click();
    }
  });
})();