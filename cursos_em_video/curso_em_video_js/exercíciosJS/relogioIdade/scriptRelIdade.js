
function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#res')
    if (fano.value.length == 0 || fano.value > ano) {
        window.alert('[ERRO] Verifique os dados e tente novamente!')
    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var gênero = ''
        var sexo = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        img.style.marginTop = '20px'
        if (fsex[0].checked) {
            gênero = 'Masculino'
            sexo = 'masc'
        } else if (fsex[1].checked){
            gênero = 'Feminino'
            sexo = 'fem'
        }
        if (sexo == 'masc') {
            if (idade < 10) {
                img.setAttribute('src', 'imagens/alisadyson-stairs-7152763_1920.jpg')
            } else if (idade < 21) {
                img.setAttribute('src', 'imagens/homem jovem.jpg')
            } else if (idade < 50) {
                img.setAttribute('src', 'imagens/homemAdultojpg')
            } else {
                img.setAttribute('src', 'imagens/familieportraet-man-7518890.jpg')
            }
        } else if (sexo == 'fem') {
            if (idade < 10) {
                img.setAttribute('src', 'imagens/girl.jpg')
            } else if (idade < 21) {
                img.setAttribute('src', 'imagens/822640-sisters-931131.jpg')
            } else if (idade < 50) {
                img.setAttribute('src', 'imagens/erwinbosman-woman-10363971_1920.jpg')
            } else {
                img.setAttribute('src', 'imagens/tungkuteo-elderly-woman-7293582.jpg')
            }
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Idade calculada: ${idade} anos. Gênero: ${gênero}`
        res.appendChild(img)
    }
}