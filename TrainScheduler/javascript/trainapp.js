// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDqNHi5tsT7MEzTbfHwgHxZUIcrju79fj4',
  authDomain: 'randallstrainscheduler.firebaseapp.com',
  databaseURL: 'https://randallstrainscheduler.firebaseio.com',
  projectId: 'randallstrainscheduler',
  storageBucket: 'randallstrainscheduler.appspot.com',
  messagingSenderId: '1037499613748'
};
firebase.initializeApp(config);

var database = firebase.database();
$('#addTrainBtn').on('click', function() {
  var trainName = $('#trainNameInput')
    .val()
    .trim();
  var destination = $('#destinationInput')
    .val()
    .trim();
  var firstTrain = $('#firstTrain')
    .val()
    .trim();
  var frequency = $('#frequencyInput')
    .val()
    .trim();

  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});

database.ref().on('child_added', function(childSnapshot) {
  var newTrain = childSnapshot.val().trainName;
  var newDestination = childSnapshot.val().destination;
  var newFirstTrain = childSnapshot.val().firstTrain;
  var newFrequency = childSnapshot.val().frequency;

  var startTimeCoverted = moment(newFirstTrain, 'HH:mm');
  var currentTime = moment();
  var diffTime = moment().diff(moment(startTimeCoverted), 'minutes');
  var timeRemains = diffTime % newFreq;
  var EstimatedTimeArrival = newFrequency - timeRemains;

  var nextTrain = moment().add(EstimatedTimeArrival, 'minutes');
  var catchTrain = moment(nextTrain).format('HH:mm');

  $('all-display').append(
    '<tr><td>' +
      newTrain +
      '</td><td>' +
      newDestination +
      '</td><td>' +
      newFrequency +
      '</td><td>' +
      catchTrain +
      '</td><td>' +
      timeRemains +
      '</td><td>'
  );

  $('#trainName, #destination, #firstTrain, #frequency').val('');
  return false;
});

// I have tried everything for this to work and followed the instrutions via my notes to understand the flow. I keep getting an error with firebase and its not allowing me to check my console.logs or process for errors. Ill send in my process.
