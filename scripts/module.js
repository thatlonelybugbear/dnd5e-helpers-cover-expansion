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
    name: localize("3/4coverTokenSizesName"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "noDeadTokenSizes", {
    name: localize("noDeadTokenSizesName"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });
  game.settings.register(MODULE, "halfDeadTokenSizes", {
    name: localize("halfDeadTokenSizesName"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "3/4DeadTokenSizes", {
    name: localize("3/4DeadTokenSizesName"),
    hint: localize("CoverSizeHint"),
    scope: "world",
    config: true,
    default: "",
    type: String,
    onChange: () => { tokenCover.userDefined()}

  });

  game.settings.register(MODULE, "fullDeadTokenSizes", {
    name: localize("fullDeadTokenSizesName"),
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

