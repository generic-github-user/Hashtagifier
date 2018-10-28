$("#input").on("input", hashtagify);
$("#slider").on("input", hashtagify);

var tags = [];
var frequency = 0.1;
var last_frequency = 0.1;
var last_input = [];

function addtag(string) {
      if (string[0] !== "#") {
            string = "#" + string;
      }
      return string;
}

function removetag(string) {
      if (string[0] == "#") {
            string = string.substr(1);
      }
      return string;
}

function hashtagify() {
      frequency = $("#slider")[0].value / 100;
      var input = $("#input")[0].value;
      // input = input.replace(/#/g, "");
      if (input != undefined && input != "") {
            input = input.split(" ");

            if (input.length > last_input.length) {
                  for (var i = last_input.length; i < input.length; i++) {
                        if (Math.random() < frequency) {
                              input[i] = addtag(input[i]);
                        } else {
                              input[i] = removetag(input[i]);
                        }
                  }
            }

            // Number of words with hashtags
            var w_h = 0;
            // Number of words without hashtags
            var w_nh = 0;
            // Count number of words with and without hashtags
            for (var i = 0; i < input.length; i++) {
                  if (input[i][0] == "#") {
                        w_h++;
                  } else {
                        w_nh++;
                  }
            }
            // Total number of words
            var w_t = input.length;
            // Calculate probability of adding a hashtag to any given word
            var p_h = ((frequency * w_t) - w_h) / w_t;
            // Calculate probability of removing hashtag
            var p_nh = (((1 - frequency) * w_t) - w_nh) / w_t;
            // Loop through each word in input text
            for (var i = 0; i < input.length; i++) {
                  // Check if hashtag frequency setting has increased
                  if (frequency > last_frequency) {
                        // Current word does not have a hashtag
                        if (input[i][0] !== "#") {
                              if (Math.random() < p_h) {
                                    // Add a hashtag to the word
                                    input[i] = addtag(input[i]);
                              }
                        }
                  }
                  // Hashtag frequency setting has decreased
                  if (frequency < last_frequency) {
                        // Current word has a hashtag
                        if (input[i][0] == "#") {
                              if (Math.random() < p_nh) {
                                    // Remove hashtag from word
                                    input[i] = removetag(input[i]);
                              }
                        }
                  }
            }
      }

      var output = "";
      for (var i = 0; i < input.length; i++) {
            output += input[i];
            if (i < input.length - 1) {
                  output += " ";
            }
      }
      $("#input")[0].value = output;

      last_input = input;
      last_frequency = frequency;
}