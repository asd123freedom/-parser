/**
 * @file Token Class
 * @author asd123freedom@gmail.com
 */

class Token {
    constructor(str) {
        this.lineNumber = -1;
        this.hasMore = true;
        this.queue = [];
        this.code = str;
        this.codeArr = str.split('\n');
        this.tokenArr = [];
    }

    fillQueue(i) {}
    readLine() {
        let arr = this.codeArr;
        this.lineNumber = this.lineNumber + 1;
        if (this.lineNumber >= arr.length) {
            this.hasMore = false;
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            let pos = 0;
            let endPos = arr[i].length;
            let lineText = arr[i];
            while (pos < endPos) {
                let matcher = lineText.match(Token.regexPat);
                let res = this.addToken(matcher, i);
                if (res) {
                    pos = matcher.index + matcher[0].length;
                    lineText = lineText.slice(pos);
                }
                else {
                    pos = pos + 1;
                }
            }
        }
        console.log(this.tokenArr);
        console.log('tokenizer end');
    }
    addToken(matcher, line) {
        // 具体的分析结果从序号2开始
        // 序号1是除了空白字符以外的匹配结果
        // 序号2是注释
        // 序号3是数字
        // 序号4是字符串
        // 序号5是匹配字符串过程中的子匹配，可以忽略
        // index是整个匹配从零开始的索引
        if (!matcher || !matcher[1]) {
            return false;
        }
        if (matcher[2]) {
            this.tokenArr.push({
                type: 'comment',
                line,
                value: matcher[2]
            });
        }
        else if (matcher[3]) {
            this.tokenArr.push({
                type: 'number',
                line,
                value: matcher[3]
            });
        }
        else if (matcher[4]) {
            this.tokenArr.push({
                type: 'string',
                line,
                value: matcher[4]
            });
        }
        else {
            this.tokenArr.push({
                type: 'identifier',
                line,
                value: matcher[1]
            });
        }
        return true;
    }
}
let testStr = `
    if i % 2 == 0
    {
        even = even + 1
    }
`;
/*
let testStr = `
    i = 50
    even = 0
    odd = 0
    if i % 2 == 0
    {
        even = even + 1
    }
    else
    {
        odd = odd + 1
    }
`;
*/

let tokenizer = new Token(testStr);
Token.regexPat = /\s*((\/\/.*)|([0-9]+)|(\"(\\"|\\\\|\\n|[^\"])*\")|[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\|\||[^\w\s])?/;
tokenizer.readLine();


module.exports = Token;
