
const radToDeg = (r) => r * 180 / Math.PI;

class Camera {
  constructor() {
    this.enabled = false;
    this.position = new Vector3(0, 0, 0);
    this.target = new Vector3(0, 0, 0);
    this.yaw = 0.0;
    this.pitch = 0.0;
    this.speed = 0.5;

    this.movingForward = false;
    this.movingLeft = false;
    this.movingBackward = false;
    this.movingRight = false;
    this.rotatingUp = false;
    this.rotatingLeft = false;
    this.rotatingDown = false;
    this.rotatingRight = false;

    this.enable = () => {
      gta.disableControls(true);
      gta.hideHUD(true);

      this.position = localClient.player.position;
      this.pitch = 0;
      this.yaw = 0;

      console.log("Enable: " + this.position.x.toString() + " " + this.position.y.toString() + " " + this.position.z.toString());
      console.log("Enable: " + this.pitch.toString() + " " + this.yaw.toString());

      this.rotate(localClient.player.rotation, 0);

      this.enabled = true;
    }

    this.disable = () => {
      camera.restore(true);
      gta.hideHUD(false);
      gta.disableControls(false);

      this.enabled = false;
    }

    this.rotate = (horiz, vert) => {
      console.log("Rotate: " + horiz.toString() + " " + vert.toString());
      this.yaw += horiz;
      this.pitch += vert;

      this.target.x = this.position.x + Math.cos(parseFloat(this.pitch)) * Math.sin(parseFloat(this.yaw));
      this.target.y = this.position.y + Math.cos(parseFloat(this.pitch)) * Math.cos(parseFloat(this.yaw));
      this.target.z = this.position.z + Math.sin(parseFloat(this.pitch));
    }

    this.move = (dist) => {
      this.position.x -= dist * Math.cos(parseFloat(this.pitch)) * Math.sin(parseFloat(this.yaw));
      this.position.y -= dist * Math.cos(parseFloat(this.pitch)) * Math.cos(parseFloat(this.yaw));
      this.position.z -= dist * Math.sin(parseFloat(this.pitch));
      console.log("Move: " + this.position.x.toString() + " " + this.position.y.toString() + " " + this.position.z.toString());

      this.rotate(0, 0);
    }

    this.moveSideways = (dist) => {
      this.position.x -= dist * Math.cos(parseFloat(this.pitch)) * Math.sin(parseFloat(this.yaw) + Math.PI / 2);
      this.position.y -= dist * Math.cos(parseFloat(this.pitch)) * Math.cos(parseFloat(this.yaw) + Math.PI / 2);

      this.rotate(0, 0);
    }

    this.process = () => {
      console.log(this.position.x.toString() + " " + this.position.y.toString() + " " + this.position.z.toString());
      let moving = false;
      let camSpeed = this.speed;

      if (this.movingForward) {
        this.move(camSpeed);
        moving = true;
      }

      if (this.movingBackward) {
        this.move(-camSpeed);
        moving = true;
      }

      if (this.movingLeft) {
        this.moveSideways(-camSpeed);
        moving = true;
      }

      if (this.movingRight) {
        this.moveSideways(camSpeed);
        moving = true;
      }

      if (this.rotatingUp) {
        this.rotate(0, 0.1);
        moving = true;
      }

      if (this.rotatingDown) {
        this.rotate(0, -0.1);
        moving = true;
      }

      if (this.rotatingLeft) {
        this.rotate(-0.1, 0);
        moving = true;
      }

      if (this.rotatingRight) {
        this.rotate(0.1, 0);
        moving = true;
      }

      if (!moving)
        return;

      camera.setCameraMatrix(this.position, this.target, new Vector3(0, 0, 0));
    }
  }
};

const freeCam = new Camera(); 

addEventHandler("OnResourceStart", () => {
  bindKey(KEY_W);
  bindKey(KEY_A);
  bindKey(KEY_S);
  bindKey(KEY_D);
  bindKey(KEY_UP);
  bindKey(KEY_LEFT);
  bindKey(KEY_DOWN);
  bindKey(KEY_RIGHT);
});

addEventHandler("OnRender", () => {
  if (freeCam.enabled)
    freeCam.process();
});

addEventHandler("OnKeyDown", (key) => {
  switch (key) {
    case KEY_W:
      freeCam.movingForward = true;
      break;
    case KEY_A:
      freeCam.movingLeft = true;
      break;
    case KEY_S:
      freeCam.movingBackward = true;
      break;
    case KEY_D:
      freeCam.movingRight = true;
      break;
    case KEY_UP:
      freeCam.rotatingUp = true;
      break;
    case KEY_LEFT:
      freeCam.rotatingLeft = true;
      break;
    case KEY_DOWN:
      freeCam.rotatingDown = true;
      break;
    case KEY_RIGHT:
      freeCam.rotatingRight = true;
      break;
  }
});

addEventHandler("OnKeyUp", (key) => {
  switch (key) {
    case KEY_W:
      freeCam.movingForward = false;
      break;
    case KEY_A:
      freeCam.movingLeft = false;
      break;
    case KEY_S:
      freeCam.movingBackward = false;
      break;
    case KEY_D:
      freeCam.movingRight = false;
      break;
    case KEY_UP:
      freeCam.rotatingUp = false;
      break;
    case KEY_LEFT:
      freeCam.rotatingLeft = false;
      break;
    case KEY_DOWN:
      freeCam.rotatingDown = false;
      break;
    case KEY_RIGHT:
      freeCam.rotatingRight = false;
      break;
  }
});

addCommandHandler("freecam", (args) => {
  if (!freeCam.enabled)
    freeCam.enable();
  else
    freeCam.disable();
  message("freeCam: " + freeCam.enabled);
});

