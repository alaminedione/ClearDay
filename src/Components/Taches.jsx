import Tache from "./Tache";
import '../css/Tache.css'
import { useEffect, useState } from "react";
export default function Taches({ taches, setTaches, setSumTaches, navItemSelected, pagination }) {

  /* TODO: 
   la valeur de taches par page doit etre fixe suivant la taille de l'ecran :
  - portable : 12
  - tablette : ?
  - laptop : 6
  */

  const tachesParPage = 6

  function filterDone() {
    return taches.filter(t => (t.isDone === true))
  }

  function filterUndone() {
    return taches.filter(t => (t.isDone === false))
  }


  let tachesToRender
  if (navItemSelected === 1) {
    tachesToRender = taches
  } else if (navItemSelected === 2) {
    tachesToRender = filterUndone()
  } else if (navItemSelected === 3) {
    tachesToRender = filterDone()
  }

  // Calcul pour déterminer les tâches à afficher basé sur la pagination
  const indexDebut = (pagination.current - 1) * tachesParPage;
  const indexFin = indexDebut + tachesParPage;
  const tachesAffichees = tachesToRender.slice(indexDebut, indexFin);

  return <div className='taches'>
    <ul>
      {taches.length !== 0 ?
        tachesAffichees.map((tache) =>
          <Tache
            key={tache.id}
            tache={tache}
            setTaches={setTaches}
            setSumTaches={setSumTaches}
          />
        )
        : <h2> no task yet </h2>
      }
    </ul >
  </div >
}     
