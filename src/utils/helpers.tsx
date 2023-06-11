export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomIntegers(
  from: number,
  to: number,
  { unique = false, count = 1 } = {}
): number[] {
  if (unique && count > to - from + 1) {
    throw new Error("Cannot generate the required amount of unique numbers in the given range.");
  }

  if (unique && count > (to - from + 1) / 2) {
    // Generate all possible numbers, shuffle the array, then take the amount needed.
    const allNumbers: number[] = Array.from({ length: to - from + 1 }, (_, i) => from + i);
    for (let i = allNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
    }
    return allNumbers.slice(0, count);
  } else {
    // Same as previous solution
    const result: number[] = [];
    while (result.length < count) {
      const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
      if (unique) {
        if (!result.includes(randomNumber)) {
          result.push(randomNumber);
        }
      } else {
        result.push(randomNumber);
      }
    }
    return result;
  }
}
