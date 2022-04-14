// POST - Cargar nueva informacion
const queryId = (idName) => document.getElementById(idName)

const registerUser = (e) => {
    e.preventDefault()
    fetch("https://624f3f05bdda77e9a9bc0f10.mockapi.io/users", {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveUserInfo())
    })
    .then(res => {
        if (res.ok) {
            alertSuccess()
        }
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => {
        window.location = "createUser.html"
    }, 2000))
}

const saveUserInfo = () => {
    return {
        name: queryId("name").value,
        age: parseInt(queryId("age").value),
        hasExperience: (queryId("experience").value === "true") ? true : false,
        coverLetter: queryId("coverLetter").value
    }
}

const alertSuccess = () => {
    queryId("container").innerHTML += `
        <div class="alert alert-success m-3" role="alert">
            The user has been added successfully
        </div>
    `
}

queryId("submit").addEventListener("click", (e) => registerUser(e))