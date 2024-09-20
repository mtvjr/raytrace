import { Vec3 } from "../math/Vec3";
import { RtObject, RtObjectConstructorArgs } from "./RtObject";

export type SphereConstructorArgs = RtObjectConstructorArgs & {
    radius?: number;
}

/**
 * Defines which values are used if attributes are missing
 * from the Sphere constructor arguments
 */
const SPHERE_DEFAULTS : SphereConstructorArgs = {
    radius: 1,
};

export class Sphere extends RtObject {
    radius!: number;

    constructor(args?: SphereConstructorArgs) {
        super(args)
        this.radius = args?.radius ?? SPHERE_DEFAULTS.radius;
    }

    /**
     * Get intersections of line and sphere.
     * Derived from https://stackoverflow.com/a/37225895
     * @param linePoint1 First point of a line
     * @param linePoint2 Second point of a line
     * @returns Array of line/spehere intersections
     */
    getCollisions(linePoint1: Vec3, linePoint2: Vec3): Array<Vec3> { // a line object would be cool
        const lineVector = {
            x: linePoint2.x - linePoint1.x,
            y: linePoint2.y - linePoint1.y,
            z: linePoint2.z - linePoint1.z
        };

        const lineToCenter = {
            x: linePoint1.x - this.position.x,
            y: linePoint1.y - this.position.y,
            z: linePoint1.z - this.position.z
        };

        const b = (lineVector.x * lineToCenter.x + lineVector.y * lineToCenter.y) * -2;
        const c = 2 * (lineVector.x * lineVector.x + lineVector.y * lineVector.y);
        const d = Math.sqrt(
            b * b - 2 * c
            * (lineToCenter.x * lineToCenter.x
                + lineToCenter.y * lineToCenter.y
                - this.radius * this.radius));

        // No intercept
        if(isNaN(d)){
            return [];
        }

        const u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        const u2 = (b + d) / c;
        let intersectingPoints = [];

        // First intersection point
        if(u1 <= 1 && u1 >= 0){
            intersectingPoints.push(new Vec3({
                x: linePoint1.x + lineVector.x * u1,
                y: linePoint1.y + lineVector.y * u1,
                z: linePoint1.z + lineVector.z * u1}));
        }

        // Second intersection point
        if(u2 <= 1 && u2 >= 0){
            const secondIntersectionPoint = new Vec3({
                x: linePoint1.x + lineVector.x * u2,
                y: linePoint1.y + lineVector.y * u2,
                z: linePoint1.z + lineVector.z * u2
            })

            if (!secondIntersectionPoint.equals(intersectingPoints[0])) {
                intersectingPoints.push(secondIntersectionPoint);
            }
        }

        return intersectingPoints;
    }
}
