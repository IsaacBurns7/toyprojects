const Course = ( {course} ) => {
    return (
        <div className = "course">
            <h2 className = "title">
            COURSE TITLE
            </h2>

            <button className = "showDescription">
                SHOW DESCRIPTION
            </button>
            <p className = "description">
                DESCRIPTION
            </p>

            <button className = "showProfessors">
                SHOW PROFESSORS
            </button>
            <div className = "professors">
                LIST OF PROFESSORS
            </div>
        </div>
    )
}

export default Course;