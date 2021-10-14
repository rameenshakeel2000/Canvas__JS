// DRAWING CIRCLE
var canvas = new fabric.Canvas('c', { selection: false });

var circle, isDown, origX, origY;

canvas.on('mouse:down', function(o){
  isDown = true;
  var pointer = canvas.getPointer(o.e);
  origX = pointer.x;
  origY = pointer.y;
  circle = new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 1,
    strokeWidth: 5,
    stroke: 'red',
    selectable: false,
    originX: 'center', originY: 'center'
  });
  canvas.add(circle);
});

canvas.on('mouse:move', function(o){
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  circle.set({ radius: Math.abs(origX - pointer.x) });
  canvas.renderAll();
});

canvas.on('mouse:up', function(o){
  isDown = false;
});