let input = process.argv
var result =0;
for (let i = 2; i < input.length; i++) {
    result += Number(input[i])
}
console.log(result);