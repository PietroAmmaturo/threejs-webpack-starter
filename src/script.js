import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const torusGeometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const torusMaterial = new THREE.MeshStandardMaterial()
torusMaterial.color = new THREE.Color(0xffaa88)

// Mesh
const torus = new THREE.Mesh(torusGeometry,torusMaterial)
torus.castShadow = true; //default is false
torus.receiveShadow = true; //default is false
scene.add(torus)
//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.position.z = -10;
scene.add( plane );
// Lights
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 1
pointLight.position.y = 2
pointLight.position.z = 3
pointLight.castShadow = true; // default false
//Set up shadow properties for the light
pointLight.shadow.mapSize.width = 5120; // default
pointLight.shadow.mapSize.height = 5120; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500; // default
scene.add(pointLight)
//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( pointLight.shadow.camera );
scene.add( helper );
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torus.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()