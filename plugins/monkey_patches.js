Array.prototype.deleteBy = function(field, value) {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (element[field] == value) this.splice(index, 1)
  }
}

Array.prototype.replaceBy = function(field, value, newData) {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (element[field] == value) this.splice(index, 1, newData);
  }
}

Array.prototype.orderBy = function(field, dir) {
  let multi = {asc: 1, desc: -1}
  return this.slice(0).sort(function(a, b) {
    return a[field] < b[field] ? multi[dir] * -1 : multi[dir]
  })
}

Array.prototype.first = function(amount = 1) {
  if(amount == 1) {
    return this[0]
  }
  else {
    return this.slice(0,amount)
  }
}
