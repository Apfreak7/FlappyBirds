import Constants from './Constants';
import {randomBetween} from './RandomBetween';

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomPipeHeight =
    Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};
