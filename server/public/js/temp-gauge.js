$(document).ready(function () {

    const records = 1;

    firebase.database().ref('temp_timestamped').limitToLast(records).on('value', ts_measures => {
        // let values = [];

        ts_measures.forEach(ts_measure => {
            temp = ts_measure.val().value;
            // values.push(ts_measure.val().value);
        });

        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var mydata = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['', temp],
            ]);

            var myoptions = {
                width: 500, height: 300,
                redFrom: 90, redTo: 100,
                yellowFrom: 80, yellowTo: 90,
                greenFrom: 0,
                greenTo: 32,
                greenColor: "#399cbd",
                minorTicks: 5,
                majorTicks: ['0', '', '20', '', '40', '', '60', '', '80', '', '100']
            };

            var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

            chart.draw(mydata, myoptions);

        }
    });
});