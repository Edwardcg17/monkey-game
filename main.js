var curr_score = 3;
var high_score = localStorage.getItem("high_score");
if (high_score == null) {
    high_score = 0;
    localStorage.setItem("high_score", high_score);
}
document.getElementById("high-score").textContent = "High Score: " + high_score + " digits";

//Random monkey sound easter egg
document.getElementById("game-title").addEventListener("click", () => {
    document.getElementById("monkey-sound").play();
});

//Initialize the website
start_game();

function start_game() {
    curr_score = 3; //Need to reset it to 0 here for when I restart the game, a little redundant
    document.getElementById("curr-round").textContent = "Current Score: "; //Yea also setting this and highscore split in separate places which I don't like

    const start_btn = document.getElementById("start_game_btn");
    start_btn.addEventListener("click", () => {
        document.getElementById("mouse-click-sound").play();
        document.querySelector(".start-container").classList.remove("active");
        document.querySelector(".main-container").classList.add("active");
        play_pattern();
    }, {once: true} );
};

function play_pattern() {
    var pick_button;
    var buttons_list = [];
    curr_score += 1;
    document.getElementById("curr-round").textContent = "Current Score: " + curr_score + " digits";

    //Generate the random amount of buttons
    for (var i = 1; i < curr_score + 1; i++) {
        pick_button = Math.floor(Math.random() * 48) + 1;
        while (buttons_list.includes(pick_button)) {
            pick_button = Math.floor(Math.random() * 48) + 1;
        };
        buttons_list.push(pick_button);

        //Visually activate the buttons
        const button = document.getElementById("button" + pick_button);
        button.classList.add("active");
        button.textContent = i;
    };

    input_pattern(buttons_list);
};

function input_pattern(buttons_list) {
    var started_inputting = false;

    function handle_inputs(event) {
        const clicked_btn = event.currentTarget
        const next_btn_to_press = buttons_list.shift();
        started_inputting = true;

        //Play click audio
        document.getElementById("click-sound").play();

        //Check whether you clicked the right button or not
        if (parseInt(clicked_btn.id.replace(/\D/g, ''), 10) == next_btn_to_press) {
            clicked_btn.removeEventListener("click", handle_inputs);
            clicked_btn.classList.remove("active");

            //After the first correct click, remove the numbers for all buttons
            if (started_inputting) {
                active_buttons.forEach((el) => {
                    el.textContent = null;
                });
            };
        } else {
            //Clean up buttons that were active before
            const active_buttons = document.querySelectorAll(".standard-button.active");
            active_buttons.forEach((el) => {
                el.classList.remove("active");
                el.removeEventListener("click", handle_inputs);
            });
            end_screen();
        };

        //Check if you completed the round
        if (buttons_list.length == 0) {
            play_pattern();
        }
    };

    const active_buttons = document.querySelectorAll(".standard-button.active");
    active_buttons.forEach((el) => {
        el.addEventListener("click", handle_inputs);
    });
};

function end_screen() {
    if ((curr_score - 1 > parseInt(localStorage.getItem("high_score"), 10)) && (curr_score != 4)) {
        localStorage.setItem("high_score", curr_score - 1);
        document.getElementById("high-score").textContent = "High Score: " + (curr_score - 1) + " digits";
    }

    //Go to end screen
    document.querySelector(".main-container").classList.remove("active");
    document.querySelector(".end-container").classList.add("active");

    //Button to restart game
    document.getElementById("restart-btn").addEventListener("click", () => {
        document.getElementById("mouse-click-sound").play();
        document.querySelector(".end-container").classList.remove("active");
        document.querySelector(".start-container").classList.add("active");
        start_game();
    }, {once: true} );
};



