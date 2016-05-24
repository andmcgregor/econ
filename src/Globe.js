import React from "react";
import THREE from "three";

// TODO shift to separate file
function Vertices(data) {

  THREE.Geometry.call(this);

  var uvData = [];

  for (var i = 0; i < data.vertices.length; i += 2) {
    var phi = +(90 - data.vertices[i + 1]) * (Math.PI / 180),
        the = +(180 - data.vertices[i]) * (Math.PI / 180);

    var x = Math.sin(the) * Math.sin(phi),
        y = Math.cos(the) * Math.sin(phi),
        z = Math.cos(phi);

    this.vertices.push(new THREE.Vector3(x, y, z));
    uvData.push(new THREE.Vector2(0.25 + data.vertices[i] / 360.0,
                                  0.5 + data.vertices[i + 1] / 180.0));
  }

  for (var i = 0; i < data.triangles.length; i += 3) {
    var a = data.triangles[i],
        b = data.triangles[i + 1],
        c = data.triangles[i + 2];

    this.faces.push(new THREE.Face3(a, b, c, [this.vertices[a], this.vertices[b], this.vertices[c]]));
    this.faceVertexUvs[0].push([uvData[a], uvData[b], uvData[c]]);
  }

  this.computeFaceNormals();
};

Vertices.prototype = Object.create(THREE.Geometry.prototype);

var Globe = React.createClass({
  init() {
    this.width = document.getElementById("scene").offsetWidth,
    this.height = document.getElementById("scene").offsetHeight;

    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    this.scene = new THREE.Scene();
    this.scene.rotation.x = Math.PI / 180.0 * 270.0;

    // add lights to scene

    var lights = [
      new THREE.DirectionalLight(0xffffff),
      new THREE.DirectionalLight(0xffffff),
      new THREE.DirectionalLight(0xffffff),
      new THREE.DirectionalLight(0xffffff)
    ];

    lights[0].position.set(1, 2, 2);
    lights[1].position.set(1, -2, -2);
    lights[2].position.set(2, -2, 1);
    lights[3].position.set(-2, 2, 1);

    for (var i = 0; i < lights.length; i++)
      this.scene.add(lights[i]);

    // add ocean to scene
    var geometry = new THREE.SphereGeometry(0.99, 56, 56);
    var material = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.initCountries();

    document.getElementById("scene").appendChild(this.renderer.domElement);
  },

  initCountries() {
    for (var i = 0; i < this.props.countries.length; i++) {
      var data = JSON.parse(this.props.countries[i].boundary);
      if (!data) continue;

      var geometry = new Vertices(data);
      var material = new THREE.MeshPhongMaterial({
        color: 0x7f8c8d,
        specular: 0x95a5a6,
        shininess: 20,
        shading: THREE.FlatShading
      });

      this.scene.add(new THREE.Mesh(geometry, material));
    }
  },

  animate() {
    requestAnimationFrame(this.animate);
    this.scene.rotation.z += 0.005;
    this.renderer.render(this.scene, this.camera);
  },

  componentDidMount() {
    this.init();
    this.animate();
  },

  render() {
    return <div className="globe" id="scene"></div>
  }
});

export default Globe;

