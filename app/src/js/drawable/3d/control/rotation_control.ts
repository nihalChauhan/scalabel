import * as THREE from 'three'
import { BLUE, GREEN, RED } from '../common'
import Label3D from '../label3d'
import { Controller } from './controller'
import { RotationRing } from './rotation_ring'

const ROTATION_AMOUNT = 0.1

/**
 * perform rotation ops
 */
export class RotationControl extends Controller {
  constructor (labels: Label3D[], bounds: THREE.Box3) {
    super(labels, bounds)
    this._controlUnits.push(
      new RotationRing(
        new THREE.Vector3(1, 0, 0),
        RED
      )
    )
    this._controlUnits.push(
      new RotationRing(
        new THREE.Vector3(0, 1, 0),
        GREEN
      )
    )
    this._controlUnits.push(
      new RotationRing(
        new THREE.Vector3(0, 0, 1),
        BLUE
      )
    )
    for (const unit of this._controlUnits) {
      this.add(unit)
    }
  }

  /** Apply pre-determined transformation amount based on camera direction */
  public transformDiscrete (
    moveDirection: THREE.Vector3,
    cameraDirection: THREE.Vector3
  ): void {
    const rotationAxis =
      (new THREE.Vector3()).crossVectors(moveDirection, cameraDirection)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromAxisAngle(rotationAxis, ROTATION_AMOUNT)
    for (const label of this._labels) {
      label.rotate(quaternion)
    }
  }
}
