(function () {
  const inputArea = document.getElementById('inputArea');
  const runBtn = document.getElementById('runBtn');
  const clearBtn = document.getElementById('clearBtn');
  const output = document.getElementById('output');

  function parseAndCompute(raw) {
    if (!raw || !raw.trim()) {
      return { ok: false, msg: 'Entrada vazia' };
    }

    // separa por espaços em branco, linhas, etc
    const tokens = raw.trim().split(/\s+/);

    // converte em números e filtra tokens vazios
    const nums = tokens.map(t => {
      const n = Number(t);
      return Number.isNaN(n) ? null : n;
    });

    // checa se há conversão inválida
    if (nums.some(x => x === null)) {
      return { ok: false, msg: 'Formato inválido: todos os tokens devem ser números inteiros' };
    }

    if (nums.length === 0) {
      return { ok: false, msg: 'Sem números na entrada' };
    }

    const N = nums[0];

    if (!Number.isInteger(N) || N < 0) {
      return { ok: false, msg: 'O primeiro valor deve ser um inteiro não negativo (N)' };
    }

    // pega somente os próximos N números (se não tiver N, pega o que há)
    const plays = nums.slice(1, 1 + N);

    if (plays.length === 0) {
      // se o enunciado pedir, pode retornar 0; aqui avisamos
      return { ok: true, result: 0 };
    }

    let max = plays[0];
    for (let i = 1; i < plays.length; i++) {
      if (plays[i] > max) max = plays[i];
    }
    return { ok: true, result: max };
  }

  runBtn.addEventListener('click', () => {
    const raw = inputArea.value;
    const res = parseAndCompute(raw);
    if (!res.ok) {
      output.value = res.msg;
      output.style.color = '#ffaaaa';
    } else {
      output.value = String(res.result);
      output.style.color = '';
    }
  });

  clearBtn.addEventListener('click', () => {
    inputArea.value = '';
    output.value = '';
    inputArea.focus();
  });

  // atalhos: Ctrl+Enter roda
  inputArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      runBtn.click();
    }
  });
})();