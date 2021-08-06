// First, we must generate a JSON parser using:
//
//      python -m lark-js json.lark -o json_parser.js
//
// Then we can run it with
//
//      node run_json_parser.js

var lark = require('./json_parser.js')

var transformer = {
    number: ([n])  => parseFloat(n.value),
    string: ([s])  => s.value.slice(1, -1),
    array:  Array.from,
    pair:   Array.from,
    object: Object.fromEntries,

    null: () => null,
    true: () => true,
    false: () => false,
}

var parser = lark.load_parser({transformer})


function test_json() {
    var text = `
    {
        "empty_object" : {},
        "empty_array"  : [],
        "booleans"     : { "YES" : true, "NO" : false },
        "numbers"      : [ 0, 1, -2, 3.3, 4.4e5, 6.6e-7 ],
        "strings"      : [ "This", [ "And" , "That", "And a \\"b" ] ],
        "nothing"      : null
    }
    `

    console.log( parser.parse(text) )

}


if (require && require.main === module) {
    test_json()
}

