import { D } from '~dice'
import { CustomFacesRollConfig } from '~faces'
import { Die } from '~src/types'

export class CustomD implements Die {
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

  roll(quantity = 1): string[] {
    return this.rollSpread(quantity)
  }

  rollSpread(quantity: number): string[] {
    return this.coreDie
      .rollSpread(quantity)
      .map((value) => this.faces[value - 1])
  }
}
