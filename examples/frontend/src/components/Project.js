import React from 'react'
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, deleteProject }) => {
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
            <td><button onClick={() => deleteProject(project.id)}
                type='button'>Delete</button></td>
            {/* <td><button type='button'>Delete</button></td> */}
        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Repo
                    </th>
                    <th>
                        User_admin
                    </th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            {/* <Link to='/books/create'>Create</Link> */}
        </div >
    )
}

export default ProjectList;
