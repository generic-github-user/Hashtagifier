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

            var w_h = 0;
            var w_nh = 0;
            for (var i = 0; i < tags.length; i++) {
                  if (tags[i] == 1) {
                        w_h++;
                  } else {
                        w_nh++;
                  }
            }
            var w_t = input.length;
            var p_h = ((frequency * w_t) - w_h) / w_t;
            var p_nh = (((1 - frequency) * w_t) - w_nh) / w_t;
            for (var i = 0; i < tags.length; i++) {
                  if (frequency > last_frequency) {
                        if (tags[i] == 0) {
                              if (Math.random() < p_h) {
                                    tags[i] = 1;
                              }
                        }
                  }
                  if (frequency < last_frequency) {
                        if (tags[i] == 1) {
                              if (Math.random() < p_nh) {
                                    tags[i] = 0;
                              }
                        }
                  }
            }
            console.log(w_h, w_nh);
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