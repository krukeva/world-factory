import { redirect } from "react-router-dom"

import { createEquipment, updateEquipment, deleteEquipment } from "../../database/equipments"


export async function actionCreateEquipment({ params }) {
    const { worldId } = params
    const equipment = await createEquipment(worldId)
    return redirect(`/equipments/${equipment.id}`)
}

  export async function actionUpdateEquipment( { params, request } ) {
    const { equipmentId } = params
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    if(typeof updates.keywords !== "undefined") {
        if ( updates.keywords.length>0) {
            updates.keywords = updates.keywords.split("|")
        } else {
            updates.keywords = []
        }
    }
    const newEquipment = await updateEquipment( equipmentId, updates )
    return redirect(`/equipments/${newEquipment.id}`)
}

export async function actionDeleteEquipment({ params, request }) {
    await deleteEquipment(params.equipmentId)
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);
    const { returnRoute } = payload
    return redirect(returnRoute)
}