import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'quiz';
  courseId: string;
}

export const useCMS = (courseId: string) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    // Fetch content items from API
    const fetchContentItems = async () => {
      // Replace with actual API call
      const mockItems: ContentItem[] = [
        { id: '1', title: 'Introduction', content: 'Welcome to the course...', type: 'text', courseId },
        { id: '2', title: 'Video Lecture', content: 'https://example.com/video.mp4', type: 'video', courseId },
        { id: '3', title: 'Quiz 1', content: JSON.stringify({ questions: [] }), type: 'quiz', courseId },
      ];
      setContentItems(mockItems);
    };

    fetchContentItems();
  }, [courseId]);

  const addContentItem = async (newItem: Omit<ContentItem, 'id'>) => {
    // Send new content item to API
    // Replace with actual API call
    const createdItem: ContentItem = { ...newItem, id: Date.now().toString() };
    console.log('Adding content item:', createdItem);

    setContentItems([...contentItems, createdItem]);
  };

  const updateContentItem = async (updatedItem: ContentItem) => {
    // Send updated content item to API
    // Replace with actual API call
    console.log('Updating content item:', updatedItem);

    setContentItems(contentItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteContentItem = async (itemId: string) => {
    // Send delete request to API
    // Replace with actual API call
    console.log('Deleting content item:', itemId);

    setContentItems(contentItems.filter(item => item.id !== itemId));
  };

  return { contentItems, addContentItem, updateContentItem, deleteContentItem };
};