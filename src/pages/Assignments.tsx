import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AssignmentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AssignmentItem = styled.li`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const AssignmentTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const AssignmentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
  course: string;
}

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    // Fetch assignments from API
    const fetchAssignments = async () => {
      // Replace with actual API call
      const mockAssignments: Assignment[] = [
        {
          id: '1',
          title: 'React Component Project',
          dueDate: new Date('2024-04-15'),
          course: 'Introduction to React',
        },
        {
          id: '2',
          title: 'JavaScript Algorithms',
          dueDate: new Date('2024-04-20'),
          course: 'Advanced JavaScript',
        },
        {
          id: '3',
          title: 'Responsive Web Design',
          dueDate: new Date('2024-04-25'),
          course: 'Web Design Fundamentals',
        },
      ];
      setAssignments(mockAssignments);
    };

    fetchAssignments();
  }, []);

  const handleSubmit = (assignmentId: string) => {
    // Implement assignment submission logic
    console.log(`Submitting assignment ${assignmentId}`);
  };

  return (
    <AssignmentsWrapper>
      <h2>Assignments</h2>
      <AssignmentList>
        {assignments.map((assignment) => (
          <AssignmentItem key={assignment.id}>
            <AssignmentTitle>{assignment.title}</AssignmentTitle>
            <AssignmentDetails>
              <span>Course: {assignment.course}</span>
              <span>Due: {format(assignment.dueDate, 'MMM dd, yyyy')}</span>
            </AssignmentDetails>
            <SubmitButton onClick={() => handleSubmit(assignment.id)}>
              Submit Assignment
            </SubmitButton>
          </AssignmentItem>
        ))}
      </AssignmentList>
    </AssignmentsWrapper>
  );
};

export default Assignments;