

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

        // Two points of a line through the middle of the sphere
        var linePoint1 = new Vec3({x: 0, y: 0, z: 0});
        var linePoint2 = new Vec3({x: 5, y: 0, z: 0});

        var collisions = sphere.getCollisions(linePoint1, linePoint2);

        expect(collisions.length).toBe(2);

        const correctIntersection = [new Vec3({x: 1, y: 0, z: 0})];
        const incorrectIntersection = [new Vec3({x: 2, y: 0, z: 0})];
        expect(collisions).toEqual(expect.arrayContaining(correctIntersection));
        expect(collisions).not.toEqual(expect.arrayContaining(incorrectIntersection));

    })

    it('Should accurately model a 1 intersection collision', () => {
        var sphere = new Sphere({ // Sphere top at [2, 1, 0]
            position: new Vec3([2, 0, 0]),
            radius: 1
        });

        // Two points of a line tanget to top of sphere
        var linePoint1 = new Vec3({x: 0, y: 1, z: 0});
        var linePoint2 = new Vec3({x: 5, y: 1, z: 0});

        var collisions = sphere.getCollisions(linePoint1, linePoint2);

        expect(collisions.length).toBe(1);

        const correctIntersection = [new Vec3({x: 2, y: 1, z: 0})];
        const incorrectIntersection = [new Vec3({x: 1, y: 1, z: 0})];
        expect(collisions).toMatchObject(correctIntersection)
        expect(collisions).not.toMatchObject(incorrectIntersection)
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
