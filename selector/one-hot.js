// Accepts a string and returns an array of 1s and 0s
function encodeString(input, charset, length) {
      // Define output as a variable containing an empty array
      var output = [];
      // Convert input string to array of all characters in input
      input = input.split("");
      if (!length) {
            length = input.length;
      }
      // Loop through each character of the input
      for (var i = 0; i < length; i++) {
            // Loop through each possible character
            charset.forEach(
                  char => {
                        // Check for a match between the current input character and the current character from the list; if there is a match, add a 1 to the output array
                        if (input[i] == char) {
                              output.push(1);
                        }
                        // If there is no match, add a 0 to the output array
                        else {
                              output.push(0);
                        }
                  }
            )
      };
      // Return output array
      return output;
}

// Accepts an array of 1s and 0s as an input and returns a string
function decodeString(input, charset) {
      // Define output as a variable containing an empty string
      var output = "";
      // Loop through each character of the input
      for (var i = 0; i < input.length; i++) {
            // Check value of current element of input array
            if (input[i] == 1) {
                  output += charset[i % charset.length];
            }
      }
      // Return output string
      return output;
}

const charset = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", " "];