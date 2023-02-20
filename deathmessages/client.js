addEventHandler("OnPedInflictDamage", (attacker, ped, method /* eWeaponType */, damage, pedPiece /* ePedPieceTypes */, direction, wasKilled) => {
  if (!wasKilled)
    return;
  if (ped.id != localClient.player.id)
    return;

  callServerFunc("deathmessage", attacker.id, ped.id, method, pedPiece);
});