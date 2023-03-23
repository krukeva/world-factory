import { redirect } from "react-router-dom"

import { createWorld, updateWorld, deleteWorld } from "../../database/worlds"
import { writeFile } from "../../utils/functions/files"
import { getPeople, deletePeople } from "../../database/people" 
import { getOrganisationList, deleteOrganisationList } from "../../database/organisations"
import { getSiteList, deleteSiteList } from "../../database/sites"
import { getEquipmentList, deleteEquipmentList } from "../../database/equipments"
import { getRelationList, deleteRelationList } from "../../database/relations"

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
    if (endRoute ==="") {
        updates = Object.fromEntries(formData)
        if(typeof updates.keywords !== "undefined") {
            if ( updates.keywords.length>0) {
                updates.keywords = updates.keywords.split("|")
            } else {
                updates.keywords = []
            }
        }
    } else {
        const updatedKey = endRoute.substring(1)
        const JSONupdates = Object.fromEntries(formData)
        const data = JSON.parse(JSONupdates[updatedKey])
        updates = {}
        updates[updatedKey] = data
    }

    const updatedWorld = await updateWorld(worldId, updates)
    return redirect(`/worlds/${updatedWorld.id}${endRoute}`)
}

export async function actionDeleteWorld({ params }) {
    let res = await deleteWorld(params.worldId)
    res = res && deletePeople(params.worldId)
    res = res && deleteOrganisationList(params.worldId)
    res = res && deleteEquipmentList(params.worldId)
    res = res && deleteSiteList(params.worldId)
    res = res && deleteRelationList(params.worldId)
    return res && redirect(`/worlds`)
}

export async function actionExportWorld({ params, request }) {
    const { worldId } = params
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    const updatedWorld = await updateWorld(worldId, updates)
    const people = await getPeople(worldId)
    const organisations = await getOrganisationList(worldId)
    const sites = await getSiteList(worldId)
    const equipments = await getEquipmentList(worldId)
    const relations = await getRelationList(worldId)
    updatedWorld.data = {
        people: people,
        organisations: organisations,
        sites: sites,
        equipments: equipments,
        relations: relations,
    }
    writeFile( updatedWorld, `world_${updatedWorld.name}_v${updatedWorld.version}`)
    return redirect(`/worlds/${updatedWorld.id}`)
  }