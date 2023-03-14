import { redirect } from "react-router-dom"

import { createWorld, updateWorld, deleteWorld } from "../../database/worlds"


export async function actionCreateWorld() {
    const newWorld = await createWorld()
    return redirect(`/worlds/${newWorld.id}/edit`)
}

export async function actionUpdateWorld({ params, request }) {
    const { worldId } = params
    const formData = await request.formData();
    const url = new URL(request.url);
    const endRoute = url.pathname.replace(`/worlds/${worldId}/update`, '')

    let updates
    if ( endRoute ==="" ) {
        updates = Object.fromEntries(formData)
        if (Array.isArray(updates.keywords)) {
            updates.keywords = updates.keywords.split('|')
        }
    } else {
        const updatedKey = endRoute.substring(1)
        const JSONupdates = Object.fromEntries(formData)
        const data = JSON.parse(JSONupdates[updatedKey])
        updates = {}
        updates[updatedKey] = data
        console.log("updates :", updates)
    }

    const updatedWorld = await updateWorld(worldId, updates)
    return redirect(`/worlds/${updatedWorld.id}${endRoute}`)
}

export async function actionDeleteWorld({ params }) {
    const res = await deleteWorld(params.worldId)
    return res && redirect(`/worlds`)
}