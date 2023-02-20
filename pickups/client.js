let pickupList = [];

addEventHandler("OnElementStreamIn", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PICKUP:
      pickupList.push(element.id);
      break;
  }
});

addEventHandler("OnElementStreamOut", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PICKUP:
      pickupList = pickupList.filter(id => id != element.id);
      break;
  }
});

addEventHandler("OnRender", () => {
  let ped = localClient.player;
  if (!ped)
    return;

  pickupList.forEach(id => {
    let vehicle = ped.vehicle;

    let pickup = getElement(id);
    switch (pickup.type) {
      case PICKUP_MINE_ARMED:
        if (!vehicle)
          break;

        if (vehicle.isSphereTouchingVehicle(pickup.position, 2.0))
          explosion.addExplosion(null, null, EXPLOSION_MINE, pickup.position, 0);

        break;
    }

    let isPickupTouched = false;
    if (Math.abs(ped.position.z - pickup.position.z) < 2.0) {
      if ((ped.position.x - pickup.position.x) * (ped.position.x - pickup.position.x) +
        (ped.position.y - pickup.position.y) * (ped.position.y - pickup.position.y) < 1.8)
        isPickupTouched = true;
    }

    if (!isPickupTouched)
      return;

    switch (pickup.model) {
      case 1319: // briefcase
        break;
      case 1361: // info
        break;
      case 1362: // health
        if (ped.health != 100) {
          ped.health = 100;
          audio.playFrontEndSound(SOUND_PICKUP_HEALTH);
        }
        break;
      case 1363: // adrenaline
        break;
      case 1364: // armour
        if (ped.armour != 100) {
          ped.armour = 100;
          audio.playFrontEndSound(SOUND_PICKUP_ARMOUR);
        }
        break;
      default:
        let wep = getWeaponForModel(pickup.model);
        if (wep != 0) {
          ped.giveWeapon(wep, 999);
          audio.playFrontEndSound(SOUND_PICKUP_WEAPON);
        }
        break;
    }
  });
});

function getWeaponForModel(model) {
  if (model == 1364) return WEAPONTYPE_ARMOUR;
  switch (model) {
    case 170: return WEAPONTYPE_GRENADE;
    case 171: return WEAPONTYPE_AK47;
    case 172: return WEAPONTYPE_BASEBALLBAT;
    case 173: return WEAPONTYPE_COLT45;
    case 174: return WEAPONTYPE_MOLOTOV;
    case 175: return WEAPONTYPE_ROCKETLAUNCHER;
    case 176: return WEAPONTYPE_SHOTGUN;
    case 177: return WEAPONTYPE_SNIPERRIFLE;
    case 178: return WEAPONTYPE_UZI;
    case 179: return WEAPONTYPE_UNARMED;
    case 180: return WEAPONTYPE_M16;
    case 181: return WEAPONTYPE_FLAMETHROWER;
  }
  return WEAPONTYPE_UNARMED;
}