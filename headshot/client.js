
addEventHandler("OnPedInflictDamage", (attacker, ped, method /* eWeaponType */, damage, pedPiece /* ePedPieceTypes */, direction, wasKilled) => {
  if (wasKilled)
    return;

  if (pedPiece == PEDPIECE_HEAD) {
    ped.removeBodyPart(PEDPIECE_HEAD, direction);
    ped.health = 1;
  }
});