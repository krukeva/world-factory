import * as Relation from "../database/relations"
import sortBy from "sort-by";

import { getPerson } from "../database/people";
import { getOrganisation } from "../database/organisations";
import { getSite } from "../database/sites";
import { getEquipment } from "../database/equipments";


export async function getDirectRelationList( worldId, entityId ) {
    let relations = await Relation.getRelationList(worldId);
    
    relations = relations.filter( relation => relation.source === entityId )
    for (let i=0; i<relations.length; i++) {
              let target
              if ( relations[i].category.search("ToPerson") > 0) {
                  target = await getPerson(relations[i].target)
              } else if ( relations[i].category.search("ToOrganisation") > 0 ) {
                  target = await getOrganisation(relations[i].target)
              } else if ( relations[i].category.search("ToSite") > 0 ) {
                  target = await getSite(relations[i].target)
              } else if ( relations[i].category.search("ToEquipment") > 0 ) {
                  target = await getEquipment(relations[i].target)
              }
              if (target) {
                  relations[i].targetName = target.name
              }
    }        


    return relations.sort(sortBy("category"));
  }
  
  export async function getReciprocalRelationList( worldId, entityId ) {
    let relations = await Relation.getRelationList(worldId);
      
    relations = relations.filter( relation => relation.target === entityId )
        for (let i=0; i<relations.length; i++) {
            const person = await getPerson(relations[i].source) 
            const organisation = await getOrganisation(relations[i].source) 
            const site = await getSite(relations[i].source) 
            const equipment = await getEquipment(relations[i].source)
            const source = person || organisation || site || equipment
            if (source) {
                relations[i].sourceName = source.name
            }
        }
        
    return relations.sort(sortBy("category"));
}
  