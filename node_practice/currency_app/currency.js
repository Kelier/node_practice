var canadianDollar=0.91;
function roundTwoDecimals(amount){
    return Math.round(amount*100)/100;
}
exports.canadianToUS=function(canadian){
    return roundTwoDecimals(canadian*canadianDollar);
}
exports.USToCanadian=function(us){
    return roundTwoDecimals(us/canadianDollar);
}
//exports里的属性说明引入这个模块的代码只能访问到这两个函数，程序不能直接访问私有变量