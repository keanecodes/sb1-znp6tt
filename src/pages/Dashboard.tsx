import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <DashboardWrapper>
      <Card>
        <h2>Welcome, {user?.name}!</h2>
        <p>Role: {user?.role}</p>
      </Card>
      <Card>
        <h2>Recent Activity</h2>
        {/* Add recent activity content */}
      </Card>
      <Card>
        <h2>Upcoming Assignments</h2>
        {/* Add upcoming assignments content */}
      </Card>
      <Card>
        <h2>Course Progress</h2>
        {/* Add course progress content */}
      </Card>
    </DashboardWrapper>
  );
};

export default Dashboard;