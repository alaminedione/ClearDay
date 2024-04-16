import { useState, useEffect } from 'react';
import '../css/Pagination.css';

export default function Pagination({ sumTaches, navItemSelected, setNavItemSelected, pagination, setPagination }) {


  /** pagination : objet
   * @current : int 
   * @max: int
  */
  /** navItemSelected
   *@all : 1
   *@undone: 2

import { useState, useEffect } from 'react';
import '../css/Pagination.css';

export default function Pagination({ sumTaches, navItemSelected, setNavItemSelected, pagination, setPagination }) {
  /** pagination : objet
   * @current : int 
   * @max: int
   */
  const [listesLi, setListesLi] = useState([]);

  useEffect(() => {
    // Calcul de numberLicurrentSection basé sur la sélection actuelle
    const sumCurrentSection = (() => {
      switch (navItemSelected) {
        case 1: return sumTaches.all;
        case 2: return sumTaches.undone;
        case 3: return sumTaches.done;
        default: return 0;
      }
    })();
    const numberLicurrentSection = Math.ceil(sumCurrentSection / 6);

    // Mise à jour de la liste de pages et ajustement de la pagination
    const pages = Array.from({ length: numberLicurrentSection }, (_, i) => i + 1);
    setListesLi(pages);

    // Décider de la page actuelle : reste à la même sauf si le nombre de pages change
    // Si le nombre de pages a augmenté, naviguez vers la nouvelle dernière page
    setPagination(prev => {
      if (numberLicurrentSection !== prev.max) {
        return { current: numberLicurrentSection, max: numberLicurrentSection };
      }
      // Autres conditions spécifiques ou ajustements peuvent être ajoutés ici
      return prev; // Aucun changement n'est nécessaire
    });
  }, [navItemSelected, sumTaches.all, sumTaches.undone, sumTaches.done, setPagination]);

  // Pagination handlers
  function setCurrentPage(pageNumber) {
    setPagination({ current: pageNumber, max: listesLi.length });
  }

  function before() {
    setPagination(prev => ({
      ...prev,
      current: Math.max(1, prev.current - 1)
    }));
  }

  function next() {
    setPagination(prev => ({
      ...prev,
      current: Math.min(prev.max, prev.current + 1)
    }));
  }

  return (
    <div className='pagination'>
      <button onClick={before} disabled={pagination.current === 1}>
        <i className='material-icons'>navigate_before</i>
      </button>
      <ol>
        {listesLi.map((pageNumber) => (
          <li
            key={pageNumber}
            className={pagination.current === pageNumber ? 'selected' : ''}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ol>
      <button onClick={next} disabled={pagination.current === pagination.max}>
        <i className='material-icons'>navigate_next</i>
      </button>
    </div>
  );
}

