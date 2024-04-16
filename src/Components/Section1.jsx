import { useState } from 'react'
import '../css/Section1.css'
import NavBar from './NavBar'
import Taches from './Taches'
import Pagination from "./pagination"


export default function Section1({ sumTaches, setSumTaches, taches, setTaches, pagination, setPagination }) {

  const [navItemSelected, setNavItemSelected] = useState(1)

  return <section className='section1'>

    <NavBar
      sumTaches={sumTaches}
      setNavItemSelected={setNavItemSelected} />

    <Taches
      taches={taches}
      setTaches={setTaches}
      setSumTaches={setSumTaches}
      navItemSelected={navItemSelected}
      pagination={pagination}
    />

    <Pagination
      sumTaches={sumTaches}
      navItemSelected={navItemSelected}
      setNavItemSelected={setNavItemSelected}
      pagination={pagination}
      setPagination={setPagination}
    />

  </section>
}
