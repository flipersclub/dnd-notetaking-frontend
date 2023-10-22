import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { BookIcon, StickyNoteIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { updateNotebookData } from '../../reducers/notebook/notebookSlice'
import { indexNotes } from '../../services/NoteService'
import { TNote, TNotebook } from '../../types'
import { updateNotebooksNotebookData } from '../../reducers/notebook/notebooksIndexSlice'

const mapNote = (notebook: TNotebook, note: TNote): SidebarItemInterface => ({
  title: note.name,
  to: `/notebooks/${notebook?.slug}/notes/${note.slug}`,
  icon: (props) => <StickyNoteIcon {...props}/>,
})

const NotebooksWrapper = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const { notebooks } = useAppSelector((state: RootState) => state.notebooks) // redux

  return (
    <>
      {notebooks.length >= 1 && (
        <Sidebar
          title={'Notebooks'}
          items={notebooks.map((notebook) => ({
            title: notebook.name,
            to: `/notebooks/${(notebook.slug)}`,
            icon: (props) => <BookIcon {...props}/>,
            addNewLink: `/notebooks/${(notebook.slug)}/notes/new`,
            children: notebook.notes?.map(note => mapNote(notebook, note)),
            hasChildren: notebook.hasNotes,
            loadChildren: () => {
              indexNotes(notebook.slug)
                .then(({ data }) => {
                  dispatch(updateNotebooksNotebookData({ ...notebook, notes: data.data }))
                })
            }
          }))}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotebooksWrapper