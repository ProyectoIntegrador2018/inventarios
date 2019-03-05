$(document).ready(function() {

  var dbQueryLoans = [];

  $.ajax({
    url : '/getAllLoans',
    type : 'GET',
    dataType: 'json',
    success: function (jsonReceived) {
      console.log(jsonReceived);
      // dbQueryLoans = jsonReceived;
      console.log(jsonReceived.length);
      for(var i = 0; i < jsonReceived.length; i++){
        dbQueryLoans.push(jsonReceived[i]);
      }
      console.log(dbQueryLoans);
      if(dbQueryLoans.length == 0){
        $("#noLoans").append(
        '<div class="card">' +
          '<div class="card-header">' +
            'Registro de préstamos vacío' +
          '</div>' +
          '<div class="card-body">' +
            '<h5 class="card-title">Sin préstamos existente</h5>' +
            '<p class="card-text">No hay ningún préstamo registrado en el sistema</p>' +
            '<a href="/inventory" class="btn btn-primary">Ver los dispositivos existentes</a>' +
          '</div>' +
        '</div><br>'
        );
      }
      fillLoanTable(dbQueryLoans);
    }
  });

  $("#txb_search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#tbl_prestamos tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });

  $(".btn_detalles").on("click", loanDetails);
  $(".btn_siguiente").on("click", loanChangeStatus);
  $(".btn_cancelar").on("click", loanCancel);
});

function loanDetails() {
  // Variable declaration
  var solicitant = {  id: $("#txt_solicitante_id"),
                      name: $("#txt_solicitante_nombre"),
                      degree: $("#txt_solicitante_degree"),
                      email: $("#txt_solicitante_email")};

  var responsable = { exists: true,
                      name: $("#txt_responsable_nombre"),
                      email: $("#txt_responsable_email")};

  var device = {      name: $("#txt_dispositivo_nombre"),
                      status: $("#bdg_dispositivo_status"),
                      quantity: $("#txt_dispositivo_cantidad"),
                      serial: $("#txt_dispositivo_serie"),
                      start: $("#txt_dispositivo_inicio"),
                      end: $("#txt_dispositivo_fin"),
                      purpose: $("#txt_dispositivo_motivo"),
                      };

  var loanID = $(this).parent().parent().parent().attr('id')
  console.log(loanID);

  // Search on DB for the full details of a device with the given id
  // ...

    // Fill in the modal with the rest of the details
    solicitant.id.text("A01234567");
    solicitant.name.text("JUAN PEREZ");
    solicitant.degree.text("ABC");
    solicitant.email.text("A01234567@itesm.mx");

    responsable.name.text("PROFESOR X");
    responsable.email.text("x.profesor@itesm.mx");

    var dbQuerySerials = ["ABC12-DEF34-GHI56", "JKL12-MNO34-PQR56", "STU12-VWX34-YZZ56"];
    var dbQueryStatus = "Nueva solicitud";
    var dbQueryQuantity = 1;

    device.name.text("DISPOSITIVO BLABLABLA");
    setStatus(dbQueryStatus, device.status);
    device.quantity.text("Cantidad pedidos: " + dbQueryQuantity);
    setSerialNumbers(dbQuerySerials, device.serial);
    device.start.text("01/15/2019");
    device.end.text("01/18/2019");
    device.purpose.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue euismod maximus. Proin nec augue non lectus vehicula faucibus. Fusce iaculis congue dui vel commodo. In vitae leo arcu. Nullam neque turpis, consectetur quis tristique at, aliquet sed neque.");
    // If fail, show error
}

function loanChangeStatus() {
  // Get the loan ID to make the query
  var loanID = $(this).parent().parent().parent().attr('id');

  // Get the current status
  var currentStatus = $(this).parent().parent().parent().find(".badge-pill");
  currentStatus = currentStatus.html()

  // Get the next status
  var nextStatus = getNextStatus(currentStatus);

  // Make call to DB and update loan with 'nextStatus' and 'loanID'
  console.log(nextStatus);
}

function loanCancel () {
  console.log("CANCELAR");
  // Get the loan ID to make the query
  var loanID = $(this).parent().parent().parent().attr('id');

  // Set the state to cancelled
  var currentStatus = 'Cancelado';
  
  // Make call to DB and update loan with 'nextStatus' and 'loanID'
}

function fillLoanTable(dbQueryLoans) {
  // console.log(dbQueryLoans);
  // Variable declaration
  var table = $("#tbl_prestamos");

  // Fetch from DB all the loans
  
  /*
  var dbQueryLoans = [{ id: "1",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Nueva solicitud"},
                      { id: "2",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Cancelado"},
                      { id: "3",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Apartado"},
                      { id: "4",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Prestado"},
                      { id: "5",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Recibido"},
                      { id: "6",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Expirado"},
                      { id: "7",
                        solicitantName: "Miguel Angel Banda",
                        responsableName: "Yolanda Martinez",
                        deviceName: "iPhone 8",
                        deviceQuantity: "2",
                        status: "Recibido tarde"},
                      { id: "8",
                        solicitantName: "Guillermo Mendoza Soni",
                        responsableName: "Armandina Leal",
                        deviceName: "Raspberry pi3",
                        deviceQuantity: "6",
                        status: "Nueva solicitud"},
                      { id: "9",
                        solicitantName: "Luis Rojo Sánchez",
                        responsableName: "Elda Quiroga",
                        deviceName: "Kinect v2",
                        deviceQuantity: "1",
                        status: "Nueva solicitud"},
                    ];
  */


  // Inser each loan into a row
  for (i = 0; i < dbQueryLoans.length; i++) {
    table.append(insertLoan(dbQueryLoans[i]))
  }
}

function setSerialNumbers(serials, htmlTarget) {
  htmlTarget.html("");
  if (serials.length > 0) {
    for (i = 0; i < serials.length; i++) {
      htmlTarget.append("<p>" + serials[i] + "</p>");
    }
  } else {
    htmlTarget.append("Este dispositivo no tiene número de serie.");
  }
}

function setStatus(status, htmlTarget) {
  htmlTarget.text(status);
  switch (status) {
    case 'Nueva solicitud':
      htmlTarget.addClass("badge-primary");
      break;

    case 'Cancelado':
      htmlTarget.addClass("badge-warning");
      break;

    case 'Apartado':
      htmlTarget.addClass("badge-secondary");
      break;

    case 'Prestado':
      htmlTarget.addClass("badge-secondary");
      break;

    case 'Recibido':
      htmlTarget.addClass("badge-success");
      break;

    case 'Recibido tarde':
      htmlTarget.addClass("badge-info");
      break;

    case 'Expirado':
      htmlTarget.addClass("badge-danger");
      break;

    default:
      htmlTarget.addClass("badge-dark");
      break;
  }
}

function insertLoan(loan) {
  var row = "<tr id=\"" + loan.id + "\">";
  var data = "";

  data  = "<td>" + loan.solicitantname + "</td>";
  data += "<td>" + loan.responsablename + "</td>";
  data += "<td>" + loan.devicename + "</td>";
  data += "<td>" + loan.devicequantity + "</td>";
  data += getHTMLstatusBadge(loan.status);
  data += getHTMLtoolButtons(loan.status);

  return row + data + "</tr>"
}

function statesTraductor(stateInEnglish){

  var stateInSpanish = '';

  switch (stateInEnglish) {

    case 'New':
      stateInSpanish = "Nueva solicitud";
      break;

    case 'Cancelled':
      stateInSpanish = "Cancelado";
      break;

    case 'Separated':
      stateInSpanish = "Apartado";
      break;

    case 'Taken':
      stateInSpanish = "Prestado";
      break;

    case 'Received':
      stateInSpanish = "Recibido";
      break;

    case 'Received late':
      stateInSpanish = "Recibido tarde";
      break;

    case 'Expired':
      stateInSpanish = "Expirado";
      break;

    default:
      stateInSpanish = "Sin estado";
      break;
  }

  return stateInSpanish;
}

function getHTMLstatusBadge(status) {
  var html = "<td><div class=\"badge-lg badge-pill ";
  var badgeClass = "";

  status = statesTraductor(status);

  switch (status) {
    case 'Nueva solicitud':
      badgeClass = "badge-primary";
      break;

    case 'Cancelado':
      badgeClass = "badge-warning";
      break;

    case 'Apartado':
      badgeClass = "badge-secondary";
      break;

    case 'Prestado':
      badgeClass = "badge-secondary";
      break;

    case 'Recibido':
      badgeClass = "badge-success";
      break;

    case 'Recibido tarde':
      badgeClass = "badge-info";
      break;

    case 'Expirado':
      badgeClass = "badge-danger";
      break;

    default:
      badgeClass = "badge-dark";
      break;
  }

  html += badgeClass + "\">" + status + "</div></td>"

  return html
}

function getHTMLtoolButtons(status) {
  var html = "";
  var buttonNext = "";
  var buttonCancel = "";
  var buttonDetails = "";

  buttonNext  = "<button";
  buttonNext += " type=\"button\""
  buttonNext += " class=\"btn btn-secondary w-100 border-white rounded-0 btn_siguiente\""
  buttonNext += " role=\"button\">";

  buttonCancel  = "<button";
  buttonCancel += " type=\"button\""
  buttonCancel += " class=\"btn btn-secondary w-100 border-white rounded-0 btn_cancelar\""
  buttonCancel += " role=\"button\">";

  buttonDetails  = "<button";
  buttonDetails += " type=\"button\"";
  buttonDetails += " class=\"btn btn-secondary w-100 border-white rounded-0 btn_detalles\"";
  buttonDetails += " role=\"button\"";
  buttonDetails += " data-toggle=\"modal\"";
  buttonDetails += " data-target=\"#mdl_detallesPrestamo\">";

  html  = "<td>";
    html += "<div class=\"btn-group-sm d-flex\" role=\"group\" aria-label=\"Basic example\">";
    switch (status) {
      case 'Nueva solicitud':
        html += buttonNext + "Aprobar" + "</buton>";
        html += buttonCancel + "Rechazar" + "</buton>";
        break;

      case 'Cancelado':
        break;

      case 'Apartado':
        html += buttonNext + "Entregar" + "</buton>";
        html += buttonCancel + "Rechazar" + "</buton>";
        break;

      case 'Prestado':
        html += buttonNext + "Recibir" + "</buton>";
        break;

      case 'Recibido':
        break;

      case 'Recibido tarde':
        break;

      case 'Expirado':
        html += buttonNext + "Recibir" + "</buton>";
        break;

      default:
        break;
    }
      html += buttonDetails + "Detalles" + "</button>";
    html += "</div>";
  html += "</td>";


  return html
}

function getNextStatus(current) {
  switch (current) {
    case 'Nueva solicitud':
      return 'Apartado';
      break;

    case 'Cancelado':
      break;

    case 'Apartado':
      return 'Prestado';
      break;

    case 'Prestado':
      return 'Recibido';
      break;

    case 'Recibido':
      break;

    case 'Recibido tarde':
      break;

    case 'Expirado':
      return 'Recibido tarde';
      break;

    default:
      return 'Unknown status';
      break;
  }
}