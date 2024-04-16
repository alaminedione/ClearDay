import { useRef } from 'react'
import '../css/Section2.css'

export default function Section2({ addTache }) {
  const content = useRef('')
  const description = useRef('')

  function cancel() {
    content.current.value = ""
    description.current.value = ""
    content.current.focus()
  }

  return <section
    className='section2'
    onKeyDown={(e) => {
      if (e.keyCode == '13') {
        addTache(content.current.value, description.current.value);
        content.current.value = "";
        description.current.value = "";
        content.current.focus();

      }
    }}
  >
    <h2> Create new todo </h2>

    <div className='new-todo'>
      <label> Todo </label>
      <input type='text' autoFocus ref={content} />
    </div>

    <div className='description'>
      <label>description</label>
      <textarea ref={description} />
    </div>

    <div className='action' >
      <button className='btn-primary btn-create'
        onClick={() => {
          addTache(content.current.value, description.current.value);
          content.current.value = "";
          description.current.value = "";
          content.current.focus();
        }}>
        Add
      </button>

      <button className='btn-secondary btn-cancel'
        onClick={cancel}>Cancel
      </button>
    </div>
  </section>
}
