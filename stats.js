module.exports = Stats = function() {
  // these attributes need to exist on the including class
  var ATTRIBUTES = ["last_hp", "last_hp_changed_at", "exp"];

  function exp_worth() {
    return 50 + this.level() * 5
  };

  // How many HP per second does this character regenerate?
  function regeneration_rate() {
    return 4
  };

  function maxhp() {
    return 30 + 4
  };

  function level() {
    return Math.pow(exp, 0.5)
  };

  function alive() {
    return hp > 0
  };

  // Time in seconds till character starts regenerating again after hp hits 0
  function downtime() {
    return 12
  };

  function start_regenerating_at() {
    return (this.last_hp <= 0 ? this.last_hp_changed_at + this.downtime() : this.last_hp_changed_at)
  };

  function hp() {
    if (this.start_regenerating_at() > Time.now) return 0;

    return Math.min.apply(Math, [
      Math.max.apply(Math, [this.last_hp, 0]) + (Time.now - this.start_regenerating_at()) * this.regeneration_rate(),
      this.maxhp()
    ])
  };

  function remaining_downtime() {
    return Math.max.apply(
      Math,
      [this.start_regenerating_at() - Time.now, 0]
    )
  };

  return {
    ATTRIBUTES: ATTRIBUTES,
    exp_worth: exp_worth,
    regeneration_rate: regeneration_rate,
    maxhp: maxhp,
    level: level,
    alive: alive,
    downtime: downtime,
    start_regenerating_at: start_regenerating_at,
    hp: hp,
    remaining_downtime: remaining_downtime
  }
}()