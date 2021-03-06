import mario from './mario';

const scoreFormat = '000000';
const scoreSize = scoreFormat.length; // I.e. a score of 1 will have 5 leading zeros

const timeFormat = '000';
const timeSize = timeFormat.length; // I.e. a score of 1 will have 5 leading zeros

const coinFormat = '00';
const coinSize = coinFormat.length; // I.e. a score of 1 will have 5 leading zeros

const levelState = {
  score: 0,
  coins: 0,
  world: 1,
  stage: 1,
  time: 400,
  /**
   * Adds to the total score for the level
   *
   * @param {number} score
   */
  addToScore(score) {
    this.score += score;
  },
  /**
   * Adds to the tally of coins collected.
   *
   * @param {number} coins
   */
  addToCoins(coins) {
    this.coins += coins;
  },
  reduceTime() {
    if (this.time <= 0) {
      mario.kill();
      clearInterval(timeInterval);
    } else {
      this.time -= 1;
    }
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
  },
};

/**
 * Just set an interval for now for the time countdown, since the game
 * loads straight away anyway
 */
var timeInterval = setInterval(() => levelState.reduceTime(), 1000);

export default levelState;
