/* 
Paul Kaplan, @ifitdidntwork
 
Create an ASCII STL file from a THREE.js mesh 
that can be saved save from browser and 3D printed
--------------------------------------------------
See further explanation here:
http://buildaweso.me/project/2013/2/25/converting-threejs-objects-to-stl-files
--------------------------------------------------
Saving the file out of the browser is done using FileSaver.js
find that here: https://github.com/eligrey/FileSaver.js
*/
 
function stringifyVector(vec){
    var x, y, z;
    x = (vec.x).toExponential(5);
    y = (vec.y).toExponential(5);
    z = (vec.z).toExponential(5);
    return x+" "+y+" "+z;
  //return ""+vec.x.toExponential(5)+" "+vec.y.toExponential(5)+" "+vec.z.toExponential(5);
}

function stringifyVertex(vec){
  return "vertex "+stringifyVector(vec)+" \n";
}
 
// Given a THREE.Geometry, create an STL string
function generateSTL(geometry){
  var vertices = geometry.vertices;
  var tris     = geometry.faces;
 
  var stl = "solid model\n";
  for(var i = 0; i<tris.length; i++){
    stl += ("facet normal "+stringifyVector( tris[i].normal )+"\n");
    stl += ("outer loop\n");
    stl += stringifyVertex( vertices[ tris[i].a ]);
    stl += stringifyVertex( vertices[ tris[i].b ]);
    stl += stringifyVertex( vertices[ tris[i].c ]);
    stl += ("endloop\n");
    stl += ("endfacet\n");
  }
  stl += ("endsolid model\n");
 
  return stl
}
 
// Use FileSaver.js 'saveAs' function to save the string
saveSTL = function( geometry, name ){  
  var stlString = generateSTL( geometry );
  var blob = new Blob([stlString], {type: 'text/plain'});  
  saveAs(blob, name + '.stl');
  
}

/*
Create an ASCII STL file from a THREE.js mesh 
that can be saved save from browser and 3D printed
*/

/*
function saveSTL( geom, name ){
  var stl = generateSTL( geom );
  var blob = new Blob([stl], {type: 'text/plain'});
  saveAs(blob, 'vase02.stl');
  // saveAs(blob, name + '.stl'); 
}

function generateSTL(geom){
  THREE.GeometryUtils.triangulateQuads( geom );
  var vertices = geom.vertices;
  var tris     = geom.faces;

  stl = "solid pixel";
  for(var i = 0; i<tris.length; i++){
    stl += ("facet normal "+stringifyVector( tris[i].normal )+" \n");
    stl += ("outer loop \n");
    stl += stringifyVertex( vertices[ tris[i].a ] );
    stl += stringifyVertex( vertices[ tris[i].b ] );
    stl += stringifyVertex( vertices[ tris[i].c ] );
    stl += ("endloop \n");
    stl += ("endfacet \n");
  }
  stl += ("endsolid");

  return stl
}

function stringifyVector(vec){
  return ""+vec.x+" "+vec.y+" "+vec.z;
}

function stringifyVertex(vec){
  return "vertex "+stringifyVector(vec)+" \n";
}

function removeDuplicateFaces(geom){
  for(var i=0; i<geom.faces.length; i++){
    var tri = geom.faces[i];
    var inds = [tri.a, tri.b, tri.c, tri.d].sort();
    for(var j=0; j<i; j++){
      var tri_2 = geom.faces[j];
      if( tri_2 !== undefined ){
        var inds_2 = [tri_2.a, tri_2.b, tri_2.c, tri_2.d].sort();
        if( isSame( inds, inds_2 ) ){
          delete geom.faces[i];
          delete geom.faces[j];
        }
      }
    }
  }
  geom.faces = geom.faces.filter( function(a){ return a!==undefined });
  return geom;
}

function isSame(a1, a2){
  return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
}
*/