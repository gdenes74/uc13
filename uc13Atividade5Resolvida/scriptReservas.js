$(document).ready(function () {
  $("form").submit(function () {
    event.preventDefault();
    var formValue = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/cadastro",
      data: formValue,
    })
      .done(function (response) {
        alert("Reserva feita com sucesso!");
      })
      .fail(function (response) {
        alert("Falha no POST: " + response);
      });
  });
});

$(document).ready(function () {
    $.get("http://localhost:3000/cadastro", function (data, status) {

            console.log(data); /* adicionado pra teste */
            
            data.forEach(function (registro) {

              
          var dataEntrada = new Date(registro.entrada);
          var dataSaida = new Date(registro.saida);
    
          var dataEntradaFormatada = dataEntrada.toLocaleDateString("pt-BR");
          var dataSaidaFormatada = dataSaida.toLocaleDateString("pt-BR");
    
          var newRow = $("<tr>");
    
          newRow.append("<td>" + registro.nome + "</td>");
          newRow.append("<td>" + registro.email + "</td>");
          newRow.append("<td>" + dataEntradaFormatada + "</td>");
          newRow.append("<td>" + dataSaidaFormatada + "</td>");
          newRow.append("<td>" + registro.adultos + "</td>");
          newRow.append("<td>" + registro.criancas + "</td>");
          newRow.append("<td>" + registro.observacao + "</td>");
    
          $("#dadosTable").append(newRow);
        });
      });
   
});