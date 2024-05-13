const argument = process.argv;

fetch(argument[2]).then((r) => {
    console.log(r)
})
