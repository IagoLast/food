import INutriscoreParams from "../types/INutriscoreParams";
import { computeNegativepoints } from "./negativePoints/index";
import { computePositivepoints, computeFruitPctPoints, computeFibrePoints } from "./positivePoints/index";
import { Modifier } from "../types/Modifier";

export function computeScore(params: INutriscoreParams, modifier: Modifier) {
    const positivePoints = computePositivepoints(params, modifier);
    const negativePoints = computeNegativepoints(params, modifier);
    const fruitPctPoints = computeFruitPctPoints(params.vegetableFruitNuts, modifier);
    const fibrePoints = computeFibrePoints(params.fibre);

    if (negativePoints < 11 || fruitPctPoints >= 5 || modifier === Modifier.CHEESE) {
        return negativePoints - positivePoints;
    }

    return negativePoints - (fibrePoints + fruitPctPoints);
}



export default { computeScore };