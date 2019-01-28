$(document).ready(function() {
  const nbOfElts = 100;

  firebase
    .database()
    .ref("soil_moisture_ts")
    .limitToLast(nbOfElts)
    .on("value", ts_measures => {
      // 'ts_measures' is a snapshot raw Object, obtained on changed value of 'timestamped_measures' node
      // e.g. a new push to that node, but is not exploitable yet.
      // If we apply the val() method to it, we get something to start work with,
      // i.e. an Object with the 'nbOfElts' last nodes in 'timestamped_measures' node.
      // console.log(ts_measures.val());
      // => {-LIQgqG3c4MjNhJzlgsZ: {timestamp: 1532694324305, value: 714}, -LIQgrs_ejvxcF0MqFre: {…}, … }

      // We prepare empty arrays to welcome timestamps and luminosity values:
      let timestamps = [];
      let values = [];

      // console.log(timestamps);
      console.log(values);

      // Next, we iterate on each element of the 'ts_measures' raw Object
      // in order to fill the arrays.
      // Let's call 'ts_measure' ONE element of the ts_measures raw Object
      // A handler function written here as an anonymous function with fat arrow syntax
      // tells what to do with each element:
      // * apply the val() method to it to gain access to values of 'timestamp' and 'value',
      // * push those latter to the appropriate arrays.
      // Note: The luminosity value is directly pushed to 'values' array but the timestamp,
      // which is an Epoch time in milliseconds, is converted to human date
      // thanks to the moment().format() function coming from the moment.js library.
      ts_measures.forEach(ts_measure => {
        // console.log(ts_measure.val().timestamp, ts_measure.val().value);
        timestamps.push(
          moment(ts_measure.val().timestamp).format("YYYY-MM-DD HH:mm")
        );
        values.push(ts_measure.val().value);
      });

      // Get a reference to the DOM node that welcomes the plot drawn by Plotly.js:
      myPlotDiv = document.getElementById("soilMoistureChart");

      // We generate x and y data necessited by Plotly.js to draw the plot
      // and its layout information as well:
      // See https://plot.ly/javascript/getting-started/
      const data = [
        {
          x: timestamps,
          y: values
        }
      ];

      const layout = {
        title: {
          text: "<b>Soil Moisture Sensor</b>"
        },
        titlefont: {
          family: "Courier New, monospace",
          size: 16,
          color: "#000"
        },
        width: 400,
        height: 300,
        xaxis: {
          // title: '<b>Date/Time</b>',
          linecolor: "black",
          linewidth: 2,
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#000"
          }
        },
        yaxis: {
          title: "<b></b>",
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
      // Plot above data
      Plotly.newPlot(myPlotDiv, data, layout, { responsive: true });
    });
});
