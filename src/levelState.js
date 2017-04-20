const scoreFormat = '000000';
const scoreSize = scoreFormat.length; // I.e. a score of 1 will have 5 leading zeros

const timeFormat = '000';
const timeSize = timeFormat.length; // I.e. a score of 1 will have 5 leading zeros

const coinFormat = '00';
const coinSize = coinFormat.length; // I.e. a score of 1 will have 5 leading zeros

const levelState = {
  score: 0,
  numCoins: 0,
  world: 1,
  stage: 1,
  time: 400,
  addToScore(score) {
    this.score += score;
  },
  addToCoins(coins) {
    this.coins += coins;
  },
  reduceTime() {
    this.time -= 1;
  },
  getScore() {
    const score = scoreFormat + this.score;
    return score.substr(score.length - scoreSize);
  },
  getTime() {
    const time = timeFormat + this.time;
    return time.substr(time.length - timeSize);
  },
  getCoins() {
    const coins = coinFormat + this.coins;
    return coins.substr(coins.length - coinSize);
  }
};

export default levelState;
