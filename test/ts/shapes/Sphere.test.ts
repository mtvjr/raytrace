

import { Vec3 } from '../../../src/ts/math/Vec3'
import { Sphere } from '../../../src/ts/shapes/Sphere'

describe('Shere', () => {

    it('Should be constructable from args object', () => {
        var sphere = new Sphere({
           "radius": 3,
           "position": new Vec3([1, 2, 3]),
        })
        expect(sphere.position.equals(new Vec3([1, 2, 3]))).toBeTruthy
        expect(sphere.radius).toEqual(3)
    })

    it('Should have default arguments', () => {
        var sphere = new Sphere()
        expect(sphere.position).toBeDefined()
        expect(sphere.radius).toBeDefined()
    })
})
