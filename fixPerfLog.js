const 
  fs = require('fs')
  ,split2 = require('split2')
  ,through2 = require('through2')
;
let i=0;
const inputFileName = process.argv[2] || "test.json";
 
const output = fs.createWriteStream('output3.json');
output.on("open", ()=>output.write("["));
let first = false;

fs.createReadStream(inputFileName)
  .pipe(split2())
  .pipe(through2(function(chunk,enc,cb){
    i++
    let c = chunk.toString().replace(/,$/, "").replace(/^\[/, "").replace(/\]$/, "");
      ;
    try {
      c2 = JSON.parse(c);
      this.push(JSON.stringify(c2) + "\n,");
    } catch(e){
      console.error(i,c);
    }
    return cb();
  },function(flush) {
    this.push(']');
    flush();
  }))
  .pipe(output);
