// Initialize Project Data Transfer Object
class ProjectDTO {
    constructor(project) {
        this.project_id = project.project_id;
        this.category = project.category_id;
        this.title = project.title;
        this.targetAmount = project.target_amount;
        this.currentAmount = project.current_amount;
        this.description = project.description;
        this.status = project.status;
        this.startDate = project.start_date;
        this.endDate = project.end_date;
        this.region = project.region;
        this.country = project.country;
    }
}

module.exports = ProjectDTO;