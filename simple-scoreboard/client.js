
const SDLK_TAB = 0x9; // '\t'

const scoreboard = {
  document: null,
  document_elements: new Map(),
  visible: false
}

let scoreboardDocument = null;

addEventHandler("OnResourceStart", () => {
  scoreboard.document = gui.loadDocument("scoreboard.rml");
  if (!scoreboard.document) {
    console.error("failed to load the scoreboard document!");
    return;
  }

  bindKey(SDLK_TAB);
});

addEventHandler("OnRender", () => {
  for (let i = 1; i <= 32; i++) {
    let client = getClient(i);
    if (!client)
    {
      if (scoreboard.document_elements.has(i)) {
        console.log("deleting for client " + i);

        const docElem = scoreboard.document_elements.get(i);
        docElem.destroy();

        scoreboard.document_elements.delete(i);
      }
      continue;
    }

    if (!scoreboard.document_elements.has(i)) {
      console.log("adding for client " + i);

      let element = scoreboard.document.createElement("tr");
      element.innerRML = `
        <td>${client.id}</td>
        <td style='width: 50dp'>${client.name}</td>
        <td>0</td>`;

      scoreboard.document.getElementById("scoreboard").appendChild(element);
      scoreboard.document_elements.set(i, element);
    }
    else {
      const score = client.getData("scoreboard.score");

      const elem = scoreboard.document_elements.get(i);
      elem.innerRML = `
        <td>${client.id}</td>
        <td style='width: 50dp'>${client.name}</td>
        <td>${typeof score == "number" ? score : 0}</td>`;
    }
  }
});

addEventHandler("OnKeyUp", (key) => {
  switch (key) {
    case SDLK_TAB:
      if (scoreboard.visible) {
        scoreboard.document.hide();
        scoreboard.visible = false;
      }
      break;
  }
});

addEventHandler("OnKeyDown", (key) => {
  switch (key) {
    case SDLK_TAB:
      if (!scoreboard.visible) {
        scoreboard.document.show();
        scoreboard.visible = true;
      }
      break;
  }
});