//你即将做一个小费计算器

/*
addPercentageToEach //按给定的百分比增加数组中的所有数值
sum 计算数组中所有数值的和值
percentFormat  对要显示的百分比进行格式化
dollarFormat  对要显示的金额进行格式化
*/

exports.addPercentageToEach=function(prices,percentage){
    return prices.map(function(total){
        total=parseFloat(total);
        return total+(total*percentage);
    });
}

exports.sum=function(prices){
    return prices.reduce(function(currentSum,currentValue){
        return parseFloat(currentSum)+parseFloat(currentValue);
    })
}

exports.percentFormat=function(percentage){
    return parseFloat(percentage)*100+'%';
}

exports.dollarFormat=function(number){
    return '$'+parseFloat(number).toFixed(2);
}