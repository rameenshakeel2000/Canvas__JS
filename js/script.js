// DRAWING RECTANGLE
var Rectangle = (function () {
    function Rectangle(canvas) {
        var inst=this;
        this.canvas = canvas;
        this.className= 'Rectangle';
        this.isDrawing = false;
        this.bindEvents();
    }

	 Rectangle.prototype.bindEvents = function() {
    var inst = this;
    inst.canvas.on('mouse:down', function(o) {
      inst.onMouseDown(o);
    });
    inst.canvas.on('mouse:move', function(o) {
      inst.onMouseMove(o);
    });
    inst.canvas.on('mouse:up', function(o) {
      inst.onMouseUp(o);
    });
    inst.canvas.on('object:moving', function(o) {
      inst.disable();
    })
  }
    Rectangle.prototype.onMouseUp = function (o) {
      var inst = this;
      inst.disable();
    };

    Rectangle.prototype.onMouseMove = function (o) {
      var inst = this;
      

      if(!inst.isEnable()){ return; }
      console.log("mouse move rectange");
      var pointer = inst.canvas.getPointer(o.e);
      var activeObj = inst.canvas.getActiveObject();

      activeObj.stroke= 'red',
      activeObj.strokeWidth= 5;
      activeObj.fill = 'transparent';

      if(origX > pointer.x){
          activeObj.set({ left: Math.abs(pointer.x) }); 
      }
      if(origY > pointer.y){
          activeObj.set({ top: Math.abs(pointer.y) });
      }

      activeObj.set({ width: Math.abs(origX - pointer.x) });
      activeObj.set({ height: Math.abs(origY - pointer.y) });

      activeObj.setCoords();
      inst.canvas.renderAll();

    };

    Rectangle.prototype.onMouseDown = function (o) {
      var inst = this;
      inst.enable();

      var pointer = inst.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      
    	var rect = new fabric.Rect({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          width: pointer.x-origX,
          height: pointer.y-origY,
          angle: 0,
          transparentCorners: false,
          hasBorders: false,
          hasControls: false
      });
  	  inst.canvas.add(rect).setActiveObject(rect);
    };
    Rectangle.prototype.isEnable = function(){
      return this.isDrawing;
    }
    Rectangle.prototype.enable = function(){
      this.isDrawing = true;
    }
    Rectangle.prototype.disable = function(){
      this.isDrawing = false;
    }
    return Rectangle;
}());

var canvas = new fabric.Canvas('canvas');
var arrow = new Rectangle(canvas);



