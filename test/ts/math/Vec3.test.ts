
import { Vec3, Vec3ConstructorArgs } from '../../../src/ts/math/Vec3';


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

    const magnitude_tests: Array<[Vec3ConstructorArgs, number]> = [
        // Vec  ,  mangitude
        [[1,2,3], Math.sqrt(1*1 + 2*2 + 3*3)],
        [[2,2,2], Math.sqrt(2*2 + 2*2 + 2*2)],
        [[0,0,0], 0],
    ]
    it.each(magnitude_tests)('%s.magnitude() equals %s', (vec, mangitude) => {
        expect(new Vec3(vec).magnitude()).toBe(mangitude)
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

    const minus_tests: Array<[Vec3ConstructorArgs, Vec3ConstructorArgs, Vec3ConstructorArgs]> = [
        // lhs  ,  rhs     , expected
        [[1,2,3], [0, 0, 0], [1,2,3]],
        [[1,2,3], [1, 1, 1], [0,1,2]],
    ]
    it.each(minus_tests)('%s.minus(%s) equals %s', (lhs, rhs, expected) => {
        expect(new Vec3(lhs).minus(new Vec3(rhs))).toStrictEqual(new Vec3(expected))
    })

    it('Should produce a nice toString representation', () => {
        expect(new Vec3([1, 2, 3]).toString()).toMatch(/[1, ?2, ?3]/)
        expect(`${new Vec3([1, 2, 3])}`).toMatch(/[1, ?2, ?3]/)
    })
})
