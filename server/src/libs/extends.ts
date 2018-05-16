interface Array<T> {     contains(obj: Object): boolean;     count(): number;
}
interface String {     contains(obj: Object): boolean;
}
String.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};
Array.prototype.count = function () {
    return this.length;
}
Array.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};

