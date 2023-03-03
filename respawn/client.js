const WBSTATE = {
  PLAYING: 0,
  WASTED: 1,
  ARRESTED: 2,
  FAILED_CRITICAL_MISSION: 3
};

let wbstate = WBSTATE.PLAYING;
let wbtime = 0;
addEventHandler("OnRender", () => {
  let ped = localClient.player;
  if (!ped)
    return;

  /* respawn logic */
  switch (wbstate) {
    case WBSTATE.PLAYING:
      if (ped.pedState == 49 /* PED_DEAD */) {
        wbstate = WBSTATE.WASTED;
        wbtime = timer.getTimeInMilliseconds();
      }
      else if (ped.pedState == 56 /* PED_ARRESTED */) {
        wbstate = WBSTATE.ARRESTED;
        wbtime = timer.getTimeInMilliseconds();
      }

      break;
    case WBSTATE.WASTED:
      if ((timer.getTimeInMilliseconds() - wbtime > 0x800) && (timer.getPreviousTimeInMilliseconds() - wbtime <= 0x800)) {
        camera.fade(new RGB(200, 200, 200, 255), 2.0, 0 /* FADE_OUT */);
      }

      if (timer.getTimeInMilliseconds() - wbtime >= 0x1000) {
        wbstate = WBSTATE.PLAYING;

        triggerEvent("OnPlayerSpawn");

        ped.clearWeapons();

        let pos = new Vector(796.0, -937.0, -100.0);
        let z = world.findGroundZForCoord(new Vector2D(pos.x, pos.y));
        pos.z = z;

        gta.respawnPlayer(pos, 0.0);

        camera.fade(new RGB(200, 200, 200, 255), 4.0, 1 /* FADE_IN */);
      }
      break;

    case WBSTATE.ARRESTED:
      break;
    case WBSTATE.FAILED_CRITICAL_MISSION:
      break;
    case 4: /* ??? */
      break;
  }
});