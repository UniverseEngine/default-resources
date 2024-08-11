
const playerBlips = new Map();

addEventHandler("OnElementStreamIn", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PLAYER:
      const shouldBeAdded = (localClient.player && localClient.player.id != element.id);
      if (shouldBeAdded) {
        const blip = createBlip(element.position, 2.0, new RGBA(255, 255, 255, 255), RADAR_SPRITE_NONE, element);
        playerBlips.set(element.id, blip.id);
      }
      break;
  }
});

addEventHandler("OnElementStreamOut", (element) => {
  console.log("OnElementStreamOut: " + element.id);
  switch (element.elementType) {
    case ELEMENTTYPE_PLAYER:
      const blipid = playerBlips.get(element.id);
      const blip = getElement(blipid, true);
      if (blip)
        blip.destroy();

      playerBlips.delete(element.id);

      break;
  }
});