
import INutriscoreParams from '../types/INutriscoreParams';
import fetch from 'node-fetch';
import nutriscoreService from '../src/index';
import { Modifier } from '../types/Modifier';

describe('acceptance', () => {
    describe('solid_foods', () => {
        it('should return the same result as the server', async () => {
            await _test(Modifier.REGULAR);
            await _test(Modifier.REGULAR);
            await _test(Modifier.REGULAR);
            await _test(Modifier.REGULAR);
            await _test(Modifier.REGULAR);
        })
    });

    describe('cheese', () => {
        it('should return the same result as the server', async () => {
            await _test(Modifier.CHEESE);
            await _test(Modifier.CHEESE);
            await _test(Modifier.CHEESE);
            await _test(Modifier.CHEESE);
            await _test(Modifier.CHEESE);
        })
    });

    describe('drink', () => {
        it('should return the same result as the server', async () => {
            await _test(Modifier.DRINK);
            await _test(Modifier.DRINK);
            await _test(Modifier.DRINK);
            await _test(Modifier.DRINK);
            await _test(Modifier.DRINK);
        });
    });

    describe('fat', () => {
        it('should return the same result as the server', async () => {
            jest.setTimeout(1000000000);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
            await _test(Modifier.FAT);
        });

        it('case 0', async () => {
            const params = {
                energy: 1838,
                fibre: 0,
                totalFat: 10,
                saturatedFat: 4,
                vegetableFruitNuts: 93,
                sugar: 36,
                salt: 533,
                protein: 9
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 1 ', async () => {
            const params = {
                energy: 3225, fibre: 3, totalFat: 41, saturatedFat: 9, vegetableFruitNuts: 76, sugar: 4, salt: 267, protein: 8
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 2 ', async () => {
            const params = {
                energy: 3075, fibre: 4, totalFat: 20, saturatedFat: 2, vegetableFruitNuts: 33, sugar: 45, salt: 490, protein: 1,
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 3 ', async () => {
            const params = {
                energy: 4947, fibre: 1, totalFat: 41, saturatedFat: 9, vegetableFruitNuts: 79, sugar: 23, salt: 372, protein: 2
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 4 ', async () => {
            const params = {
                energy: 1662, fibre: 4, totalFat: 42, saturatedFat: 4, vegetableFruitNuts: 16, sugar: 46, salt: 236, protein: 5
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 5 ', async () => {
            const params = {
                energy: 2277, fibre: 4, totalFat: 44, saturatedFat: 7, vegetableFruitNuts: 61, sugar: 22, salt: 282, protein: 5
            };
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 6 ', async () => {
            const params = {
                energy: 220, fibre: 1, totalFat: 0, saturatedFat: 0, vegetableFruitNuts: 0, sugar: 38, salt: 901, protein: 8
            }
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        it('case 7 ', async () => {
            const params = {
                energy: 3401, fibre: 0, totalFat: 0, saturatedFat: 9, vegetableFruitNuts: 47, sugar: 23, salt: 335, protein: 7
            }
            const actual = nutriscoreService.computeScore(params, Modifier.FAT);
            const expected = await _getOriginal(params, Modifier.FAT);
            expect(actual).toEqual(expected);
        });

        // 

    });
});


async function _test(type: Modifier) {
    const params = _generateParams();
    const actual = nutriscoreService.computeScore(params, type);
    const expected = await _getOriginal(params, type);
    if (actual !== expected) {
        throw new Error(`Expected: ${expected} but got ${actual} with params ${JSON.stringify(params)}`);
    }
    // expect(actual).toEqual(expected );
    // return params;
}



function _generateParams(): INutriscoreParams {
    return {
        energy: _randomNumber(5000),
        fibre: _randomNumber(5),
        totalFat: _randomNumber(50),
        saturatedFat: _randomNumber(11),
        vegetableFruitNuts: _randomNumber(100),
        sugar: _randomNumber(50),
        salt: _randomNumber(1000),
        protein: _randomNumber(10)
    }
}


function _randomNumber(limit: number): number {
    return Math.floor(Math.random() * limit) + 0;
}


async function _getOriginal(params: any, modifier: Modifier) {
    switch (modifier) {
        case Modifier.REGULAR:
            params.category = 'solid_foods';
            break;
        case Modifier.CHEESE:
            params.category = 'cheese';
            break;
        case Modifier.DRINK:
            params.category = 'beverages';
            break;
        case Modifier.FAT:
            params.category = 'added_fats';
            break;
        default:
            break;
    }

    const raw = await fetch('https://swf-api.integratedfoodplatform.com/v3/nutriscore/calculate/?client_id=1012e6ea31c54bf5b47e2d4776c2efe0&client_secret=f46d6380571447899256602f7b7b6eb0',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
            },
            body: JSON.stringify(params)
        }
    );
    const response = await raw.json();
    return response.points;
}