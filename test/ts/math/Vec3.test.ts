
import { Vec3 } from '../../../src/ts/math/Vec3';


describe('Vec3', () => {
    it('Should construct in the form (x,y,z)', () =>{
        var vec = new Vec3(1, 2, 3)
        expect(vec.x).toBe(1);
        expect(vec.y).toBe(2);
        expect(vec.z).toBe(3);
    })

    it('Simple support equality via .equals()', () =>{
        var baseVec = new Vec3(1, 2, 3)
        var sameVec = new Vec3(1, 2, 3)
        expect(baseVec.equals(sameVec)).toBeTruthy()
        expect(sameVec.equals(baseVec)).toBeTruthy()

        var diffX = new Vec3(3, 2, 3)
        expect(baseVec.equals(diffX)).toBeFalsy()
        expect(diffX.equals(baseVec)).toBeFalsy()

        var diffY = new Vec3(1, 3, 3)
        expect(baseVec.equals(diffY)).toBeFalsy()
        expect(diffY.equals(baseVec)).toBeFalsy()

        var diffZ = new Vec3(1, 2, 4)
        expect(baseVec.equals(diffZ)).toBeFalsy()
        expect(diffZ.equals(baseVec)).toBeFalsy()
    })
    
    it('Should be able to scale accurately', () => {
        let factor = 30;
        var vec = new Vec3(1, 2, 3)
        var scaled = vec.scale(factor)
        expect(scaled.x).toBe(vec.x * factor);
        expect(scaled.y).toBe(vec.y * factor);
        expect(scaled.z).toBe(vec.z * factor);
    })

    it('Should produce a nice toString representation', () => {
        expect(new Vec3(1, 2, 3).toString()).toMatch(/[1, ?2, ?3]/)
        expect(`${new Vec3(1, 2, 3)}`).toMatch(/[1, ?2, ?3]/)
    })
})
