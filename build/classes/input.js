var Input = /** @class */ (function () {
    function Input() {
    }
    Input.getAxisX = function () {
        return this.axisX;
    };
    Input.isFiring = function () {
        return Input.fire;
    };
    Input.listen = function () {
        // Key Down
        document.addEventListener("keydown", function (event) {
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
        document.addEventListener("keyup", function (event) {
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
    };
    Input.axisX = 0;
    Input.fire = false;
    return Input;
}());
export { Input };
