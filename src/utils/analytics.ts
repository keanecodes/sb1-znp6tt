import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface AnalyticsData {
  courseId: string;
  studentCount: number;
  averageGrade: number;
  completionRate: number;
}

export const useAnalytics = (courseId: string) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Fetch analytics data from API
    const fetchAnalyticsData = async () => {
      // Replace with actual API call
      const mockData: AnalyticsData = {
        courseId,
        studentCount: 50,
        averageGrade: 85.5,
        completionRate: 0.75,
      };
      setAnalyticsData(mockData);
    };

    fetchAnalyticsData();
  }, [courseId]);

  const renderChart = (canvasId: string) => {
    if (!analyticsData) return;

    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Student Count', 'Average Grade', 'Completion Rate'],
        datasets: [{
          label: 'Course Analytics',
          data: [analyticsData.studentCount, analyticsData.averageGrade, analyticsData.completionRate * 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return { analyticsData, renderChart };
};