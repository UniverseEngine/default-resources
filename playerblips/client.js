
const playerBlips = new Map();

addEventHandler("OnElementStreamIn", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PLAYER:
      if (localClient.player) {
        if (localClient.player.id == element.id)
          return;
      }
      
      const blip = createBlip(element.position, 2.0, new RGBA(255, 255, 255, 255), RADAR_SPRITE_NONE, element);
      playerBlips.set(element.id, blip.id);
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