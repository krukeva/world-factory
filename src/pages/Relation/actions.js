import { redirect } from "react-router-dom"

import { createRelation, updateRelation, deleteRelation } from "../../database/relations"

export async function actionCreateRelation({ params, request }) {
    const { worldId } = params
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)
    const { category, sourceId, targetId, name, returnRoute } = payload
    const relation = await createRelation(worldId, category, sourceId, targetId)
    const completeRelation = await updateRelation(relation.id, {name: name})
    return redirect(returnRoute)
}

export async function actionUpdateRelation({ params, request }) {
    const { relationId } = params
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    const updatedRelation = await updateRelation(relationId, updates)
    //return redirect(`/people/${updatedRelation.id}`)
    return updatedRelation
}

export async function actionDeleteRelation({ params, request }) {
    await deleteRelation(params.relationId)
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)
    const { returnRoute } = payload
    return redirect(returnRoute)
}