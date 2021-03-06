export default class Popup {
     constructor(name) {
        let $containerPopup = null, // Container popup
            $popup = null,          // Popup
            settings = {
                scrollBarBody: true,    // Does srollBar on body show?
                classPopup: 'popup'     // Add class to node Popup
            }

        let createElement = (options) => {
            if ( typeof options != 'object' || !options ) 
                options = {tagName: 'span'}

            let $element = null

            if ( options.tagName == 'svg' || options.tagName == 'path' )
                $element = document.createElementNS('http://www.w3.org/2000/svg', options.tagName)
            else
                $element = document.createElement(options.tagName)

            for ( let prop in options ) {
                if ( prop === 'wrapper' || prop === 'tagName' || prop === 'xmlns' )
                    continue

                if ( prop === 'text' ) {
                    $element.textContent = options[prop]
                    continue
                }

                if ( prop === 'checked' ) {
                    $element.checked = options[prop]
                    continue
                }                

                if ( options.tagName === 'svg' || options.tagName == 'path' )
                    $element.setAttributeNS(null, prop, options[prop])
                else
                    $element.setAttribute(prop, options[prop])
            }

            return $element
        }

        /*
        * Create container and popup window
        *
        * @param object options - by defualt keys
        *   boolean scrollBarBody: true
        */
        this.create = options => {
            let $wrapperPopup = null

            if ( typeof options === 'object' )
                for ( let prop in options )
                    if ( prop in settings )
                        settings[prop] = options[prop]

            $containerPopup = document.createElement('div')
            $containerPopup.classList.add('container_popup')
            $popup = document.createElement('div')
            $popup.className = settings.classPopup
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
            const $element = createElement(options)

            if ( typeof options.wrapper == 'string' ) {
                const $wrapper = $popup.querySelector(`#${options.wrapper}`)
                
                if ( $wrapper ) 
                    $wrapper.appendChild($element)
            }
            else 
                $popup.appendChild($element)

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
        * Add action 'click' to the element
        *
        * @param number idButton
        * @param function action
        *
        * @return Popup
        */
        this.addActionToButton = (idButton, action) => {
            if ( typeof idButton != 'string' && typeof action != 'function' )
                return

            $popup.querySelector(`#${idButton}`).addEventListener('click', action)

            return this
        }

        /*
        * Show popup on window
        *
        */
        this.show = () => {
            document.body.appendChild($containerPopup)

            if ( settings.scrollBarBody )
                return

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
    }
}
