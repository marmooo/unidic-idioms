const fs = require('fs');

let args;
if (process.argv.length != 3) {
  console.log('USAGE: count.js [filepath]');
  process.exit(1);
} else {
  args = process.argv.slice(2);
}
var filepath = args[0];

var counter = {};
var siritori = JSON.parse(fs.readFileSync(filepath));
for (var i=0; i<siritori.length; i++) {
  for (var [aiueo, idioms] of Object.entries(siritori[i])) {
    if (counter[aiueo]) {
      counter[aiueo] += idioms.length;
    } else {
      counter[aiueo] = idioms.length;
    }
  }
  var aiueoNum = Object.values(counter).length;
  var idiomNum = 0;
  for (var count of Object.values(counter)) {
    idiomNum += count;
  }
  console.log([i, aiueoNum, idiomNum / aiueoNum]);
}

