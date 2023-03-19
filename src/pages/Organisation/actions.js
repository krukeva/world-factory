import { redirect } from "react-router-dom"

import { createOrganisation, updateOrganisation, deleteOrganisation } from "../../database/organisations"


export async function actionCreateOrganisation({ params }) {
    const { worldId } = params
    const organisation = await createOrganisation(worldId)
    return redirect(`/organisations/${organisation.id}`)
}

export async function actionUpdateOrganisation({ params, request }) {
    const { organisationId } = params
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    if(typeof updates.keywords !== "undefined") {
        if ( updates.keywords.length>0) {
            updates.keywords = updates.keywords.split("|")
        } else {
            updates.keywords = []
        }
    }
    const newOrganisation = await updateOrganisation(organisationId, updates)
    return redirect(`/organisations/${newOrganisation.id}`)
}

export async function actionDeleteOrganisation({ params, request }) {
    await deleteOrganisation(params.organisationId)
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);
    const { returnRoute } = payload
    return redirect(returnRoute)
}