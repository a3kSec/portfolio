import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';


const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems:'center',
        flexDirection: 'column',
        height: 700,
    },

    form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '80vmin', 
    },
    width: "100%",
  },
    
    textField: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      }
    },
    
    button: {
        background: 'white',
        border: 0,
        borderRadius: 3,
        color: "#727272",
        height: 40,
        width: 40,
        padding: '0 30px',
        '&:hover': {
          background:"white"
        },
      }
}));


export default function Contact() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [messageHelperText, setMessageHelperText] = useState("");
  const [isEmailError, setEmailError] = useState(false);
  const [isMessageError, setMessageError] = useState(false);
  

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(isValidForm()){
      submitForm(evt);
      setEmail("")
      setMessage("")
      setAction("")
    }
    else{
      isValidEmail();
      isValidMessage();
    }
  }

    const submitForm = (evt) => {
      var data = new FormData();
      const xhr = new XMLHttpRequest();
      
     
      evt.preventDefault();

      data.append("email", email);
      data.append("message", message);
      
      xhr.open('POST', action);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200){
        console.log("success")
        } else {
        console.log("network error. form not submitted")
        }
      };
      xhr.send(data);
    }
    
  
  const isValidForm = () => {
    if (isValidEmail() && isValidMessage()){
      setAction("https://formspree.io/xbjkvzaj");
      return true;
    }
    else{
      setAction("");
      return false;
    }
  }

  const isValidEmail = () => {
    if(validator.isEmail(email)){
      clearEmailErrors();
      return true;
    }
    else{
        showEmailErrors();
      return false;
  }
}

  const isValidMessage = () => {
    if(!validator.isEmpty(message)){
        clearMessageErrors();
      return true;
    }
    else{
        showMessageErrors();
      return false;
  }
}
const showEmailErrors = () => {
  setEmailHelperText("invalid email");
  setEmailError(true);
}

const showMessageErrors = () => {
  setMessageHelperText("cannot be empty");
  setMessageError(true);
}

const clearEmailErrors = () => {
  setEmailHelperText("");
  setEmailError(false);
}

const clearMessageErrors = () => {
  setMessageHelperText("");
  setMessageError(false);
}


  return(
    <div className={classes.root}>
        <form className={classes.form} autoComplete="off" action={action} method="POST" onSubmit={handleSubmit}>
            <TextField
                error={isEmailError}
                type="email"
                value={email}
                name="email"
                label="Email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
                helperText={emailHelperText}
                onInput={clearEmailErrors}
                onBlur={isValidEmail}
                required
                autoComplete="true"
                className={classes.textField}
                spellcheck="false"
                InputProps={{
                  style: {
                    color: "white"
                  }
                  }}
            />
            <br/>
           <TextField
                error={isMessageError}
                type="text"
                name="message"
                placeholder="Enter message"
                value={message}
                label="Message"
                multiline
                rows="15"
                helperText={messageHelperText}
                onInput={clearMessageErrors}
                onBlur={isValidMessage}
                required
                onChange={e => setMessage(e.target.value)}
                spellcheck="false"
                InputProps={{
                  style: {
                    color: "white"
                  }
                  }}
                className={classes.textField}
            />
            <input type="hidden" name="_next" value="https://jmsct.github.io/portfolio/contact"/>
            <input type="hidden" name="_gotcha" />
            <br/>
            <br/>
            <Button 
                type="submit" 
                className={classes.button} 
                onClick={isValidForm}
                variant="contained"
                color="primary"
                >
              Send
            </Button>
        </form>
    </div>
  );
}

