function users() {
  document.getElementById("cardHeader").innerHTML =
    "<h5>Listado de usuarios</h5>";
  const REQRES_ENDPOINT = "https://reqres.in/api/users?page=2";
  fetch(REQRES_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
  })
    .then((response) => {
      return response.json().then((data) => {
        return {
          status: response.status,
          info: data,
        };
      });
    })
    .then((result) => {
      if (result.status === 200) {
        let list_user = `<table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido</th>
            <th scope="col">Avatar</th>
            </tr>
            </thead>
            <tbody>
            `;
        result.info.data.forEach((element) => {
          list_user =
            list_user +
            `
                <tr>
                <td>${element.id}</td>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td><img src="${element.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `;
        });
        list_user =
          list_user +
          `
            </tbody>
            </table>
                      <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
            `;
        document.getElementById("info").innerHTML = list_user;
      } else {
        document.getElementById("info").innerHTML =
          "no existen ususarios en la BD";
      }
    });
}

function getUser(idUser) {
  const REQRES_ENDPOINT = "https://reqres.in/api/users/" + idUser;
  fetch(REQRES_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-api-key": "reqres-free-v1",
    }
  })
    .then((result) => {
      return result.json().then(
        data => {
        return {
          status: result.status,
          body: data
        }
      })
    })
    .then((response) => {
      if (response.status === 200) {
        const user = response.body.data;
        const modalUser = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
  <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
  <div class="card-body">
    <h5 class="card-title">Informacion del usuario: </h5>
    <p class="card-text"> Nombre: ${user.first_name}</p>
    <p class="card-text"> Nombre: ${user.last_name}</p>
  </div>
</div>
      </div>   
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`
        document.getElementById("viewModal").innerHTML = modalUser;
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"))
        modal.show()
      } else {
        document.getElementById("info").innerHTML =
          "<h3>No se encontro el usuario en la Api</h3>";
      }
    })
}