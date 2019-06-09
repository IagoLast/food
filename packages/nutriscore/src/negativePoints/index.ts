import INegativeScoreParams from "../../types/INegativeScoreParams";
import { Modifier } from "../../types/Modifier";

export function computeNegativepoints(params: INegativeScoreParams, modifier: Modifier) {
    const energyScore = modifier === Modifier.DRINK ? _computeEnergyPointsForDrinks(params.energy) : _computeEnergyPoints(params.energy);
    const sugarScore = modifier === Modifier.DRINK ? _computeSugarScoreForDrinks(params.sugar) : _computeSugarScore(params.sugar);
    const fatScore = modifier === Modifier.FAT ? _computeSaturatedFatPointsForFats(params.totalFat, params.saturatedFat) : _computeSaturatedFatPoints(params.saturatedFat);
    return energyScore + sugarScore + fatScore + _computeSodiumScore(params.salt);
}

function _computeEnergyPoints(energy: number) {
    if (energy > 3350) { return 10; }
    if (energy > 3015) { return 9; }
    if (energy > 2680) { return 8; }
    if (energy > 2345) { return 7; }
    if (energy > 2010) { return 6; }
    if (energy > 1675) { return 5; }
    if (energy > 1340) { return 4; }
    if (energy > 1005) { return 3; }
    if (energy > 670) { return 2; }
    if (energy > 335) { return 1; }
    return 0;
}

function _computeEnergyPointsForDrinks(energy: number) {
    if (energy <= 0) { return 0; }
    if (energy <= 30) { return 1; }
    if (energy <= 60) { return 2; }
    if (energy <= 90) { return 3; }
    if (energy <= 120) { return 4; }
    if (energy <= 150) { return 5; }
    if (energy <= 180) { return 6; }
    if (energy <= 210) { return 7; }
    if (energy <= 240) { return 8; }
    if (energy <= 270) { return 9; }
    return 10;
}

function _computeSaturatedFatPoints(value: number) {
    if (value > 10) { return 10; }
    if (value > 9) { return 9; }
    if (value > 8) { return 8; }
    if (value > 7) { return 7; }
    if (value > 6) { return 6; }
    if (value > 5) { return 5; }
    if (value > 4) { return 4; }
    if (value > 3) { return 3; }
    if (value > 2) { return 2; }
    if (value > 1) { return 1; }
    return 0;
}

function _computeSaturatedFatPointsForFats(totalFat: number, saturatedFat: number) {
    if (totalFat === 0 && saturatedFat === 0) {
        return 0;
    }
    // Looks like the reference implementation rounds the ratio
    let ratio = _round(saturatedFat / totalFat * 100);

    if (ratio < 10) { return 0; }
    if (ratio < 16) { return 1; }
    if (ratio < 22) { return 2; }
    if (ratio < 28) { return 3; }
    if (ratio < 34) { return 4; }
    if (ratio < 40) { return 5; }
    if (ratio < 46) { return 6; }
    if (ratio < 52) { return 7; }
    if (ratio < 58) { return 8; }
    if (ratio < 64) { return 9; }
    return 10;
}

function _round(value: number) {
    const decimals = value % 1;
    if (decimals > 0.95) {
        return Math.round(value);
    }
    return value;
}

function _computeSodiumScore(salt: number) {
    const value = _saltToSodium(salt);
    if (value > 900) { return 10; }
    if (value > 810) { return 9; }
    if (value > 720) { return 8; }
    if (value > 630) { return 7; }
    if (value > 540) { return 6; }
    if (value > 450) { return 5; }
    if (value > 360) { return 4; }
    if (value > 270) { return 3; }
    if (value > 180) { return 2; }
    if (value > 90) { return 1; }
    return 0;
}

function _computeSugarScore(value: number) {
    if (value > 45) { return 10; }
    if (value > 40) { return 9; }
    if (value > 36) { return 8; }
    if (value > 31) { return 7; }
    if (value > 27) { return 6; }
    if (value > 22.5) { return 5; }
    if (value > 18) { return 4; }
    if (value > 13.5) { return 3; }
    if (value > 9) { return 2; }
    if (value > 4.5) { return 1; }
    return 0;
}

function _computeSugarScoreForDrinks(value: number) {
    if (value <= 0) { return 0; }
    if (value <= 1.5) { return 1; }
    if (value <= 3) { return 2; }
    if (value <= 4.5) { return 3; }
    if (value <= 6) { return 4; }
    if (value <= 7.5) { return 5; }
    if (value <= 9) { return 6; }
    if (value <= 10.5) { return 7; }
    if (value <= 12) { return 8; }
    if (value <= 13.5) { return 9; }
    return 10;
}

function _saltToSodium(salt: number) {
    return (salt / 2.5) * 1000;
}


export default { computeNegativepoints };