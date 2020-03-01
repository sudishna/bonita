/**
 * Class Canvas
 * Handles all methods related to canvas property
 */
class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");;
        this.context = this.canvas.getContext("2d");
        this.rectangles = [];
    }

    /**
     * Determine where the mouse is clicked
     * if mouse is clicked on the blank canvas then index = -1
     * else index value is selected rectangle's index
     *
     * @param clickedCoordinates
     * @returns {*}
     */
    findSelectedRectangleIndex(clickedCoordinates) {
        for (let i = 0; i < this.rectangles.length; i++) {
            let rect = this.rectangles[i];

            if (rect.x1 < clickedCoordinates.startX && clickedCoordinates.startX < rect.x2) {
                if (rect.y1 < clickedCoordinates.startY && clickedCoordinates.startY < rect.y2 ) {
                    clickedCoordinates.rectangleIndex = i;

                    return clickedCoordinates;
                }
            }
        }

        clickedCoordinates.rectangleIndex = -1;
        return clickedCoordinates;
    }

    /**
     * Calculate the corner's point of given rectangle
     * @param rectangle
     * @returns {{top: number, left: number, bottom: number, right: number}}
     */
    getRectangleCornerPoints(rectangle) {
        return {
            left:Math.min(rectangle.x1,rectangle.x2),
            right:Math.max(rectangle.x1,rectangle.x2),
            top:Math.min(rectangle.y1,rectangle.y2),
            bottom:Math.max(rectangle.y1,rectangle.y2)
        };
    }

    /**
     * Check if new drawn rectangle will overlap any existing rectangles
     * @param newRectangle
     * @returns {boolean}
     */
    willOverlap(newRectangle){
        let newRectPoints = this.getRectangleCornerPoints(newRectangle);
        for (let i = 0; i < this.rectangles.length; i++) {
            let retPoints =  this.getRectangleCornerPoints(this.rectangles[i]);

            let isIntersecting =  !(newRectPoints.left > retPoints.right ||
                newRectPoints.right < retPoints.left ||
                newRectPoints.top > retPoints.bottom ||
                newRectPoints.bottom < retPoints.top);

            if (isIntersecting) {
                return true;
            }
        }
        return false;
    }

    /**
     * Pushing new drawn rectangle to rectangles array list
     * @param rectangle
     */
    addRectangle(rectangle) {
        this.rectangles.push(rectangle);
    }

    /**
     * Get a rectangle from the rectangles array list
     * @param rectangleIndex
     */
    getSelectedRectangle(rectangleIndex) {
        return this.rectangles[rectangleIndex];
    }

    /**
     * Remove a rectangle from the rectangles array list
     * @param rectangleIndex
     */
    removedRectangle(rectangleIndex) {
        this.rectangles.splice(rectangleIndex,1);
    }

    /**
     * Clear the whole canvas
     * and draws all the rectangles form the list
     */
    reDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        for (let i = 0; i < this.rectangles.length; i++) {
            this.drawRectangle(this.rectangles[i]);
        }
    }

    /**
     * Draw a new rectangle on canvas
     * @param rectangle
     */
    drawRectangle(rectangle) {
        this.context.save();

        this.context.strokeStyle = rectangle.color;
        this.context.fillStyle = rectangle.color;
        this.context.fillRect(rectangle.x1, rectangle.y1, (rectangle.x2 - rectangle.x1), (rectangle.y2 - rectangle.y1));

        this.context.restore();
    }

    /**
     * Rotate the given rectangle
     * @param rectangle
     */
    rotateRectangle(rectangle) {
        this.reDraw();
        this.context.clearRect(rectangle.x1, rectangle.y1, (rectangle.x2 - rectangle.x1), (rectangle.y2 - rectangle.y1));
        this.context.save();

        rectangle.rotationAngle += 45;

        // Computing the rectangle's center point
        let xCenter = rectangle.x1 + (rectangle.x2 - rectangle.x1) * 0.5;
        let yCenter = rectangle.y1 + (rectangle.y2 - rectangle.y1) * 0.5;

        // Translating the canvas's center point to the rectangle's center point
        this.context.translate(xCenter, yCenter);
        this.context.rotate(rectangle.rotationAngle * Math.PI / 180);

        // Restoring the canvas's center point to original point
        this.context.translate(-xCenter, -yCenter);

        this.drawRectangle(rectangle);
        this.context.restore();
    }

    /**
     * Removing all the rectangles with rotationAngle > 360
     */
    removeRotatedRectangles(){
        for (let i = 0; i < this.rectangles.length; i++) {
            if (this.rectangles[i].rotationAngle > 360) {
                this.removedRectangle(i);
            }
        }
        this.reDraw();
    }
}

export default Canvas;
