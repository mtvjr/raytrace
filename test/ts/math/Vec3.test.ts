
import { Vec3 } from '../../../src/ts/math/Vec3';
import { Ok, unwrap } from '../../../src/ts/util/Result';


describe('Vec3', () => {
    it('Should construct in the form (x,y,z)', () =>{
        var vec = new Vec3([1, 2, 3])
        expect(vec.x).toBe(1);
        expect(vec.y).toBe(2);
        expect(vec.z).toBe(3);
    })

    it('Should support copying', () =>{
        var vec1 = new Vec3([1, 2, 3])
        var vec2 = new Vec3(vec1)
        expect(vec2.equals(vec1)).toBeTruthy();
    })

    it('Simple support equality via .equals()', () =>{
        var baseVec = new Vec3([1, 2, 3])
        var sameVec = new Vec3([1, 2, 3])
        expect(baseVec.equals(sameVec)).toBeTruthy()
        expect(sameVec.equals(baseVec)).toBeTruthy()

        var diffX = new Vec3([3, 2, 3])
        expect(baseVec.equals(diffX)).toBeFalsy()
        expect(diffX.equals(baseVec)).toBeFalsy()

        var diffY = new Vec3([1, 3, 3])
        expect(baseVec.equals(diffY)).toBeFalsy()
        expect(diffY.equals(baseVec)).toBeFalsy()

        var diffZ = new Vec3([1, 2, 4])
        expect(baseVec.equals(diffZ)).toBeFalsy()
        expect(diffZ.equals(baseVec)).toBeFalsy()
    })

    const scaled_tests: Array<[Vec3, number, Vec3]> = [
        [new Vec3([1,2,3])   , 1 , new Vec3([1,2,3])],
        [new Vec3([1,2,3])   , 2 , new Vec3([2,4,6])],
        [new Vec3([1,2,3])   , .5, new Vec3([.5,1.0,1.5])],
        [new Vec3([1,2,3])   , 0 , new Vec3([0,0,0])],
        [new Vec3([-1,-2,-3]), 1 , new Vec3([-1,-2,-3])],
        [new Vec3([-1,-2,-3]), 2 , new Vec3([-2,-4,-6])],
    ]
    it.each(scaled_tests)('%s when scaled by %d equals %s', (input, scaled_by, is) => {
        expect(input.scale(scaled_by)).toEqual(is);
    })

    it('Should produce a nice toString representation', () => {
        expect(new Vec3([1, 2, 3]).toString()).toMatch(/[1, ?2, ?3]/)
        expect(`${new Vec3([1, 2, 3])}`).toMatch(/[1, ?2, ?3]/)
    })

    it('Should be parseable from something like [1, 2, 3]', () => {
        expect(Vec3.parse("[1, 2, 3]")).toStrictEqual(Ok(new Vec3([1, 2, 3])));
        expect(Vec3.parse("[1,2,3]")).toStrictEqual(Ok(new Vec3([1, 2, 3])));
        expect(Vec3.parse("[    1,     2,     3]")).toStrictEqual(Ok(new Vec3([1, 2, 3])));
        expect(Vec3.parse("[1, 2, 3, 4]").ok).toBe(false)
        expect(Vec3.parse("[a, 2, 3]").ok).toBe(false)
    })
})
