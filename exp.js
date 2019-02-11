function fib(n) {
    var a = 1,
        b = 0,
        x;
    for (var i = 0; i < n; i++) {
        x = a + b;
        a = b;
        b = x;
    }
    return b;
}

function fibBinet(n) {
    var a = 1,
        b = 0,
        x, y;
    for (var i = 0; i < n; i++) {
        y = 1+(Math.sqrt(5))/2;
        x =Math.pow(y, n)/Math.sqrt(5);
        x.toFixed(0)
        console.log(x);
        a = b;
        b = x;
    }
    return b;
}

alert( fib(77) ); // 5527939700884757
alert( fibBinet(77) );