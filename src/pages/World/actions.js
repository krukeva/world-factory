import { redirect } from "react-router-dom"

import { createWorld, updateWorld, deleteWorld } from "../../database/worlds"
import { writeFile } from "../../utils/functions/files"
import { getPeople, deletePerson } from "../../database/people" 
import { getOrganisationList, deleteOrganisation } from "../../database/organisations"
import { getSiteList, deleteSite } from "../../database/sites"
import { getEquipmentList, deleteEquipment } from "../../database/equipments"
import Organisation from "../Organisation"
import Equipment from "../Equipment"

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
    const res = await deleteWorld(params.worldId)

    const people = await getPeople(params.worldId)
    people.forEach( person => deletePerson(person.id))

    const organisations = await getOrganisationList(params.worldId)
    organisations.forEach( organisation => deleteOrganisation(organisation.id))

    const sites = await getSiteList(params.worldId)
    sites.forEach(site=>deleteSite(site.id))

    const equipments = await getEquipmentList(params.worldId)
    equipments.forEach(equipment=>deleteEquipment(equipment.id))
    
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
    updatedWorld.data = {
        people: people,
        organisations: organisations,
        sites: sites,
        equipments: equipments,
    }
    writeFile( updatedWorld, `world_${updatedWorld.name}_v${updatedWorld.version}`)
    return redirect(`/worlds/${updatedWorld.id}`)
  }