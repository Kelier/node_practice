//console.log('\033[32mhello\033[39m');

//旁边的字符斗士ANSI转义码

//下面是ansi方法改变fg前景色，bg背景色

var ansi=require('ansi');
var cursor=ansi(process.stdout);

cursor.fg.green().write('Hello').fg.reset().write('\n');

