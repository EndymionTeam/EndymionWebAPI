import { Action, Coordinates, PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnShapeLine extends BaseEntity {
    type: PrimitiveType = 'shape-line';
    private points: Coordinates[] = [{
        x: 0, y: 0, z: 0,
    }, {
        x: 10, y: 0, z: 0,
    }];

    private thickness: number = 1;
    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        super(commInterface, w);
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
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
               name: 'shape-line-create', payload: {
                    id: this.entity.id.toString(),
                    color: this.entity.color,
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

    build(): Action[] {
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
               name: 'shape-line-create', payload: {
                    id: this.entity.id.toString(),
                    color: this.entity.color,
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
        return super.build();
    }

}