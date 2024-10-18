import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ForumsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ForumList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ForumItem = styled.li`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ForumTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const ForumDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const ReplyButton = styled.button`
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

const ReplyForm = styled.form`
  margin-top: 1rem;
`;

const SubmitReplyButton = styled(ReplyButton)`
  margin-top: 1rem;
`;

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: Date;
  content: string;
}

const Forums: React.FC = () => {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // Fetch forum posts from API
    const fetchForumPosts = async () => {
      // Replace with actual API call
      const mockForumPosts: ForumPost[] = [
        {
          id: '1',
          title: 'React Hooks: Best Practices',
          author: 'John Doe',
          date: new Date('2024-03-15'),
          content: 'What are your thoughts on using React Hooks in large-scale applications?',
        },
        {
          id: '2',
          title: 'JavaScript Performance Optimization',
          author: 'Jane Smith',
          date: new Date('2024-03-20'),
          content: 'Let\'s discuss techniques for optimizing JavaScript performance in web applications.',
        },
      ];
      setForumPosts(mockForumPosts);
    };

    fetchForumPosts();
  }, []);

  const handleReply = (postId: string) => {
    setReplyingTo(postId);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement reply submission logic
    console.log(`Submitting reply to post ${replyingTo}: ${replyContent}`);
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <ForumsWrapper>
      <h2>Discussion Forums</h2>
      <ForumList>
        {forumPosts.map((post) => (
          <ForumItem key={post.id}>
            <ForumTitle>{post.title}</ForumTitle>
            <ForumDetails>
              <span>By: {post.author}</span>
              <span>Posted: {post.date.toLocaleDateString()}</span>
            </ForumDetails>
            <p>{post.content}</p>
            <ReplyButton onClick={() => handleReply(post.id)}>Reply</ReplyButton>
            {replyingTo === post.id && (
              <ReplyForm onSubmit={handleSubmitReply}>
                <ReactQuill
                  value={replyContent}
                  onChange={setReplyContent}
                  placeholder="Write your reply..."
                />
                <SubmitReplyButton type="submit">Submit Reply</SubmitReplyButton>
              </ReplyForm>
            )}
          </ForumItem>
        ))}
      </ForumList>
    </ForumsWrapper>
  );
};

export default Forums;