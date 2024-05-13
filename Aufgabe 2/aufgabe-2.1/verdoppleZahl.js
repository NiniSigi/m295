function doubleNumber(number, callback) {
    callback(number *2 )
}

doubleNumber(5, function(result){
    console.log('this is the result:', result)
})