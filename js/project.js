import { projects } from "./project-objects.js"

class project {

    #template = null

    /**
     * @param {string} name 
     * @param {string} desc 
     * @param {Array} tags 
     * @param {string} thumb_path 
     */
    constructor ( name, desc, tags, thumbPath = "images/project-thumb.jpg", gitUrl ) {
        this.name = name
        this.desc = desc
        this.tags = tags
        this.thumbPath = thumbPath
        this.gitUrl = gitUrl

        // getting template
        const templateStr = document.querySelector("#project-item-layout").cloneNode(true).innerHTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(templateStr, "text/html")
        this.#template = doc.body.firstElementChild


        // thumbnail image url/path
        this.#template.querySelector(".thumb img").setAttribute("src", this.thumbPath)
        this.#template.querySelector(".thumb img").setAttribute("alt", "miniature projet")
        
        // project content
        this.#template.querySelector(".content h3").innerText = this.name
        this.#template.querySelector(".content p").innerText = this.desc

        // url 
        this.#template.querySelector("a").setAttribute("href", this.gitUrl)

    }

    toTemplate () {
        return this.#template
    }

    asLinkItem () {

        const template = this.toTemplate().cloneNode(true)
        const a = document.createElement("a")

        a.setAttribute("href", this.gitUrl)
        a.innerHTML =  template.innerHTML

        template.innerHTML = ""
        template.appendChild(a)
        return template
    }

}

class projectList {

    #projects = []
    #template = null
    #isScrolling = null
    #prevScrollLeft = null
    #prevPageX = null

    /**
     * @param {Array} projects 
     */
    constructor (projects = []) {
        this.#projects = projects

        // project-list-layout
        const templateStr = document.querySelector("#project-list-layout").cloneNode(true).innerHTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(templateStr, "text/html")
        this.#template = doc.body.firstElementChild

        // adding child
        this.addAllProjectsToTemplate()

        // add to DOM
        this.contener = document.querySelector(".project-contener")
        this.addTo(this.contener)

        // sliding
        this.addSliding() 

    }

    // -- methods 

    getProjects () {
        return this.#projects
    }

    /**
     * @param {HTMLElement} element 
     */
    addTo (element) {
        element.prepend(this.#template)
    }

    addAllProjectsToTemplate () {
        this.#projects.forEach(element => {
            this.#template.prepend(element.toTemplate())
        })
    }
    /**
     * @param {project} project 
     */
    addProjectToTemplate (project) {
        this.#template.prepend(project.toTemplate())
    }

    /**
     * @param {project} project 
     */
    addProject(project) {
        this.#projects.push(project)
        this.addProjectToTemplate(project)
        return project
    }

    getTemplate () {
        return this.#template
    }

    activeScrolling (event) {
        this.#template.classList.add("remove-smooth")

        this.#isScrolling = true
        this.#prevScrollLeft = this.#template.scrollLeft
        this.#prevPageX = event.pageX

    }

    desableScrolling () {
        this.#template.classList.remove("remove-smooth")

        this.#isScrolling = false
    }

    addSliding ( ) {
        
        this.#template.addEventListener("mousemove", this.scroll.bind(this))
        this.#template.addEventListener("mousedown", this.activeScrolling.bind(this))
        this.#template.addEventListener("mouseup", this.desableScrolling.bind(this))
        
        this.contener.querySelectorAll(".scroll-btn").forEach(element => {
            element.addEventListener("click", this.scrollTo.bind(this))
        })
    }
    

    getElementsWidth () {
        return this.#template.firstElementChild.clientWidth
    }

    /**
     * @param {MouseEvent} event 
     */
    scrollTo (event) {
        let elementWidth = this.getElementsWidth() + 12

        if (Array.from(event.currentTarget.classList).includes("next")) {
            let scrollLength = this.#template.scrollLeft + elementWidth
            if (scrollLength % elementWidth !== 0) {
                let rest =  scrollLength % elementWidth
                scrollLength -= rest 
            }
            this.#template.scrollLeft = scrollLength
            setTimeout(this.updateSlideBtn(), 60)
            return
        } 

        let scrollLength = this.#template.scrollLeft - elementWidth
        this.#template.scrollLeft = scrollLength
        setTimeout(this.updateSlideBtn(), 60)

    }

    /**
     * @param {MouseEvent} event 
     */
    scroll (event) {
        if (!this.#isScrolling) { return }
        event.preventDefault()

        let pageXDiff = event.pageX - this.#prevPageX
        this.#template.scrollLeft = this.#prevScrollLeft - pageXDiff
        setTimeout(this.updateSlideBtn(), 60)
    }

    updateSlideBtn () {
        let slideBtn = this.contener.querySelectorAll(".scroll-btn")

        slideBtn[0].classList[this.contener.firstElementChild.scrollLeft > 0 ? "remove" : "add"]("hide-btn");
        slideBtn[1].classList[(this.#template.scrollLeft + this.#template.clientWidth) === this.#template.scrollWidth ? "add" : "remove"]("hide-btn");
    }


}


window.addEventListener("resize", () => {
    console.log("contener width", document.querySelector(".project-contener").clientWidth)
    console.log("items width", document.querySelector(".project-item").clientWidth)
})


// name, desc, tags, thumbPath, gitUrl


const myProjectList = new projectList()
projects.forEach(element => {
    let p = new project(
        element.name,
        element.desc,
        element.tags,
        element.thumbPath,
        element.gitUrl
    )
    myProjectList.addProject(p)
})

