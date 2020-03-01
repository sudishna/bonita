import Coordinates from "./model/coordinates";
import Canvas from "./helper/canvas";
import Rectangle from "./model/rectangle";
import {animateRotation} from "./helper/rotation";
import {getRandomColor} from "./helper/color";

class EventController {
    constructor() {
        this.coordinates = new Coordinates(0,0,1,1,-1)
        this.isMouseDown = false;
        this.tmpRect = null;
        this.color = null;
        this.canvas = new Canvas();
    }

    /**
     * Handle MouseEvent mousedown.
     *
     * @param e
     */
    mouseDown(e) {
        this.isMouseDown = true;

        this.coordinates.startX = e.offsetX;
        this.coordinates.startY = e.offsetY;

        this.coordinates = this.canvas.findSelectedRectangleIndex(this.coordinates);
        this.color = getRandomColor();
    }

    /**
     * Handle MouseEvent mouseUp.
     *
     */
    mouseUp() {
        if (this.coordinates.rectangleIndex === -1 && this.tmpRect !== null && !this.canvas.willOverlap(this.tmpRect)) {
            this.canvas.addRectangle(this.tmpRect);
        }

        this.canvas.reDraw();
        this.isMouseDown = false;
        this.coordinates.rectangleIndex = -1;
        this.tmpRect = null;
    }

    /**
     * Handle MouseEvent mouseMove.
     *
     * @param e
     */
    mouseMove(e) {
        if (this.isMouseDown && this.coordinates.rectangleIndex === -1) {
            this.coordinates.endX = e.offsetX;
            this.coordinates.endY = e.offsetY;
            this.canvas.reDraw();

            // drawing new rect on canvas
            this.tmpRect = new Rectangle(this.coordinates, this.color);
            this.canvas.drawRectangle(this.tmpRect);
        }
    }

    /**
     * Handle MouseEvent mouseOut.
     *
     */
    mouseOut() {
        this.tmpRect = null;
        this.isMouseDown = false;
    }

    /**
     * Handle MouseEvent doubleClick.
     *
     * @param e
     */
    doubleClick(e) {
        this.clickedCoordinate = new Coordinates(e.offsetX, e.offsetY, 0,0, -1);
        let clickedArea = this.canvas.findSelectedRectangleIndex(this.clickedCoordinate);

        if (clickedArea.rectangleIndex !== -1) {
            let selectedRectangle = this.canvas.getSelectedRectangle(clickedArea.rectangleIndex);
            animateRotation(this.canvas, selectedRectangle);
        }
    }
}

export default EventController;
