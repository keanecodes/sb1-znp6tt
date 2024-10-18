import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
`;

const ProfileRole = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
`;

interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  averageGrade: number;
}

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Fetch user profile from API
    const fetchProfile = async () => {
      // Replace with actual API call
      const mockProfile: UserProfile = {
        id: user?.id || '1',
        name: user?.name || 'John Doe',
        role: user?.role || 'student',
        email: 'john.doe@example.com',
        enrolledCourses: 5,
        completedCourses: 3,
        averageGrade: 85.5,
      };
      setProfile(mockProfile);
    };

    fetchProfile();
  }, [user]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <ProfileWrapper>
      <ProfileSection>
        <ProfileHeader>
          <ProfilePicture src="https://source.unsplash.com/random/200x200?portrait" alt={profile.name} />
          <div>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileRole>{profile.role}</ProfileRole>
          </div>
        </ProfileHeader>
        <ProfileInfo>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{profile.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Enrolled Courses</InfoLabel>
            <InfoValue>{profile.enrolledCourses}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Completed Courses</InfoLabel>
            <InfoValue>{profile.completedCourses}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Average Grade</InfoLabel>
            <InfoValue>{profile.averageGrade.toFixed(1)}%</InfoValue>
          </InfoItem>
        </ProfileInfo>
      </ProfileSection>
      {/* Add more sections for course progress, achievements, etc. */}
    </ProfileWrapper>
  );
};

export default Profile;