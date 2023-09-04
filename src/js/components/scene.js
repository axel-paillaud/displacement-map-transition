import GUI from 'lil-gui'
import { Renderer, Program, Color, Mesh, Triangle } from 'ogl'
import vertex from '@/js/glsl/main.vert'
import fragment from '@/js/glsl/main.frag'
import LoaderManager from '@/js/managers/LoaderManager'

class Scene {
  #renderer
  #mesh
  #program
  #guiObj = {
    offset: 1,
  }
  constructor() {
    this.setGUI()
    this.setScene()
    this.events()
  }

  setGUI() {
    const gui = new GUI()

    const handleChange = (value) => {
      this.#program.uniforms.uOffset.value = value
    }

    gui.add(this.#guiObj, 'offset', 0.5, 4).onChange(handleChange)
  }

  async setScene() {
    this.el = document.querySelector('.scene')
    const canvasEl = document.querySelector('.scene__container__canvas')
    this.#renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), canvas: canvasEl })
    const gl = this.#renderer.gl
    gl.clearColor(1, 1, 1, 1)

    this.handleResize()

    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)

    const geometry = new Triangle(gl)

    // To load files like textures, do :
    await LoaderManager.load(
      [
        {
          name: 'image-1',
          texture: './img/image-1.jpg',
        },
      ],
      gl
    )

    this.#program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uOffset: { value: this.#guiObj.offset },
        uTexture1: { value: LoaderManager.assets['image-1']},
      },
    })

    this.#mesh = new Mesh(gl, { geometry, program: this.#program })
  }

  events() {
    window.addEventListener('resize', this.handleResize, false)
    requestAnimationFrame(this.handleRAF)
  }

  handleResize = () => {
    this.#renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)
  }

  handleRAF = (t) => {
    requestAnimationFrame(this.handleRAF)

    this.#program.uniforms.uTime.value = t * 0.001

    // Don't need a camera if camera uniforms aren't required
    this.#renderer.render({ scene: this.#mesh })
  }
}

export default Scene
