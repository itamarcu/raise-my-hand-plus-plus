import HandRaiser from "./HandRaiser.mjs";

Hooks.on("chatCommandsReady", function(chatCommands) {
  game.socket.on("module.raise-my-hand-plus-plus", function(recieveMsg) {
    window.game.handRaiser.handleSocket(recieveMsg);
  });
});


Hooks.once('ready', function() {
  let moduleName = 'raise-my-hand-plus-plus';

  let handRaiser = new HandRaiser();
  window.game.handRaiser = handRaiser;

  game.settings.register(moduleName, "showEmojiIndicator", {
    name: "Should a raised hand be displayed in the Players list?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(moduleName, "showUiNotification", {
    name: "Should a raised hand display a UI notification when raised?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(moduleName, "showUiChatMessage", {
    name: "Should a raised hand display a chat message when raised?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(moduleName, "playSound", {
    name: "Should a sound be played when raised?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });
  
  if (game.modules.get("lib-df-hotkeys")?.active) {
    Hotkeys.registerGroup({
      name: moduleName,
      label: "Raise My Hand"
    });
    
    Hotkeys.registerShortcut({
      name: `${moduleName}.Toggle`,
      label: "Raise/Lower My Hand",
      group: moduleName,
      default: { key: Hotkeys.keys.KeyR, alt: false, ctrl: false, shift: false },
      onKeyDown: () => window.game.handRaiser.isRaised ? window.game.handRaiser.lower() : window.game.handRaiser.raise()
    });
  }
});

Hooks.on("getSceneControlButtons", function(controls) {
  let tileControls = controls.find(x => x.name === "token");
  tileControls.tools.push({
    icon: "fas fa-hand-paper",
    name: "raise-my-hand-plus-plus",
    title: "✋Raise My Hand",
    button: true,
    onClick: () => window.game.handRaiser.toggle()
  });
});
