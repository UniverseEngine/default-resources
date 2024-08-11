let playerList = [];

addEventHandler("OnElementStreamIn", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PLAYER:
      const shouldBeAdded = (localClient.player && localClient.player.id != element.id);
      if (shouldBeAdded)
        playerList.push(element.id);
      break;
  }
});

addEventHandler("OnElementStreamOut", (element) => {
  switch (element.elementType) {
    case ELEMENTTYPE_PLAYER:
      playerList = playerList.filter(e => e != element.id);
      break;
  }
});

const drawRect = (x, y, w, h, rgba) => {
  sprite2d.drawRect(new Rect(x, y, x + w, y + h), rgba);
}

addEventHandler("OnRender", () => {
  playerList.forEach(id => {

    let client = getClientFromPlayerElement(getElement(id));
    if (!client)
      return;

    let ped = getElement(id);
    if (!ped)
      return;

    let pos = ped.position;
    pos.z += 1.0;

    let coords = sprite.calcScreenCoors(pos, false);
    if (!coords.ret)
      return;

    if (!localClient.player)
      return;

    if (ped.id == localClient.player.id)
      return;

    let dist = getDistance(pos, localClient.player.position);
    if (dist > 50.0)
      return;

    let size = 1.25 - dist / 50.0;
    font.setPropOn();
    font.setBackgroundOff();

    font.setScale(size, size);
    font.setCentreOn();
    font.setCentreSize(SCREEN_WIDTH);
    font.setJustifyOff();
    font.setColor(new RGBA(255, 255, 255, 255));
    font.setBackgroundOnlyTextOff();
    font.setFontStyle(0);
    font.printString(coords.x, coords.y - 32, client.name);

    let rectSize = 1.0 - dist / 50.0;
    drawRect(coords.x - 60 * rectSize, coords.y, 120 * rectSize, 8 * rectSize, new RGBA(0, 0, 0, 255));
    if (ped.armour > 0)
      drawRect(coords.x - 60 * rectSize + 1, coords.y + 1, (ped.armour / 100) * 118 * rectSize, 6 * rectSize, new RGBA(0, 0, 255, 255));
    else
      drawRect(coords.x - 60 * rectSize + 1, coords.y + 1, (ped.health / 100) * 118 * rectSize, 6 * rectSize, new RGBA(255, 0, 0, 255));
  });
});