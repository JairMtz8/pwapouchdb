const btnSubmit = document.getElementById("submit");
const inputName = document.getElementById('name');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');
const btnList = document.getElementById('btnList');

// Crear base de datos PouchDB
const db = new PouchDB('Personas');

function listarPersonas() {
    const personList = document.getElementById('personList');
    personList.innerHTML = '';

    db.allDocs({ include_docs: true })
        .then((result) => {
            console.log('Personas en la base de datos', result);
            if (result.rows.length === 0) {
                personList.innerHTML = '<li>No hay personas registradas</li>';
                return;
            }

            result.rows.forEach((row) => {
                const persona = row.doc;
                const li = document.createElement('li');
                li.textContent = `${persona.name} (${persona.age} años) - ${persona.email}`;

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Eliminar';
                btnDelete.className = 'btn btn-danger btn-sm';
                btnDelete.addEventListener('click', () => {
                    eliminarPersona(persona);
                });

                li.appendChild(btnDelete);
                personList.appendChild(li);
            });
        })
        .catch((err) => {
            console.log('Error al obtener la lista', err);
        });
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
        .then(() => {
            console.log('Persona guardada con éxito');
            inputName.value = '';
            inputAge.value = '';
            inputEmail.value = '';
            listarPersonas();
        })
        .catch((err) => {
            console.log('Error al guardar la persona', err);
        });
});

function eliminarPersona(persona) {
    db.remove(persona)
        .then(() => {
            console.log('Persona eliminada con éxito');
            listarPersonas();
        })
        .catch((err) => {
            console.log('Error al eliminar', err);
        });
}

document.addEventListener('DOMContentLoaded', listarPersonas);
