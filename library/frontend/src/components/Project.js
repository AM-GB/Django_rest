import React from 'react'
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo}
                {/* <Link to={`/project/${project.name}`}>{project.name}</Link> */}
            </td>
            <td>
                {project.user_admin}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <th>
                Name
           </th>
            <th>
                Repo
           </th>
            <th>
                User_admin
           </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList;
