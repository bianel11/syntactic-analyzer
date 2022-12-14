const words = {
  separators: {
    endline: ";",
    parenthesesR: ")",
    parenthesesL: "(",
    keysR: "}",
    keysL: "{",
  },
  comparations: ["<", ">", "=", "==", "===", "!=", "!==", ">=", "<="],
  operators: ["+", "-", "*", "/", "%", "++", "--"],
  declarations: ["var", "let", "const"],
  reservedWords: [
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "default",
    "function",
    "return",
    "try",
    "catch",
    "finally",
    "throw",
    "class",
    "extends",
    "super",
    "this",
    "new",
    "delete",
    "typeof",
    "instanceof",
    "in",
    "of",
    "void",
    "with",
    "debugger",
    "import",
    "export",
    "from",
    "as",
    "default",
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity",
    "async",
    "await",
    "yield",
    "enum",
    "implements",
    "interface",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "get",
    "set",
    "eval",
    "arguments",
    "prototype",
    "constructor",
    "prototype",
    "toString",
    "valueOf",
    "toLocaleString",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape",
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "Number",
    "Math",
    "Date",
    "String",
    "RegExp",
    "Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    "Reflect",
    "Proxy",
    "Intl",
    "WebAssembly",
    "escape",
    "unescape",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "eval",
    "function",
    "hasOwnProperty",
    "Infinity",
    "isFinite",
    "isNaN",
    "isPrototypeOf",
    "length",
    "Math",
  ],
  numbers: /^[0-9]+$/,
};

export default words;
