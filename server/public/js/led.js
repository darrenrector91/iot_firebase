$(document).ready(function() {
  $("#pumpOn").append(
    '<input type="button" id="PumpOnBtn" class="ledBtn onBtn" value="Pump On" />'
  );

  $("#pumpOff").append(
    '<input type="button" id="PumpOffBtn" class="ledBtn offBtn" value="Pump Off" />'
  );

  $("#pumpOn").on("click", pumpOn);
  $("#pumpOff").on("click", pumpOff);

  function pumpOn() {
    firebase
      .database()
      .ref("PUMP_STATUS")
      .set(1);
  }

  function pumpOff() {
    firebase
      .database()
      .ref("PUMP_STATUS")
      .set(0);
  }
});
