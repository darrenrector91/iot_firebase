$(document).ready(function () {

    // Get a reference to the database service
    var database = firebase.database();
    var dataRef = database.ref('measurements');

    // Attach an asynchronous callback to read the data
    dataRef.on("value", function (snapshot) {
        let data = snapshot.val();
        console.log(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // return dataRef.once('value').then(function (snapshot) {
    //     var data = (snapshot.val());
    //     console.log(data);
    // });
});
