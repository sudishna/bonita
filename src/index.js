import EventController from "./eventController";
require('./styles/index.scss');

let eventController = new EventController();

$("#canvas").mousedown(function(e){
    eventController.mouseDown(e);
});

$("#canvas").mouseup(function(e){
    eventController.mouseUp();
});

$("#canvas").mousemove(function(e){
    eventController.mouseMove(e);
});

$("#canvas").mouseout(function(e){
    eventController.mouseOut();
});

$("#canvas").dblclick(function(e){
    eventController.doubleClick(e);
});
