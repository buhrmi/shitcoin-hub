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

Array.prototype.upsertBy = function(field, value, newData) {
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (element[field] == value) {
      this.splice(index, 1, newData);
      return
    }
  }
  this.push(newData);
}

Array.prototype.delete = function(record) {
  this.deleteBy('id', record.id)
}

Array.prototype.upsert = function(record) {
  this.upsertBy('id', record.id, record)
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

global.Time = {
  get now() {
    // TODO: use server time
    return new Date().getTime() / 1000
  }
}

if (process.env.VUE_ENV == "client") {
  Object.defineProperty(Array.prototype, 'max', {
    get () {
      return Math.max.apply(Math, this);
    }
  })

  Object.defineProperty(Array.prototype, 'min', {
    get () {
      return Math.min.apply(Math, this);
    }
  })

}