function showModal(event) 
{
    var $divModal = document.createElement('div')
        $divModal.classList.add('modal_window')
    var $divWrapper = document.createElement('div')
        $divWrapper.classList.add('modal_wrapper')
    var $h3 = document.createElement('h3')
        $h3.textContent = 'Congratulation! You are open modal window.'

    $divWrapper.appendChild($h3)
    $divModal.appendChild($divWrapper)
    document.body.appendChild($divModal)
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '18px'

    $divModal.addEventListener('click', closeModal, false)

    event.stopPropagation()
}

function closeModal(event)
{
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    document.body.removeEventListener('click', closeModal, false)
    this.parentNode.removeChild(this)

    event.preventDefault()
}

btnShowModal.addEventListener('click', showModal, false)
