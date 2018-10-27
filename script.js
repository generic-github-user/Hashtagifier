$("#input").on("input", hashtagify);
$("#slider").on("input", hashtagify);

var tags = [];
var frequency = 0.1;
var last_frequency = 0.1;
var last_input = [];

function hashtagify() {
      frequency = $("#slider")[0].value / 100;
      var input = $("#input")[0].value;
      input = input.replace(/#/g, "");
      if (input != undefined && input != "") {
            input = input.split(" ");

            if (input.length > last_input.length) {
                  for (var i = 0; i < input.length - last_input.length; i++) {
                        if (Math.random() < frequency) {
                              tags.push(1);
                        } else {
                              tags.push(0);
                        }
                  }
            }

            for (var i = 0; i < tags.length; i++) {
                  if (Math.random() < frequency) {
                        if (tags[i] == 0 && frequency > last_frequency) {
                              tags[i] = 1;
                        } else if (tags[i] == 1 && frequency < last_frequency) {
                              tags[i] = 0;
                        }
                  }
            }
      }

      var output = "";
      for (var i = 0; i < input.length; i++) {
            if (tags[i] == 1) {
                  output += "#";
            }
            output += input[i];
            if (i < input.length - 1) {
                  output += " ";
            }
      }
      $("#input")[0].value = output;

      last_input = input;
      last_frequency = frequency;
}