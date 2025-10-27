const btnSubmit = document.getElementById("submit")
const inputName = document.getElementById('name')
const inputAge = document.getElementById('age')
const inputEmail = document.getElementById('email')

const btnList = document.getElementById('btnList')

//Crear una db de pouch

const db = new PouchDB('Personas')

function listarPersonas() {
    const personList = document.getElementById('personList')
    personList.innerHTML = '';



    db.allDocs({
        include_docs: true
    })
        .then((result) => {
            console.log('Personas en la base de datos', result)
            if (result.rows.length === 0) {
                personList.innerHTML = '<li>No hay personas registradas</li>'
                return
            }

            result.rows.forEach((row) => {
                const persona = row.doc;
                const li = document.createElement('li');
                li.textContent = `${persona.name} (${persona.age} años) - ${persona.email}`;
                personList.appendChild(li);
            });
        })
        .catch((err) => {
            console.log('Error al obtener la lista', err)
        })
}


btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const persona = {
        _id: new Date().toISOString(),
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value,
        status: 'pending'
    };

    db.put(persona)
        .then((response) => {
            console.log(response)
            console.log('Persona guardada con exito')
            inputName.value = '';
            inputAge.value = '';
            inputEmail.value = '';

            listarPersonas();

        }).catch((err) => {
            console.log('Error al guardar la persona', err)
        })
})

document.addEventListener('DOMContentLoaded', listarPersonas)