const fs = require('fs');

let args;
if (process.argv.length != 3) {
  console.log('USAGE: siritori.js [level]');
  process.exit(1);
} else {
  args = process.argv.slice(2);
}
var level = args[0];

function smallToBig(str) {
  var pos = 'ァィゥェォヵヶッャュョヮ'.indexOf(str);
  if (pos == -1) {
    return str;
  } else {
    return 'アイウエオカケツヤユヨワ'[pos];
  }
}


var siritori = {};
var idioms = fs.readFileSync('dist/' + level + '.arr').toString().split(',').slice(0, -1);
var yomis = JSON.parse(fs.readFileSync('dist/yomi.json'));
idioms.forEach(idiom => {
  var yomi = yomis[idiom];
  if (yomi) {
    var yomiLast = yomi[yomi.length-1];
    if (yomiLast != 'ン') {
      // [idiom,yomi] などより 'idiom|yomi' のほうがファイルサイズが小さい
      var yomi0 = smallToBig(yomi[0]);
      var yomi1 = smallToBig(yomiLast);
      if (siritori[yomi0]) {
        siritori[yomi0].push(idiom + '|' + yomi1);
      } else {
        siritori[yomi0] = [idiom + '|' + yomi1];
      }
    }
  }
});
process.stdout.write(JSON.stringify(siritori));

