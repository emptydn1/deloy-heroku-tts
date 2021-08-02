module.exports = class Voice {
  #textOrUrlManga;
  #voice;
  #speed;
  #urlData;
  #durationsTs;

  constructor(textOrUrlManga, voice, speed, urlData, durationsTs) {
    this.#textOrUrlManga = textOrUrlManga;
    this.#voice = voice;
    this.#speed = speed;
    this.#urlData = urlData;
    this.#durationsTs = durationsTs;
  }

  get textOrUrlManga() {
    return this.#textOrUrlManga;
  }
  set textOrUrlManga(textOrUrlManga) {
    this.#textOrUrlManga = textOrUrlManga;
  }

  get voice() {
    return this.#voice;
  }
  set voice(voice) {
    this.#voice = voice;
  }

  get speed() {
    return this.#speed;
  }
  set speed(speed) {
    this.#speed = speed;
  }

  get urlData() {
    return this.#urlData;
  }
  set urlData(urlData) {
    this.#urlData = urlData;
  }

  get durationsTs() {
    return this.#durationsTs;
  }
  set durationsTs(durationsTs) {
    this.#durationsTs = durationsTs;
  }

  toString() {
    console.log(
      this.#textOrUrlManga,
      this.#voice,
      this.#speed,
      this.#urlData,
      this.#durationsTs
    );
  }
};
