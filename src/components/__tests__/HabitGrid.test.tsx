import { render, screen } from '@testing-library/react'
import HabitGrid from '../HabitGrid'

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

describe('HabitGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all habits in the grid', () => {
    render(
      <HabitGrid
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Habit 1')).toBeInTheDocument()
    expect(screen.getByText('Test Habit 2')).toBeInTheDocument()
  })

  it('shows completion status correctly', () => {
    render(
      <HabitGrid
        habits={mockHabits}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
      />
    )

    // Habit 1 has a completion
    const habit1Completion = screen.getByTestId('habit-1-completion')
    expect(habit1Completion).toHaveStyle({ backgroundColor: '#FF0000' })

    // Habit 2 has no completions
    const habit2Completion = screen.getByTestId('habit-2-completion')
    expect(habit2Completion).toHaveStyle({ backgroundColor: 'transparent' })
  })

  it('filters out archived habits when showArchived is false', () => {
    const habitsWithArchived = [
      ...mockHabits,
      {
        id: '3',
        name: 'Archived Habit',
        description: 'An archived habit',
        color: '#0000FF',
        icon: '💤',
        archived: true,
        completions: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ]

    render(
      <HabitGrid
        habits={habitsWithArchived}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        showArchived={false}
      />
    )

    expect(screen.getByText('Test Habit 1')).toBeInTheDocument()
    expect(screen.getByText('Test Habit 2')).toBeInTheDocument()
    expect(screen.queryByText('Archived Habit')).not.toBeInTheDocument()
  })

  it('shows archived habits when showArchived is true', () => {
    const habitsWithArchived = [
      ...mockHabits,
      {
        id: '3',
        name: 'Archived Habit',
        description: 'An archived habit',
        color: '#0000FF',
        icon: '💤',
        archived: true,
        completions: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ]

    render(
      <HabitGrid
        habits={habitsWithArchived}
        onComplete={mockOnComplete}
        onArchive={mockOnArchive}
        onDelete={mockOnDelete}
        showArchived={true}
      />
    )

    expect(screen.getByText('Test Habit 1')).toBeInTheDocument()
    expect(screen.getByText('Test Habit 2')).toBeInTheDocument()
    expect(screen.getByText('Archived Habit')).toBeInTheDocument()
  })
}) 