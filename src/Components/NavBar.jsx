import { useRef } from 'react'
import '../css/NavBar.css'

export default function NavBar({ sumTaches, setNavItemSelected }) {

  /** NavBar : menu for selecting task based on their state : 
   * @itme1 : all
   * @item2 : undone
   * @item3 : done
   */

  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);

  function select_item(item) {
    item1.current.classList.remove('nav-menu-item-selected');
    item2.current.classList.remove('nav-menu-item-selected');
    item3.current.classList.remove('nav-menu-item-selected');

    if (item === 1) {
      item1.current.classList.add('nav-menu-item-selected');
      setNavItemSelected(1)
    } else if (item === 2) {
      item2.current.classList.add('nav-menu-item-selected');
      setNavItemSelected(2)
    } else if (item === 3) {
      item3.current.classList.add('nav-menu-item-selected');
      setNavItemSelected(3)
    }
  }

  return (
    <div className='nav-menu'>
      <div ref={item1}
        onClick={() => select_item(1)}
        className='nav-menu-item nav-menu-item-selected'>
        All <span>{sumTaches.all}</span>
      </div>

      <div ref={item2}
        onClick={() => select_item(2)}
        className='nav-menu-item'>
        undone <span>{sumTaches.undone}</span>
      </div>

      <div ref={item3}
        onClick={() => select_item(3)}
        className='nav-menu-item'>
        done <span>{sumTaches.done}</span>
      </div>
    </div>
  );
}
