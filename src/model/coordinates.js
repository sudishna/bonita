/**
 * Class Coordinates
 * startX: mouse clicked start x coordinate
 * startY: mouse clicked start y coordinate
 * endX: mouse clicked end x coordinate
 * endY: mouse clicked end y coordinate
 * rectangleIndex: index of clicked rectangle, -1 if clicked on canvas itself
 */
class Coordinates {
    constructor(startX, startY, endX, endY, rectangleIndex) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.rectangleIndex = rectangleIndex;
    }
}

export default Coordinates;
