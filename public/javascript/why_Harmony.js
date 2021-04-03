//get the element named "button1" and put it in a var
let info = document.getElementById('button1')
//wait for a click on var info then execute function inf
info.addEventListener('click', inf)
function inf(){
    document.getElementById('why_harmony').innerHTML=('Pourquoi choisir Harmony ?')
    document.getElementById('text_why_harmony').innerHTML=('Tout simplement car nous sommes une société en devenir et que l\'avis de notre communauté nous est très important. ')
}