// save reference to important DOM elements
var timeDisplayEl = $("#time-display");
var comment = $(".form-control");
var save = $(".btn");

var currentHour;
// handle displaying the time
function displayTime() {
    var rightNow = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
    timeDisplayEl.text(rightNow);
    currentHour = moment().format("H");
    console.log(currentHour); // gives us string of what hour it is 0-23
    //quick loop to update the row colors
    //currentHour = 10; this to test diff times
    for (i = 0; i < 9; i++) {
        if (currentHour < 9) {
            //before workday starts so all boxes green
            comment.eq(i).css("background-color", "#4cad4c");
        } else if (currentHour > 17) {
            //workday finished so all boxes grey
            comment.eq(i).css("background-color", "#a5a5a552");
        } else {
            //make all green to start
            comment.eq(i).css("background-color", "#4cad4c");

            if (currentHour == i + 9) {
                comment.eq(i).css("background-color", "#e2626252");
            } else if (currentHour > i + 8) {
                comment.eq(i).css("background-color", "#a5a5a552");
            }
        }
    }
}

var activities = {
    hours: [],
};

//we need to load saved activites when open the page
if (!(localStorage.getItem("activities") == null)) {
    //have stored data
    var activities = JSON.parse(localStorage.getItem("activities"));
    //activities now has the object stored
    comment.text("Enter Here!");
    for (i = 0; i < 9; i++) {
        //need to put the parts of array in each activity row
        //$(".classname").eq(0).text('...')
        //testing activities.hours[2] = "blah blah blaaah";
        comment.eq(i).text(activities.hours[i]);
    }
} else {
    //dont have stored data
    for (i = 0; i < 9; i++) {
        activities[i] = "Enter Here!";
    }
    comment.text("Enter Here!");
    localStorage.setItem("activities", JSON.stringify(activities));
}

function saveActivity(event) {
    var buttonClicked = $(event.target);
    //we need to figure out which row
    console.log(buttonClicked);
    //save everything is a quick fix
    for (i = 0; i < 9; i++) {
        //storing all comment text area texts into appropriate activities record
        //we target particular comment sections by comment.eq(i).val() this selects the
        //ith comment 0-9
        // we only want to save when event target matches the comment.eq(i).val() currently on
        //it will never match because the button is appended to the column
        activities.hours[i] = $.trim(comment.eq(i).val());
    }
    //now activites is updated with current inputs across
    //now we push to local storage
    localStorage.setItem("activities", JSON.stringify(activities));
}
// var comment = $.trim($("#comment").val()); gets the text currently in the textarea storin into comment

function clearTextArea(event) {
    var boxClicked = $(event.target);
    if ($.trim(boxClicked.val()) == "Enter Here!") {
        boxClicked.text("");
    }
}

comment.on("click", clearTextArea);

save.on("click", saveActivity);

setInterval(displayTime, 1000);
