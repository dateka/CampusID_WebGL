function render(image, width, height, Xaxis, Yaxis, Zaxis, Opacity) {
    // Get A WebGL context
    var canvas = document.getElementById("canvas");
    var gl = getWebGLContext(canvas);
    if (!gl) {
        return;
    }
    
    // setup GLSL program
    var program = createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
    gl.useProgram(program);
    
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    const alpha_u = gl.getUniformLocation(program, "alpha_u");

    // provide texture coordinates for the rectangle.
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,
        1.0,  1.0]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    
    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    // set opacity on the image
    // 1.0 = no opacity    0.0 = opacity 100%
    gl.uniform1f(alpha_u, Opacity);
    
    // set the resolution
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
    // Create a buffer for the position of the rectangle corners.
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    
    // Set a rectangle the same size as the image.
    setRectangle(gl, Xaxis, Yaxis, width, height, Zaxis);
    //          this is the depth, higher is farther ^^
    // NOTE: the same way that x and y can only be seen between -1 and 1, z also cannot 
    // be seen if greater than -1 and 1
    
    // in order for "things in front" to be drawn over "things behind", 
    // enable the depth test.
    gl.enable(gl.DEPTH_TEST); 
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_ALPHA); 

    // Draw the rectangle.
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function setRectangle(gl, x, y, width, height, z) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height; 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1, z,
        x2, y1, z,
        x1, y2, z,
        x1, y2, z,
        x2, y1, z,
        x2, y2, z]), gl.STATIC_DRAW);
    //          ^ added this column
}