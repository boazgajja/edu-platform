import React, { useState } from "react";
import toast from "react-hot-toast";

function Courses() {
    const courses = [
        "Data Structures",
        "Web Technology",
        "Data Science",
        "Cloud Computing",
        "Cyber Security",
        "UI/UX Design"
    ];

    const subCoursesMap = {
        "Data Structures": ["Arrays", "Linked Lists", "Trees", "Graphs", "Heap"],
        "Web Technology": ["HTML", "CSS", "JavaScript"],
        "Data Science": ["Machine Learning", "Data Analysis", "Big Data"],
        "Cloud Computing": ["AWS", "Azure", "Google Cloud"],
        "Cyber Security": ["Network Security", "Ethical Hacking", "Cryptology"],
        "UI/UX Design": ["UI Principles", "UX Research", "Prototyping"]
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [selectedSubcourse, setSelectedSubcourse] = useState();

    const [selectedCoursesMap, setSelectedCoursesMap] = useState(new Map());

    function handleCourseClick(course) {
        setSelectedCourse(course);
    }

    function handleTest(subcourse, index) {
        toast.success('Quiz started');
        setSelectedSubcourse(subcourse);
        setActiveIndex(index);

        const subcourses = selectedCoursesMap.get(selectedCourse) || [];
        if (!subcourses.includes(subcourse)) {
            subcourses.push(subcourse);
        }
        selectedCoursesMap.set(selectedCourse, subcourses);

        console.log(selectedCoursesMap);

        window.location.href = "/exam/quiz";
    }

    return (
        <div className="maincontainer">
            <div className="corecourse">
                <h1>courses</h1>
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}
                            onClick={() => handleCourseClick(course)}
                            className={selectedCourse === course ? "coursename selected" : "coursename"}>
                            {course}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="subcourses">
                {selectedCourse && (
                    <ul>
                        {subCoursesMap[selectedCourse].map((subCourse, index) => (
                            <li key={index} className="subcoursename">
                                {subCourse}
                                <button type="submit"
                                    className="start-course-test"
                                    onClick={() => handleTest(subCourse, index)}>Start</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

export default Courses;