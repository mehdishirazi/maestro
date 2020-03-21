let Token;
let projects;
let issues;
let projectId;
let draftIssue;

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
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
    resp = await response.json();
  return resp
}


async function Login(){
    Token = document.getElementById('name').value;
    projects = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/projects', "LIST");
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

    let btnCreateNugget = document.createElement("BUTTON");
    currentDiv.appendChild(btnCreateNugget);
    btnCreateNugget.innerHTML = 'Create Nugget';
    btnCreateNugget.id = 'CreateNugget' + project.id;
    btnCreateNugget.className = "createNugget";
    btnCreateNugget.onclick = CreateNugget;
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


function CreateNugget(e){
    projectId = e.target.id.slice(12, 14); 
    draft_issue();
    let projectDiv = document.getElementById('project');
    projectDiv.parentNode.removeChild(projectDiv);
  
    let nuggetDiv = document.createElement('div');
    document.getElementById('app').appendChild(nuggetDiv);
    nuggetDiv.className = "nugget";
  
    let save = document.createElement('BUTTON');
    nuggetDiv.appendChild(save);
    save.id = 'save';
    save.className = 'save_btn';
    save.innerHTML = 'Save';
    save.onclick = finilize_issue;
    
    for (i=0; i < 4; i++){
        let input_name = document.createElement("INPUT");
        let span_name = document.createElement("SPAN");
        nuggetDiv.appendChild(input_name);
        nuggetDiv.appendChild(span_name);
        input_name.id = 'input' + i;
        span_name.id = 'span' + i;
        if(input_name.id == 'input0'){
            let text = document.createTextNode('Name');
            span_name.appendChild(text);
            input_name.before(span_name);
        }
        else if(input_name.id == 'input1'){
            let text = document.createTextNode('Type');
            span_name.appendChild(text);
            input_name.before(span_name);
        }
        else if(input_name.id == 'input2'){
            let text = document.createTextNode('Priority');
            span_name.appendChild(text);
            input_name.before(span_name);
        }
        else if(input_name.id == 'input3'){
            let text = document.createTextNode('Description');
            span_name.appendChild(text);
            input_name.before(span_name);
        }
        input_name.className = "nugget-grid";
        span_name.className = "nugget-grid";
    }
}


async function draft_issue(){
    draft_issue = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/draftissues', "DEFINE");
    draftIssue = draft_issue.id;
}


async function finilize_issue(){
    let name = document.getElementById('input0').value;
    let kind = document.getElementById('input1').value;
    let priority = document.getElementById('input2').value;
    let description = document.getElementById('input3').value;
    finilize = await FetchAPI(
        'https://milestone-maestro.carrene.com/apiv1/draftissues/' + draftIssue, "FINALIZE",
            data = {"title": name, "stage": "triage", "description": description, "projectId": projectId, 
              "priority": priority, "kind": kind, "days": 3}
    );
}
