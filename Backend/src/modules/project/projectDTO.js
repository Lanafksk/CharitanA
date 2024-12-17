class ProjectDTO {
    constructor(project) {
        this.id = project._id;
        this.title = project.title;
        this.description = project.description;
        this.targetAmount = project.target_amount;
        this.currentAmount = project.current_amount;
        this.status = project.status;
    }
}

module.exports = ProjectDTO;