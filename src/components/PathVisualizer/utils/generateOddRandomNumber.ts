export const generateOddRandomNumber = (arr: number[]) => {
    const max = arr.length - 1;
    let randomNum =
        Math.floor(Math.random() * (max / 2)) +
        Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 === 0) {
        if (randomNum === max) randomNum -= 1;
        else randomNum += 1;
    }
    return arr[randomNum];
};
