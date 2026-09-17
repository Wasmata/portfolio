import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Generate points on a sphere using fibonacci sphere algorithm
function generateSpherePoints(count, radius) {
    const points = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * i / goldenRatio
        const phi = Math.acos(1 - 2 * (i + 0.5) / count)

        points.push(new THREE.Vector3(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi)
        ))
    }
    return points
}

// Generate arc connections between nearby points
function generateArcs(points, maxDistance, arcCount) {
    const arcs = []
    const used = new Set()

    for (let i = 0; i < points.length && arcs.length < arcCount; i++) {
        for (let j = i + 1; j < points.length && arcs.length < arcCount; j++) {
            const key = `${i}-${j}`
            if (used.has(key)) continue

            const dist = points[i].distanceTo(points[j])
            if (dist < maxDistance && dist > maxDistance * 0.3) {
                used.add(key)

                // Create curved arc between two points
                const mid = new THREE.Vector3().addVectors(points[i], points[j]).multiplyScalar(0.5)
                mid.normalize().multiplyScalar(mid.length() * 1.15) // Push outward for curve

                const curve = new THREE.QuadraticBezierCurve3(points[i], mid, points[j])
                arcs.push(curve)
            }
        }
    }
    return arcs
}

// Dots on the globe surface
function GlobeDots({ points, mouse }) {
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const basePositions = useMemo(() => points.map(p => p.clone()), [points])

    useFrame(() => {
        if (!meshRef.current) return

        for (let i = 0; i < points.length; i++) {
            const p = basePositions[i]
            dummy.position.copy(p)

            // Subtle pulse based on position
            const scale = 0.8 + Math.sin(Date.now() * 0.001 + i * 0.5) * 0.2
            dummy.scale.setScalar(scale)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, points.length]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.7} />
        </instancedMesh>
    )
}

// Animated arcs (connections between dots)
function GlobeArcs({ arcs }) {
    const linesRef = useRef([])

    useFrame(() => {
        linesRef.current.forEach((line, i) => {
            if (line && line.material) {
                // Subtle opacity animation
                line.material.opacity = 0.15 + Math.sin(Date.now() * 0.0015 + i * 0.8) * 0.1
            }
        })
    })

    return (
        <group>
            {arcs.map((curve, i) => {
                const curvePoints = curve.getPoints(32)
                const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

                return (
                    <line_
                        key={i}
                        ref={el => { linesRef.current[i] = el }}
                        geometry={geometry}
                    >
                        <lineBasicMaterial
                            color="#818cf8"
                            transparent
                            opacity={0.2}
                            linewidth={1}
                        />
                    </line_>
                )
            })}
        </group>
    )
}

// Glowing highlight dots (fewer, brighter)
function GlowDots({ points }) {
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Select a subset of points for glow effect
    const glowPoints = useMemo(() => {
        const selected = []
        for (let i = 0; i < points.length; i += 7) {
            selected.push(points[i])
        }
        return selected
    }, [points])

    useFrame(() => {
        if (!meshRef.current) return

        for (let i = 0; i < glowPoints.length; i++) {
            dummy.position.copy(glowPoints[i])
            const scale = 1.5 + Math.sin(Date.now() * 0.002 + i * 2) * 0.8
            dummy.scale.setScalar(scale)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, glowPoints.length]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#a5b4fc" transparent opacity={0.6} />
        </instancedMesh>
    )
}

// Main rotating globe group
function Globe() {
    const groupRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })

    const { points, arcs } = useMemo(() => {
        const pts = generateSpherePoints(300, 2)
        const arcsData = generateArcs(pts, 1.2, 80)
        return { points: pts, arcs: arcsData }
    }, [])

    const handlePointerMove = useCallback((e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }, [])

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Slow auto-rotation
        groupRef.current.rotation.y += delta * 0.08

        // Subtle tilt toward mouse
        const targetX = mouseRef.current.y * 0.15
        const targetZ = mouseRef.current.x * 0.1
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02
        groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.02
    })

    return (
        <group ref={groupRef} onPointerMove={handlePointerMove}>
            {/* Wireframe sphere for structure */}
            <mesh>
                <sphereGeometry args={[1.98, 32, 32]} />
                <meshBasicMaterial
                    color="#6366f1"
                    wireframe
                    transparent
                    opacity={0.03}
                />
            </mesh>

            {/* Globe dots */}
            <GlobeDots points={points} mouse={mouseRef} />

            {/* Arc connections */}
            <GlobeArcs arcs={arcs} />

            {/* Glow highlights */}
            <GlowDots points={points} />

            {/* Inner glow sphere */}
            <mesh>
                <sphereGeometry args={[1.9, 32, 32]} />
                <meshBasicMaterial
                    color="#4f46e5"
                    transparent
                    opacity={0.02}
                />
            </mesh>
        </group>
    )
}

// Main exported component
const HeroGlobe = () => {
    return (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <Globe />
            </Canvas>
        </div>
    )
}

export default HeroGlobe
