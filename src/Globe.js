import React from "react";
import ReactDOM from "react-dom";
import THREE from "three";

import Instructions from "./Instructions";

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
    this.width = document.getElementById("globe").offsetWidth,
    this.height = document.getElementById("globe").offsetHeight;

    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0e141a, 1);

    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();

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
    var material = new THREE.MeshBasicMaterial({ color: 0x2980b9 });
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.countries = [];
    this.initCountries();

    document.getElementById("scene").appendChild(this.renderer.domElement);
  },

  initCountries() {
    for (var i = 0; i < this.props.countries.length; i++) {
      var data = JSON.parse(this.props.countries[i].boundary);
      if (!data) continue;

      var color = Math.random() * 0xFFFFFF << 0;

      var geometry = new Vertices(data);
      var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0xFFFFFF,
        shininess: 1,
        shading: THREE.FlatShading
      });

      var countryObj = new THREE.Object3D();

      countryObj.add(new THREE.Mesh(geometry, material));
      countryObj.name = this.props.countries[i].name;
      countryObj.code = this.props.countries[i].short_code;

      this.countries.push(countryObj);
      this.scene.add(countryObj);
    }
  },

  onInstructionsClosed() {
    window.addEventListener("click", this.handleClick);
  },

  animate() {
    requestAnimationFrame(this.animate);
    this.scene.rotation.z += 0.005;
    this.renderer.render(this.scene, this.camera);
  },

  handleResize(e) {
    this.width = document.getElementById("globe").offsetWidth,
    this.height = document.getElementById("globe").offsetHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  },

  handleClick(e) {
    this.mouseVector.x = 2 * (e.clientX / this.width) - 1;
    this.mouseVector.y = 1 - 2 * (e.clientY / this.height);

    this.raycaster.setFromCamera(this.mouseVector, this.camera);

    for (var i = 0; i < this.countries.length; i++) {
      var intersects = this.raycaster.intersectObjects(this.countries[i].children);

      for (var j = 0; j < intersects.length; j++) {
        console.log("selected", this.countries[i].name);
        return;
      }
    }
  },

  componentDidMount() {
    this.init();
    this.animate();
    window.addEventListener("resize", this.handleResize);

    ReactDOM.render(<Instructions onClose={this.onInstructionsClosed}/>, document.getElementById("instructions"));
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  render() {
    return <div>
             <div id="instructions"></div>
             <div id="scene"></div>
           </div>
  }
});

export default Globe;

