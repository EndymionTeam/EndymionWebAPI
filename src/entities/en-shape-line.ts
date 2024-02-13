import { Coordinates, PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-primitive";

export class EnShapeLine extends BaseEntity {
    type: PrimitiveType = 'shape-line';
    private points: Coordinates[] = [{
        x: 0, y: 0, z: 0,
    }, {
        x: 10, y: 0, z: 0,
    }];

    private thickness: number = 1;
    constructor() {
        super();
        this.entity.primitive = this.type;
    }
    setPoints(points: Coordinates[]): EnShapeLine {
        this.points = points;
        return this;
    }
    addPoint(point: Coordinates): EnShapeLine {
        this.points.push(point);
        return this;
    }
    setThickness(thickness: number): EnShapeLine {
        this.thickness = thickness;
        return this;
    }
    create(): EnShapeLine {
        this.entity.id = this.id;
        this.actions = [
            {
                api: '2', name: 'shape-line-create', payload: {
                    id: this.entity.id.toString(),
                    color: this.color,
                    thickness: this.thickness,
                    points: this.points,
                    transform: {
                        position: this.entity.position,
                        rotation: this.entity.rotation,
                        scale: this.entity.scale
                    }
                }
            },
        ]
        super.create();
        return this;
    }

}