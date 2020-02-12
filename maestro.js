let Token;
let project;

async function FetchAPI(url, method='GET', data = {}, headers={}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': Token
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
    resp = await response.json();
  return resp
}


async function Login(){
    Token = document.getElementById('name').value;
    project = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/projects?id=10', "LIST");
    console.log(project);
    let elem = document.getElementById('input');
    elem.parentNode.removeChild(elem); 
    project_show()
}

function project_show(){    
    let project_length = project.length;
    for(i=0; i < project_length; i++){
        let div_elem = document.createElement("div");
        div_elem.id = 'd' + i;
        div_elem.className = "id";
        document.getElementById('mehdi').appendChild(div_elem);
        CreateCardProject(div_elem, i);
    }
}

function CreateCardProject(currentDiv, projectId){
    let idContent = document.createElement("p");
    currentDiv.appendChild(idContent);
    idContent.innerText = "ID: " + project[projectId].id; 

    let titleContent = document.createElement("p");
    currentDiv.appendChild(titleContent);
    titleContent.id = "pTitle" + projectId;
    titleContent.innerText = "Title: " + project[projectId].title;

    let tempoContent = document.createElement("p");
    currentDiv.appendChild(tempoContent);
    tempoContent.innerText = "Tempo: " + project[projectId].boarding; 
}

function SelectProject(e){
    let P1 = document.getElementById('d0');
    let P2 = document.getElementById('d1');
    let P3 = document.getElementById('d2');
    let P4 = document.getElementById('d3');
}

