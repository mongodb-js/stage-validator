const parser = require("./agg_pipeline.js");
const fs = require("fs");

function clean(s) {
    var ret = '';
    var inDString = false;
    var inSString = false;
    for (var i = 0, len = s.length; i < len; i++) {
	var ch = s.charAt(i);
	if (inDString) {
	    if (ch === '"') {
		inDString = false;
	    }
	    ret += ch;
	} else if (inSString) {
	    if (ch === "'") {
		inSString = false;
	    }
	    ret += ch;
	} else {
	    if (ch === '"') {
		inDString = true;
		ret += ch;
	    } else if (ch === "'") {
		inSString = true;
		ret += ch;
	    } else if (ch === ' ' || ch === "\t" || ch === "\n" || ch === "\r") {
		continue
	    } else {
		ret += ch;
	    }
	}
    }
    return ret;
}

var input = clean(fs.readFileSync('test').toString());
var output = parser.parse(input)
console.log(JSON.stringify(output, null, 4));

