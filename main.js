

function gameplay_loop() {

    var havent_failed = true;
    while (havent_failed) {
        buttons_list = play_pattern();

        input_pattern();
    }
}

function start_game() {
    var start_game = false;

    while (!start_game) {

    }
}

function play_pattern() {
    var num_buttons = 10
    var pick_button;
    var buttons_list = []; //bruh why is there no built in list object
    for (var i = 1; i < num_buttons + 1; i++) {
        pick_button = Math.round(Math.random() * 100);
        while (pick_button > 48) {
            pick_button = Math.round(pick_button / 2);
        };
        console.log(pick_button)
        buttons_list[i - 1] = pick_button;
        const button = document.getElementById("button" + pick_button);
        button.classList.add("active");
        //TODO: Need to play these one at a time, pause between each one
    }
    return buttons_list;
}

function input_pattern(buttons_list) {
    //TODO: Check which button is pressed
    //Either have an event listener for clicks in general, and check which button
    //Or event listener for every button
    //For both have to remember to turn the event listeners off after

    //TODO: Check if buttons are pressed in order
    //Have buttons in a stack, and pop when button is clicked?
}

document.addEventListener("click", () => {
    document.querySelector(".start-container").classList.remove("active");
    document.querySelector(".main-container").classList.add("active");
})