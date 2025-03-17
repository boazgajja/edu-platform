import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  
  // Sample data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    name: "Jane Smith",
    imageUrl: "/api/placeholder/200/200",
    totalPoints: 3750,
    rank: "Gold Scholar",
    memberSince: "January 2023",
    courses: [
      { id: 1, title: "Introduction to React", progress: 85, totalLessons: 12, completedLessons: 10 },
      { id: 2, title: "Advanced JavaScript", progress: 60, totalLessons: 15, completedLessons: 9 },
      { id: 3, title: "UX Design Fundamentals", progress: 45, totalLessons: 10, completedLessons: 4 },
      { id: 4, title: "Data Structures & Algorithms", progress: 30, totalLessons: 20, completedLessons: 6 },
      { id: 5, title: "Machine Learning Basics", progress: 20, totalLessons: 8, completedLessons: 1 },
      { id: 6, title: "Web Development with Node.js", progress: 75, totalLessons: 14, completedLessons: 10 },
      { id: 7, title: "Python for Data Science", progress: 50, totalLessons: 16, completedLessons: 8 }
    ],
    pointsHistory: [
      { day: 'Mon', points: 120 },
      { day: 'Tue', points: 180 },
      { day: 'Wed', points: 100 },
      { day: 'Thu', points: 210 },
      { day: 'Fri', points: 150 },
      { day: 'Sat', points: 90 },
      { day: 'Sun', points: 130 }
    ]
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerPage = 5;

  const nextCourses = () => {
    if (currentIndex + coursesPerPage < userData.courses.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCourses = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle edit profile click
  const handleEditProfile = () => {
    navigate('/profile/edit', { state: { userData } });
  };

  const visibleCourses = userData.courses.slice(currentIndex, currentIndex + coursesPerPage);

  return (
    <div className="page-container">
      {/* Main Content */}
      <main className="main-content">
        {/* Profile Overview */}
        <div className="profile-overview">
          <div className="profile-content">
            <div className="profile-image-container">
              {userData.imageUrl ? (
                <img 
                  src={userData.imageUrl} 
                  alt={userData.name} 
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span>{userData.name.charAt(0)}</span>
                </div>
              )}
            </div>
            
            <div className="profile-info">
              <h2 className="profile-name">{userData.name}</h2>
              
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-icon">🏆</span>
                  <span>{userData.rank}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span>Member since {userData.memberSince}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📚</span>
                  <span>{userData.courses.length} Enrolled Courses</span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button 
                className="edit-profile-button"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
            
            <div className="profile-points">
              <div className="points-value">{userData.totalPoints}</div>
              <div className="points-label">Total Points</div>
            </div>
          </div>
        </div>

        {/* Courses Progress Section */}
        <div className="courses-section">
          <div className="section-header">
            <h3 className="section-title">Course Progress</h3>
            <div className="navigation-buttons">
              <button 
                onClick={prevCourses} 
                disabled={currentIndex === 0}
                className={`nav-button ${currentIndex === 0 ? 'disabled' : ''}`}
              >
                &lt;
              </button>
              <button 
                onClick={nextCourses} 
                disabled={currentIndex + coursesPerPage >= userData.courses.length}
                className={`nav-button ${currentIndex + coursesPerPage >= userData.courses.length ? 'disabled' : ''}`}
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="courses-list">
            {visibleCourses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-header">
                  <h4 className="course-title">{course.title}</h4>
                  <span className="lesson-count">{course.completedLessons}/{course.totalLessons} lessons</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="course-footer">
                  <span className="progress-text">{course.progress}% complete</span>
                  <a href={`/course/${course.id}`} className="continue-link">
                    Continue learning
                    <span className="arrow-icon">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Graph */}
        <div className="points-graph-section">
          <h3 className="section-title">Points Earned This Week</h3>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData.pointsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#4f46e5" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} EduLearn Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;