
const WEAPONTYPE = {
  UNARMED: 0,
  BASEBALLBAT: 1,
  COLT45: 2,
  UZI: 3,
  SHOTGUN: 4,
  AK47: 5,
  M16: 6,
  SNIPERRIFLE: 7,
  ROCKETLAUNCHER: 8,
  FLAMETHROWER: 9,
  MOLOTOV: 10,
  GRENADE: 11,
  DETONATOR: 12,
  HELICANNON: 13,
  ARMOUR: 15,
  RAMMEDBYCAR: 16,
  RUNOVERBYCAR: 17,
  EXPLOSION: 18,
  UZI_DRIVEBY: 19,
  DROWNING: 20,
  FALL: 21,
  UNIDENTIFIED: 22
};

const getWeaponNameFromType = (type) => {
  switch (type) {
    case WEAPONTYPE.UNARMED:
      return "Unarmed";
    case WEAPONTYPE.BASEBALLBAT:
      return "Baseball Bat";
    case WEAPONTYPE.COLT45:
      return "Colt .45";
    case WEAPONTYPE.UZI:
      return "Uzi";
    case WEAPONTYPE.SHOTGUN:
      return "Shotgun";
    case WEAPONTYPE.AK47:
      return "AK-47";
    case WEAPONTYPE.M16:
      return "M16";
    case WEAPONTYPE.SNIPERRIFLE:
      return "Sniper Rifle";
    case WEAPONTYPE.ROCKETLAUNCHER:
      return "Rocket Launcher";
    case WEAPONTYPE.FLAMETHROWER:
      return "Flamethrower";
    case WEAPONTYPE.MOLOTOV:
      return "Molotov";
    case WEAPONTYPE.GRENADE:
      return "Grenade";
    case WEAPONTYPE.DETONATOR:
      return "Detonator";
    case WEAPONTYPE.HELICANNON:
      return "Heli Cannon";
    case WEAPONTYPE.ARMOUR:
      return "Armour";
    case WEAPONTYPE.RAMMEDBYCAR:
      return "Rammed By Car";
    case WEAPONTYPE.RUNOVERBYCAR:
      return "Run Over By Car";
    case WEAPONTYPE.EXPLOSION:
      return "Explosion";
    case WEAPONTYPE.UZI_DRIVEBY:
      return "Uzi Driveby";
    case WEAPONTYPE.DROWNING:
      return "Drowning";
    case WEAPONTYPE.FALL:
      return "Fall";
    case WEAPONTYPE.UNIDENTIFIED:
      return "Unidentified";
  }
}

const getBodyPartName = (pedPiece) => {
  switch (pedPiece) {
    case 0:
      return "Torso";
    case 1:
      return "Mid";
    case 2:
      return "Left Arm";
    case 3:
      return "Right Arm";
    case 4:
      return "Left Leg";
    case 5:
      return "Right Leg";
    case 6:
      return "Head";
  }
}

addEventHandler("OnPedWasted", (victim, attacker, method, pedPiece) => {

  let victimClient = null;
  if (victim.elementType == ELEMENTTYPE_PLAYER) {
    victimClient = getClientFromPlayerElement(victim);
  }

  if (!victimClient)
    return;

  if (!attacker || victim.id == attacker.id) {
    message(`${victimClient.name} died`);
    return;
  }

  let attackerClient = null;
  if (attacker.elementType == ELEMENTTYPE_PLAYER) {
    attackerClient = getClientFromPlayerElement(attacker);
  }
  else if (attacker.elementType == ELEMENTTYPE_AUTOMOBILE) {
    attackerClient = getClientFromPlayerElement(attacker.driver);
  }

  if (!attackerClient)
    return;
  
  message(`${attackerClient.name} killed ${victimClient.name} using ${getWeaponNameFromType(method)} (${getBodyPartName(pedPiece)})`);
})