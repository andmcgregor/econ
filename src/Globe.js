import React from "react";
import THREE from "three";

var Globe = React.createClass({
  init() {
    console.log("Globe init");

    this.width = document.getElementById("globe").offsetWidth,
    this.height = document.getElementById("globe").offsetHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
    this.camera.position.z = 1000;

    this.geometry = new THREE.BoxGeometry(200, 200, 200);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    document.getElementById("globe").appendChild(this.renderer.domElement);
  },

  animate() {
    console.log("Globe animate");

    requestAnimationFrame(this.animate);

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  },

  componentDidMount() {
    this.init();
    this.animate();
  },

  render() {
    return <div className="globe" id="globe"></div>
  }
});

export default Globe;

