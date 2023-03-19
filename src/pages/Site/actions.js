import { redirect } from "react-router-dom"

import { createSite, updateSite, deleteSite } from "../../database/sites"


export async function actionCreateSite({ params }) {
    const { worldId } = params
    const site = await createSite(worldId)
    return redirect(`/sites/${site.id}`)
  }
  
export async function actionUpdateSite( { params, request } ) {
    const { siteId } = params
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    if(typeof updates.keywords !== "undefined") {
        if ( updates.keywords.length>0) {
            updates.keywords = updates.keywords.split("|")
        } else {
            updates.keywords = []
        }
    }
    const newSite = await updateSite( siteId, updates )
    return redirect(`/sites/${newSite.id}`)
}

export async function actionDeleteSite({ params, request }) {
    await deleteSite(params.siteId)
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)
    const { returnRoute } = payload
    return redirect(returnRoute)
}