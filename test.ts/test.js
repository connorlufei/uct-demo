function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function getCounter() {
    let counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
let haha = c(10);
console.log('haha', haha);
c.reset();
c.interval = 5.0;
