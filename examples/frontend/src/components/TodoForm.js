import React from 'react'



class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'project': '',
            'user': [],
            'description': '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleChangeUser(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let user = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            user.push(event.target.selectedOptions.item(i).value);
        }
        console.log(user);

        this.setState(
            {
                'user': user
            }
        );
    }


    handleChangeProject(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let project = [];
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(event.target.selectedOptions.item(i).value);
        }
        console.log(project);

        this.setState(
            {
                'project': project
            }
        );
    }


    handleSubmit(event) {
        this.props.create_todo(this.state.project, this.state.user, this.state.description);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select multiple name="project" className='form-control' onChange={(event) => this.handleChangeProject(event)}>
                    {this.props.project.map((item) => <option value={item.id}>{item.name}</option>)}
                </select>
                <select multiple name="user" className='form-control' onChange={(event) => this.handleChangeUser(event)}>
                    {this.props.user.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>
                <input type="text" name="description" placeholder="description" value={this.state.description} onChange={(event) => this.handleChange(event)} />


                <input type="submit" value="Create" />
            </form>
        );

    }
}

export default TodoForm;