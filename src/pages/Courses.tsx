import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

const CoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  &:focus {
    outline: none;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: 1rem;
`;

const CourseTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const CourseDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      // Replace with actual API call
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Introduction to React',
          description: 'Learn the basics of React and build your first app.',
          image: 'https://source.unsplash.com/random/800x600?react',
        },
        {
          id: '2',
          title: 'Advanced JavaScript',
          description: 'Master advanced JavaScript concepts and patterns.',
          image: 'https://source.unsplash.com/random/800x600?javascript',
        },
        {
          id: '3',
          title: 'Web Design Fundamentals',
          description: 'Learn the principles of effective web design.',
          image: 'https://source.unsplash.com/random/800x600?webdesign',
        },
      ];
      setCourses(mockCourses);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CoursesWrapper>
      <SearchBar>
        <Search size={20} />
        <SearchInput
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      <CourseGrid>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id}>
            <CourseImage src={course.image} alt={course.title} />
            <CourseInfo>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
            </CourseInfo>
          </CourseCard>
        ))}
      </CourseGrid>
    </CoursesWrapper>
  );
};

export default Courses;