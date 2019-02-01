$(document).ready(function() {
  let n = $("#pumpOn").append(
    '<input type="button" id="PumpOnBtn" class="ledBtn onBtn" value="ON" />'
  );

  $("#pumpOff").append(
    '<input type="button" id="PumpOffBtn" class="ledBtn offBtn" value="OFF" />'
  );

  $("#pumpOn").on("click", pumpOn);
  $("#pumpOff").on("click", pumpOff);

  function pumpOn() {
    firebase
      .database()
      .ref("PUMP_STATUS")
      .getInt("value", pumpStatus => {
        let status = [];

        pumpStatus.forEach(pumpStatus => {
          values.push(pumpStatus.val().value);
        });

        console.log(status);
      });
  }

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
