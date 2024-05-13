const fs = require('node:fs');
function readData(filepath){
return new Promise((resolve, reject) => {
    fs.readFile(filepath,'utf-8', (err, data)=>{
        if(err){
            reject(err)
        }
        resolve(data)
        })
})
}

readData('/workspaces/m295-Backend/Aufgabe 2/aufgabe-2.2/beispiel.txt').then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
})
.catch(err => { console.error('Fehler beim Lesen der Datei:', err);
});