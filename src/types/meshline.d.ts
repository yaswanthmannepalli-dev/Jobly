declare module 'meshline' {
  import * as THREE from 'three';
  
  export class MeshLine extends THREE.BufferGeometry {}
  export class MeshLineMaterial extends THREE.Material {
    color: THREE.Color | string | number;
    depthTest: boolean;
    resolution: THREE.Vector2 | [number, number] | number[];
    useMap: boolean | number;
    map: THREE.Texture;
    repeat: THREE.Vector2 | [number, number] | number[];
    lineWidth: number;
  }
  export class MeshLineGeometry extends THREE.BufferGeometry {
    setPoints(points: THREE.Vector3[] | Float32Array | number[]): void;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineGeometry: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineMaterial: any;
    }
  }
}
