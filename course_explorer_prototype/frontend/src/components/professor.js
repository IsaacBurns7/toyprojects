const Professor = ( {professor} ) => {
    const {name, sections, reviews} = professor;

    return (
        <div className = "professor-card">
            <h3>{name}</h3>
            <div className = "sections-list">
                <h4>Sections ({sections && sections.length})</h4>
                <ul>
                    {sections && sections.map((section, index) => (
                        <li key = {index}>{section.gpa}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Professor;