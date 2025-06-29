// Importiert die notwendigen Funktionen von Vitest und Vue Test Utils
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Importiert die Komponente, die wir testen wollen
import AddMovieForm from '../AddMovieForm.vue'

// 'describe' gruppiert zusammengehörige Tests
describe('AddMovieForm', () => {
  // 'it' beschreibt einen einzelnen Testfall
  it('renders the form headline correctly', () => {
    // 1. Arrange: Wir "mounten" (rendern) die Komponente im Test
    const wrapper = mount(AddMovieForm)

    // 2. Act & 3. Assert: Wir suchen das <h3>-Element und überprüfen,
    // ob sein Text "Neuen Film hinzufügen" ist.
    expect(wrapper.find('h3').text()).toBe('Neuen Film hinzufügen')
  })
})
