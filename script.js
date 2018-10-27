$("#input").on("input", hashtagify);
$("#slider").on("input", hashtagify);

var input;

function hashtagify() {
      input = $("#input")[0].value;
      if (input != undefined && input != "") {
            input = input.split(" ");
            var output = "";
            for (var i = 0; i < input.length; i++) {
                  if (Math.random() < 0.1) {
                        output += "#";
                  }
                  output += input[i];
                  if (i < input.length - 1) {
                        output += " ";
                  }
            }
            $("#input")[0].value = output;
      }
}