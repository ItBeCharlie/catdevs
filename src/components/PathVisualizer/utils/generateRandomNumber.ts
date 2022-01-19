export const generateRandomNumber = (max: number) => {
    let randomNum =
        Math.floor(Math.random() * (max / 2)) +
        Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 !== 0) {
        if (randomNum === max) randomNum -= 1;
        else randomNum += 1;
    }
    return randomNum;
};
