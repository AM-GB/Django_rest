import React from 'react'



class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'repo': '',
            'user': []
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


    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.repo, this.state.user);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                <input type="text" name="repo" placeholder="repo" value={this.state.repo} onChange={(event) => this.handleChange(event)} />
                <select multiple name="user" className='form-control' onChange={(event) => this.handleChangeUser(event)}>
                    {this.props.user.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>

                <input type="submit" value="Create" />
            </form>
        );

    }
}

export default ProjectForm;
