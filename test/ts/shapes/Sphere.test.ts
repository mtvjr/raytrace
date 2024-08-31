

import { Vec3 } from '../../../src/ts/math/Vec3'
import { Sphere } from '../../../src/ts/objects/Sphere'

describe('Shere::constructor', () => {

    it('Should work with an args object', () => {
        var sphere = new Sphere({
           "radius": 3,
           "position": new Vec3([1, 2, 3]),
        })
        expect(sphere.position.equals(new Vec3([1, 2, 3]))).toBeTruthy()
        expect(sphere.radius).toEqual(3)
    })

    it('Should have default arguments', () => {
        var sphere = new Sphere()
        expect(sphere.position).toBeDefined()
        expect(sphere.radius).toBeDefined()
    })
})

describe('Sphere::getCollisions', () => {
    it('Should accurately model a 2 intersection collision', () => {
        var sphere = new Sphere({
            position: {x: 2, y: 0, z: 0},
            radius: 1
        });

        var origin = new Vec3({x: 0, y: 0, z: 0});
        var ray = new Vec3({x: 1, y: 0, z: 0});

        // We expect collisions at [1, 0, 0] and [3, 0, 0]
        // which are at distances 1 and 3. Order does not matter.
        var collisions = sphere.getCollisions(origin, ray);
        expect(collisions.includes(1)).toBeTruthy()
        expect(collisions.includes(3)).toBeTruthy()
        expect(collisions.length).toBe(2);
    })

    it('Should accurately model a 1 intersection collision', () => {
        var spherePosition = new Vec3([2, 0, 0]);
        var sphereRadius = 1;
        var sphere = new Sphere({
            position: spherePosition,
            radius: sphereRadius
        });

        var origin = new Vec3({x: 0, y: 0, z: 0});
        var ray = origin.add(spherePosition).add(new Vec3([0, sphereRadius, 0]));

        // We expect collisions at [2, 2, 0]
        // which is at distance sqrt(2*2 + 1*1)
        const distance = ray.magnitude();
        var collisions = sphere.getCollisions(origin, ray);
        expect(collisions.includes(distance)).toBeTruthy()
        expect(collisions.length).toBe(1);
    })

    it('Should accurately model a 0 intersection collision', () => {
        var sphere = new Sphere({
            position: {x: 2, y: 0, z: 0},
            radius: 1
        });

        var origin = new Vec3({x: 0, y: 0, z: 0});
        var ray = new Vec3({x: 0, y: 2, z: 0}); // Aim orthoganal to the ray's position

        // We are aiming the ray to where the sphere isn't, expect 0 collisions
        var collisions = sphere.getCollisions(origin, ray);
        expect(collisions.length).toBe(0);
    })
})
