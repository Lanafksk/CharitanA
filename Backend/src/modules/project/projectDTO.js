// Initialize Project Data Transfer Object
class ProjectDTO {
    constructor(project) {
        this.project_id = project.project_id;
        this.category = project.category;
        this.charity_id = project.charity_id;
        this.title = project.title;
        this.target_amount = project.target_amount;
        this.current_amount = project.current_amount;
        this.description = project.description;
        this.status = project.status;
        this.start_date = project.start_date;
        this.end_date = project.end_date;
        this.region = project.region;
        this.country = project.country;
        this.images = project.images;
    }
}

module.exports = ProjectDTO;