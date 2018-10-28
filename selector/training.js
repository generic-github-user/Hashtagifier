// training.js

const hashtag = [
      "pizza",
      "halloween",
      "christmas"
];
const no_hashtag = [
      "if",
      "so",
      "and",
      "with",
      "on"
];

function longest(array) {
      return array.sort(function(a, b) {
            return b.length - a.length;
      })[0].length;
}

const charset = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", " "];

var longest_word = Math.max(longest(hashtag), longest(no_hashtag));

for (var i = 0; i < hashtag.length; i++) {
      hashtag[i] = encodeString(hashtag[i], charset, longest_word);
}
for (var i = 0; i < no_hashtag.length; i++) {
      no_hashtag[i] = encodeString(no_hashtag[i], charset, longest_word);
}

var combined = hashtag.concat(no_hashtag);
combined = tf.tensor2d(combined);

var output_data = tf.tensor1d(new Array(hashtag.length).fill(1).concat(new Array(no_hashtag.length).fill(0)));

const input = tf.input({
      // Input size is one-hot encoded vector
      shape: [longest_word * charset.length]
});

const denseLayer1 = tf.layers.dense({
      units: longest_word * charset.length,
      activation: "relu"
});
const denseLayer2 = tf.layers.dense({
      units: 1,
      activation: "relu"
});

const optimizer = tf.train.sgd(0.01);
const loss = (pred, label) => pred.sub(label).square().mean();

const output = denseLayer2.apply(denseLayer1.apply(input));
const model = tf.model({
      inputs: input,
      outputs: output
});

for (var i = 0; i < 1000; i++) {
      optimizer.minimize(() => loss(model.predict(combined), output_data));
      loss(model.predict(combined), output_data).print();
}