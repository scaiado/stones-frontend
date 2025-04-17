import { render, screen, fireEvent } from '@testing-library/react'
import HabitCard from '../HabitCard'

const mockHabit = {
  id: '1',
  name: 'Test Habit',
  description: 'A test habit',
  color: '#FF0000',
  icon: '🏃',
  archived: false,
  completions: [],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockOnComplete = jest.fn()
const mockOnArchive = jest.fn()
const mockOnDelete = jest.fn()

describe('HabitCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders habit information correctly', () => {
    render(
      <HabitCard
        habit={mockHabit}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Habit')).toBeInTheDocument()
    expect(screen.getByText('A test habit')).toBeInTheDocument()
    expect(screen.getByText('🏃')).toBeInTheDocument()
  })

  it('calls onComplete when complete button is clicked', () => {
    render(
      <HabitCard
        habit={mockHabit}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    const completeButton = screen.getByRole('button', { name: /complete/i })
    fireEvent.click(completeButton)

    expect(mockOnComplete).toHaveBeenCalledWith('1')
  })

  it('calls onArchive when archive button is clicked', () => {
    render(
      <HabitCard
        habit={mockHabit}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    const archiveButton = screen.getByRole('button', { name: /archive/i })
    fireEvent.click(archiveButton)

    expect(mockOnArchive).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <HabitCard
        habit={mockHabit}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('shows archived state correctly', () => {
    const archivedHabit = { ...mockHabit, archived: true }
    render(
      <HabitCard
        habit={archivedHabit}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Archived')).toBeInTheDocument()
  })
}) 