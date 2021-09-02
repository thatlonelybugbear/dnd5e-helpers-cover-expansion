const MODULE = "dnd5e-helpers-cover-expansion"
import { tokenCover } from './modules/tokenCover.js';

Hooks.on("init", () => {
  game.settings.register(MODULE, "noCoverTokenSizes", {
    name: localize("0coverTokenSizesName"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}
  });

  game.settings.register(MODULE, "3/4CoverTokenSizes", {
    name: localize("3/4coverTokenSizes"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "noDeadTokenSizes", {
    name: localize("noDeadTokenSizes"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });
  game.settings.register(MODULE, "halfDeadTokenSizes", {
    name: localize("halfDeadTokenSizes"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "3/4DeadTokenSizes", {
    name: localize("3/4DeadTokenSizes"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "fullDeadTokenSizes", {
    name: localize("fullDeadTokenSizes"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });
})
function localize(...args) {
  return game.i18n.localize(...args);
}

