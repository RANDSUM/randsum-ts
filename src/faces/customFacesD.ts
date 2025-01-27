import { resultToFaces } from './utils/resultToFaces'
import { CustomFacesRollConfig } from './types'
import { D } from '~dice'

export class CustomFacesD {
  public sides: number
  private coreDie: D
  public faces: string[]

  constructor(faces: string[]) {
    this.sides = faces.length
    this.faces = faces
    this.coreDie = new D(this.sides)
  }

  toRollConfig(): CustomFacesRollConfig {
    return {
      sides: this.sides,
      quantity: 1,
      faces: this.faces
    }
  }

  roll(): string {
    return resultToFaces(this.coreDie.roll(), this.faces)
  }

  rollMany(quantity: number): string[] {
    return this.coreDie
      .rollMany(quantity)
      .map((value) => resultToFaces(value, this.faces))
  }
}
