import { Strings } from './';

// Operator functions
const operators = {
    /**
     * Addition : produces de sum or concatenation of a and b
     * @param   {(Number|String)} a : first number or string
     * @param   {(Number|String)} b : second number or string
     * @returns {Number}            : a + b
     */
    "+"    : (a, b) => a + b,

    /**
     * Addition assignment : produces de sum or concatenation of a and b and assigns the value to a
     * @param   {(Number|String)} a : first number or string
     * @param   {(Number|String)} b : second number or string
     * @returns {Number}            : a += b
     */
    "+="   : (a, b) => a += b,

    /**
     * Substraction : produces the difference between a and b
     * @param   {(Number|String)} a : first number
     * @param   {(Number|String)} b : second number
     * @returns {Number}            : a - b
     */
    "-"    : (a, b) => a - b,

    /**
     * Substraction assignment : produces the difference between a and b and assigns the value to a
     * @param   {(Number|String)} a : first number
     * @param   {(Number|String)} b : second number
     * @returns {Number}            : a -= b
     */
    "-="   : (a, b) => a -= b,

    /**
     * Multiplication : produces the product of a by b
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a * b
     */
    "*"    : (a, b) => a * b,

    /**
     * Multiplication assignment : produces the product of a by b and assigns the value to a
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a *= b
     */
    "*="   : (a, b) => a *= b,

    /**
     * Division : produces the quotient of a divided by b
     * @param   {Number} a : numerator
     * @param   {Number} b : denominator
     * @returns {Number}   : a / b
     */
    "/"    : (a, b) => a / b,

    /**
     * Division assignment : produces the quotient of a divided by b and asigns the value to a
     * @param   {Number} a : numerator
     * @param   {Number} b : denominator
     * @returns {Number}   : a /= b
     */
    "/="   : (a, b) => a /= b,

    /**
     * Remainder : returns the remainder left over when a is divided by b
     * @param   {Number} a : numerator
     * @param   {Number} b : denominator
     * @returns {Number}   : a % b
     */
    "%"    : (a, b) => a % b,

    /**
     * Remainder assignment : returns the remainder left over when a is divided by b and assigns the value to a
     * @param   {Number} a : numerator
     * @param   {Number} b : denominator
     * @returns {Number}   : a %= b
     */
    "%="   : (a, b) => a %= b,

    /**
     * Exponentiation : raises a to the power of b
     * @param   {Number} a : number to raise
     * @param   {Number} b : power
     * @returns {Number}   : a ** b
     */
    "**"   : (a, b) => a ** b,

    /**
     * Exponentiation assignment : raises a to the power of b and assigns the value to a
     * @param   {Number} a : number to raise
     * @param   {Number} b : power
     * @returns {Number}   : a **= b
     */
    "**="  : (a, b) => a **= b,

    /**
     * Assignment : assigns b value to a
     * @param   {*} a : variable
     * @param   {*} b : value to assign
     * @returns {*}   : a = b
     */
    "="    : (a, b) => a = b,

    /**
     * Greater than : checks if a is greater than b
     * @param   {(Number|String|Boolean)} a : first operand
     * @param   {(Number|String|Boolean)} b : second operand
     * @returns {Boolean}                   : a > b
     */
    ">"    : (a, b) => a > b,

    /**
     * Lesser than : checks if a is lesser than b
     * @param   {(Number|String|Boolean)} a : first operand
     * @param   {(Number|String|Boolean)} b : second operand
     * @returns {Boolean}                   : a < b
     */
    "<"    : (a, b) => a < b,

    /**
     * Greater or equal : checks if a is greater or equal to b
     * @param   {(Number|String|Boolean)} a : first operand
     * @param   {(Number|String|Boolean)} b : second operand
     * @returns {Boolean}                   : a >= b
     */
    ">="   : (a, b) => a >= b,

    /**
     * Lesser or equal : checks if a is lesser or equal to b
     * @param   {(Number|String|Boolean)} a : first operand
     * @param   {(Number|String|Boolean)} b : second operand
     * @returns {Boolean}                   : a <= b
     */
    "<="   : (a, b) => a <= b,

    /**
     * Strict equality : checks if a is strictly (considering operands type) equal to b
     * @param   {*}       a : first operand
     * @param   {*}       b : second operand
     * @returns {Boolean}   : a === b
     */
    "==="  : (a ,b) => a === b,

    /**
     * Strict inequality : checks if a is strictly (considering operands type) inequal to b
     * @param   {*}       a : first operand
     * @param   {*}       b : second operand
     * @returns {Boolean}   : a !== b
     */
    "!=="  : (a, b) => a !== b,

    /**
     * Logical OR : true if at least one operand is true
     * @param   {Number} a : first operand
     * @param   {Number} b : second operand
     * @returns {Boolean}  : a || b
     */
    "||"   : (a, b) => a || b,

    /**
     * Logical AND : true if both operands are true
     * @param   {*}       a : first element
     * @param   {*}       b : first element
     * @returns {Boolean}   : a && b
     */
    "&&"   : (a, b) => a && b,

    /**
     * Bitwise OR : applies a bitwise OR between a and b
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a | b
     */
    "|"    : (a, b) => a | b,

    /**
     * Bitwise OR assignment : applies a bitwise OR between a and b and assigns the new value to a
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a |= b
     */
    "|="   : (a, b) => a |= b,

    /**
     * Bitwise AND : applies a bitwise AND between a and b
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a & b
     */
    "&"    : (a, b) => a & b,

    /**
     * Bitwise AND assignment : applies a bitwise AND between a and b and assigns the new value to a
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a &= b
     */
    "&="   : (a, b) => a &= b,

    /**
     * Bitwise XOR : applies a bitwise exclusive OR between a and b
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a ^ b
     */
    "^"    : (a, b) => a ^ b,

    /**
     * Bitwise XOR assignment : applies a bitwise exclusive OR between a and b and assigns the new value to a
     * @param   {Number} a : first number
     * @param   {Number} b : second number
     * @returns {Number}   : a ^= b
     */
    "^="   : (a, b) => a ^= b,

    /**
     * Bitwise left shift : shifts a by b bits to the left
     * @param   {Number} a : base number
     * @param   {Number} b : shift size
     * @returns {Number}   : a << b
     */
    "<<"   : (a, b) => a << b,

    /**
     * Bitwise left shift assignment : shifts a by b bits to the left and assigns the new value to a
     * @param   {Number} a : base number
     * @param   {Number} b : shift size
     * @returns {Number}   : a <<= b
     */
    "<<="  : (a, b) => a <<= b,

    /**
     * Bitwise right shift : shifts a by b bits to the right
     * @param   {Number} a : base number
     * @param   {Number} b : shift size
     * @returns {Number}   : a >> b
     */
    ">>"   : (a, b) => a >> b,

    /**
     * Bitwise right shift assignment : shifts a by b bits to the right and assigns the new value to a
     * @param   {Number} a : base number
     * @param   {Number} b : shift size
     * @returns {Number}   : a >>= b
     */
    ">>="  : (a, b) => a >>= b,

    /**
     * Logical include : checks if a includes b
     * @param   {(Array|String)}  a : container (array or string)
     * @param   {(Number|String)} b : element to check in a
     * @returns {Boolean}           : a.includes(b)
     */
    "inc"  : (a, b) => a.includes(b),

    /**
     * Logical not include : checks if a does not include b
     * @param   {(Array|String)} a : container (array or string)
     * @param   {Number}         b : element to check in a
     * @returns {Boolean}          : !a.includes(b)
     */
    "!inc" : (a, b) => !a.includes(b),

    /**
     * Substring : returns the substring located between the two substrings (b[0], b[1]) in the given string (a)
     * @param   {String}   a : string
     * @param   {String[]} b : substrings (b.length === 2)
     * @returns {String}     : substring between b[0] and b[1]
     */
    "sbstr": (a, b) => Strings.sbstr(a, b),
}

export default operators;