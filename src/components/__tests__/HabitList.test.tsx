import { render, screen, fireEvent } from '@testing-library/react'
import HabitList from '../HabitList'

const mockHabits = [
  {
    id: '1',
    name: 'Test Habit 1',
    description: 'A test habit',
    color: '#FF0000',
    icon: '🏃',
    archived: false,
    completions: ['2024-01-01'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Test Habit 2',
    description: 'Another test habit',
    color: '#00FF00',
    icon: '📚',
    archived: false,
    completions: [],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

const mockOnComplete = jest.fn()
const mockOnArchive = jest.fn()
const mockOnDelete = jest.fn()
const mockOnEdit = jest.fn()

describe('HabitList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all habits in the list', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    expect(screen.getByText('Test Habit 1')).toBeInTheDocument()
    expect(screen.getByText('Test Habit 2')).toBeInTheDocument()
  })

  it('shows completion status correctly', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    // Habit 1 has a completion
    const habit1Completion = screen.getByTestId('habit-1-completion')
    expect(habit1Completion).toHaveStyle({ backgroundColor: '#FF0000' })

    // Habit 2 has no completions
    const habit2Completion = screen.getByTestId('habit-2-completion')
    expect(habit2Completion).toHaveStyle({ backgroundColor: 'transparent' })
  })

  it('handles habit completion', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const completeButton = screen.getByTestId('habit-1-complete')
    fireEvent.click(completeButton)
    expect(mockOnComplete).toHaveBeenCalledWith('1')
  })

  it('handles habit archiving', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const archiveButton = screen.getByTestId('habit-1-archive')
    fireEvent.click(archiveButton)
    expect(mockOnArchive).toHaveBeenCalledWith('1')
  })

  it('handles habit deletion', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const deleteButton = screen.getByTestId('habit-1-delete')
    fireEvent.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('handles habit editing', () => {
    render(
      <HabitList
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getByTestId('habit-1-edit')
    fireEvent.click(editButton)
    expect(mockOnEdit).toHaveBeenCalledWith('1')
  })
}) 