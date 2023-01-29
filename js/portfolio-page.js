import { projects } from "./project-objects.js";


class portfolioItem  {

    #template = null

    /**
     * @param {string} name 
     * @param {string} desc 
     * @param {Array<string>} tags 
     * @param {string} gitUrl 
     */
    constructor (name, desc, tags, gitUrl) {
        this.name = name
        this.desc = desc
        this.tags = tags
        this.gitUrl = gitUrl

        // template setting 
        this.#template = document.querySelector("#portfolio-item").content.firstElementChild.cloneNode(true)
        this.#template.querySelector("h3").innerText = this.name
        this.#template.querySelector("p").innerText = this.desc
        this.tags.forEach(element => {
            let p = document.createElement("p")
            p.setAttribute("class", "tag")
            p.innerText = "#" + element
            this.#template.querySelector(".tags-box").prepend(p)
        })
        this.#template.querySelector("a").setAttribute("href", this.gitUrl)
    }

    getTemplate () {
        return this.#template
    }
}


class portfolio {

    /** @type {portfolioItem[]} */
    #items = []

    #container = null

    /**
     * @param {portfolioItem[]} items 
     */
    constructor (items=[]) {
        this.#items = items

        this.#container = document.createElement("div")
        this.#container.setAttribute("class", "content")
        
        // adding to container
        this.#items.forEach(element => {
            this.addToContainer(element)
        })
        
    }

    /**
     * @param {portfolioItem} item 
     */
    addItem (item) {
        this.#items.push(item)
        this.addToContainer(item)
        return item
    }

    /**
     * @param {portfolioItem} item 
     */
    addToContainer (itemTpl) {
        this.#container.prepend(itemTpl.getTemplate())
    }

    getTemplate () {
        return this.#container
    }

}

const myPortfolio = new portfolio()

projects.forEach(element => {
    let pItem = new portfolioItem(
        element.name,
        element.desc,
        element.tags,
        element.gitUrl
    ) 
    myPortfolio.addItem(pItem)
})

// add to DOM
document.querySelector(".container").appendChild(myPortfolio.getTemplate())