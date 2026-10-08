const form = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const phone = document.querySelector("#phone");
const formMessage = document.querySelector("#form-message");
const phoneError = document.querySelector("#phoneError");
const EMAIL = /^[\w.]+@[\w.]+\.\w+$/;
const phonePattern = /^09\d{8}$/;
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const phoneValue = phone.value.trim();
if (!name) {
        formMessage.textContent = "Please enter your name.";
        return;
    }

    if (name.length < 2) {
        formMessage.textContent = "Name must be at least 2 characters.";
        return;
    }


    if (!phoneValue) {
        formMessage.textContent = "Please enter your phone.";
        return;
    }

    if (!phonePattern.test(phoneValue)) {
        formMessage.textContent = "Please enter a valid phone number.";
        return;
    }


    if (!email) {
        formMessage.textContent = "Please enter your email.";
        return;
    }

    if (!EMAIL.test(email)) {
        formMessage.textContent = "Please enter a valid email.";
        return;
    }


    if (!message) {
        formMessage.textContent = "Please enter your message.";
        return;
    }
    saveContactInfo(name, email, phoneValue, message);
    formMessage.textContent = "Message sent successfully!";
    form.reset();
    alert`Message sent successfully!`
});

function saveContactInfo(name, email, phone, message) {
    const contactInfo = { name: name, email: email, phone: phone, message: message};
    localStorage.setItem("contactInfo",JSON.stringify(contactInfo));}
function loadContactInfo() {
    const savedInfo = localStorage.getItem("contactInfo");
    if (!savedInfo) {
        return;}
    const contactInfo = JSON.parse(savedInfo);
    nameInput.value = contactInfo.name;
    emailInput.value = contactInfo.email;
    phone.value = contactInfo.phone;
}
loadContactInfo();
const projectsContainer =document.querySelector("#projects-container");
function openGithub(project) {
    return new Promise(function (resolve) {const newPage = window.open("", "_blank");
        if (!newPage) {
            resolve();
            return;  }
          newPage.document.body.innerHTML=` <p>git hub page</p>`
        setTimeout(function () {
            newPage.location.href = project.github;
            resolve();}, 90000);
    });

}
async function getProjects() {
    const response =await fetch("./projects.json");
    if (!response.ok) {
        throw new Error("Failed to load projects");
    }
    const projects = await response.json();
    return projects;}

function renderProjects(projects) {
    projectsContainer.innerHTML = "";
    projects.forEach(function (project) {const article =document.createElement("article");
        article.innerHTML = `
           <img src="${project.image}" alt="${project.name}" />
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.technologies.join(" • ")}
            </div>
            <div class="project-buttons">
               ${project.github?`
                    <a href="#" class="github-link"> GitHub</a>`:`
                    <span> GitHub link is not available yet.</span>`}
            </div>       `;
        projectsContainer.append(article);

        if (project.github) {
            const githubLink = article.querySelector(".github-link");
            githubLink.addEventListener("click",
                async function (event) {event.preventDefault();
                    await openGithub(project);
                }
            );}
    });

}
async function loadProjects() {
    try {
        const projects = await getProjects();
        renderProjects(projects);
    } catch (error) {
        projectsContainer.textContent =
            "Unable to load projects.";

        console.error(error);
    }
}
loadProjects();
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();