import './scss/style.scss'

export class Popup {
     constructor(name) {
        let $containerPopup = null, // Container popup
            $popup = null           // Popup

        let createElement = (options) => {
            if ( typeof options != 'object' || !options )
                options = {
                    name: 'p', 
                    id: '', 
                    class: '', 
                    text: "",
                    src: "",
                    href: "",
                    alt: "",
                    title: "",
                    type: "",
                    maxlength: "",
                    placeholder: ""
                }

            let {
                    name: tagName, 
                    id: _id = '',
                    class: _class = '',
                    text,
                    src         = '',
                    href        = '',
                    alt         = '',
                    title       = '',
                    type        = "",
                    maxlength   = "",
                    placeholder = ""
                } = options,
                $element = document.createElement(tagName)

            if ( _id )              $element.id = _id
            if ( _class )           $element.className = _class
            if ( text )             $element.textContent = text
            if ( src )              $element.src = src
            if ( href )             $element.href = href
            if ( alt )              $element.alt = alt
            if ( title )            $element.title = title
            if ( type )             $element.type = type
            if ( maxlength )        $element.maxlength = maxlength
            if ( placeholder )      $element.placeholder = placeholder

            return $element
        }

        /*
        * Create container and popup window
        */
        this.create = () => {
            let $wrapperPopup = null

            $containerPopup = document.createElement('div')
            $containerPopup.classList.add('container_popup')
            $popup = document.createElement('div')
            $popup.classList.add('popup')
            $containerPopup.appendChild($popup)
                    
            return this    
        }

        /*
        * Add new element to this popup
        * @param object options
        *
        * @return Popup
        */
        this.add = options => {
            const $header = createElement(options)

            $popup.appendChild($header)

            return this
        }

        /*
        * Add button close to this popup
        *
        * @return Popup
        */
        this.addButtonClose = () => {
            const   $div = document.createElement('div'),
                    $span = document.createElement('span')
            $div.id = "btn_close_popup"
            $div.classList.add('popup__btn_close')
            $div.appendChild($span)
            $div.addEventListener('click', this.remove)

            $popup.appendChild($div)
                    
            return this   
        }

        /*
        * Show popup on window
        */
        this.show = () => {
            document.body.appendChild($containerPopup)
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '18px'
        }

        /*
        * Remove popup on window
        */
        this.remove = () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            document.body.removeChild($containerPopup)
        }

        this.addActionToButton = (idButton, action) => {
            if ( typeof idButton != 'string' && typeof action != 'function' )
                return

            $popup.querySelector(`#${idButton}`).addEventListener('click', action)

            return this
        }
    }
}


/* Example

const popup = new Popup()
console.log(popup)

popup.create()
    .add({
        name: 'h1', 
        text: "Hello! I'm header"
    })
    .add({
        name: 'p', 
        text: "This feature is coming soon!"  
    })
    .add({
        name: 'button', 
        text: "Ok",
        type: 'button',
        id: "btn_popup_ok",
        class: "popup_btn_ok"  
    })
   .addButtonClose()
   .addActionToButton('btn_popup_ok', () => {
        console.log(popup)
   })
   //.show()

document.getElementById('btnShowModal').addEventListener('click', popup.show, false)
*/