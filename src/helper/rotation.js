/**
 * Handle rotation animation using requestAnimationFrame
 * @param canvasObj
 * @param selectedRectangle
 */
export  function animateRotation(canvasObj, selectedRectangle) {
    canvasObj.rotateRectangle(selectedRectangle);

    if (selectedRectangle.rotationAngle <= 360) {
        setTimeout(function(){
            window.requestAnimationFrame(function () {
                animateRotation(canvasObj, selectedRectangle);
            });
        }, 400);
    } else {
        canvasObj.removeRotatedRectangles();
    }
}


