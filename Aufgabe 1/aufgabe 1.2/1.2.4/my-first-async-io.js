const fs = require('fs')
let newCountLine = 0;
    fs.readFile(process.argv[2],'utf-8', function doneReading(err, data) {
        if(err){
            console.log(err)
        }
        newCountLine  = data.split('\n').length-1;
        console.log(newCountLine)
      })
    
