import { render, screen, fireEvent } from '@testing-library/react'
import NewHabitModal from '../NewHabitModal'

const mockOnClose = jest.fn()
const mockOnSave = jest.fn()

describe('NewHabitModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the modal when isOpen is true', () => {
    render(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    expect(screen.getByText('Create New Habit')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Color')).toBeInTheDocument()
    expect(screen.getByLabelText('Icon')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <NewHabitModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    expect(screen.queryByText('Create New Habit')).not.toBeInTheDocument()
  })

  it('calls onClose when cancel button is clicked', () => {
    render(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('calls onSave with habit data when form is submitted', () => {
    render(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Habit' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'A new habit' },
    })
    fireEvent.change(screen.getByLabelText('Color'), {
      target: { value: '#FF0000' },
    })
    fireEvent.change(screen.getByLabelText('Icon'), {
      target: { value: '🏃' },
    })

    // Submit the form
    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'New Habit',
      description: 'A new habit',
      color: '#FF0000',
      icon: '🏃',
    })
  })

  it('shows validation error when name is empty', () => {
    render(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(mockOnSave).not.toHaveBeenCalled()
  })

  it('resets form when modal is closed and reopened', () => {
    const { rerender } = render(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Habit' },
    })

    // Close the modal
    rerender(
      <NewHabitModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    // Reopen the modal
    rerender(
      <NewHabitModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    )

    // Check if form is reset
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })
}) 