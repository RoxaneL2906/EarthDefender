export class Input {
  private static axisX: Direction = 0;
  private static fire: boolean = false;

  public static getAxisX() {
    return this.axisX;
  }

  public static isFiring(): boolean {
    return Input.fire;
  }

  public static listen() {
    // Key Down
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        // Go right
        case "KeyD":
        case "ArrowRight":
          Input.axisX = 1;
          break;
        // Go left
        case "KeyA":
        case "ArrowLeft":
          Input.axisX = -1;
          break;
        // Fire a laser
        case "Space":
          Input.fire = true;
          break;

        default:
          break;
      }
    });

    // Key Realeased
    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        // Player Stops
        case "KeyD":
        case "ArrowRight":
        case "KeyA":
        case "ArrowLeft":
          Input.axisX = 0;
          break;
        case "Space":
          Input.fire = false;
        default:
          break;
      }
    });
  }
}

type Direction = 0 | 1 | -1;
