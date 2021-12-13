import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

import earthMap from './textures/planets/earth_atmos_2048.jpg'
import moonMap from './textures/planets/moon_1024.jpg'
import earth_specular from '/textures/planets/earth_specular_2048.jpg'
import earth_normal from '/textures/planets/earth_normal_2048.jpg'

const earth_radius = 2.5
const moon_radius = 0.27

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 20
camera.lookAt(scene.position)


const axes = new THREE.AxesHelper(30)
// scene.add(axes)


const spotlight = new THREE.SpotLight(0xffffff)
spotlight.position.set(30, 20, 0)
scene.add(spotlight)

const spotLightHelper = new THREE.SpotLightHelper(spotlight)
// scene.add(spotLightHelper)

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
ambientLight.intensity = 3
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader()

const earthG = new THREE.SphereGeometry(earth_radius, 20, 20)
const earthM = new THREE.MeshPhongMaterial({
	map: textureLoader.load(earthMap),
	specularMap: textureLoader.load(earth_specular),
	normalMap: textureLoader.load(earth_normal)
})
const earth = new THREE.Mesh(earthG, earthM)
scene.add(earth)

const mooonG = new THREE.SphereGeometry(moon_radius, 20, 20)
const moonM = new THREE.MeshPhongMaterial({ map: textureLoader.load(moonMap) })
const moon = new THREE.Mesh(mooonG, moonM)
moon.position.set(-5, 0, 0)
scene.add(moon)

const earthDiv = document.createElement('div')
earthDiv.className = 'label'
earthDiv.textContent = 'Earth'
const earthLabel = new CSS2DObject(earthDiv)
earthLabel.position.set(0, earth_radius + 0.5, 0);
earth.add(earthLabel)

const moonDiv = document.createElement('div')
moonDiv.className = 'label'
moonDiv.textContent = 'Moon'
const moonLabel = new CSS2DObject(moonDiv)
moonLabel.position.set(0, moon_radius + 0.5, 0)
moon.add(moonLabel)

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)


const controls = new OrbitControls(camera, labelRenderer.domElement)

const clock = new THREE.Clock()


const animate = () => {
	const elapsed = clock.getElapsedTime()
	moon.position.set(5 * Math.sin(elapsed), 0, 5 * Math.cos(elapsed))
	earth.rotation.y = elapsed;
	controls.update();
	labelRenderer.render(scene, camera);
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
animate()
// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
window.onresize = () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	labelRenderer.setSize(window.innerWidth, window.innerHeight);
}