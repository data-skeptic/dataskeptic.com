import axios from "axios"

export default function contact_form_send(name, email, msg, dispatch) {
    if (msg == undefined) {
        msg = ""
    }
    if (email == undefined) {
        email = ""
    }
    // TODO: convert this to use SES directly
    var url = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact"
    var error = ""
    var data = {name, email, msg, error}
    axios
        .post(url, JSON.stringify(data))
        .then(function (result) {
            var success = true
            if (dispatch != undefined) {
                // Dispatch is undefined in cases where we're using this for some logging or alerting, not the ContactForm
                dispatch({type: "CONTACT_FORM_COMPLETE", payload: {success}})
            }
        })
        .catch(function (err) {
            console.log(err)
            var success = false
            if (dispatch != undefined) {
                dispatch({type: "CONTACT_FORM_COMPLETE", payload: {success}})
            }
        });
}
