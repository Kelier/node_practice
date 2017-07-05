//小费逻辑模块

var tips=require('..');
var should=require('should');

var tax=0.12;
var tip=0.15;
var prices=[10,20];

//定义要测试的账单
var pricesWithTipAndTax=tips.addPercentageToEach(prices,tip+tax);

//定义税和消费的增加
pricesWithTipAndTax[0].should.equal(12.7);
pricesWithTipAndTax[1].should.equal(25.4);

var totalAmount=tips.sum(pricesWithTipAndTax).toFixed(2);
totalAmount.should.equal('38.10');//测试账单总额

var totalAmountAsCurrency=tips.dollarFormat(totalAmount);
totalAmountAsCurrency.should.equal('$38.10');

var tipAsPercent=tips.percentFormat(tip);
tipAsPercent.should.equal('15%');