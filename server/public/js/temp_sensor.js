$(document).ready(function() {
  // firebase deploy --only functions

  const nbOfElts = 100;

  firebase
    .database()
    .ref("temperature_ts")
    .limitToLast(nbOfElts)
    .on("value", ts_measures => {
      let timestamps = [];
      let values = [];

      ts_measures.forEach(ts_measure => {
        timestamps.push(
          moment(ts_measure.val().timestamp).format("YYYY-MM-DD HH:mm")
        );
        values.push(ts_measure.val().value);
      });

      myPlotDiv = document.getElementById("tempChart");
      const data = [
        {
          x: timestamps,
          y: values
        }
      ];
      const layout = {
        title: {
          text: "<b>ds18b20 - Temperature Sensor</b>"
        },
        titlefont: {
          family: "Courier New, monospace",
          size: 16,
          color: "#000"
        },
        width: 400,
        height: 300,
        xaxis: {
          linecolor: "black",
          linewidth: 2,
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#000"
          }
        },
        yaxis: {
          title: "<b>Temp˚F</b>",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#000"
          },
          linecolor: "black",
          linewidth: 2
        },
        margin: {
          r: 50,
          pad: 0
        }
      };
      // Plot data
      Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
    });
});
