// https://624f3f05bdda77e9a9bc0f10.mockapi.io/users
const queryId = (idName) => document.getElementById(idName)
const table = document.getElementById("table")
const container = document.getElementById("container")

const getUsers = () => {
    fetch("https://624f3f05bdda77e9a9bc0f10.mockapi.io/users")
        .then(res => res.json())
        .then(data => createTable(data))
        .catch(err => console.log(err))
}
getUsers()

const userDetail = (id) => {
    fetch(`https://624f3f05bdda77e9a9bc0f10.mockapi.io/users/${id}`)
        .then(res => res.json())
        .then(data => createUserDetail(data))
        .catch(err => console.log(err))
}

const editUser = (id) => {
    fetch(`https://624f3f05bdda77e9a9bc0f10.mockapi.io/users/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveUserInfo())
    })
    .catch(err => console.log(err))
}

const deleteUser = (id) => {
    fetch(`https://624f3f05bdda77e9a9bc0f10.mockapi.io/users/${id}`, {
        method: "DELETE"
    })
    .catch(err => console.log(err))
    .finally(() => window.location = "index.html")
}


const createTable = (users) => {
    for (const user of users) { // users es un array de obj
        //console.log(user) // es un objeto
        const { id, name, age } = user
        table.innerHTML += `
            <tr>
                <th scope="row">${id}</th>
                <td>${name}</td>
                <td>${age}</td>
                <td>
                    <button class="btn btn-secondary" onclick="userDetail(${id})">User Detail</button>
                </td>
            </tr>
        `
    }
}

const cleanTable = () => container.innerHTML = ""

const createUserDetail = (user) => {
    cleanTable()
    const { id, name, age, hasExperience, coverLetter } = user
    container.innerHTML = `
    <div class="container">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://via.placeholder.com/250" class="img-fluid rounded-start" alt="Avatar de ${name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body capitalize">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"><b>Age: </b>${age}</p>
                        <p class="card-text"><b>Has Experience?: </b>${hasExperience}</p>
                        <p class="card-text"><b>Cover Letter: </b>${coverLetter}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-success m-1" onclick="showForm(${id})">Edit</button>
            <button class="btn btn-danger m-1" onclick="showAlertDelete(${id})">Delete</button>
            <a href="index.html" class="btn btn-small btn-dark m-1">< Back</a>
        </div>
    </div>
    `
}

// PUT - Editar una informacion existente

const showForm = (id) => {
    const user = userDetail(id)
    const { id, name, age, hasExperience, coverLetter } = user
    container.innerHTML += `
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" placeholder="Name" value="${name}">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Age</label>
            <input type="number" class="form-control" id="age" placeholder="Age" value="${age}">
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Do you have experience?</label>
            <select class="form-select" aria-label="Default select example" id="experience">
                <option selected>Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Cover Letter</label>
            <textarea class="form-control" id="coverLetter" rows="3">${coverLetter}</textarea>
        </div>
        <button class="btn btn-success" type="submit" id="submit" onclick="editUser(${id})">Submit</button>
     `
}

const saveUserInfo = () => {
    return {
        name: queryId("name").value,
        age: parseInt(queryId("age").value),
        hasExperience: (queryId("experience").value === "true") ? true : false,
        coverLetter: queryId("coverLetter").value
    }
}

// DELETE - Eliminar una informacion
const showAlertDelete = (id) => {
    container.innerHTML += `
        <div class="alert alert-danger" role="alert">
            Are you sure you want to delete this user?
            <button class="btn btn-danger" onclick="deleteUser(${id})">Delete</button>
        </div>
    `
}