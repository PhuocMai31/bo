
Number.prototype.like = function (value) {
  return value == this;
};

Number.prototype.equal = function (value) {
  return this === value;
};
Number.prototype.bigger = function (value, orLike = false) {
  if (orLike === false) return this > value;
  return this >= value;
};

Number.prototype.less = function (value, orLike = false) {
  if (orLike === false) return this < value;
  return this <= value;
};
String.prototype.like = function (value) {
  return value == this;
};

String.prototype.equal = function (value) {
  return this === value;
};
Number.prototype.default = function (value ){
  return this != (value)
}
String.prototype.default = function (value ){
  return this != (value)
}
String.prototype.bigger = function (value, orLike = false) {
  if (orLike === false) return Number(this) > Number(value);
  return Number(this) >= Number(value);
};

String.prototype.less = function (value, orLike = false) {
  if (orLike === false) return Number(this) < Number(value);
  return Number(this) <= Number(value);
};



