export class tokenCover {
    constructor() {
        this.values = {
            tiny: {
                cover: 1,
                dead: 1
            },
            sm: {
                cover: 1,
                dead: 1
            },
            med: {
                cover: 1,
                dead: 1
            },
            lg: {
                cover: 1,
                dead: 1
            },
            huge: {
                cover: 1,
                dead: 1
            },
            grg: {
                cover: 1,
                dead: 1
            }
        }

    }
    static userDefined() {
        let keys = Object.keys(CONFIG.DND5E.tokenSizes)
        let noCover = setting("noCoverTokenSizes").split(",")
        for (let size of noCover) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].cover = 0
        }
        let quarterCover = setting("3/4CoverTokenSizes").split(",")
        for (let size of quarterCover) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].cover = 2
        }
        let noDeadCover = setting("noDeadTokenSizes").split(",")
        for (let size of noDeadCover) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].dead = 0
        }
        let halfDead = setting("halfDeadTokenSizes").split(",")
        for (let size of halfDead) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].dead = 1
        }
        let quarterDead = setting("3/4DeadTokenSizes").split(",")
        for (let size of quarterDead) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].dead = 2
        }
        let fullDead = setting("fullDeadTokenSizes").split(",")
        for (let size of fullDead) {
            if (!keys.includes(size)) {
                if(!!size) console.error(`Cover Expansion: ${size} is not a valid size`)
                continue
            }
            defaultCoverLevels.values[size].dead = 3
        }
    }

    static coverValue(actor, key) {
        return defaultCoverLevels.values[actor.data.data.traits.size][key]
    }
}

let defaultCoverLevels = new tokenCover()

Hooks.on("preCreateToken", (document, data, id) => {
    let cover = tokenCover.coverValue(document.actor, "cover")
    document.data.update({ [`flags.dnd5e-helpers.coverLevel`]: cover })
})

Hooks.on("canvasReady", () => {
    tokenCover.userDefined()
})

function setting(key) {
    return game.settings.get("dnd5e-helpers-cover-expansion", key);
}

Hooks.on("preUpdateActor", async (actor, update) => {
    if (!actor.token && !actor.getActiveTokens()[0]?.document) return;
    let hp = getProperty(update, "data.attributes.hp.value");
    let token = actor.token ?? actor.getActiveTokens()[0].document
    
    if (hp === 0) {
        let cover = tokenCover.coverValue(actor, "dead")
        await token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }
    if (actor.data.data.attributes.hp.value === 0 && hp > 0) {
        let cover = tokenCover.coverValue(actor, "cover")
        await token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }
})

Hooks.on("preCreateActiveEffect", async (effect) => {
    if (!effect.parent.parent && !effect.parent.getActiveTokens()[0]?.document) return;
    let label = effect.data.label;
    let token = effect.parent.parent ?? effect.parent.getActiveTokens()[0].document;
    let actor = token.actor;
    //let currentCover = foundry.utils.getProperty(token.data.flags, "dnd5e-helpers.coverLevel")
    if (label === "Unconscious" || label === "Prone") {
        let cover = tokenCover.coverValue(actor, "dead");
        await token.setFlag("dnd5e-helpers", "coverLevel", cover);
    }
    /*else if(label === "Prone" && !token.actor.effects.find(eff=>eff.data.label === "Unconscious")) {
        let cover = tokenCover.coverValue(actor, "prone")
        await token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }*/
});

Hooks.on("preDeleteActiveEffect", async (effect) => {
    if (!effect.parent.parent && !effect.parent.getActiveTokens()[0]?.document) return;
    let label = effect.data.label;
    let token = effect.parent.parent ?? effect.parent.getActiveTokens()[0].document;
    let actor = token.actor;
    if ((label === "Unconscious" && !token.actor.effects.find(eff=>eff.data.label === "Prone") && !token.actor.getRollData().attributes.hp.value === 0) || (label === "Prone" && !token.actor.effects.find(eff=>eff.data.label === "Unconscious") && !token.actor.getRollData().attributes.hp.value === 0)) {
        let cover = tokenCover.coverValue(actor, "cover")
        await token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }
});
    
