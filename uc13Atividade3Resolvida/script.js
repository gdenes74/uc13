const informarDadosButton = document.getElementById("buttonDados");
const valorInput = document.getElementById("txtValor");
const formaPagamento = document.querySelectorAll("input[name='formaPagamento']");
const painelPix = document.querySelector(".pagamentoPix");
const painelCredito = document.querySelector(".pagamentoCredito");

let formaPagto = "";
let cpf = "";
let nome = "";
let codCvc = "";
let venc = "";

let valorPreenchido = false; 
let formaPagamentoPreenchida = false; 

informarDadosButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (!valorPreenchido) {
    const valor = valorInput.value;
    if (valor === "") {
      alert("Necessário preencher o valor!");
      return;
    } else {
      valorPreenchido = true;
    }
  }

  for (const radio of formaPagamento) {
    if (radio.checked) {
      formaPagto = radio.value;
      formaPagamentoPreenchida = true;

      if (formaPagto === "pix") {
        painelPix.style.display = "block";
        painelCredito.style.display = "none";

        const valor = parseInt(valorInput.value);
        const totalComDesconto = valor - valor * 0.1;
        const vlrTotal = document.getElementById("vlrTotal");
        vlrTotal.textContent = totalComDesconto.toFixed(2);
      } else if (formaPagto === "credito") {
        painelCredito.style.display = "block";
        painelPix.style.display = "none";

        const valor = parseFloat(valorInput.value);
        const parcela1 = valor;
        const parcela2 = valor / 2;
        const parcela3 = valor / 3;
        const parcela4 = (valor * 1.05) / 4;
        const parcela5 = (valor * 1.1) / 5;

        document.getElementById("vlrParcelado1").textContent =
          parcela1.toFixed(2);
        document.getElementById("vlrParcelado2").textContent =
          parcela2.toFixed(2);
        document.getElementById("vlrParcelado3").textContent =
          parcela3.toFixed(2);
        document.getElementById("vlrParcelado4").textContent =
          parcela4.toFixed(2);
        document.getElementById("vlrParcelado5").textContent =
          parcela5.toFixed(2);
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const numeroCartaoInput = document.getElementById("txtNumeroCard");
  const bandeiraVisa = document.querySelector(".cartaoVisa");
  const bandeiraMaster = document.querySelector(".cartaoMaster");
  const bandeiraInvalida = document.querySelector(".cartaoInvalido");

  let timeoutId; // Variável para armazenar o ID do timeout

  numeroCartaoInput.addEventListener("keyup", function () {
    clearTimeout(timeoutId); // Limpa o timeout anterior

    timeoutId = setTimeout(function () {
      const numeroCartao = numeroCartaoInput.value;

      if (numeroCartao.startsWith("1234")) {
        bandeiraVisa.style.display = "inline";
        bandeiraMaster.style.display = "none";
        bandeiraInvalida.style.display = "none";
      } else if (numeroCartao.startsWith("4321")) {
        bandeiraMaster.style.display = "inline";
        bandeiraVisa.style.display = "none";
        bandeiraInvalida.style.display = "none";
      } else {
        bandeiraVisa.style.display = "none";
        bandeiraMaster.style.display = "none";
        bandeiraInvalida.style.display = "inline";
        alert("Número do cartão inválido");
      }
    }, 1500);
  });
});

const parcelaSelect = document.getElementById("txtNumeroParcela");
parcelaSelect.addEventListener("change", function () {
  const valor = parseFloat(valorInput.value);
  const parcelas = parseFloat(parcelaSelect.value);

  let total;

  if (parcelas >= 1 && parcelas <= 3) {
    total = valor / parcelas;
  } else if (parcelas === 4) {
    total = (valor * 1.05) / parcelas;
  } else if (parcelas === 5) {
    total = (valor * 1.1) / parcelas;
  }

  vlrTotal.textContent = total.toFixed(2);
});

const buttonPagar = document.getElementById("pagar");

buttonPagar.addEventListener("click", function (event) {
    event.preventDefault();
  if (!valorPreenchido) {
    alert("Necessário preencher o valor!");
    return;
  }

  if (!formaPagamentoPreenchida) {
    alert("Necessário selecionar a forma de pagamento!");
    return;
  }

  if (formaPagto === "pix") {
    cpf = document.getElementById("txtCpf").value;
    if (cpf === "") {
      alert("Necessário preencher o CPF!");
      return;
    } else {
      alert("Pagamento Pix realizado com sucesso!");
    }
  } else if (formaPagto === "credito") {
    numeroCartaoInput = document.getElementById("txtNumeroCard").value;
    nome = document.getElementById("txtNameTitular").value;
    codCvc = document.getElementById("txtCvcCod").value;
    venc = document.getElementById("txtVencimento").value;

    if (numeroCartaoInput === "") {
      alert("Necessário preencher o número do cartão!");
      return false;
    } else if (nome === "") {
      alert("Necessário preencher o nome do titular!");
      return false;
    } else if (codCvc === "") {
      alert("Necessário preencher o código CVC!");
      return false;
    } else if (venc === "") {
      alert("Necessário preencher o vencimento!");
      return false;
    } else {
      alert("Pagamento Crédito realizado com sucesso!");
    }
  }
});