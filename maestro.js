let Token;
let projects;
let issues;

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
    projects = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/projects', "LIST");
    console.log(projects);
    let elem = document.getElementById('input');
    elem.parentNode.removeChild(elem); 
    ProjectShow()
}


function ProjectShow(){    
    let project_length = projects.length;
    let projectDiv = document.createElement("div");
    projectDiv.id = 'project';

    document.getElementById('app').appendChild(projectDiv);
    for(i=0; i < project_length; i++){
        let div_elem = document.createElement("div");
        div_elem.id = 'd' + projects[i].id;
        div_elem.className = "id";
        projectDiv.appendChild(div_elem);
        CreateCardProject(div_elem, projects[i]);
    }
}


function CreateCardProject(currentDiv, project){
    let idContent = document.createElement("p");
    currentDiv.appendChild(idContent);
    idContent.innerText = "ID: " + project.id; 

    let titleContent = document.createElement("p");
    currentDiv.appendChild(titleContent);
    titleContent.id = "pTitle" + project.id;
    titleContent.innerText = "Title: " + project.title;

    let tempoContent = document.createElement("p");
    currentDiv.appendChild(tempoContent);
    tempoContent.innerText = "Tempo: " + project.boarding; 

    let btnContent = document.createElement("BUTTON");
    currentDiv.appendChild(btnContent);
    btnContent.innerHTML = 'Nuggets';
    btnContent.id = 'btn' + project.id;
    btnContent.onclick = SelectProject;
}


async function SelectProject(e){
    projectId = e.target.id.substr(3, e.target.id.length -2);
    console.log(projectId);
    issues = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/issues?projectId=' + projectId, "LIST");
    IssueShow();
}

function IssueShow(){
    let projectDiv = document.getElementById('project')
    projectDiv.parentNode.removeChild(projectDiv); 

    let issueDiv = document.createElement("div");
    issueDiv.id = 'issue';

    document.getElementById('app').appendChild(issueDiv);

    for(i=0; i < issues.length; i++){
        let div_elem = document.createElement("div");
        div_elem.id = 'd' + issues[i].id;
        div_elem.className = "id";
        issueDiv.appendChild(div_elem);
        CreateCardIssue(div_elem, issues[i]);
    }
}


function CreateCardIssue(currentDiv, issue){
    let idContent = document.createElement("p");
    currentDiv.appendChild(idContent);
    idContent.innerText = "ID: " + issue.id; 

    let titleContent = document.createElement("p");
    currentDiv.appendChild(titleContent);
    titleContent.id = "pTitle" + issue.id;
    titleContent.innerText = "Title: " + issue.title;

}

