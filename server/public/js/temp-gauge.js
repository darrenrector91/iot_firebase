// $(document).ready(function() {
//   const records = 1;

//   firebase
//     .database()
//     .ref("temperature_ts")
//     .limitToLast(records)
//     .on("value", ts_measures => {
//       ts_measures.forEach(ts_measure => {
//         temp = ts_measure.val().value;
//       });

//       google.charts.load("current", { packages: ["gauge"] });
//       google.charts.setOnLoadCallback(drawChart);

//       function drawChart() {
//         var mydata = google.visualization.arrayToDataTable([
//           ["Label", "Value"],
//           ["˚F", temp]
//         ]);

//         var myoptions = {
//           width: 500,
//           height: 300,
//           redFrom: 90,
//           redTo: 100,
//           yellowFrom: 80,
//           yellowTo: 90,
//           greenFrom: 0,
//           greenTo: 32,
//           greenColor: "#399cbd",
//           minorTicks: 5,
//           majorTicks: ["0", "", "20", "", "40", "", "60", "", "80", "", "100"]
//         };

//         var chart = new google.visualization.Gauge(
//           document.getElementById("gaugeDiv")
//         );

//         chart.draw(mydata, myoptions);
//       }
//     });
// });
