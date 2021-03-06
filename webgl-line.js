function line (vertices,colorRGB){
        /*================Creating a canvas=================*/
        var canvas = document.getElementById('glcanvas');
        var gl = canvas.getContext('webgl'); 

        /*==========Defining and storing the geometry=======*/

        //Modifier les position x / y /  (diagonale) ??   et ajouter de nouvelle lignes, 2 point minimume pour créer 1 lignes
        
        /*
        var vertices = [
         -0.7,-0.1,0,
         -0.3,0.6,0,
         -0.3,-0.3,0,
         0.2,0.6,0,
         0.3,-0.3,0,
         0.7,0.6,0
        ];
        */

        // Create an empty buffer object to store the vertex buffer
        var vertex_buffer = gl.createBuffer();

        //Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /*=========================Shaders========================*/

        // vertex shader source code
        var vertCode =
           'attribute vec3 coordinates;' +

           'void main(void) {' +
              ' gl_Position = vec4(coordinates, 1.0);' +
              'gl_PointSize = 10.0;'+
           '}';
           //ici

        // Create a vertex shader object
        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        
        // Attach vertex shader source code
        gl.shaderSource(vertShader, vertCode);

        // Compile the vertex shader
        gl.compileShader(vertShader);

        // fragment shader source code
        var fragCode =
           'void main(void) {' +
              ' gl_FragColor = vec4('+colorRGB[0]+','+colorRGB[1]+','+colorRGB[2]+', '+colorRGB[3]+');' +
           '}';
           
        // Create fragment shader object
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        // Attach fragment shader source code
        gl.shaderSource(fragShader, fragCode);

        // Compile the fragmentt shader
        gl.compileShader(fragShader);
        
        // Create a shader program object to store
        // the combined shader program
        var shaderProgram = gl.createProgram();

        // Attach a vertex shader
        gl.attachShader(shaderProgram, vertShader); 

        // Attach a fragment shader
        gl.attachShader(shaderProgram, fragShader);

        // Link both programs
        gl.linkProgram(shaderProgram);

        // Use the combined shader program object
        gl.useProgram(shaderProgram);

        /*======== Associating shaders to buffer objects ========*/

        // Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        // Get the attribute location
        var coord = gl.getAttribLocation(shaderProgram, "coordinates");

        // Point an attribute to the currently bound VBO
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        // Enable the attribute
        gl.enableVertexAttribArray(coord);

        /*============= Drawing the primitive ===============*/

        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 0.9);

        // Enable the depth test
        gl.enable(gl.DEPTH_TEST);

        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Set the view port
        gl.viewport(0,0,canvas.width,canvas.height);

        // Draw the triangle
        gl.drawArrays(gl.LINES, 0, 6);  // 6 :  définir les point a dessiner 2 point minimume  pour 1 ligne 
}


//line();


export default{
   line
}

