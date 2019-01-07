$(document).ready(function () {

    sensorData = [];

    // Get a reference to the database service
    var database = firebase.database();
    var dataRef = database.ref('timestamped_measurements');

    // Attach an asynchronous callback to read the data
    dataRef.on("value", function (snapshot) {
        let data = snapshot.val();
        // console.log(data);
        sensorData.push(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    console.log(sensorData);

    function convertData(sensorData) {

    }

});
