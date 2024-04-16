import './App.css'
import Section2 from './Components/Section2';
import Section1 from './Components/Section1';
import { useEffect, useState } from 'react';

export default function App() {

  /** taches : array 
   * tache :
   */

  /** tache : object
   * @id : int  
   * @content : string
   * @description : string
   * @isDone : bool
   */

  /** sumTaches : object
   *  @all
   *  @undone
   *  @done
   */

  const [taches, setTaches] = useState(() => {
    const storedTaches = localStorage.getItem('taches');
    if (!storedTaches) {
      return []
    }
    if (storedTaches) {
      return JSON.parse(storedTaches)
    }

  })

  const [sumTaches, setSumTaches] = useState(() => {
    const storedSumTaches = localStorage.getItem('sumTaches')
    if (storedSumTaches) {
      return JSON.parse(storedSumTaches)
    } else {
      return {
        all: 0,
        undone: 0,
        done: 0
      }
    }

  })

  const [pagination, setPagination] = useState({
    current: 1,
    max: 1,
  })


  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(taches));
    localStorage.setItem('sumTaches', JSON.stringify(sumTaches))
  }, [taches, sumTaches]);

  function addTache(content, description, isDone = false) {
    if (!content) {
      alert("le champ est vide")
      return false
    }
    let tache = {
      id: crypto.randomUUID(),
      content: content,
      description: description,
      isDone: isDone,
    }
    setTaches(currentTaches => [...currentTaches, tache])
    setSumTaches(prev => {
      return {
        done: prev.done,
        undone: prev.undone + 1,
        all: prev.all + 1
      }
    })
  }


  const [isWide, setIsWide] = useState(window.innerWidth > 900)
  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 900)
    }
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <h1>Todo List</h1>
      {isWide ? (
        <div className='app'>
          <Section1
            className='Section1'
            sumTaches={sumTaches}
            setSumTaches={setSumTaches}
            taches={taches}
            setTaches={setTaches}
            pagination={pagination}
            setPagination={setPagination}
          />
          <Section2
            className='Section2'
            addTache={addTache}
          />
        </div>
      ) :
        <>
          <h1>Nous travaillons à améliorer votre expérience</h1>
          <p>La version responsive de notre application est en cours de développement. Pour une meilleure expérience, nous vous recommandons d'utiliser un ordinateur de bureau ou un laptop. Merci pour votre patience et votre compréhension.</p>
          <h2> vous pouvez aussi essayer de redimensionner votre ecran dans la mesure du possible !!</h2>
        </>
      }
    </>
  );
}
