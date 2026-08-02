function carregar(){
    var msg = window.document.getElementById('msg')
    var exuImage = window.document.getElementById('exuImage')
    var data = new Date()
    var hora = data.getHours()
    var minutos = data.getMinutes()

    msg.innerHTML = `Agora são ${hora} horas e ${minutos} minutos`
        document.body.style.fontFamily = 'Arial, Helvetica, sans-serif'

    if (hora >= 0 && hora < 12){
        exuImage.src = 'imagens/trancaRuas.png'
        document.body.style.background = '#e2cd9f'
    } else if (hora >= 12 && hora < 18){
        exuImage.src = 'imagens/mariaPadrilha.png'
        document.body.style.background = '#b9846f'
    } else {
        exuImage.src = 'imagens/joaoCaveira.png'
        document.body.style.background = '#050b14'
    };
}
