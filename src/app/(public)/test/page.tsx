'use client'

import { Canvas } from '@react-three/fiber'
import { animated, useSpring } from '@react-spring/three'
import { useRef } from 'react'

function Cube({...props}) {
  const meshRef = useRef<any>(null)

  


  return (
    <animated.mesh {...props}
      ref={meshRef}
      
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </animated.mesh>
  )
}

export default function Page() {
  

  const dragging = useRef(false)
  const last = useRef<[number, number]>([0, 0])
   const [{ rot }, api] = useSpring(() => ({
    rot: [0, 0, 0],
    config: { tension: 200, friction: 25 },
  }))

   const onPointerDown = (e: any) => {
    dragging.current = true
    last.current = [e.clientX, e.clientY]
    api.stop()
  }

  const onPointerMove = (e: any) => {
    if (!dragging.current) return

    const [lx, ly] = last.current
    const dx = e.clientX - lx
    const dy = e.clientY - ly
    last.current = [e.clientX, e.clientY]

    api.set({
      rot: [
        rot.get()[0] + dy * 0.01,
        rot.get()[1] + dx * 0.01,
        0,
      ],
     
    })
  }

  const onPointerUp = () => {
    dragging.current = false

    const [x, y] = rot.get()

    const snap = (v: number) =>
      Math.round(v / (Math.PI / 2)) * (Math.PI / 2)

    api.start({
      rot: [snap(x), snap(y), 0],
    })
  }
  
  return (
    <div className="w-screen h-screen">
      <Canvas  onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}   >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
     {/* <Cube rotation={rot}/> */}
     <mesh><torusKnotGeometry/> <meshNormalMaterial/></mesh>
      </Canvas>
    </div>
  )
}
