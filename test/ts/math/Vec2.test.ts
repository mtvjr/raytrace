
import { Vec2 } from '../../../src/ts/math/Vec2';


describe('Vec2', () => {
    it('Should construct in the form (x,y,z)', () =>{
        var vec = new Vec2([1, 2])
        expect(vec.x).toBe(1);
        expect(vec.y).toBe(2);
    })

    it('Should support copying', () =>{
        var vec1 = new Vec2([1, 2])
        var vec2 = new Vec2(vec1)
        expect(vec2.equals(vec1)).toBeTruthy();
    })

    it('Simple support equality via .equals()', () =>{
        var baseVec = new Vec2([1, 2])
        var sameVec = new Vec2([1, 2])
        expect(baseVec.equals(sameVec)).toBeTruthy()
        expect(sameVec.equals(baseVec)).toBeTruthy()

        var diffX = new Vec2([3, 2])
        expect(baseVec.equals(diffX)).toBeFalsy()
        expect(diffX.equals(baseVec)).toBeFalsy()

        var diffY = new Vec2([1, 3])
        expect(baseVec.equals(diffY)).toBeFalsy()
        expect(diffY.equals(baseVec)).toBeFalsy()
    })

    const scaled_tests: Array<[Vec2, number, Vec2]> = [
        [new Vec2([1,2])  , 1 , new Vec2([1,2])],
        [new Vec2([1,2])  , 2 , new Vec2([2,4])],
        [new Vec2([1,2])  , .5, new Vec2([.5,1.0])],
        [new Vec2([1,2])  , 0 , new Vec2([0,0])],
        [new Vec2([-1,-2]), 1 , new Vec2([-1,-2])],
        [new Vec2([-1,-2]), 2 , new Vec2([-2,-4])],
    ]
    it.each(scaled_tests)('%s when scaled by %d equals %s', (input, scaled_by, is) => {
        expect(input.scale(scaled_by)).toEqual(is);
    })

    it('Should produce a nice toString representation', () => {
        expect(new Vec2([1, 2]).toString()).toMatch(/[1, ?2, ?3]/)
        expect(`${new Vec2([1, 2])}`).toMatch(/[1, ?2, ?3]/)
    })
})
