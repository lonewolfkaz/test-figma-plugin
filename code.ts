// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-ellipse') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const ellipse = figma.createEllipse();
      ellipse.x = i * 550;
      ellipse.fills = [{ type: 'SOLID', color: { r: 0.79, g: 0.69, b: 0.97 }, opacity: 0.85 }];
      figma.currentPage.appendChild(ellipse);
      nodes.push(ellipse);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
