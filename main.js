import './style.css'
import * as THREE from 'three'
import earthMap from './textures/planets/earth_atmos_2048.jpg'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const earth_radius = 2.5
const moon_radius = 0.27

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
camera.position.x = 30
camera.position.y = 30
camera.position.z = 40
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const axes = new THREE.AxesHelper(30)
scene.add(axes)

const controls = new OrbitControls(camera,renderer.domElement)


const spotlight = new THREE.SpotLight(0xffffff)
spotlight.position.set(30,20,0)
scene.add(spotlight)

const spotLightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotLightHelper)

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
ambientLight.intensity = 3
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader()

const earthG = new THREE.SphereGeometry(earth_radius, 20, 20)
const earthM = new THREE.MeshPhongMaterial({ color: 0xfffff, map: textureLoader.load(earthMap) })
const earth = new THREE.Mesh(earthG, earthM)
scene.add(earth)

renderer.render(scene, camera)
controls.update()
function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
animate()
// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
