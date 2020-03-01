/**
 * Class Rectangle
 * Rectangle properties
 * x1 = rectangle's start x coordinate
 * y1 = rectangle's start y coordinate
 * x2 = rectangle's end x coordinate
 * y2 = rectangle's end x coordinate
 * color = rectangle's color
 * rotationAngle = rectangle's rotation angle. Default value 0;
 */
class Rectangle {
    constructor(coordinate, color) {
        this.x1 = coordinate.startX;
        this.y1 = coordinate.startY;
        this.x2 = coordinate.endX;
        this.y2 = coordinate.endY;
        this.color = color;
        this.rotationAngle = 0;
    }
}

export default Rectangle;
