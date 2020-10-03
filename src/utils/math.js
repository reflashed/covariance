const math = {};

math.mean = (x) => {
  let sum = 0;

  const xLen = x.length;
  for (let i = 0; i < xLen; i += 1) {
    sum += x[i];
  }

  return sum / xLen;
};

export default math;
