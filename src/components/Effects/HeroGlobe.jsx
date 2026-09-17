import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

extend({ Line_: THREE.Line })

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
                const mid = new THREE.Vector3().addVectors(points[i], points[j]).multiplyScalar(0.5)
                mid.normalize().multiplyScalar(mid.length() * 1.15)
                const curve = new THREE.QuadraticBezierCurve3(points[i], mid, points[j])
                arcs.push(curve)
            }
        }
    }
    return arcs
}

// Dots on the globe surface — static, no per-frame updates
function GlobeDots({ points }) {
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Set positions once, no animation needed
    useEffect(() => {
        if (!meshRef.current) return
        for (let i = 0; i < points.length; i++) {
            dummy.position.copy(points[i])
            dummy.scale.setScalar(1)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [points, dummy])

    return (
        <instancedMesh ref={meshRef} args={[null, null, points.length]}>
            <sphereGeometry args={[0.018, 4, 4]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
        </instancedMesh>
    )
}

// Arc connections — static geometry, no per-frame updates
function GlobeArcs({ arcs }) {
    const geometries = useMemo(() => {
        return arcs.map(curve => {
            const curvePoints = curve.getPoints(16)
            return new THREE.BufferGeometry().setFromPoints(curvePoints)
        })
    }, [arcs])

    return (
        <group>
            {geometries.map((geometry, i) => (
                <line_
                    key={i}
                    geometry={geometry}
                >
                    <lineBasicMaterial
                        color="#818cf8"
                        transparent
                        opacity={0.15}
                    />
                </line_>
            ))}
        </group>
    )
}

// Glowing highlight dots — static
function GlowDots({ points }) {
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const glowPoints = useMemo(() => {
        const selected = []
        for (let i = 0; i < points.length; i += 10) {
            selected.push(points[i])
        }
        return selected
    }, [points])

    useEffect(() => {
        if (!meshRef.current) return
        for (let i = 0; i < glowPoints.length; i++) {
            dummy.position.copy(glowPoints[i])
            dummy.scale.setScalar(1.8)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [glowPoints, dummy])

    return (
        <instancedMesh ref={meshRef} args={[null, null, glowPoints.length]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#a5b4fc" transparent opacity={0.5} />
        </instancedMesh>
    )
}

// Main rotating globe — only rotation is animated
function Globe() {
    const groupRef = useRef()

    const { points, arcs } = useMemo(() => {
        const pts = generateSpherePoints(200, 2)
        const arcsData = generateArcs(pts, 1.2, 50)
        return { points: pts, arcs: arcsData }
    }, [])

    useFrame((state, delta) => {
        if (!groupRef.current) return
        // Only animate rotation — very cheap
        groupRef.current.rotation.y += delta * 0.08
    })

    return (
        <group ref={groupRef} rotation={[0.3, 0, 0.1]}>
            {/* Wireframe sphere */}
            <mesh>
                <sphereGeometry args={[1.98, 24, 24]} />
                <meshBasicMaterial
                    color="#6366f1"
                    wireframe
                    transparent
                    opacity={0.03}
                />
            </mesh>

            <GlobeDots points={points} />
            <GlobeArcs arcs={arcs} />
            <GlowDots points={points} />

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[1.9, 16, 16]} />
                <meshBasicMaterial
                    color="#4f46e5"
                    transparent
                    opacity={0.02}
                />
            </mesh>
        </group>
    )
}

// Main exported component with visibility-based rendering
const HeroGlobe = () => {
    const containerRef = useRef()
    const [isVisible, setIsVisible] = useState(true)

    // Pause rendering when not in viewport
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.05 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ minHeight: '400px' }}
        >
            <Canvas
                frameloop={isVisible ? 'always' : 'never'}
                camera={{ position: [0, 0, 5.5], fov: 40 }}
                dpr={[1, 1.5]}
                resize={{ scroll: false }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false
                }}
                style={{ background: 'transparent' }}
            >
                <Globe />
            </Canvas>
        </div>
    )
}

export default HeroGlobe
