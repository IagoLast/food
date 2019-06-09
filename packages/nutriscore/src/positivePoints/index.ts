import IPositiveScoreParams from "../../types/IPositiveScoreParams";
import { Modifier } from "../../types/Modifier";

export function computePositivepoints({ fibre, protein, vegetableFruitNuts }: IPositiveScoreParams, modifier: Modifier) {
    return computeFruitPctPoints(vegetableFruitNuts, modifier) + computeFibrePoints(fibre) + _computeProteinPoints(protein);
}

export function computeFruitPctPoints(value: number, modifier: Modifier) {
    if (modifier === Modifier.DRINK) { 
        return _computeFruitPctPointsForDrinks(value); 
    }
    return _computeFruitPctPoints(value);
}

export function computeFibrePoints(value: number) {
    if (value > 4.7) { return 5; }
    if (value > 3.7) { return 4; }
    if (value > 2.8) { return 3; }
    if (value > 1.9) { return 2; }
    if (value > 0.9) { return 1; }
    return 0;
}

function _computeFruitPctPoints(value: number) {
    if (value > 80) { return 5; }
    if (value > 60) { return 2; }
    if (value > 40) { return 1; }
    return 0;
}

function _computeFruitPctPointsForDrinks(value: number): number {
    if (value > 80) { return 10; }
    if (value > 60) { return 4; }
    if (value > 40) { return 2; }
    return 0;
}

function _computeProteinPoints(value: number) {
    if (value > 8.0) { return 5; }
    if (value > 6.4) { return 4; }
    if (value > 4.8) { return 3; }
    if (value > 3.2) { return 2; }
    if (value > 1.6) { return 1; }
    return 0;
}

export default { computePositivepoints, computeFruitPctPoints, computeFibrePoints };