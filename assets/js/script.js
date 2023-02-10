$(document).ready(function () {
  displayDate();
  initStorage();
  loadAppts();
  $('.saveBtn').click(saveAppt);
});

function saveAppt() {
  var timeBlock = $(this).closest('.time-block');
  var timeBlockId = timeBlock.attr('id');
  
  var descBox = $(this).siblings('.description').val(); 

  console.log(`ID Saved: ${timeBlockId} \nText: ${descBox}`);
  localStorage.setItem(timeBlockId, descBox);
}

function loadAppts() {
  for(let i=9; i <= 17; i++){
    let apptText = localStorage.getItem(`hour-${i}`);
    if(apptText !== 'Awaiting appointment')
      $("#hour-" + i).children('textarea').text(apptText); 
  }
}

function initStorage() {
  for(let i=9; i <= 17; i++){
    if(!localStorage.getItem(`hour-${i}`)){
      localStorage.setItem(`hour-${i}`, `Awaiting appointment`); 
    }
  }
}

function displayDate() {
  var time = dayjs().format('dddd, MMMM DD, YYYY');
  var currentHour = dayjs().hour();
  console.log(`Current time: ${currentHour}`);
  $("#currentDay").text(time);

  for(let i=9; i <= 17; i++){
    console.log(i);
    if(i < currentHour){
      $('#hour-'+i).addClass('past');
    } else if (i > currentHour){
      $('#hour-'+i).addClass('future');
    } else if (i === currentHour) {
      $('#hour-'+i).addClass('present');
    }
  }
}