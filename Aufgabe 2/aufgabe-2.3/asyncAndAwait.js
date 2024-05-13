function simuliereVerzoegerung(a,b,ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(a+b);
        }, ms);
      });
}
async function addiereNachVerzoegerung(a, b, ms) {
    simuliereVerzoegerung(a,b,ms)
    const result = await simuliereVerzoegerung(a,b,ms)
    console.log(result);
  }

  addiereNachVerzoegerung(3,7,2000)


