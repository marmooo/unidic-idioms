const fs = require('fs');
const execSync = require('child_process').execSync;

function build(idiomLength) {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  for (var i=1; i<=9; i++) {
    execSync(`node kanji-words.js ${idiomLength} ${i} > dist/${i}.lst`);
    execSync(`node minify.js ${i} > dist/${i}.arr`);
  }
  for (var i=1; i<=9; i++) {
    execSync(`node siritori.js ${i} > dist/${i}.siri`);
  }
  (function() {
    var siritori = [];
    for (var i=1; i<=9; i++) {
      var siri = JSON.parse(fs.readFileSync(`dist/${i}.siri`));
      siritori.push(siri);
    }
    fs.writeFileSync('dist/siritori.json', JSON.stringify(siritori));
  })();
  fs.renameSync('dist', `kanji-${idiomLength}-3999`);
}

// build(2);
build(3);

