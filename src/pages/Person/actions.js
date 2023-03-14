import { redirect } from "react-router-dom"

import { createPerson, updatePerson, deletePerson } from "../../database/people"


export async function actionCreatePerson({ params }) {
    const { worldId } = params
    const person = await createPerson(worldId)
    return redirect(`/people/${person.id}`)
}

export async function actionUpdatePerson( { params, request } ) {
    const { personId } = params
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const newPerson = await updatePerson( personId, updates )
    return redirect(`/people/${newPerson.id}`)
}

export async function actionDeletePerson({ params, request }) {
    await deletePerson(params.personId)
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);
    const { returnRoute } = payload
    return redirect(returnRoute)
}