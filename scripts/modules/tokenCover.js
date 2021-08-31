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
        let noCover = setting("noCoverTokenSizes").split(",")
        for (let size of noCover) {
            defaultCoverLevels.values[size].cover = 0
        }
        let quarterCover = setting("3/4CoverTokenSizes").split(",")
        for (let size of quarterCover) {
            defaultCoverLevels.values[size].cover = 2
        }
        let noDeadCover = setting("noDeadTokenSizes").split(",")
        for (let size of noDeadCover) {
            defaultCoverLevels.values[size].dead = 0
        }
        let quarterDead = setting("3/4DeadTokenSizes").split(",")
        for (let size of quarterDead) {
            defaultCoverLevels.values[size].dead = 2
        }
        let fullDead = setting("fullDeadTokenSizes").split(",")
        for (let size of fullDead) {
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
    document.data.update({[`flags.dnd5e-helpers.coverLevel`]: cover})
})

Hooks.on("canvasReady", () => {
    tokenCover.userDefined()
})

function setting(key) {
    return game.settings.get("dnd5e-helpers-cover-expansion", key);
}

Hooks.on("preUpdateActor", async (actor, update) => {
    let hp = getProperty(update, "data.attributes.hp.value");
    if(!actor.token) return
    if(hp === 0){
        let cover = tokenCover.coverValue(actor, "dead")
        await actor.token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }
    if(actor.data.data.attributes.hp.value === 0 && hp > 0){
        let cover = tokenCover.coverValue(actor, "cover")
        await actor.token.setFlag("dnd5e-helpers", "coverLevel", cover)
    }
})