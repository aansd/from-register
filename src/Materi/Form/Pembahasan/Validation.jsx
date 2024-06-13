import React from "react";
import Validator from 'validatorjs';

const ShowErrors = ({errors}) => {
    return (
       
            <ul style={{color: 'red', marginLeft: '-20px'}}>
                {
                    errors.map((error, i) => <li key={i}>{error}</li>)
                }
            </ul>
    )
}
const Input = ({label, type, name, onChange}) => {
    return (
        <div>
            <label>
            {label} : 
            </label>
            <br />
            <input type={type} name={name} onChange={e => onChange(e.target.value)}/>
        </div>
    )
}
const Textarea = ({label, type, name, onChange}) => {
    return (
        <div>
        <label>
        {label} : 
        </label>
        <br />
        <textarea name={name} type={type} rows={5} cols={30} onChange={e => onChange(e.target.value)}></textarea>
        </div>
    )
}
const Radio = ({label, name, onChange}) => {
    return (
        <div>
            <label>
                {label} :
            </label>
            <br />
            <input type="radio" name={name} value="Laki-Laki" onChange={e => onChange(e.target.value)}/> Laki-Laki
            <br />
            <input type="radio" name={name} value="Perempuan" onChange={e => onChange(e.target.value)}/> Perempuan
        </div>
    )
}
class Validation extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        gender: '',
        alamat: '',
        errors: []
    }
    handleSubmit = event => {
        event.preventDefault();
        const { email, username, password, gender, alamat } = this.state;
        let data = {
            email, username, password, gender, alamat
          };
          
          let rules = {
            email: 'required|email',
            username: 'required',
            password: 'required|min:8',
            gender: 'required',
            alamat: 'required',
          };

          let validation = new Validator(data, rules);
        validation.passes();

        let errors = [
            ...validation.errors.get('email'),
            ...validation.errors.get('username'),
            ...validation.errors.get('password'),
            ...validation.errors.get('gender'),
            ...validation.errors.get('alamat')
        ];

        this.setState({ errors });

        if (errors.length === 0) {
            alert(`
                Email: ${this.state.email}
                Username: ${this.state.username}
                Password: ${this.state.password}
                Gender: ${this.state.gender}
                Alamat: ${this.state.alamat}
            `);

            this.setState({
                email: '',
                username: '',
                password: '',
                gender: '',
                alamat: ''
            });
        }
    
    }
    render() {
        const style = {
            width: '400px',
            margin: '100px auto 0',
            border: '1px solid black',
            padding: '10px '
        }
        return (
            <div style={style}>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.errors && <ShowErrors errors={this.state.errors}/>
                    }
                    <h4>Form Register</h4>
                    <Input type="email" name="email" label="Email" onChange={value => this.setState({email: value})}/>
                    <Input type="text" name="username" label="User Name" onChange={value => this.setState({username: value})}/>
                    <Input type="password" name="password" label="Password" onChange={value => this.setState({password: value})}/>
                    <Radio name="gender" label="Jenis Kelamin" onChange={value => this.setState({gender: value})}/>
                    <Textarea name="alamat" label="Alamat" onChange={value => this.setState({alamat: value})}></Textarea>
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Validation;