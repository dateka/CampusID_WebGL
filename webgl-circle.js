
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  

function drawCircle(positions,colorRGB){

    var canvas = document.getElementById("glcanvas");
    var gl = canvas.getContext("webgl");
 
    
    
    var vertexShaderNode = `
    uniform vec2 u_resolution;
    attribute vec2 a_position;
    attribute vec2 a_center;
    attribute float a_radius;
  
    varying vec2 center;
    varying vec2 resolution;
    varying float radius;
     
    void main() {
      vec2 clipspace = a_position / u_resolution * 2.0 - 1.0;
      gl_Position = vec4(clipspace * vec2(1, -1), 0, 1);
  
      radius = a_radius;
      center = a_center;
      resolution = u_resolution;
    }`//createShaderFromScriptElement(gl, "node-vertex-shader");
    var fragmentShaderNode = `
    precision mediump float;
 
    varying vec2 center;
    varying vec2 resolution;
    varying float radius;
  
    void main() {
      vec4 color0 = vec4(0.00, 0.0, 0.0, 0.0);
  
      float x = gl_FragCoord.x;
      float y = resolution[1] - gl_FragCoord.y;
  
      float dx = center[0] - x;
      float dy = center[1] - y;
      float distance = sqrt(dx*dx + dy*dy);
  
      if ( distance < radius )
        gl_FragColor = vec4(`+colorRGB[0]+`,`+colorRGB[1]+`,`+colorRGB[2]+`, `+colorRGB[3]+`);
      else 
        gl_FragColor = color0;
  
    }`//createShaderFromScriptElement(gl, "node-fragment-shader");
    
    
    // Create the shader program
 
 
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderNode);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderNode);
  
 
   const programNode = gl.createProgram();
   gl.attachShader(programNode, vertexShader);
   gl.attachShader(programNode, fragmentShader);
   gl.linkProgram(programNode);
    
   if (!gl.getProgramParameter(programNode, gl.LINK_STATUS)) {
     alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
     return null;
   } 
 
    // var programNode = createProgram(gl, [vertexShaderNode, fragmentShaderNode]);
    gl.useProgram(programNode);
     
     
    var ATTRIBUTES = 5;
    var j = 0;
    var data = [];
    var circle = {x:positions[0], y:positions[1], r:positions[2]};
 
    data[j++] = (circle.x - circle.r);
    data[j++] = (circle.y - circle.r);
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = circle.r;
 
    data[j++] = (circle.x + (1 + Math.sqrt(2)) * circle.r);
    data[j++] = circle.y - circle.r;
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = circle.r;
 
    data[j++] = (circle.x - circle.r);
    data[j++] = (circle.y + (1 + Math.sqrt(2)) * circle.r);
    data[j++] = circle.x;
    data[j++] = circle.y;
    data[j++] = circle.r;
 
    var dataBuffer = new Float32Array(data);
  
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,  dataBuffer,  gl.STATIC_DRAW);
 
    var resolutionLocation = gl.getUniformLocation(programNode, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
 
    var positionLocation = gl.getAttribLocation(programNode, "a_position");
    var centerLocation = gl.getAttribLocation(programNode, "a_center");
    var radiusLocation = gl.getAttribLocation(programNode, "a_radius");
 
    
    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(centerLocation);
    gl.enableVertexAttribArray(radiusLocation);
 
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(centerLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
    gl.vertexAttribPointer(radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
 
    gl.drawArrays(gl.TRIANGLES, 0, data.length/ATTRIBUTES);
 
 }


 //drawCircle();
 
 export default{
  drawCircle
}