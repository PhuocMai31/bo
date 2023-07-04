import { cacheRd, rdDel } from "@repository";
export  class CachesData {
  /**
   *
   * @param name
   * @param callback {function}
   * @param time
   */
  constructor(name, callback, time = 48) {
    this.name = name;
    this.callback = callback;
    this.time = time;
  }

  /**
   *
   * @param key
   * @param arr {[]|Boolean}
   */
  getData(key, arr = false) {
    const params = arr ? arr : [key];
    return cacheRd(
      this.name + "_" + key,
      () => this.callback(...params),
      this.time
    );
  }

  clearCache(key) {
    return rdDel(this.name + "_" + key);
  }
}
